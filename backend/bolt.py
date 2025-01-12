import os
from flask import Blueprint, request
from sqlalchemy.sql.elements import Null
from .models import User, InstalledWorkSpace, SlackBots, SlackInstallations, ToDo
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from slack_bolt import App
from slack_bolt.adapter.flask import SlackRequestHandler
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from slack_bolt.error import BoltUnhandledRequestError
from slack_bolt.oauth.oauth_settings import OAuthSettings
from slack_sdk.oauth.installation_store.sqlalchemy import SQLAlchemyInstallationStore
from slack_sdk.oauth.state_store.sqlalchemy import SQLAlchemyOAuthStateStore
from slack_bolt.oauth.callback_options import CallbackOptions, SuccessArgs, FailureArgs
from slack_bolt.response import BoltResponse
from slack_sdk.oauth.installation_store.installation_store import InstallationStore

import re
import time
import asyncio

import datetime
from datetime import datetime as dt
from datetime import date
from dateutil.tz import gettz
from dateutil.relativedelta import relativedelta
import calendar
from pytz import timezone

import logging
logging.basicConfig(level=logging.DEBUG)


def get_or_create_eventloop():
    try:
        return asyncio.get_event_loop()
    except RuntimeError as ex:
        if "There is no current event loop in thread" in str(ex):
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            return asyncio.get_event_loop()
    

def get_channels(client, next_cursor):
    try:
        limit = 700
        if next_cursor is not None:
            channel_list = client.conversations_list(
                limit = limit,
                cursor = next_cursor
            )
        else:
            channel_list = client.conversations_list(
                limit = limit
            )
    except SlackApiError as e:
        print("Error fetching conversations_list: {}".format(e))
    return channel_list


def get_users(client,next_cursor):
    try:
        limit = 500
        if next_cursor is not None:
            cuser_list = client.users_list(
                limit = limit,
                cursor = next_cursor
            )
        else:
            cuser_list = client.users_list(
                limit = limit
            )
    except SlackApiError as e:
        print("Error fetching users_list: {}".format(e))

    return cuser_list


def success(args:SuccessArgs) -> BoltResponse:
    assert args.request is not None
    """#使いそうな変数は以下の通り
    print(vars(args))
    print(vars(args.request))
    print(vars(args.installation))
    print(args.installation.team_id)
    print(args.installation.user_id)
    print(args.installation.user_token)
    print(args.installation.bot_token)
    print(vars(args.settings))
    print(vars(args.default))
    """
    client = WebClient(token=args.installation.bot_token)
    try:
        userinfo = client.users_info(
            user=args.installation.user_id,
            include_locale=True
        )
    except SlackApiError as e:
        print("Error fetching users_info: {}".format(e))
    #print(userinfo['user']['profile']['email'])# ユーザーのEmail

    local_session = SESSION()

    #Slackのトークンを取得
    slack_installations = []
    try:
        slack_installations = local_session.query(SlackInstallations).filter_by(user_id = args.installation.user_id).all()
    except Exception as e:
        print('error after fetch slack_installations: ')
        print(e)
    finally:
        print('finish find slack_installations')

    #２つ以上ある場合は最後のみ残して削除 slack_installations
    print(len(slack_installations))
    if len(slack_installations)>1:
        delete_slack_installations_id = []
        i = 1
        for d in slack_installations:
            if i != len(slack_installations):
                delete_slack_installations_id.append(d.id)
                i = i+1
        local_session.query(SlackInstallations).filter(SlackInstallations.id.in_(delete_slack_installations_id)).delete(synchronize_session='fetch')
        local_session.commit()
    #２つ以上ある場合は最後のみ残して削除 slack_installations

    #２つ以上ある場合は最後のみ残して削除 SlackBots
    slack_bots = []
    try:
        slack_bots = local_session.query(SlackBots).filter_by(team_id = args.installation.team_id).all()
    except Exception as e:
        print(e)
    finally:
        print('finish find SlackBots')
    if len(slack_bots)>1:
        delete_slack_bots_id = []
        i = 1
        for d in slack_bots:
            if i != len(slack_bots):
                delete_slack_bots_id.append(d.id)
                i = i+1
        local_session.query(SlackBots).filter(SlackBots.id.in_(delete_slack_bots_id)).delete(synchronize_session='fetch')
        local_session.commit()
    #２つ以上ある場合は最後のみ残して削除 SlackBots

    #Slackのトークンを一件取得
    time_zone = userinfo.get('user').get('tz')
    updatetoken = local_session.query(SlackInstallations).filter(SlackInstallations.user_id == args.installation.user_id).order_by(SlackInstallations.id.desc()).first()
    updatetoken.user_email = userinfo['user']['profile']['email']
    updatetoken.timezone = time_zone
    updateuser = local_session.query(User).filter(User.email == userinfo['user']['profile']['email']).first()

    #インストール完了時にDMを送る
    locale = userinfo['user']['locale']
    onboarding_block = []
    if locale == 'ja-JP':
        message = '＜＜アプリ名＞＞をインストール頂き、ありがとうございます！'
        #インストール時DMをカスタムする場合は以下を編集する
        onboarding_block=[
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "👋 ＜＜アプリ名＞＞をインストール頂きありがとうございます。"
                }
            }, 
            {
                "type": "divider"
            },
        ]
    else:
        message = 'Thanks for installing!'
        onboarding_block=[
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Hey there 👋 "
                }
            },         
        ]
    try:#https://api.slack.com/methods/conversations.history/test
        client.chat_postMessage(
            channel=args.installation.user_id,
            text=message,
            blocks=onboarding_block
        )
    except SlackApiError as e:
        print("Error fetching conversations: {}".format(e))
    #インストール完了時にDMを送る

    if locale == 'ja-JP':
        text_body = "Slackへのインストールが失敗しました。"
        text_installed = "Slackへのインストールが完了しました。こちらのウィンドウを閉じて下さい。"
    else:
        text_body = "Installation to Slack has failed."
        text_installed = "Installation to Slack is complete. Please close this window."

    if updatetoken is None:
        local_session.close()
        return BoltResponse(
            status=args.suggested_status_code,
            body=text_body
        )
    else:
        if updateuser is not None:
            #userが存在する場合はUserにslack_ws_idを入れて保存する
            updateuser.slack_user_id = userinfo['user']['id']
            updateuser.slack_ws_id = args.installation.team_id
            local_session.commit()

        installed = local_session.query(InstalledWorkSpace).filter(InstalledWorkSpace.slack_ws_id==args.installation.team_id).first()
        #InstalledWorkSpaceにデータが無い場合は、登録してチャンネル登録を行う
        if installed is not Null and installed is not None:
            if installed.is_active == False:
                installed.is_active = True
        else:
            #試用期間の設定などがあればこのあたりを使う
            #以下では翌月末までを試用期間としている
            free_expired_at_aware = dt.now(timezone('Etc/GMT'))
            one_month_after = free_expired_at_aware + relativedelta(months=1)
            print('one_month_after: ' + str(one_month_after))
            print(calendar.monthrange(one_month_after.year, one_month_after.month))
            one_month_after_last_day = one_month_after.replace(
                day=calendar.monthrange(one_month_after.year, one_month_after.month)[1],
                hour=14,
                minute=59,
                second=59)

            new_installed = InstalledWorkSpace(
                slack_ws_id=args.installation.team_id,
                slack_ws_name=args.installation.team_name,
                is_active = True,plan='free',
                free_expired_at = one_month_after_last_day,
                installed_at = dt.now(timezone('Etc/GMT')),
                channel_joined_at = dt.now(timezone('Etc/GMT'))
                )
            local_session.add(new_installed)

        local_session.commit()
        local_session.close()

        return BoltResponse(
            status=200,
            body=text_installed
        )


def failure(args:FailureArgs) -> BoltResponse:
    print('failure ■□■□■□■□■□■□■□■□■□■□■□')
    assert args.request is not None
    assert args.reason is not None
    return BoltResponse(
        status=args.suggested_status_code,
        body="Slackへのインストールが失敗しました。こちらのウィンドウを閉じてもう一度やり直して下さい。\nInstallation to Slack has failed. Please close this window and try again."
    )


from slack_bolt.adapter.flask import SlackRequestHandler

import sqlalchemy
from sqlalchemy.engine import Engine
logger = logging.getLogger(__name__)
client_id, client_secret, signing_secret = (
    os.environ["SLACK_CLIENT_ID"],
    os.environ["SLACK_CLIENT_SECRET"],
    os.environ["SLACK_SIGNING_SECRET"],
)
database_url = os.environ.get("SQLALCHEMY_DATABASE_URI")
engine: Engine = sqlalchemy.create_engine(database_url)
SESSION = sessionmaker(engine)
installation_store = SQLAlchemyInstallationStore(
    client_id=client_id, engine=engine, logger=logger,
)
oauth_state_store = SQLAlchemyOAuthStateStore(
    expiration_seconds=120, engine=engine, logger=logger,
)
#slack_oauth_statesテーブルにレコードがなければapp.py起動時にテーブルを初期化
try:
    engine.execute("select count(*) from slack_oauth_states")
except Exception as e:
    installation_store.metadata.create_all(engine)
    oauth_state_store.metadata.create_all(engine)
try:
    engine.execute("select user_email from slack_installations")
except Exception as e:
    print('slack_installationsにuser_email')
    engine.execute("ALTER TABLE slack_installations ADD COLUMN user_email text")
#DB 初期化ここまで


callback_options = CallbackOptions(success=success, failure=failure)
bolt_app = App(
    logger=logger,
    signing_secret=os.environ.get("SIGNING_SECRET"),
    installation_store=installation_store,
    raise_error_for_unhandled_request=True,
    oauth_settings=OAuthSettings(
        client_id=client_id,
        client_secret=client_secret,
        state_store=oauth_state_store,
        scopes=os.environ.get("SLACK_SCOPES"),
        user_scopes=os.environ.get("SLACK_USER_SCOPES"),
        callback_options=callback_options,
    ),
)
bolt_app.enable_token_revocation_listeners()


@bolt_app.event("app_home_opened")
def app_home_opened(client, event, body, logger, view):
    print('app_home_opened■□■□■□■□■□■□■□■□■□')
    try:
        userinfo = client.users_info(
            user=event.get('user'),
            include_locale=True
        )
    except SlackApiError as e:
        print("Error fetching conversations: {}".format(e))
    finally:
        print('userinfo')
        print(userinfo)

    locale = userinfo['user']['locale']

    blocks = []
    #アプリ管理者の場合はメニューを出す
    admin_user_ids = []
    app_owner_id = os.environ.get("APP_OWNER_ID")
    admin_user_ids = app_owner_id.split('|')
    is_app_owner = False
    for user_id in admin_user_ids:
        if user_id == event.get('user'):
            is_app_owner = True

    if locale == 'ja-JP':
        text_menu = "ユーザー通知メニュー"
        dm_menu = "DM送信メニュー"
        text_home_message = "ホーム画面に掲載するメッセージ"
        menu_text = "*各種設定*"
        inq_text = "お問い合わせ"
    else:
        text_menu = "User Notification Menu"
        dm_menu = "Send DM menu"
        text_home_message = "Message to be posted on the home screen"
        menu_text = "*Settings*"
        inq_text = "Contact"

    if is_app_owner == True:
        blocks = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": text_menu
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": dm_menu,
                        "emoji": True
                    },
                    "value": "send_dm_to_users",
                    "action_id": "send_dm_to_users"
                }
            },
            {
                "type": "divider"
            },
        ]

    blocks_add_section = [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": text_home_message
			}
		},
    ]

    blocks = blocks + blocks_add_section
    print("-aa-")

    blocks_contact = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": menu_text,
            }
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "emoji": True,
                        "text": inq_text
                    },
                    "style": "primary",
                    "value": "contact_us",
                    "action_id": "contact_us"
                },
            ]
        },        
    ]
    blocks = blocks + blocks_contact
    print(blocks)

    client.views_publish(
        # view_id を渡すこと
        user_id=event.get('user'),
        # 更新後の blocks を含むビューのペイロード
        view={
            "type": "home",
            # ビューの識別子
            "blocks": blocks
        }
    )


@bolt_app.message("Hello")
def hello(body, say, logger):
    logger.info(body)
    say("What's up?")
    

@bolt_app.message("ideyo")
def ideyo(body, say, logger):
    logger.info(body)
    target_name = body['event']['text'].split()[1]
    logger.info(target_name)
    local_session = SESSION()
    todos = local_session.query(ToDo).filter_by(name=target_name).first() 
    logger.info(todos.name)
    say(todos.content)


@bolt_app.command("/ideyo")
def repeat_text(ack, say, command):
    local_session = SESSION()
    ideyo_custom = local_session.query(ToDo).filter_by(name=f"{command['text']}").first()
    ack()
    say(f"いでよ {command['text']}")
    say(ideyo_custom.content)


@bolt_app.command("/ideyolist")
def ideyo_list(ack, say, command):
    local_session = SESSION()
    ideyo_custom = local_session.query(ToDo).all()
    ack()
    list_out = []
    for ideyos in ideyo_custom:
        list_out.append(f"{ideyos.name} {ideyos.content}")
    
    list_text = '\n'.join(list_out)
    say(list_text)


@bolt_app.command("/idelete")
def idelete(ack, say, command):
    local_session = SESSION()
    ideyo_custom = local_session.query(ToDo).filter_by(name=f"{command['text']}").delete()
    local_session.commit()
    ack()
    say(f"いでりーと {command['text']}")


@bolt_app.command("/ideyoadd")
def open_modal(ack, body, client):
    ack()
    client.views_open(
        trigger_id=body["trigger_id"],
        view={
            "callback_id": "view_1",
            "title": {
                "type": "plain_text",
                "text": "追加画面"
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit"
            },
            "blocks": [
                {
                    "type": "input",
                    "block_id": "input_key_word",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "sl_input",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "呼び出したい言葉を指定してね"
                        }
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "呼び出しコマンド"
                    },
                    "hint": {
                        "type": "plain_text",
                        "text": "思い出しやすいのにしてね"
                    }
                },
                {
                    "type": "input",
                    "block_id": "input_body",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "ml_input",
                        "multiline": True,
                        "placeholder": {
                            "type": "plain_text",
                            "text": "なんでもいいよ"
                        }
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "呼び出す内容"
                    },
                    "hint": {
                        "type": "plain_text",
                        "text": "よしなに"
                    }
                }
            ],
            "type": "modal"
        }
    )


@bolt_app.view("view_1")
def handle_submission(ack, body, client, view):
    # Assume there's an input block with `block_c` as the block_id and `dreamy_input`
    ideyo_word = view["state"]["values"]["input_key_word"]["sl_input"]
    ideyo_body = view["state"]["values"]["input_body"]["ml_input"]
    user = body["user"]["id"]
    errors = {}
    # if ideyo_body["value"] is not None and len(ideyo_body["value"]) <= 5:
    #     errors["input_body"] = f"The value must be longer than 5 characters. {ideyo_word['value']}"
    # if len(errors) > 0:
    #     ack(response_action="errors", errors=errors)
    #     return
    # Acknowledge the view_submission event and close the modal
    ack()
    # Do whatever you want with the input data - here we're saving it to a DB
    msg = "ありがとうございます"
    try:
        local_session = SESSION()
        new_phrase = ToDo(
            name=ideyo_word["value"],
            content=ideyo_body["value"],
            user_id=1
        )
        local_session.add(new_phrase)
        local_session.commit()
        msg = f"{ideyo_word['value']} という新しい呪文の登録に成功した"
    except Exception as e:
        msg = f"There was an error with your submission {str(e)}"
    finally:
        client.chat_postMessage(channel=user, text=msg)


@bolt_app.error
def handle_errors(error):
    if isinstance(error, BoltUnhandledRequestError):
        # You may want to have debug/info logging here
        return BoltResponse(status=200, body="")
    else:
        # other error patterns
        return BoltResponse(status=500, body="Something wrong")

handler = SlackRequestHandler(bolt_app)

bolt = Blueprint('bolt', __name__)

@bolt.route("/slack/events", methods=["POST"])
def slack_events():
    print('■□■□■□■□■□/slack/events')
    print(vars(request))
    return handler.handle(request)

@bolt.route("/slack/install", methods=["GET"])
def install():
    return handler.handle(request)

@bolt.route("/slack/oauth_redirect", methods=["GET"])
def oauth_redirect():
    return handler.handle(request)