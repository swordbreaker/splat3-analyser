import{E as u,a as n,P as s}from"./AbilitySelector-0844a414.js";import{q as p}from"./index-e676222a.js";async function D(){const a=await m(),t=await i();return[a,t,o(a.data,t.data)]}async function S(){const a=await m(),t=await i();return o(a.data,t.data)}async function m(){return{title:"Super Jump Charge Frame",data:new u(await n("SuperJump_ChargeFrm"))}}async function i(){return{title:"Super Jump Move Frame",data:new u(await n("SuperJump_MoveFrm"))}}function o(a,t){return{title:"total super jump time ",data:new f(a,t)}}function c(a,t,e){const r=t.getEffect(a)+e.getEffect(a);return p(r)}class f extends s{constructor(t,e){super(r=>c(r,t,e))}}export{S as a,D as g};