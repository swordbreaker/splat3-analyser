import{E as S,a as m,S as b}from"./AbilitySelector-0844a414.js";import{A as v}from"./AbilityWithWeaponSelection-1aee3217.js";import{d as r,r as i,a as p,b as s,F as _,o as c}from"./index-e676222a.js";import"./weapons-0e9b8fd6.js";async function g(a){const n=await w(a);return[n,await k(a,n.data)]}async function w(a){const n=await a.getSubWeaponInfo();return{title:"Consumption Rate Sub",data:new S(await m(`ConsumeRt_Sub_Lv${n.subInkSaveLv}`))}}async function k(a,n){const t=await a.getSubWeaponInfo();return{title:"Max subs with full tank",data:n.mapSimple(e=>1/(t.inkConsume*e))}}const d=r({__name:"InkSaverSub",props:{weapon:String},setup(a){const n=a,t=i([]),e=i(0);async function l(o){o!=null?g(o).then(u=>t.value=u):t.value=[]}function f(o){e.value=o}return(o,u)=>(c(),p(_,null,[s(v,{weapon:n.weapon,"effect-name":"inkSaverSub","ability-img":"SubInk_Save.png",onApChanged:f,onWeaponChanged:l},null,8,["weapon"]),s(b,{ap:e.value,stats:t.value},null,8,["ap","stats"])],64))}}),W=r({__name:"InkSaverSub",props:{weapon:String},setup(a){const n=a;return(t,e)=>(c(),p("main",null,[s(d,{weapon:n.weapon},null,8,["weapon"])]))}});export{W as default};
