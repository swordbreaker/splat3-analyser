import{S as m}from"./AbilitySelector-0844a414.js";import{g as l}from"./superJump-d34d4c8a.js";import{_}from"./AbilitySelection.vue_vue_type_script_setup_true_lang-ba9bc4f0.js";import{d as c,r,f,h as d,a as u,b as t,o as i}from"./index-e676222a.js";const g="JumpTime_Save.png",S=c({__name:"QuickSuperJump",props:{weapon:String},setup(o){const e=r(0),n=r([]);f(()=>{p()}),d(a=>{p()});function s(a){e.value=a}function p(){l().then(a=>n.value=a)}return(a,h)=>(i(),u("section",null,[t(_,{"ability-img":g,onApChanged:s}),t(m,{stats:n.value,ap:e.value},null,8,["stats","ap"])]))}}),x=c({__name:"QuickSuperJump",props:{weapon:String},setup(o){const e=o;return(n,s)=>(i(),u("main",null,[t(S,{weapon:e.weapon},null,8,["weapon"])]))}});export{x as default};