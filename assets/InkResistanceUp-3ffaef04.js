import{E as t,a,S as w}from"./AbilitySelector-0844a414.js";import{_}from"./AbilitySelection.vue_vue_type_script_setup_true_lang-ba9bc4f0.js";import{d as p,r as c,f,h as g,o as s,a as l,b as i}from"./index-e676222a.js";async function d(){return[await k(),await y(),await h(),await I(),await D(),await O(),await V()]}async function k(){return{title:"Armor HP in Opponent Ink",data:new t(await a("OpInk_ArmorHP"))}}async function y(){return{title:"Damage Limit in Opponent Ink",data:new t(await a("OpInk_DamageLmt"))}}async function h(){return{title:"Damage Pre Frame in Opponent Ink",data:new t(await a("OpInk_DamagePerFrame"))}}async function I(){return{title:"Jump Velocity in Opponent Ink",data:new t(await a("OpInk_JumpVel"))}}async function D(){return{title:"Move Velocity in Opponent Ink",data:new t(await a("OpInk_MoveVel"))}}async function O(){return{title:" Move Velocity while Shooting in Opponent Ink",data:new t(await a("OpInk_MoveVel_Shot"))}}async function V(){return{title:"Opponent Ink - Move Velocity ShootingK",data:new t(await a("OpInk_MoveVel_ShotK")),note:"I don't know what the K stands for, maybe when rolling or moving with the brush down."}}const v="OpInkEffect_Reduction.png",M=p({__name:"InkResistanceUp",props:{weapon:{}},setup(u){const e=c(0),o=c([]);f(()=>{r()}),g(()=>{r()});function m(n){e.value=n}function r(){d().then(n=>o.value=n)}return(n,S)=>(s(),l("section",null,[i(_,{"ability-img":v,onApChanged:m}),i(w,{stats:o.value,ap:e.value},null,8,["stats","ap"])]))}}),E=p({__name:"InkResistanceUp",props:{weapon:String},setup(u){return(e,o)=>(s(),l("main",null,[i(M)]))}});export{E as default};
