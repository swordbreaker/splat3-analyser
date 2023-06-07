import{P as g,E as P,S as f}from"./AbilitySelector-0844a414.js";import{g as w}from"./weapons-0e9b8fd6.js";import{l as h}from"./player-56b13be2.js";import{a as D}from"./superJump-d34d4c8a.js";import{A as M}from"./AbilityWithWeaponSelection-1aee3217.js";import{d as s,r as u,a as S,b as m,F as b,o as l}from"./index-e676222a.js";function v(e,t){const a=((e.Mid-e.Low)/e.High-17.8/e.High)/(17.8/e.High*(17.8/e.High+-1)),o=t/e.High*(t/e.High*a+(1-a));return Math.floor(e.Low+(e.High-e.Low)*o)}async function G(e){const a=(await e.getSubWeaponInfo()).params;switch(e.SubWeaponId.replace("_","")){case"Beacon":return await U(a);case"LineMarker":return H(a);case"PointSensor":return L(a);case"PoisonMist":return W(a);case"Sprinkler":return C(a);case"Trap":return E(a);case"BombTorpedo":return F(a);case"BombSuction":return Z(a);case"BombSplash":return A(a);case"BombRobot":return y(a);case"BombQuick":return B(a);case"BombFizzy":return T(a);case"BombCurling":return _(a);default:return[]}}async function U(e){const a=(await h()).GameParameters.spl__PlayerBeaconSubSpecUpParam.SubSpecUpParam,o=await D(),p={High:a.High,Mid:a.Mid,Low:0},i=new g(n=>v(p,n));return console.log(e.GameParameters.MoveParam.SpawnSpeedZSpecUp),[{title:"Additional Quick Superjump AP",data:i},{title:"Jump time with no Quick Super Jump",data:i.mapSimple(n=>o.data.getEffect(n))}]}function _(e){return r([{title:"Throw Speed",params:e.GameParameters.MoveParam.SpawnSpeedZSpecUp}])}function T(e){return r([{title:"Throw Speed",params:e.GameParameters.MoveParam.SpawnSpeedZSpecUp}])}function B(e){return r([{title:"Throw Speed",params:e.GameParameters.MoveParam.SpawnSpeedZSpecUp}])}function y(e){return r([{title:"Throw Speed",params:e.GameParameters.MoveParam.SpawnSpeedZSpecUp}])}function A(e){return r([{title:"Throw Speed",params:e.GameParameters.MoveParam.SpawnSpeedZSpecUp}])}function Z(e){return r([{title:"Throw Speed",params:e.GameParameters.MoveParam.SpawnSpeedZSpecUp}])}function F(e){return r([{title:"Throw Speed",params:e.GameParameters.MoveParam.SpawnSpeedZSpecUp}])}function H(e){return r([{title:"Marking Duration",params:e.GameParameters.MoveParam.SpawnSpeedZSpecUp},{title:"Throw Speed",params:e.GameParameters.MoveParam.MarkingFrame}])}function L(e){return console.log(e.GameParameters.MoveParam.MarkingFrameSubSpec),r([{title:"Marking Duration",params:e.GameParameters.MoveParam.SpawnSpeedZSpecUp},{title:"Throw Speed",params:e.GameParameters.MoveParam.MarkingFrameSubSpec}])}function W(e){return r([{title:"Throw Speed",params:e.GameParameters.MoveParam.SpawnSpeedZSpecUp}])}function C(e){return r([{title:"Duration First Phase",params:e.GameParameters.MoveParam.PeriodFirst},{title:"Duration Second Phase",params:e.GameParameters.MoveParam.PeriodSecond}])}function E(e){return r([{title:"Detection Radius",params:e.GameParameters.AreaParam.Distance},{title:"Marking Duration",params:e.GameParameters.AreaParam.MarkingFrameSubSpec},{title:"Damage Distance Rate",params:e.GameParameters.MoveParam.SensorRadius},{title:"Sensor Radius",params:e.GameParameters.BlastParam.SubSpecialSpecUpList[0].Value}])}function r(e){return e.map(t=>({title:t.title,data:new P(I(t.params))}))}function I(e){return[e.High,e.Mid,e.Low]}const R="SubSpec_Up.png",k=s({__name:"SubPowerUp",props:{weapon:{}},setup(e){const t=e,a=u([]),o=u(0);t.weapon!=null&&w(t.weapon).then(n=>p(n));async function p(n){if(n!=null){const c=await G(n);a.value=c}else a.value=[]}function i(n){o.value=n}return(n,c)=>{const d=f;return l(),S(b,null,[m(M,{weapon:t.weapon,"ability-img":R,"effect-name":"subPowerUp",onWeaponChanged:p,onApChanged:i},null,8,["weapon"]),m(d,{stats:a.value,ap:o.value},null,8,["stats","ap"])],64)}}}),N=s({__name:"SubPowerUp",props:{weapon:String},setup(e){const t=e;return(a,o)=>(l(),S("main",null,[m(k,{weapon:t.weapon},null,8,["weapon"])]))}});export{N as default};