(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=i(r);fetch(r.href,s)}})();function y(){}function ve(t){return t()}function _e(){return Object.create(null)}function G(t){t.forEach(ve)}function xe(t){return typeof t=="function"}function V(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let K;function oe(t,e){return K||(K=document.createElement("a")),K.href=e,t===K.href}function Ae(t){return Object.keys(t).length===0}function Ne(t,...e){if(t==null)return y;const i=t.subscribe(...e);return i.unsubscribe?()=>i.unsubscribe():i}function Z(t,e,i){t.$$.on_destroy.push(Ne(e,i))}function j(t,e){t.appendChild(e)}function p(t,e,i){t.insertBefore(e,i||null)}function m(t){t.parentNode&&t.parentNode.removeChild(t)}function b(t){return document.createElement(t)}function I(t){return document.createTextNode(t)}function w(){return I(" ")}function $e(t,e,i,n){return t.addEventListener(e,i,n),()=>t.removeEventListener(e,i,n)}function E(t,e,i){i==null?t.removeAttribute(e):t.getAttribute(e)!==i&&t.setAttribute(e,i)}function je(t){return Array.from(t.childNodes)}function J(t,e){e=""+e,t.data!==e&&(t.data=e)}function M(t,e,i,n){i===null?t.style.removeProperty(e):t.style.setProperty(e,i,n?"important":"")}let Q;function U(t){Q=t}function Ie(){if(!Q)throw new Error("Function called outside component initialization");return Q}function Ve(t){Ie().$$.on_destroy.push(t)}const q=[],be=[];let B=[];const ge=[],Me=Promise.resolve();let le=!1;function Le(){le||(le=!0,Me.then(he))}function fe(t){B.push(t)}const re=new Set;let R=0;function he(){if(R!==0)return;const t=Q;do{try{for(;R<q.length;){const e=q[R];R++,U(e),Ce(e.$$)}}catch(e){throw q.length=0,R=0,e}for(U(null),q.length=0,R=0;be.length;)be.pop()();for(let e=0;e<B.length;e+=1){const i=B[e];re.has(i)||(re.add(i),i())}B.length=0}while(q.length);for(;ge.length;)ge.pop()();le=!1,re.clear(),U(t)}function Ce(t){if(t.fragment!==null){t.update(),G(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(fe)}}function Oe(t){const e=[],i=[];B.forEach(n=>t.indexOf(n)===-1?e.push(n):i.push(n)),i.forEach(n=>n()),B=e}const X=new Set;let O;function ze(){O={r:0,c:[],p:O}}function He(){O.r||G(O.c),O=O.p}function x(t,e){t&&t.i&&(X.delete(t),t.i(e))}function k(t,e,i,n){if(t&&t.o){if(X.has(t))return;X.add(t),O.c.push(()=>{X.delete(t),n&&(i&&t.d(1),n())}),t.o(e)}else n&&n()}function N(t){t&&t.c()}function P(t,e,i,n){const{fragment:r,after_update:s}=t.$$;r&&r.m(e,i),n||fe(()=>{const a=t.$$.on_mount.map(ve).filter(xe);t.$$.on_destroy?t.$$.on_destroy.push(...a):G(a),t.$$.on_mount=[]}),s.forEach(fe)}function A(t,e){const i=t.$$;i.fragment!==null&&(Oe(i.after_update),G(i.on_destroy),i.fragment&&i.fragment.d(e),i.on_destroy=i.fragment=null,i.ctx=[])}function Re(t,e){t.$$.dirty[0]===-1&&(q.push(t),Le(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function L(t,e,i,n,r,s,a,o=[-1]){const d=Q;U(t);const f=t.$$={fragment:null,ctx:[],props:s,update:y,not_equal:r,bound:_e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(d?d.$$.context:[])),callbacks:_e(),dirty:o,skip_bound:!1,root:e.target||d.$$.root};a&&a(f.root);let g=!1;if(f.ctx=i?i(t,e.props||{},(c,$,...v)=>{const u=v.length?v[0]:$;return f.ctx&&r(f.ctx[c],f.ctx[c]=u)&&(!f.skip_bound&&f.bound[c]&&f.bound[c](u),g&&Re(t,c)),$}):[],f.update(),g=!0,G(f.before_update),f.fragment=n?n(f.ctx):!1,e.target){if(e.hydrate){const c=je(e.target);f.fragment&&f.fragment.l(c),c.forEach(m)}else f.fragment&&f.fragment.c();e.intro&&x(t.$$.fragment),P(t,e.target,e.anchor,e.customElement),he()}U(d)}class C{$destroy(){A(this,1),this.$destroy=y}$on(e,i){if(!xe(i))return y;const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(i),()=>{const r=n.indexOf(i);r!==-1&&n.splice(r,1)}}$set(e){this.$$set&&!Ae(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const T=[];function Se(t,e=y){let i;const n=new Set;function r(o){if(V(t,o)&&(t=o,i)){const d=!T.length;for(const f of n)f[1](),T.push(f,t);if(d){for(let f=0;f<T.length;f+=2)T[f][0](T[f+1]);T.length=0}}}function s(o){r(o(t))}function a(o,d=y){const f=[o,d];return n.add(f),n.size===1&&(i=e(r)||y),o(t),()=>{n.delete(f),n.size===0&&i&&(i(),i=null)}}return{set:r,update:s,subscribe:a}}let ye=0;function we(){W.set({name:void 0,email:void 0,loggedIn:!1,confirmed:!1,grade:void 0})}let W=Se({confirmed:!1,name:void 0,email:void 0,loggedIn:!1,grade:void 0}),ke;const Te=W.subscribe(t=>{ke=t.confirmed});function Ee(){ye=window.innerWidth,console.log("doing something"),ke&&(ye<800?D.set({width:0,display:"none"}):D.set({width:15,display:"block"}))}window.addEventListener("resize",Ee);let D=Se({width:15,display:"none"});const qe=3,Be=1.5,F="rgba(255, 218, 26, 1)",Je="rgb(248, 72, 72)",We="rgb(101, 255, 144)",ue=.3,ce="outline-color:"+F+";outline-width: "+ue+"em;outline-style: solid;";function Fe(t){let e,i;return{c(){e=b("h2"),i=I(t[0]),M(e,"color",F),M(e,"font-size",Be+"em")},m(n,r){p(n,e,r),j(e,i)},p(n,[r]){r&1&&J(i,n[0])},i:y,o:y,d(n){n&&m(e)}}}function Ge(t,e,i){let{text:n}=e;return t.$$set=r=>{"text"in r&&i(0,n=r.text)},[n]}class de extends C{constructor(e){super(),L(this,e,Ge,Fe,V,{text:0})}}function Ue(t){let e,i;return{c(){e=b("h1"),i=I(t[0]),M(e,"color",F),M(e,"font-size",qe+"em")},m(n,r){p(n,e,r),j(e,i)},p(n,[r]){r&1&&J(i,n[0])},i:y,o:y,d(n){n&&m(e)}}}function Qe(t,e,i){let{text:n}=e;return t.$$set=r=>{"text"in r&&i(0,n=r.text)},[n]}class ae extends C{constructor(e){super(),L(this,e,Qe,Ue,V,{text:0})}}function De(t){let e,i,n,r,s,a;return{c(){e=b("script"),n=w(),r=b("div"),s=w(),a=b("div"),a.innerHTML='<div class="g_id_signin svelte-3508yz" data-type="standard">No Internet Connection</div>',oe(e.src,i="https://accounts.google.com/gsi/client")||E(e,"src",i),e.async=!0,e.defer=!0,E(r,"id","g_id_onload"),E(r,"data-client_id","341767156528-fs4h69iujkab2cu04tvrr0jeafb3gk2o.apps.googleusercontent.com"),E(r,"data-callback","handleCredentialResponse"),E(a,"class","parent_container svelte-3508yz")},m(o,d){j(document.head,e),p(o,n,d),p(o,r,d),p(o,s,d),p(o,a,d)},p:y,i:y,o:y,d(o){m(e),o&&m(n),o&&m(r),o&&m(s),o&&m(a)}}}function Ke(t){let i=t.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=decodeURIComponent(atob(i).split("").map(function(r){return"%"+("00"+r.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(n)}function Ye(t){return globalThis.handleCredentialResponse=e=>{console.log("START");let i=Ke(e.credential);W.update(n=>({...n,email:i.email,name:i.name,loggedIn:!0,grade:2025})),console.log("ID: "+i.sub),console.log("Full Name: "+i.name),console.log("Given Name: "+i.given_name),console.log("Family Name: "+i.family_name),console.log("Image URL: "+i.picture),console.log("Email: "+i.email)},[]}class Xe extends C{constructor(e){super(),L(this,e,Ye,De,V,{})}}function Ze(t){let e,i,n;return{c(){e=b("div"),i=I("sdfsd"),E(e,"id","sidebar"),E(e,"style",n=ce+" color: "+F+"; margin-top: "+ue+"em; width: "+t[0].width+"em; display: "+t[0].display+";"),E(e,"class","svelte-147fut2")},m(r,s){p(r,e,s),j(e,i)},p(r,[s]){s&1&&n!==(n=ce+" color: "+F+"; margin-top: "+ue+"em; width: "+r[0].width+"em; display: "+r[0].display+";")&&E(e,"style",n)},i:y,o:y,d(r){r&&m(e)}}}function et(t,e,i){let n;return Z(t,D,r=>i(0,n=r)),[n]}class tt extends C{constructor(e){super(),L(this,e,et,Ze,V,{})}}function nt(t){let e,i,n=t[0]()+"",r;return{c(){e=b("div"),i=b("div"),r=I(n),M(i,"color",F),E(e,"style",ce),E(e,"id","box"),E(e,"class","svelte-un4myj")},m(s,a){p(s,e,a),j(e,i),j(i,r)},p(s,[a]){a&1&&n!==(n=s[0]()+"")&&J(r,n)},i:y,o:y,d(s){s&&m(e)}}}function it(t,e,i){let n,r;return Z(t,W,s=>i(1,r=s)),t.$$.update=()=>{t.$$.dirty&2&&i(0,n=()=>r.confirmed?r.name:"Login")},[n,r]}class rt extends C{constructor(e){super(),L(this,e,it,nt,V,{})}}function st(t){let e,i,n,r=t[0].name+"",s,a,o,d,f,g,c,$,v;return{c(){e=b("div"),i=b("div"),n=b("h3"),s=I(r),a=w(),o=b("br"),d=w(),f=b("iframe"),c=w(),$=b("br"),v=b("br"),E(f,"title","candidate video"),oe(f.src,g=t[0].video)||E(f,"src",g),E(f,"width","100%"),E(i,"id","box"),E(i,"class","svelte-10wgibn"),E(e,"class","parent_container svelte-10wgibn")},m(u,l){p(u,e,l),j(e,i),j(i,n),j(n,s),j(i,a),j(i,o),j(i,d),j(i,f),p(u,c,l),p(u,$,l),p(u,v,l)},p(u,[l]){l&1&&r!==(r=u[0].name+"")&&J(s,r),l&1&&!oe(f.src,g=u[0].video)&&E(f,"src",g)},i:y,o:y,d(u){u&&m(e),u&&m(c),u&&m($),u&&m(v)}}}function ot(t,e,i){let{candidate:n={name:"First Last",video:"https://drive.google.com/file/d/13R1MQjMNP0gJHvmVu4mwASH-jsqa3dVE/preview",platform:`Platform 1
Platform 2
Platform 3`}}=e;return t.$$set=r=>{"candidate"in r&&i(0,n=r.candidate)},[n]}class se extends C{constructor(e){super(),L(this,e,ot,st,V,{candidate:0})}}function lt(t){let e,i,n,r,s,a,o,d,f,g;return e=new de({props:{text:t[0]}}),n=new se({props:{candidate:{name:"Julia Koltev",video:"https://drive.google.com/file/d/13R1MQjMNP0gJHvmVu4mwASH-jsqa3dVE/view?usp=share_link",platform:"hi"}}}),s=new se({props:{candidate:{name:"Victoria Mo",video:"https://drive.google.com/file/d/13R1MQjMNP0gJHvmVu4mwASH-jsqa3dVE/view?usp=share_link",platform:"hi"}}}),o=new se({props:{candidate:{name:"Veronica Wang",video:"https://drive.google.com/file/d/13R1MQjMNP0gJHvmVu4mwASH-jsqa3dVE/view?usp=share_link",platform:"hi"}}}),{c(){N(e.$$.fragment),i=w(),N(n.$$.fragment),r=w(),N(s.$$.fragment),a=w(),N(o.$$.fragment),d=w(),f=b("br")},m(c,$){P(e,c,$),p(c,i,$),P(n,c,$),p(c,r,$),P(s,c,$),p(c,a,$),P(o,c,$),p(c,d,$),p(c,f,$),g=!0},p(c,[$]){const v={};$&1&&(v.text=c[0]),e.$set(v)},i(c){g||(x(e.$$.fragment,c),x(n.$$.fragment,c),x(s.$$.fragment,c),x(o.$$.fragment,c),g=!0)},o(c){k(e.$$.fragment,c),k(n.$$.fragment,c),k(s.$$.fragment,c),k(o.$$.fragment,c),g=!1},d(c){A(e,c),c&&m(i),A(n,c),c&&m(r),A(s,c),c&&m(a),A(o,c),c&&m(d),c&&m(f)}}}function ft(t,e,i){let{position:n}=e;return t.$$set=r=>{"position"in r&&i(0,n=r.position)},[n]}class Y extends C{constructor(e){super(),L(this,e,ft,lt,V,{position:0})}}function ut(t){let e,i,n,r,s,a,o,d,f,g,c,$,v,u;return e=new ae({props:{text:t[0]()}}),n=new Y({props:{position:"President"}}),a=new Y({props:{position:"Vice President"}}),f=new Y({props:{position:"Secretary"}}),$=new Y({props:{position:"Treasury"}}),{c(){N(e.$$.fragment),i=w(),N(n.$$.fragment),r=b("br"),s=w(),N(a.$$.fragment),o=b("br"),d=w(),N(f.$$.fragment),g=b("br"),c=w(),N($.$$.fragment),v=b("br")},m(l,h){P(e,l,h),p(l,i,h),P(n,l,h),p(l,r,h),p(l,s,h),P(a,l,h),p(l,o,h),p(l,d,h),P(f,l,h),p(l,g,h),p(l,c,h),P($,l,h),p(l,v,h),u=!0},p:y,i(l){u||(x(e.$$.fragment,l),x(n.$$.fragment,l),x(a.$$.fragment,l),x(f.$$.fragment,l),x($.$$.fragment,l),u=!0)},o(l){k(e.$$.fragment,l),k(n.$$.fragment,l),k(a.$$.fragment,l),k(f.$$.fragment,l),k($.$$.fragment,l),u=!1},d(l){A(e,l),l&&m(i),A(n,l),l&&m(r),l&&m(s),A(a,l),l&&m(o),l&&m(d),A(f,l),l&&m(g),l&&m(c),A($,l),l&&m(v)}}}function ct(t,e,i){let{grade:n}=e;function r(){return n=="Whole School"?"Whole School":"Class of "+n}return t.$$set=s=>{"grade"in s&&i(1,n=s.grade)},[r,n]}class Pe extends C{constructor(e){super(),L(this,e,ct,ut,V,{grade:1})}}function dt(t){let e;return{c(){e=I("Something went wrong :/")},m(i,n){p(i,e,n)},p:y,i:y,o:y,d(i){i&&m(e)}}}function at(t){let e,i;return e=new Pe({props:{grade:"Whole School"}}),{c(){N(e.$$.fragment)},m(n,r){P(e,n,r),i=!0},p:y,i(n){i||(x(e.$$.fragment,n),i=!0)},o(n){k(e.$$.fragment,n),i=!1},d(n){A(e,n)}}}function mt(t){let e,i;return e=new Pe({props:{grade:t[0].grade}}),{c(){N(e.$$.fragment)},m(n,r){P(e,n,r),i=!0},p(n,r){const s={};r&1&&(s.grade=n[0].grade),e.$set(s)},i(n){i||(x(e.$$.fragment,n),i=!0)},o(n){k(e.$$.fragment,n),i=!1},d(n){A(e,n)}}}function pt(t){let e,i,n,r,s,a,o=t[0].name+"",d,f,g,c,$=t[0].email+"",v,u,l,h,ee,te,ne,z,me,H,ie,pe;return e=new ae({props:{text:"SGA Voting App"}}),n=new de({props:{text:"Poolesville High School"}}),{c(){N(e.$$.fragment),i=w(),N(n.$$.fragment),r=I(`\r
      Is this u? \r
      `),s=b("br"),a=I(" NAME: "),d=I(o),f=w(),g=b("br"),c=I("EMAIL: "),v=I($),u=w(),l=b("button"),h=I("NO!!"),ee=w(),te=b("br"),ne=w(),z=b("button"),me=I("YES!!"),M(l,"background-color",Je),M(z,"background-color",We)},m(_,S){P(e,_,S),p(_,i,S),P(n,_,S),p(_,r,S),p(_,s,S),p(_,a,S),p(_,d,S),p(_,f,S),p(_,g,S),p(_,c,S),p(_,v,S),p(_,u,S),p(_,l,S),j(l,h),p(_,ee,S),p(_,te,S),p(_,ne,S),p(_,z,S),j(z,me),H=!0,ie||(pe=[$e(l,"click",t[3]),$e(z,"click",t[4])],ie=!0)},p(_,S){(!H||S&1)&&o!==(o=_[0].name+"")&&J(d,o),(!H||S&1)&&$!==($=_[0].email+"")&&J(v,$)},i(_){H||(x(e.$$.fragment,_),x(n.$$.fragment,_),H=!0)},o(_){k(e.$$.fragment,_),k(n.$$.fragment,_),H=!1},d(_){A(e,_),_&&m(i),A(n,_),_&&m(r),_&&m(s),_&&m(a),_&&m(d),_&&m(f),_&&m(g),_&&m(c),_&&m(v),_&&m(u),_&&m(l),_&&m(ee),_&&m(te),_&&m(ne),_&&m(z),ie=!1,G(pe)}}}function _t(t){let e,i,n,r,s,a;return e=new ae({props:{text:"SGA Voting App"}}),n=new de({props:{text:"Poolesville High School"}}),s=new Xe({}),{c(){N(e.$$.fragment),i=w(),N(n.$$.fragment),r=w(),N(s.$$.fragment)},m(o,d){P(e,o,d),p(o,i,d),P(n,o,d),p(o,r,d),P(s,o,d),a=!0},p:y,i(o){a||(x(e.$$.fragment,o),x(n.$$.fragment,o),x(s.$$.fragment,o),a=!0)},o(o){k(e.$$.fragment,o),k(n.$$.fragment,o),k(s.$$.fragment,o),a=!1},d(o){A(e,o),o&&m(i),A(n,o),o&&m(r),A(s,o)}}}function $t(t){let e,i,n,r,s,a,o,d,f,g;e=new rt({}),n=new tt({});const c=[_t,pt,mt,at,dt],$=[];function v(u,l){return u[0].loggedIn?u[0].loggedIn&&!u[0].confirmed?1:2:0}return d=v(t),f=$[d]=c[d](t),{c(){N(e.$$.fragment),i=w(),N(n.$$.fragment),r=w(),s=b("br"),a=w(),o=b("main"),f.c(),M(o,"margin-left",t[2]+"em")},m(u,l){P(e,u,l),p(u,i,l),P(n,u,l),p(u,r,l),p(u,s,l),p(u,a,l),p(u,o,l),$[d].m(o,null),g=!0},p(u,[l]){let h=d;d=v(u),d===h?$[d].p(u,l):(ze(),k($[h],1,1,()=>{$[h]=null}),He(),f=$[d],f?f.p(u,l):(f=$[d]=c[d](u),f.c()),x(f,1),f.m(o,null)),(!g||l&4)&&M(o,"margin-left",u[2]+"em")},i(u){g||(x(e.$$.fragment,u),x(n.$$.fragment,u),x(f),g=!0)},o(u){k(e.$$.fragment,u),k(n.$$.fragment,u),k(f),g=!1},d(u){A(e,u),u&&m(i),A(n,u),u&&m(r),u&&m(s),u&&m(a),u&&m(o),$[d].d()}}}function bt(t,e,i){let n,r;Z(t,W,d=>i(0,n=d)),Z(t,D,d=>i(1,r=d)),Ve(Te);let s;const a=()=>{we()},o=()=>{W.update(d=>({...d,confirmed:!0})),D.set({display:"block",width:r.width}),Ee()};return t.$$.update=()=>{t.$$.dirty&2&&(r.display=="block"?i(2,s=r.width):i(2,s=0)),t.$$.dirty&1&&n.loggedIn&&(window.onbeforeunload=we)},[n,r,s,a,o]}class gt extends C{constructor(e){super(),L(this,e,bt,$t,V,{})}}new gt({target:document.getElementById("app")});
