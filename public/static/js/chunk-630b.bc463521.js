(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-630b"],{"1MMP":function(t,e,i){},BiX5:function(t,e,i){"use strict";var a={name:"BackToTop",props:{visibilityHeight:{type:Number,default:400},backPosition:{type:Number,default:0},customStyle:{type:Object,default:function(){return{right:"50px",bottom:"50px",width:"40px",height:"40px","border-radius":"4px","line-height":"45px",background:"#e7eaf1"}}},transitionName:{type:String,default:"fade"}},data:function(){return{visible:!1,interval:null,isMoving:!1}},mounted:function(){window.addEventListener("scroll",this.handleScroll)},beforeDestroy:function(){window.removeEventListener("scroll",this.handleScroll),this.interval&&clearInterval(this.interval)},methods:{handleScroll:function(){this.visible=window.pageYOffset>this.visibilityHeight},backToTop:function(){var t=this;if(!this.isMoving){var e=window.pageYOffset,i=0;this.isMoving=!0,this.interval=setInterval(function(){var a=Math.floor(t.easeInOutQuad(10*i,e,-e,500));a<=t.backPosition?(window.scrollTo(0,t.backPosition),clearInterval(t.interval),t.isMoving=!1):window.scrollTo(0,a),i++},16.7)}},easeInOutQuad:function(t,e,i,a){return(t/=a/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e}}},n=(i("zXup"),i("ZrdR")),r=Object(n.a)(a,function(){var t=this.$createElement,e=this._self._c||t;return e("transition",{attrs:{name:this.transitionName}},[e("div",{directives:[{name:"show",rawName:"v-show",value:this.visible,expression:"visible"}],staticClass:"back-to-ceiling",style:this.customStyle,on:{click:this.backToTop}},[e("svg",{staticClass:"Icon Icon--backToTopArrow",staticStyle:{height:"16px",width:"16px"},attrs:{width:"16",height:"16",viewBox:"0 0 17 17",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true"}},[e("title",[this._v("回到顶部")]),this._v(" "),e("g",[e("path",{attrs:{d:"M12.036 15.59c0 .55-.453.995-.997.995H5.032c-.55 0-.997-.445-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29c.39-.39 1.026-.385 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z","fill-rule":"evenodd"}})])])])])},[],!1,null,"6172f71e",null);r.options.__file="index.vue";e.a=r.exports},GUib:function(t,e,i){"use strict";i.r(e);var a=i("/dyU"),n=i.n(a),r={components:{BackToTop:i("BiX5").a},data:function(){return{tableData:[],total:200,pageSize:20,currentPage:1}},created:function(){var t=n.a.mock({"tableData|200":[{encoding:/\d{13}/,name:"iPhone @NATURAL(5,8) 128G",price:/\d{3}/,time:'@DATE("yyyy-MM-dd HH:mm:ss")'}]});return this.tableData=t.tableData,this.tableData},methods:{current_change:function(t){this.currentPage=t},handleSizeChange:function(t){this.pageSize=parseInt(t),this.currentPage=1}}},l=i("ZrdR"),s=Object(l.a)(r,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"test"},[i("el-form",[i("el-input",{staticStyle:{width:"230px"},attrs:{placeholder:"输入商品编码"}}),t._v(" "),i("el-input",{staticStyle:{width:"230px","margin-left":"20px"},attrs:{placeholder:"输入商品名称"}}),t._v(" "),i("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary"}},[t._v("查询")])],1),t._v(" "),i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData.slice((t.currentPage-1)*t.pageSize,t.currentPage*t.pageSize),"default-sort":{prop:"time",order:"descending"},stripe:""}},[i("el-table-column",{attrs:{sortable:"",prop:"encoding",label:"商品编码",width:"180"}}),t._v(" "),i("el-table-column",{attrs:{prop:"name",label:"商品名称",width:"180"}}),t._v(" "),i("el-table-column",{attrs:{sortable:"",prop:"price",label:"价格",width:"100"}}),t._v(" "),i("el-table-column",{attrs:{sortable:"",prop:"time",label:"导入时间",width:"180"}})],1),t._v(" "),i("el-pagination",{attrs:{total:t.total,"page-sizes":[20,50,100,200],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.current_change}}),t._v(" "),i("back-to-top")],1)},[],!1,null,null,null);s.options.__file="goodsList.vue";e.default=s.exports},zXup:function(t,e,i){"use strict";var a=i("1MMP");i.n(a).a}}]);