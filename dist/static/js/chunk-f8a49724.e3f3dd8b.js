(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f8a49724"],{"582f":function(t,a,e){"use strict";e.r(a);var s=e("62ad"),r=e("a523"),i=e("0fd9"),o=e("e0c7"),n=function(){var t=this,a=t._self._c;return a(r["a"],[a(o["a"],[t._v("Mini Card")]),a(i["a"],t._l(t.users,(function(e,r){return a(s["a"],{key:"mini"+r,attrs:{cols:"3"}},[a("name-card",t._b({attrs:{mini:""}},"name-card",e,!1))],1)})),1),a(o["a"],[t._v("Basic Name Card")]),a(i["a"],t._l(t.users,(function(e,r){return a(s["a"],{key:"basic"+r,attrs:{cols:"3"}},[a("name-card",t._b({},"name-card",e,!1))],1)})),1),a(o["a"],[t._v("Basic Name Card with top nav")]),a(i["a"],t._l(t.users,(function(e,r){return a(s["a"],{key:"basic-top-nav"+r,attrs:{cols:"3"}},[a("name-card",t._b({attrs:{"top-nav":""}},"name-card",e,!1))],1)})),1),a(o["a"],[t._v("Bottom Nav Name Card")]),a(i["a"],t._l(t.users,(function(e,r){return a(s["a"],{key:"bottom-nav"+r,attrs:{cols:"3",sm12:""}},[a("name-card",t._b({attrs:{"bottom-nav":""}},"name-card",e,!1))],1)})),1)],1)},l=[],c=e("8212"),u=(e("dd43"),e("3a66")),d=e("3860"),h=e("a9ad"),m=e("24b2"),p=e("a452"),v=e("277e"),b=e("7560"),g=e("f2e7"),f=e("58df"),y=e("d9bd"),_=Object(f["a"])(Object(u["a"])("bottom",["height","inputValue"]),h["a"],m["a"],Object(g["b"])("inputValue"),p["a"],v["a"],b["a"]).extend({name:"v-bottom-navigation",props:{activeClass:{type:String,default:"v-btn--active"},backgroundColor:String,grow:Boolean,height:{type:[Number,String],default:56},hideOnScroll:Boolean,horizontal:Boolean,inputValue:{type:Boolean,default:!0},mandatory:Boolean,shift:Boolean,tag:{type:String,default:"div"}},data(){return{isActive:this.inputValue}},computed:{canScroll(){return v["a"].options.computed.canScroll.call(this)&&(this.hideOnScroll||!this.inputValue)},classes(){return{"v-bottom-navigation--absolute":this.absolute,"v-bottom-navigation--grow":this.grow,"v-bottom-navigation--fixed":!this.absolute&&(this.app||this.fixed),"v-bottom-navigation--horizontal":this.horizontal,"v-bottom-navigation--shift":this.shift}},styles(){return{...this.measurableStyles,transform:this.isActive?"none":"translateY(100%)"}}},watch:{canScroll:"onScroll"},created(){this.$attrs.hasOwnProperty("active")&&Object(y["a"])("active.sync","value or v-model",this)},methods:{thresholdMet(){this.hideOnScroll&&(this.isActive=!this.isScrollingUp||this.currentScroll>this.computedScrollThreshold,this.$emit("update:input-value",this.isActive)),this.currentThreshold<this.computedScrollThreshold||(this.savedScroll=this.currentScroll)},updateApplication(){return this.$el?this.$el.clientHeight:0},updateValue(t){this.$emit("change",t)}},render(t){const a=this.setBackgroundColor(this.backgroundColor,{staticClass:"v-bottom-navigation",class:this.classes,style:this.styles,props:{activeClass:this.activeClass,mandatory:Boolean(this.mandatory||void 0!==this.value),tag:this.tag,value:this.internalValue},on:{change:this.updateValue}});return this.canScroll&&(a.directives=a.directives||[],a.directives.push({arg:this.scrollTarget,name:"scroll",value:this.onScroll})),t(d["a"],this.setTextColor(this.color,a),this.$slots.default)}}),S=e("8336"),C=e("b0af"),w=e("99d9"),B=e("132d"),j=e("6b53"),k=function(){var t=this,a=t._self._c;return a("div",{staticClass:"name-card"},[a(C["a"],{ref:"card",attrs:{tile:"",color:t.color,dark:t.dark,img:t.cardBgImage}},[t.showTopNav?a(j["a"],[a(i["a"],{staticClass:"ma-0",attrs:{"justify-space-between":""}},[a(s["a"],{attrs:{xs2:""}},[a(B["a"],{attrs:{color:"pink"}},[t._v("mdi-heart")])],1),a(s["a"],{staticClass:"text-sm-right",attrs:{xs2:""}},[a(B["a"],[t._v("mdi-dots-vertical")])],1)],1)],1):t._e(),a(w["b"],[a("div",{staticClass:"layout ma-0 align-center",class:t.computeCardLayout},[a(c["a"],{attrs:{size:t.computeAvatarSize,color:"primary"}},[t.showAvatar?a("img",{attrs:{src:t.avatar.src,alt:t.name}}):a("span",{staticClass:"headline"},[t._v(t._s(t.name.charAt(0)))])]),a("div",{staticClass:"flex",class:t.computeTextAlgin},[a("div",{staticClass:"subheading"},[t._v(t._s(t.name))]),a("span",{staticClass:"caption"},[t._v(t._s(t.jobTitle))])])],1)])],1),t.showBottomNav?a(_,{attrs:{color:"transparent",height:64}},[a(S["a"],{attrs:{text:"",color:"teal",value:"recent"}},[a("span",[t._v("Recent")]),a(B["a"],[t._v("mdi-history")])],1),a(S["a"],{attrs:{text:"",color:"teal",value:"favorites"}},[a("span",[t._v("Favorites")]),a(B["a"],[t._v("mdi-heart")])],1),a(S["a"],{attrs:{text:"",color:"teal",value:"nearby"}},[a("span",[t._v("Nearby")]),a(B["a"],[t._v("mdi-map-marker")])],1)],1):t._e()],1)},x=[],N={props:{name:{type:String,default:""},avatar:{type:Object,default:null},jobTitle:{type:String,default:""},cardBgImage:{type:String},color:{type:String,default:""},dark:{type:Boolean,default:!1},bottomNav:{type:Boolean,default:!1},topNav:{type:Boolean,default:!1},mini:{type:Boolean,default:!1}},data:()=>({}),computed:{computeCardLayout(){return this.mini?"row":"column"},computeTextAlgin(){return this.mini?"text-sm-right":"text-sm-center"},computeAvatarSize(){return this.mini?"48":"96"},showAvatar(){return null!==this.avatar&&this.avatar.src},showBottomNav(){return!1===this.mini&&this.bottomNav},showTopNav(){return!1===this.mini&&this.topNav}},methods:{}},T=N,A=(e("bb5a"),e("2877")),O=Object(A["a"])(T,k,x,!1,null,"8bf50ed6",null),z=O.exports,V={components:{NameCard:z},data(){return{users:[{jobTitle:"Web Developer",name:"Michael Wang",avatar:{src:"https://randomuser.me/api/portraits/men/1.jpg",size:"36"}},{jobTitle:"Web Designer",name:"Jessie J",color:"pink",dark:!0,avatar:{src:"https://randomuser.me/api/portraits/women/1.jpg",size:"36"}},{jobTitle:"Web Developer",name:"Jim J",color:"teal",dark:!0,avatar:{src:"https://randomuser.me/api/portraits/men/10.jpg",size:"36"}},{jobTitle:"Product Manager",name:"John Doe",cardBgImage:"/static/bg/15.jpg",avatar:{src:"https://randomuser.me/api/portraits/men/5.jpg",size:"36"}}]}}},J=V,$=Object(A["a"])(J,n,l,!1,null,null,null);a["default"]=$.exports},8238:function(t,a,e){},bb5a:function(t,a,e){"use strict";e("8238")},dd43:function(t,a,e){}}]);