(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-117ef9e8"],{"2b5d":function(e,t,a){"use strict";a("2bfd");var i=a("b974"),l=a("c6a6"),r=a("80d2");t["a"]=l["a"].extend({name:"v-combobox",props:{delimiters:{type:Array,default:()=>[]},returnObject:{type:Boolean,default:!0}},data:()=>({editingIndex:-1}),computed:{computedCounterValue(){return this.multiple?this.selectedItems.length:(this.internalSearch||"").toString().length},hasSlot(){return i["a"].options.computed.hasSlot.call(this)||this.multiple},isAnyValueAllowed(){return!0},menuCanShow(){return!!this.isFocused&&(this.hasDisplayedItems||!!this.$slots["no-data"]&&!this.hideNoData)},searchIsDirty(){return null!=this.internalSearch}},methods:{onInternalSearchChanged(e){if(e&&this.multiple&&this.delimiters.length){const t=this.delimiters.find(t=>e.endsWith(t));null!=t&&(this.internalSearch=e.slice(0,e.length-t.length),this.updateTags())}this.updateMenuDimensions()},genInput(){const e=l["a"].options.methods.genInput.call(this);return delete e.data.attrs.name,e.data.on.paste=this.onPaste,e},genChipSelection(e,t){const a=i["a"].options.methods.genChipSelection.call(this,e,t);return this.multiple&&(a.componentOptions.listeners={...a.componentOptions.listeners,dblclick:()=>{this.editingIndex=t,this.internalSearch=this.getText(e),this.selectedIndex=-1}}),a},onChipInput(e){i["a"].options.methods.onChipInput.call(this,e),this.editingIndex=-1},onEnterDown(e){e.preventDefault(),this.getMenuIndex()>-1||this.$nextTick(this.updateSelf)},onKeyDown(e){const t=e.keyCode;!e.ctrlKey&&[r["z"].home,r["z"].end].includes(t)||i["a"].options.methods.onKeyDown.call(this,e),this.multiple&&t===r["z"].left&&0===this.$refs.input.selectionStart?this.updateSelf():t===r["z"].enter&&this.onEnterDown(e),this.changeSelectedIndex(t)},onTabDown(e){if(this.multiple&&this.internalSearch&&-1===this.getMenuIndex())return e.preventDefault(),e.stopPropagation(),this.updateTags();l["a"].options.methods.onTabDown.call(this,e)},selectItem(e){this.editingIndex>-1?this.updateEditing():(l["a"].options.methods.selectItem.call(this,e),this.internalSearch&&this.multiple&&this.getText(e).toLocaleLowerCase().includes(this.internalSearch.toLocaleLowerCase())&&(this.internalSearch=null))},setSelectedItems(){null==this.internalValue||""===this.internalValue?this.selectedItems=[]:this.selectedItems=this.multiple?this.internalValue:[this.internalValue]},setValue(e){i["a"].options.methods.setValue.call(this,void 0===e?this.internalSearch:e)},updateEditing(){const e=this.internalValue.slice(),t=this.selectedItems.findIndex(e=>this.getText(e)===this.internalSearch);if(t>-1){const a="object"===typeof e[t]?Object.assign({},e[t]):e[t];e.splice(t,1),e.push(a)}else e[this.editingIndex]=this.internalSearch;this.setValue(e),this.editingIndex=-1,this.internalSearch=null},updateCombobox(){if(!this.searchIsDirty)return;this.internalSearch!==this.getText(this.internalValue)&&this.setValue();const e=Boolean(this.$scopedSlots.selection)||this.hasChips;e&&(this.internalSearch=null)},updateSelf(){this.multiple?this.updateTags():this.updateCombobox()},updateTags(){const e=this.getMenuIndex();if(e<0&&!this.searchIsDirty||!this.internalSearch)return;if(this.editingIndex>-1)return this.updateEditing();const t=this.selectedItems.findIndex(e=>this.internalSearch===this.getText(e)),a=t>-1&&"object"===typeof this.selectedItems[t]?Object.assign({},this.selectedItems[t]):this.internalSearch;if(t>-1){const e=this.internalValue.slice();e.splice(t,1),this.setValue(e)}if(e>-1)return this.internalSearch=null;this.selectItem(a),this.internalSearch=null},onPaste(e){var t;if(!this.multiple||this.searchIsDirty)return;const a=null==(t=e.clipboardData)?void 0:t.getData("text/vnd.vuetify.autocomplete.item+plain");a&&-1===this.findExistingIndex(a)&&(e.preventDefault(),i["a"].options.methods.selectItem.call(this,a))},clearableCallback(){this.editingIndex=-1,l["a"].options.methods.clearableCallback.call(this)}}})},6239:function(e,t,a){"use strict";a.r(t);var i=a("62ad"),l=a("a523"),r=a("0fd9"),s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"page-forms"},[t(l["a"],[t(r["a"],[t(i["a"],{attrs:{cols:12,lg:6}},[t("contact-form")],1),t(i["a"],{attrs:{col:12,lg:6}},[t("payment-form")],1)],1)],1)],1)},n=[],o=a("8336"),d=a("b0af"),c=a("99d9"),u=a("2b5d"),h=a("ce7e"),m=a("4bd4"),p=a("2fa4"),f=a("8654"),v=function(){var e=this,t=e._self._c;return t(d["a"],{attrs:{tile:""}},[t(c["c"],[e._v("Contact Form")]),t(h["a"]),t(c["b"],[t(m["a"],{ref:"form",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t(f["a"],{attrs:{outlined:"",label:e.form.name.label,placeholder:e.form.name.placeholder,required:"","append-icon":"mdi-account-check",rules:e.form.name.rules},model:{value:e.formModel.name,callback:function(t){e.$set(e.formModel,"name",t)},expression:"formModel.name"}}),t(f["a"],{attrs:{outlined:"",label:e.form.email.label,placeholder:e.form.email.placeholder,required:"","append-icon":"mdi-email",rules:e.form.email.rules},model:{value:e.formModel.email,callback:function(t){e.$set(e.formModel,"email",t)},expression:"formModel.email"}}),t(f["a"],{attrs:{outlined:"",label:e.form.address.label,placeholder:e.form.address.placeholder,"append-icon":"mdi-location",required:"",rules:e.form.address.rules},model:{value:e.formModel.address,callback:function(t){e.$set(e.formModel,"address",t)},expression:"formModel.address"}}),t(f["a"],{attrs:{outlined:"",label:e.form.city.label,placeholder:e.form.city.placeholder,required:"",rules:e.form.city.rules},model:{value:e.formModel.city,callback:function(t){e.$set(e.formModel,"city",t)},expression:"formModel.city"}}),t(f["a"],{attrs:{outlined:"",label:e.form.state.label,placeholder:e.form.state.placeholder,required:"",rules:e.form.state.rules},model:{value:e.formModel.state,callback:function(t){e.$set(e.formModel,"state",t)},expression:"formModel.state"}}),t(f["a"],{attrs:{outlined:"",label:e.form.zip.label,placeholder:e.form.zip.placeholder,required:"",type:"number",rules:e.form.zip.rules},model:{value:e.formModel.zip,callback:function(t){e.$set(e.formModel,"zip",t)},expression:"formModel.zip"}}),t(u["a"],{attrs:{outlined:"",label:e.form.country.label,placeholder:e.form.country.placeholder,rules:e.form.country.rules,items:e.countries,required:""},model:{value:e.formModel.country,callback:function(t){e.$set(e.formModel,"country",t)},expression:"formModel.country"}}),t("v-editor")],1)],1),t(h["a"],{staticClass:"mt-5"}),t(c["a"],[t(o["a"],{attrs:{text:""},on:{click:e.handleCancelForm}},[e._v("Cancel")]),t(p["a"]),t(o["a"],{attrs:{tile:"",color:"primary"},on:{click:e.handleSubmitForm}},[e._v("Submit")])],1)],1)},b=[],g=a("10b8"),y={components:{},data:()=>({countries:["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"],valid:!0,formModel:{name:null,email:null,address:null,city:null,state:null,zip:null,country:null},form:{name:{label:"Full Name",placeholder:"Tookit",rules:[e=>!!e||"This field is required"]},email:{label:"Email",placeholder:"wangqiangshen@gmail.com",rules:[e=>!!e||"This field is required",e=>g["a"].test(e)||"Invalid email"]},address:{label:"Address Line",placeholder:"Address",rules:[e=>!!e||"This field is required"]},city:{label:"City",placeholder:"Shenzhen",rules:[e=>!!e||"This field is required"]},state:{label:"State/Provice/Region",placeholder:"Guangdong",rules:[e=>!!e||"This field is required"]},zip:{label:"Zip",placeholder:"528020",rules:[e=>!!e||"This field is required"]},country:{label:"Country",placeholder:"China",rules:[e=>!!e||"This field is required"]}},formHasErrors:!1}),methods:{handleCancelForm(){this.$refs.form.reset()},handleSubmitForm(){this.$refs.form.validate()&&console.log("handle form process logic here")}}},S=y,x=a("2877"),C=Object(x["a"])(S,v,b,!1,null,null,null),M=C.exports,k=a("a609"),w=a("2e4b"),I=a("132d"),_=a("e449"),V=a("b974"),T=a("e0c7"),A=(a("ec29"),a("9d01"),a("fe09")),D=a("c37a"),$=a("c3f0"),z=a("0789"),B=a("490a"),q=a("80d2"),E=A["a"].extend({name:"v-switch",directives:{Touch:$["a"]},props:{inset:Boolean,loading:{type:[Boolean,String],default:!1},flat:{type:Boolean,default:!1}},computed:{classes(){return{...D["a"].options.computed.classes.call(this),"v-input--selection-controls v-input--switch":!0,"v-input--switch--flat":this.flat,"v-input--switch--inset":this.inset}},attrs(){return{"aria-checked":String(this.isActive),"aria-disabled":String(this.isDisabled),role:"switch"}},validationState(){return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0},switchData(){return this.setTextColor(this.loading?void 0:this.validationState,{class:this.themeClasses})}},methods:{genDefaultSlot(){return[this.genSwitch(),this.genLabel()]},genSwitch(){const{title:e,...t}=this.attrs$;return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",{...this.attrs,...t}),this.genRipple(this.setTextColor(this.validationState,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",{staticClass:"v-input--switch__track",...this.switchData}),this.$createElement("div",{staticClass:"v-input--switch__thumb",...this.switchData},[this.genProgress()])])},genProgress(){return this.$createElement(z["c"],{},[!1===this.loading?null:this.$slots.progress||this.$createElement(B["a"],{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft(){this.isActive&&this.onChange()},onSwipeRight(){this.isActive||this.onChange()},onKeydown(e){(e.keyCode===q["z"].left&&this.isActive||e.keyCode===q["z"].right&&!this.isActive)&&this.onChange()}}}),F=function(){var e=this,t=e._self._c;return t(d["a"],{attrs:{tile:""}},[t(c["c"],[e._v("Payment Form")]),t(h["a"]),t(c["b"],[t(m["a"],{ref:"form",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t(T["a"],{staticClass:"pl-0"},[e._v("Payment Method")]),t(k["a"],{attrs:{color:"primary",group:""},model:{value:e.formModel.payment_method,callback:function(t){e.$set(e.formModel,"payment_method",t)},expression:"formModel.payment_method"}},[t(o["a"],{attrs:{icon:"",value:"apple"}},[t(I["a"],[e._v("mdi-apple")])],1),t(o["a"],{attrs:{icon:"",value:"credit"}},[t(I["a"],[e._v("mdi-credit-card")])],1),t(o["a"],{attrs:{icon:"",value:"wechat"}},[t(I["a"],[e._v("mdi-wechat")])],1)],1),t(T["a"],{staticClass:"pl-0 mt-3"},[e._v("Payment Detail")]),t(V["a"],{attrs:{items:e.cardTypes,label:e.form.card_type.label,placeholder:e.form.card_type.placeholder,required:"","append-icon":"mdi-credit-card",rules:e.form.card_type.rules},model:{value:e.formModel.card_type,callback:function(t){e.$set(e.formModel,"card_type",t)},expression:"formModel.card_type"}}),t(f["a"],{attrs:{label:e.form.card_number.label,placeholder:e.form.card_number.placeholder,required:"","append-icon":"mdi-credit-card",rules:e.form.card_number.rules,mask:"credit-card"},model:{value:e.formModel.card_number,callback:function(t){e.$set(e.formModel,"card_number",t)},expression:"formModel.card_number"}}),t(f["a"],{attrs:{label:e.form.card_name.label,placeholder:e.form.card_name.placeholder,required:"","append-icon":"mdi-credit-account",rules:e.form.card_name.rules},model:{value:e.formModel.card_name,callback:function(t){e.$set(e.formModel,"card_name",t)},expression:"formModel.card_name"}}),t("div",{staticClass:"d-flex"},[t(_["a"],{ref:"menu",attrs:{"close-on-content-click":!1,"return-value":e.formModel.expire,transition:"scale-transition","offset-y":"","min-width":"290px"},on:{"update:returnValue":function(t){return e.$set(e.formModel,"expire",t)},"update:return-value":function(t){return e.$set(e.formModel,"expire",t)}},scopedSlots:e._u([{key:"activator",fn:function({on:a,attrs:i}){return[t(f["a"],e._g(e._b({staticClass:"mr-2",attrs:{label:e.form.expire.label,placeholder:e.form.expire.placeholder,required:"","append-icon":"mdi-credit-card-clock",rules:e.form.expire.rules},model:{value:e.formModel.expire,callback:function(t){e.$set(e.formModel,"expire",t)},expression:"formModel.expire"}},"v-text-field",i,!1),a))]}}]),model:{value:e.showMenu,callback:function(t){e.showMenu=t},expression:"showMenu"}},[t(w["a"],{attrs:{"no-title":"",scrollable:""},model:{value:e.formModel.expire,callback:function(t){e.$set(e.formModel,"expire",t)},expression:"formModel.expire"}},[t(p["a"]),t(o["a"],{attrs:{text:"",color:"primary"},on:{click:function(t){e.showMenu=!1}}},[e._v("Cancel")]),t(o["a"],{attrs:{text:"",color:"primary"},on:{click:function(t){return e.$refs.menu.save(e.formModel.expire)}}},[e._v("OK")])],1)],1),t(f["a"],{attrs:{label:e.form.cvv.label,placeholder:e.form.cvv.placeholder,required:"",type:"number","append-icon":"mdi-credit-account",rules:e.form.cvv.rules},model:{value:e.formModel.cvv,callback:function(t){e.$set(e.formModel,"cvv",t)},expression:"formModel.cvv"}})],1),t("div",{staticClass:"d-flex"},[t(E,{attrs:{label:"Saved Card Detials"},model:{value:e.saveCard,callback:function(t){e.saveCard=t},expression:"saveCard"}})],1)],1)],1),t(h["a"],{staticClass:"mt-5"}),t(c["a"],[t(o["a"],{attrs:{text:""},on:{click:e.handleCancelForm}},[e._v("Cancel")]),t(p["a"]),t(o["a"],{attrs:{tile:"",color:"primary"},on:{click:e.handleSubmitForm}},[e._v("Submit")])],1)],1)},L=[],P={data(){return{valid:!0,showMenu:!1,formModel:{payment_method:"apple",card_number:null,card_name:null,expire:(new Date).toISOString().substr(0,10)},form:{card_type:{label:"Card type",placeholder:"Mater",rules:[e=>!!e||"This field is required"]},card_number:{label:"Card number",placeholder:"xx-xx-xxxxx",rules:[e=>!!e||"This field is required"]},card_name:{label:"Card name",placeholder:"Michael Wang",rules:[e=>!!e||"This field is required"]},expire:{label:"Expire date",placeholder:(new Date).toISOString().substr(0,10),rules:[e=>!!e||"This field is required"]},cvv:{label:"CVV",placeholder:"CVV",rules:[e=>!!e||"This field is required"]}},saveCard:!0,cardTypes:[{value:"visa",text:"Visa Express"},{value:"master",text:"Mastard"}]}},mounted(){},methods:{handleCancelForm(){this.$refs.form.reset()},handleSubmitForm(){this.$refs.form.validate()&&console.log("handle form process logic here")}}},G=P,j=Object(x["a"])(G,F,L,!1,null,null,null),K=j.exports,O={components:{ContactForm:M,PaymentForm:K},data(){return{}},computed:{},methods:{}},N=O,R=Object(x["a"])(N,s,n,!1,null,null,null);t["default"]=R.exports},"9d01":function(e,t,a){},ec29:function(e,t,a){},fe09:function(e,t,a){"use strict";var i=a("c37a"),l=a("5607"),r=a("a026"),s=r["a"].extend({name:"rippleable",directives:{ripple:l["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple(e={}){return this.ripple?(e.staticClass="v-input--selection-controls__ripple",e.directives=e.directives||[],e.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",e)):null}}}),n=a("8547"),o=a("58df");function d(e){e.preventDefault()}t["a"]=Object(o["a"])(i["a"],s,n["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive(){const e=this.value,t=this.internalValue;return this.isMultiple?!!Array.isArray(t)&&t.some(t=>this.valueComparator(t,e)):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,t):Boolean(t):this.valueComparator(t,this.trueValue)},isDirty(){return this.isActive},rippleState(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue(e){this.lazyValue=e,this.hasColor=e}},methods:{genLabel(){const e=i["a"].options.methods.genLabel.call(this);return e?(e.data.on={click:d},e):e},genInput(e,t){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:e,type:e},t),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:d},ref:"input"})},onClick(e){this.onChange(),this.$emit("click",e)},onChange(){if(!this.isInteractive)return;const e=this.value;let t=this.internalValue;if(this.isMultiple){Array.isArray(t)||(t=[]);const a=t.length;t=t.filter(t=>!this.valueComparator(t,e)),t.length===a&&t.push(e)}else t=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(t,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(t,e)?null:e:!t;this.validate(!0,t),this.internalValue=t,this.hasColor=t},onFocus(e){this.isFocused=!0,this.$emit("focus",e)},onBlur(e){this.isFocused=!1,this.$emit("blur",e)},onKeydown(e){}}})}}]);