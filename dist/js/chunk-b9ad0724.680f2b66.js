(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b9ad0724"],{"2b99":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{style:{width:t.tile_size+"px",height:t.tile_size+"px",background:t.id<0||1==t.id?t.bg:"transparent"}},[t.player||t.id>1?a("span",{style:{"font-size":.7*t.tile_size+"px"}},[t.player&&2==t.char?a("b",[t._v("め")]):t._e(),t.player&&3==t.char?a("b",[t._v("い")]):t._e(),t.player&&4==t.char?a("b",[t._v("ろ")]):t._e(),t.player||2!=t.id?t._e():a("b",[t._v("迷")]),t.player||3!=t.id?t._e():a("b",[t._v("路")]),5==t.id?a("b",[t._v("切")]):t._e(),6==t.id?a("b",[t._v("り")]):t._e()]):t._e()])},n=[],r=a("4360"),s={name:"Tile",props:{id:0,x:0,y:0},mounted:function(){this.char=Math.max(2,this.id)},computed:{char:{get:function(){return r["a"].state.player.char},set:function(t){this.char!=t&&r["a"].commit("char",t)}},bg:function(){return r["a"].state.color[Math.abs(this.id)-1]},tile_size:function(){return Math.max(10,r["a"].state.tile_size)},player:function(){var t=Math.min(r["a"].state.player.x,(r["a"].state.max.x-r["a"].state.min.x)/2),e=Math.min(r["a"].state.player.y,(r["a"].state.max.y-r["a"].state.min.y)/2);return t==this.x&&e==this.y&&1==this.id&&r["a"].commit("next"),t==this.x&&e==this.y}},watch:{bg:function(t){},tile_size:function(t){},player:function(t){}}},c=s,h=(a("7ced"),a("2877")),l=Object(h["a"])(c,i,n,!1,null,"91a7aa22",null);e["default"]=l.exports},4565:function(t,e,a){},"7ced":function(t,e,a){"use strict";var i=a("4565"),n=a.n(i);n.a}}]);
//# sourceMappingURL=chunk-b9ad0724.680f2b66.js.map