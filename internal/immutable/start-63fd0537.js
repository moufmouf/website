import{S as Ye,i as Xe,s as Ze,a as xe,e as B,c as Qe,b as z,g as pe,t as F,d as de,f as J,h as G,j as et,o as ke,k as tt,l as nt,m as rt,n as ve,p as q,q as at,r as st,u as ot,v as W,w as Y,x as Le,y as X,z as Z,A as Be}from"./chunks/index-65ee44c8.js";import{g as Fe,f as Je,s as K,a as Re,b as it,i as lt}from"./chunks/singletons-904fa37b.js";function ct(r,e){return r==="/"||e==="ignore"?r:e==="never"?r.endsWith("/")?r.slice(0,-1):r:e==="always"&&!r.endsWith("/")?r+"/":r}function ft(r){for(const e in r)r[e]=r[e].replace(/%23/g,"#").replace(/%3[Bb]/g,";").replace(/%2[Cc]/g,",").replace(/%2[Ff]/g,"/").replace(/%3[Ff]/g,"?").replace(/%3[Aa]/g,":").replace(/%40/g,"@").replace(/%26/g,"&").replace(/%3[Dd]/g,"=").replace(/%2[Bb]/g,"+").replace(/%24/g,"$");return r}const ut=["href","pathname","search","searchParams","toString","toJSON"];function pt(r,e){const t=new URL(r);for(const s of ut){let o=t[s];Object.defineProperty(t,s,{get(){return e(),o},enumerable:!0,configurable:!0})}return dt(t),t}function dt(r){Object.defineProperty(r,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}function ht(r){let e=5381;if(typeof r=="string"){let t=r.length;for(;t;)e=e*33^r.charCodeAt(--t)}else if(ArrayBuffer.isView(r)){const t=new Uint8Array(r.buffer,r.byteOffset,r.byteLength);let s=t.length;for(;s;)e=e*33^t[--s]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}const he=window.fetch;window.fetch=(r,e)=>{if((r instanceof Request?r.method:(e==null?void 0:e.method)||"GET")!=="GET"){const s=new URL(r instanceof Request?r.url:r.toString(),document.baseURI).href;ue.delete(s)}return he(r,e)};const ue=new Map;function mt(r,e,t){let o=`script[data-sveltekit-fetched][data-url=${JSON.stringify(r instanceof Request?r.url:r)}]`;(t==null?void 0:t.body)&&(typeof t.body=="string"||ArrayBuffer.isView(t.body))&&(o+=`[data-hash="${ht(t.body)}"]`);const c=document.querySelector(o);if(c!=null&&c.textContent){const{body:n,...l}=JSON.parse(c.textContent),h=c.getAttribute("data-ttl");return h&&ue.set(e,{body:n,init:l,ttl:1e3*Number(h)}),Promise.resolve(new Response(n,l))}return he(r,t)}function _t(r,e){const t=ue.get(r);if(t){if(performance.now()<t.ttl)return new Response(t.body,t.init);ue.delete(r)}return he(r,e)}const gt=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function yt(r){const e=[],t=[];let s=!0;return{pattern:r==="/"?/^\/$/:new RegExp(`^${bt(r).map((c,n,l)=>{const h=decodeURIComponent(c),d=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(h);if(d)return e.push(d[1]),t.push(d[2]),"(?:/(.*))?";const g=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(h);if(g)return e.push(g[1]),t.push(g[2]),"(?:/([^/]+))?";const w=n===l.length-1;return h?"/"+h.split(/\[(.+?)\](?!\])/).map((T,V)=>{if(V%2){const D=gt.exec(T);if(!D)throw new Error(`Invalid param: ${T}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,re,M,ae,x]=D;return e.push(ae),t.push(x),M?"(.*?)":re?"([^/]*)?":"([^/]+?)"}return w&&T.includes(".")&&(s=!1),T.normalize().replace(/%5[Bb]/g,"[").replace(/%5[Dd]/g,"]").replace(/#/g,"%23").replace(/\?/g,"%3F").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}).join(""):void 0}).join("")}${s?"/?":""}$`),names:e,types:t}}function wt(r){return!/^\([^)]+\)$/.test(r)}function bt(r){return r.slice(1).split("/").filter(wt)}function vt(r,e,t,s,o){const c={};let n=-1;for(let l=0;l<t.length;l+=1){const h=t[l],d=s[l];let g=r[l+1]||"";if(d){const w=o[d];if(!w)throw new Error(`Missing "${d}" param matcher`);if(n=e.indexOf(`=${d}`,n+1),!(!g&&e.lastIndexOf("[[",n)>e.lastIndexOf("[...",n))&&!w(g))return}c[h]=g}return c}function Et(r,e,t,s){const o=new Set(e);return Object.entries(t).map(([l,[h,d,g]])=>{const{pattern:w,names:S,types:U}=yt(l),T={id:l,exec:V=>{const D=w.exec(V);if(D)return vt(D,l,S,U,s)},errors:[1,...g||[]].map(V=>r[V]),layouts:[0,...d||[]].map(n),leaf:c(h)};return T.errors.length=T.layouts.length=Math.max(T.errors.length,T.layouts.length),T});function c(l){const h=l<0;return h&&(l=~l),[h,r[l]]}function n(l){return l===void 0?l:[o.has(l),r[l]]}}function kt(r){let e,t,s;var o=r[0][0];function c(n){return{props:{data:n[2],form:n[1]}}}return o&&(e=W(o,c(r))),{c(){e&&Y(e.$$.fragment),t=B()},l(n){e&&Le(e.$$.fragment,n),t=B()},m(n,l){e&&X(e,n,l),z(n,t,l),s=!0},p(n,l){const h={};if(l&4&&(h.data=n[2]),l&2&&(h.form=n[1]),o!==(o=n[0][0])){if(e){pe();const d=e;F(d.$$.fragment,1,0,()=>{Z(d,1)}),de()}o?(e=W(o,c(n)),Y(e.$$.fragment),J(e.$$.fragment,1),X(e,t.parentNode,t)):e=null}else o&&e.$set(h)},i(n){s||(e&&J(e.$$.fragment,n),s=!0)},o(n){e&&F(e.$$.fragment,n),s=!1},d(n){n&&G(t),e&&Z(e,n)}}}function Rt(r){let e,t,s;var o=r[0][0];function c(n){return{props:{data:n[2],$$slots:{default:[St]},$$scope:{ctx:n}}}}return o&&(e=W(o,c(r))),{c(){e&&Y(e.$$.fragment),t=B()},l(n){e&&Le(e.$$.fragment,n),t=B()},m(n,l){e&&X(e,n,l),z(n,t,l),s=!0},p(n,l){const h={};if(l&4&&(h.data=n[2]),l&523&&(h.$$scope={dirty:l,ctx:n}),o!==(o=n[0][0])){if(e){pe();const d=e;F(d.$$.fragment,1,0,()=>{Z(d,1)}),de()}o?(e=W(o,c(n)),Y(e.$$.fragment),J(e.$$.fragment,1),X(e,t.parentNode,t)):e=null}else o&&e.$set(h)},i(n){s||(e&&J(e.$$.fragment,n),s=!0)},o(n){e&&F(e.$$.fragment,n),s=!1},d(n){n&&G(t),e&&Z(e,n)}}}function St(r){let e,t,s;var o=r[0][1];function c(n){return{props:{data:n[3],form:n[1]}}}return o&&(e=W(o,c(r))),{c(){e&&Y(e.$$.fragment),t=B()},l(n){e&&Le(e.$$.fragment,n),t=B()},m(n,l){e&&X(e,n,l),z(n,t,l),s=!0},p(n,l){const h={};if(l&8&&(h.data=n[3]),l&2&&(h.form=n[1]),o!==(o=n[0][1])){if(e){pe();const d=e;F(d.$$.fragment,1,0,()=>{Z(d,1)}),de()}o?(e=W(o,c(n)),Y(e.$$.fragment),J(e.$$.fragment,1),X(e,t.parentNode,t)):e=null}else o&&e.$set(h)},i(n){s||(e&&J(e.$$.fragment,n),s=!0)},o(n){e&&F(e.$$.fragment,n),s=!1},d(n){n&&G(t),e&&Z(e,n)}}}function Ge(r){let e,t=r[5]&&Ke(r);return{c(){e=tt("div"),t&&t.c(),this.h()},l(s){e=nt(s,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var o=rt(e);t&&t.l(o),o.forEach(G),this.h()},h(){ve(e,"id","svelte-announcer"),ve(e,"aria-live","assertive"),ve(e,"aria-atomic","true"),q(e,"position","absolute"),q(e,"left","0"),q(e,"top","0"),q(e,"clip","rect(0 0 0 0)"),q(e,"clip-path","inset(50%)"),q(e,"overflow","hidden"),q(e,"white-space","nowrap"),q(e,"width","1px"),q(e,"height","1px")},m(s,o){z(s,e,o),t&&t.m(e,null)},p(s,o){s[5]?t?t.p(s,o):(t=Ke(s),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},d(s){s&&G(e),t&&t.d()}}}function Ke(r){let e;return{c(){e=at(r[6])},l(t){e=st(t,r[6])},m(t,s){z(t,e,s)},p(t,s){s&64&&ot(e,t[6])},d(t){t&&G(e)}}}function Ot(r){let e,t,s,o,c;const n=[Rt,kt],l=[];function h(g,w){return g[0][1]?0:1}e=h(r),t=l[e]=n[e](r);let d=r[4]&&Ge(r);return{c(){t.c(),s=xe(),d&&d.c(),o=B()},l(g){t.l(g),s=Qe(g),d&&d.l(g),o=B()},m(g,w){l[e].m(g,w),z(g,s,w),d&&d.m(g,w),z(g,o,w),c=!0},p(g,[w]){let S=e;e=h(g),e===S?l[e].p(g,w):(pe(),F(l[S],1,1,()=>{l[S]=null}),de(),t=l[e],t?t.p(g,w):(t=l[e]=n[e](g),t.c()),J(t,1),t.m(s.parentNode,s)),g[4]?d?d.p(g,w):(d=Ge(g),d.c(),d.m(o.parentNode,o)):d&&(d.d(1),d=null)},i(g){c||(J(t),c=!0)},o(g){F(t),c=!1},d(g){l[e].d(g),g&&G(s),d&&d.d(g),g&&G(o)}}}function $t(r,e,t){let{stores:s}=e,{page:o}=e,{components:c}=e,{form:n}=e,{data_0:l=null}=e,{data_1:h=null}=e;et(s.page.notify);let d=!1,g=!1,w=null;return ke(()=>{const S=s.page.subscribe(()=>{d&&(t(5,g=!0),t(6,w=document.title||"untitled page"))});return t(4,d=!0),S}),r.$$set=S=>{"stores"in S&&t(7,s=S.stores),"page"in S&&t(8,o=S.page),"components"in S&&t(0,c=S.components),"form"in S&&t(1,n=S.form),"data_0"in S&&t(2,l=S.data_0),"data_1"in S&&t(3,h=S.data_1)},r.$$.update=()=>{r.$$.dirty&384&&s.page.set(o)},[c,n,l,h,d,g,w,s,o]}class Lt extends Ye{constructor(e){super(),Xe(this,e,$t,Ot,Ze,{stores:7,page:8,components:0,form:1,data_0:2,data_1:3})}}const It=function(){const e=document.createElement("link").relList;return e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}(),jt=function(r,e){return new URL(r,e).href},ze={},ie=function(e,t,s){return!t||t.length===0?e():Promise.all(t.map(o=>{if(o=jt(o,s),o in ze)return;ze[o]=!0;const c=o.endsWith(".css"),n=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${n}`))return;const l=document.createElement("link");if(l.rel=c?"stylesheet":It,c||(l.as="script",l.crossOrigin=""),l.href=o,document.head.appendChild(l),c)return new Promise((h,d)=>{l.addEventListener("load",h),l.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>e())},At={},me=[()=>ie(()=>import("./chunks/0-e65dd09e.js"),["chunks/0-e65dd09e.js","components/layout.svelte-75531794.js","chunks/index-65ee44c8.js"],import.meta.url),()=>ie(()=>import("./chunks/1-fa8b4da5.js"),["chunks/1-fa8b4da5.js","components/error.svelte-5fe8dd98.js","chunks/index-65ee44c8.js","chunks/singletons-904fa37b.js"],import.meta.url),()=>ie(()=>import("./chunks/2-114e75b4.js"),["chunks/2-114e75b4.js","components/pages/_page.svelte-6ec4367c.js","assets/style-42fcf8bb.css","chunks/index-65ee44c8.js"],import.meta.url),()=>ie(()=>import("./chunks/3-2d634e82.js"),["chunks/3-2d634e82.js","components/pages/gen1/mint/_page.svelte-79e89a35.js","assets/style-42fcf8bb.css","chunks/index-65ee44c8.js"],import.meta.url)],Nt=[],Pt={"/":[2],"/gen1/mint":[3]},Ut={handleError:({error:r})=>{console.error(r)}};class Se{constructor(e,t){this.status=e,typeof t=="string"?this.body={message:t}:t?this.body=t:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}}class Me{constructor(e,t){this.status=e,this.location=t}}const Tt="/__data.json";async function Dt(r){var e;for(const t in r)if(typeof((e=r[t])==null?void 0:e.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(r).map(async([s,o])=>[s,await o])));return r}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");Object.getOwnPropertyNames(Object.prototype).sort().join("\0");const Vt=-1,qt=-2,Ct=-3,Bt=-4,Ft=-5,Jt=-6;function Gt(r){const e=JSON.parse(r);if(typeof e=="number")return o(e);const t=e,s=Array(t.length);function o(c){if(c===Vt)return;if(c===Ct)return NaN;if(c===Bt)return 1/0;if(c===Ft)return-1/0;if(c===Jt)return-0;if(c in s)return s[c];const n=t[c];if(!n||typeof n!="object")s[c]=n;else if(Array.isArray(n))if(typeof n[0]=="string")switch(n[0]){case"Date":s[c]=new Date(n[1]);break;case"Set":const h=new Set;s[c]=h;for(let w=1;w<n.length;w+=1)h.add(o(n[w]));break;case"Map":const d=new Map;s[c]=d;for(let w=1;w<n.length;w+=2)d.set(o(n[w]),o(n[w+1]));break;case"RegExp":s[c]=new RegExp(n[1],n[2]);break;case"Object":s[c]=Object(n[1]);break;case"BigInt":s[c]=BigInt(n[1]);break;case"null":const g=Object.create(null);s[c]=g;for(let w=1;w<n.length;w+=2)g[n[w]]=o(n[w+1]);break}else{const l=new Array(n.length);s[c]=l;for(let h=0;h<n.length;h+=1){const d=n[h];d!==qt&&(l[h]=o(d))}}else{const l={};s[c]=l;for(const h in n){const d=n[h];l[h]=o(d)}}return s[c]}return o(0)}const We="sveltekit:scroll",C="sveltekit:index",le=Et(me,Nt,Pt,At),Oe=me[0],$e=me[1];Oe();$e();let ne={};try{ne=JSON.parse(sessionStorage[We])}catch{}function Ee(r){ne[r]=Re()}function Kt({target:r,base:e,trailing_slash:t}){var Ve;const s=[];let o=null;const c={before_navigate:[],after_navigate:[]};let n={branch:[],error:null,url:null},l=!1,h=!1,d=!0,g=!1,w=!1,S,U=(Ve=history.state)==null?void 0:Ve[C];U||(U=Date.now(),history.replaceState({...history.state,[C]:U},"",location.href));const T=ne[U];T&&(history.scrollRestoration="manual",scrollTo(T.x,T.y));let V=!1,D,re,M;async function ae(){M=M||Promise.resolve(),await M,M=null;const a=new URL(location.href),u=ye(a,!0);o=null,await je(u,a,[])}async function x(a,{noscroll:u=!1,replaceState:p=!1,keepfocus:i=!1,state:f={}},m,_){return typeof a=="string"&&(a=new URL(a,Fe(document))),we({url:a,scroll:u?Re():null,keepfocus:i,redirect_chain:m,details:{state:f,replaceState:p},nav_token:_,accepted:()=>{},blocked:()=>{},type:"goto"})}async function Ie(a){const u=ye(a,!1);if(!u)throw new Error(`Attempted to prefetch a URL that does not belong to this app: ${a}`);return o={id:u.id,promise:Pe(u)},o.promise}async function je(a,u,p,i,f={},m){var k,E;re=f;let _=a&&await Pe(a);if(_||(_=await De(u,null,te(new Error(`Not found: ${u.pathname}`),{url:u,params:{},routeId:null}),404)),u=(a==null?void 0:a.url)||u,re!==f)return!1;if(_.type==="redirect")if(p.length>10||p.includes(u.pathname))_=await se({status:500,error:te(new Error("Redirect loop"),{url:u,params:{},routeId:null}),url:u,routeId:null});else return x(new URL(_.location,u).href,{},[...p,u.pathname],f),!1;else((E=(k=_.props)==null?void 0:k.page)==null?void 0:E.status)>=400&&await K.updated.check()&&await oe(u);if(s.length=0,w=!1,g=!0,i&&i.details){const{details:b}=i,v=b.replaceState?0:1;b.state[C]=U+=v,history[b.replaceState?"replaceState":"pushState"](b.state,"",u)}if(o=null,h){n=_.state,_.props.page&&(_.props.page.url=u);const b=fe();S.$set(_.props),b()}else Ae(_);if(i){const{scroll:b,keepfocus:v}=i;if(!v){const O=document.body,L=O.getAttribute("tabindex");O.tabIndex=-1,O.focus({preventScroll:!0}),setTimeout(()=>{var I;(I=getSelection())==null||I.removeAllRanges()}),L!==null?O.setAttribute("tabindex",L):O.removeAttribute("tabindex")}if(await Be(),d){const O=u.hash&&document.getElementById(u.hash.slice(1));b?scrollTo(b.x,b.y):O?O.scrollIntoView():scrollTo(0,0)}}else await Be();d=!0,_.props.page&&(D=_.props.page),m&&m(),g=!1}function Ae(a){var f,m;n=a.state;const u=document.querySelector("style[data-sveltekit]");u&&u.remove(),D=a.props.page;const p=fe();S=new Lt({target:r,props:{...a.props,stores:K},hydrate:!0}),p();const i={from:null,to:ce("to",{params:n.params,routeId:(m=(f=n.route)==null?void 0:f.id)!=null?m:null,url:new URL(location.href)}),type:"load"};c.after_navigate.forEach(_=>_(i)),h=!0}async function Q({url:a,params:u,branch:p,status:i,error:f,route:m,form:_}){var L;const k=p.filter(Boolean),E={type:"loaded",state:{url:a,params:u,branch:p,error:f,route:m},props:{components:k.map(I=>I.node.component)}};_!==void 0&&(E.props.form=_);let b={},v=!D;for(let I=0;I<k.length;I+=1){const N=k[I];b={...b,...N.data},(v||!n.branch.some(P=>P===N))&&(E.props[`data_${I}`]=b,v=v||Object.keys((L=N.data)!=null?L:{}).length>0)}if(v||(v=Object.keys(D.data).length!==Object.keys(b).length),!n.url||a.href!==n.url.href||n.error!==f||_!==void 0||v){E.props.page={error:f,params:u,routeId:m&&m.id,status:i,url:a,form:_,data:v?b:D.data};const I=(N,P)=>{Object.defineProperty(E.props.page,N,{get:()=>{throw new Error(`$page.${N} has been replaced by $page.url.${P}`)}})};I("origin","origin"),I("path","pathname"),I("query","searchParams")}return E}async function _e({loader:a,parent:u,url:p,params:i,routeId:f,server_data_node:m}){var b,v,O,L,I;let _=null;const k={dependencies:new Set,params:new Set,parent:!1,url:!1},E=await a();if((b=E.shared)!=null&&b.load){let N=function(...$){for(const y of $){const{href:R}=new URL(y,p);k.dependencies.add(R)}};const P={routeId:f,params:new Proxy(i,{get:($,y)=>(k.params.add(y),$[y])}),data:(v=m==null?void 0:m.data)!=null?v:null,url:pt(p,()=>{k.url=!0}),async fetch($,y){let R;$ instanceof Request?(R=$.url,y={body:$.method==="GET"||$.method==="HEAD"?void 0:await $.blob(),cache:$.cache,credentials:$.credentials,headers:$.headers,integrity:$.integrity,keepalive:$.keepalive,method:$.method,mode:$.mode,redirect:$.redirect,referrer:$.referrer,referrerPolicy:$.referrerPolicy,signal:$.signal,...y}):R=$;const A=new URL(R,p).href;return N(A),h?_t(A,y):mt(R,A,y)},setHeaders:()=>{},depends:N,parent(){return k.parent=!0,u()}};Object.defineProperties(P,{props:{get(){throw new Error("@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1},session:{get(){throw new Error("session is no longer available. See https://github.com/sveltejs/kit/discussions/5883")},enumerable:!1},stuff:{get(){throw new Error("@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1}}),_=(O=await E.shared.load.call(null,P))!=null?O:null,_=_?await Dt(_):null}return{node:E,loader:a,server:m,shared:(L=E.shared)!=null&&L.load?{type:"data",data:_,uses:k}:null,data:(I=_!=null?_:m==null?void 0:m.data)!=null?I:null}}function Ne(a,u,p,i){if(w)return!0;if(!p)return!1;if(p.parent&&u||p.url&&a)return!0;for(const f of p.params)if(i[f]!==n.params[f])return!0;for(const f of p.dependencies)if(s.some(m=>m(new URL(f))))return!0;return!1}function ge(a,u){var p,i;return(a==null?void 0:a.type)==="data"?{type:"data",data:a.data,uses:{dependencies:new Set((p=a.uses.dependencies)!=null?p:[]),params:new Set((i=a.uses.params)!=null?i:[]),parent:!!a.uses.parent,url:!!a.uses.url}}:(a==null?void 0:a.type)==="skip"&&u!=null?u:null}async function Pe({id:a,invalidating:u,url:p,params:i,route:f}){var $;if((o==null?void 0:o.id)===a)return o.promise;const{errors:m,layouts:_,leaf:k}=f,E=[..._,k];m.forEach(y=>y==null?void 0:y().catch(()=>{})),E.forEach(y=>y==null?void 0:y[1]().catch(()=>{}));let b=null;const v=n.url?a!==n.url.pathname+n.url.search:!1,O=E.reduce((y,R,A)=>{var ee;const j=n.branch[A],H=!!(R!=null&&R[0])&&((j==null?void 0:j.loader)!==R[1]||Ne(v,y.some(Boolean),(ee=j.server)==null?void 0:ee.uses,i));return y.push(H),y},[]);if(O.some(Boolean)){try{b=await He(p,O)}catch(y){return se({status:500,error:te(y,{url:p,params:i,routeId:f.id}),url:p,routeId:f.id})}if(b.type==="redirect")return b}const L=b==null?void 0:b.nodes;let I=!1;const N=E.map(async(y,R)=>{var ee;if(!y)return;const A=n.branch[R],j=L==null?void 0:L[R];if((!j||j.type==="skip")&&y[1]===(A==null?void 0:A.loader)&&!Ne(v,I,(ee=A.shared)==null?void 0:ee.uses,i))return A;if(I=!0,(j==null?void 0:j.type)==="error")throw j;return _e({loader:y[1],url:p,params:i,routeId:f.id,parent:async()=>{var Ce;const qe={};for(let be=0;be<R;be+=1)Object.assign(qe,(Ce=await N[be])==null?void 0:Ce.data);return qe},server_data_node:ge(j===void 0&&y[0]?{type:"skip"}:j!=null?j:null,A==null?void 0:A.server)})});for(const y of N)y.catch(()=>{});const P=[];for(let y=0;y<E.length;y+=1)if(E[y])try{P.push(await N[y])}catch(R){if(R instanceof Me)return{type:"redirect",location:R.location};let A=500,j;L!=null&&L.includes(R)?(A=($=R.status)!=null?$:A,j=R.error):R instanceof Se?(A=R.status,j=R.body):j=te(R,{params:i,url:p,routeId:f.id});const H=await Ue(y,P,m);return H?await Q({url:p,params:i,branch:P.slice(0,H.idx).concat(H.node),status:A,error:j,route:f}):await De(p,f.id,j,A)}else P.push(void 0);return await Q({url:p,params:i,branch:P,status:200,error:null,route:f,form:u?void 0:null})}async function Ue(a,u,p){for(;a--;)if(p[a]){let i=a;for(;!u[i];)i-=1;try{return{idx:i+1,node:{node:await p[a](),loader:p[a],data:{},server:null,shared:null}}}catch{continue}}}async function se({status:a,error:u,url:p,routeId:i}){var b;const f={},m=await Oe();let _=null;if(m.server)try{const v=await He(p,[!0]);if(v.type!=="data"||v.nodes[0]&&v.nodes[0].type!=="data")throw 0;_=(b=v.nodes[0])!=null?b:null}catch{(p.origin!==location.origin||p.pathname!==location.pathname||l)&&await oe(p)}const k=await _e({loader:Oe,url:p,params:f,routeId:i,parent:()=>Promise.resolve({}),server_data_node:ge(_)}),E={node:await $e(),loader:$e,shared:null,server:null,data:null};return await Q({url:p,params:f,branch:[k,E],status:a,error:u,route:null})}function ye(a,u){if(Te(a))return;const p=decodeURI(a.pathname.slice(e.length)||"/");for(const i of le){const f=i.exec(p);if(f){const m=new URL(a.origin+ct(a.pathname,t)+a.search+a.hash);return{id:m.pathname+m.search,invalidating:u,route:i,params:ft(f),url:m}}}}function Te(a){return a.origin!==location.origin||!a.pathname.startsWith(e)}async function we({url:a,scroll:u,keepfocus:p,redirect_chain:i,details:f,type:m,delta:_,nav_token:k,accepted:E,blocked:b}){var N,P,$,y;let v=!1;const O=ye(a,!1),L={from:ce("from",{params:n.params,routeId:(P=(N=n.route)==null?void 0:N.id)!=null?P:null,url:n.url}),to:ce("to",{params:($=O==null?void 0:O.params)!=null?$:null,routeId:(y=O==null?void 0:O.route.id)!=null?y:null,url:a}),type:m};_!==void 0&&(L.delta=_);const I={...L,cancel:()=>{v=!0}};if(c.before_navigate.forEach(R=>R(I)),v){b();return}Ee(U),E(),h&&K.navigating.set(L),await je(O,a,i,{scroll:u,keepfocus:p,details:f},k,()=>{c.after_navigate.forEach(R=>R(L)),K.navigating.set(null)})}async function De(a,u,p,i){return a.origin===location.origin&&a.pathname===location.pathname&&!l?await se({status:i,error:p,url:a,routeId:u}):await oe(a)}function oe(a){return location.href=a.href,new Promise(()=>{})}return{after_navigate:a=>{ke(()=>(c.after_navigate.push(a),()=>{const u=c.after_navigate.indexOf(a);c.after_navigate.splice(u,1)}))},before_navigate:a=>{ke(()=>(c.before_navigate.push(a),()=>{const u=c.before_navigate.indexOf(a);c.before_navigate.splice(u,1)}))},disable_scroll_handling:()=>{(g||!h)&&(d=!1)},goto:(a,u={})=>x(a,u,[]),invalidate:a=>{if(a===void 0)throw new Error("`invalidate()` (with no arguments) has been replaced by `invalidateAll()`");if(typeof a=="function")s.push(a);else{const{href:u}=new URL(a,location.href);s.push(p=>p.href===u)}return ae()},invalidateAll:()=>(w=!0,ae()),prefetch:async a=>{const u=new URL(a,Fe(document));await Ie(u)},prefetch_routes:async a=>{const p=(a?le.filter(i=>a.some(f=>i.exec(f))):le).map(i=>Promise.all([...i.layouts,i.leaf].map(f=>f==null?void 0:f[1]())));await Promise.all(p)},apply_action:async a=>{if(a.type==="error"){const u=new URL(location.href),{branch:p,route:i}=n;if(!i)return;const f=await Ue(n.branch.length,p,i.errors);if(f){const m=await Q({url:u,params:n.params,branch:p.slice(0,f.idx).concat(f.node),status:500,error:a.error,route:i});n=m.state;const _=fe();S.$set(m.props),_()}}else if(a.type==="redirect")x(a.location,{},[]);else{const u={form:a.data,page:{...D,form:a.data,status:a.status}},p=fe();S.$set(u),p()}},_start_router:()=>{history.scrollRestoration="manual",addEventListener("beforeunload",i=>{var _,k;let f=!1;const m={from:ce("from",{params:n.params,routeId:(k=(_=n.route)==null?void 0:_.id)!=null?k:null,url:n.url}),to:null,type:"unload",cancel:()=>f=!0};c.before_navigate.forEach(E=>E(m)),f?(i.preventDefault(),i.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){Ee(U);try{sessionStorage[We]=JSON.stringify(ne)}catch{}}});const a=i=>{const{url:f,options:m}=Je(i);if(f&&m.prefetch){if(Te(f))return;Ie(f)}};let u;const p=i=>{clearTimeout(u),u=setTimeout(()=>{var f;(f=i.target)==null||f.dispatchEvent(new CustomEvent("sveltekit:trigger_prefetch",{bubbles:!0}))},20)};addEventListener("touchstart",a),addEventListener("mousemove",p),addEventListener("sveltekit:trigger_prefetch",a),addEventListener("click",i=>{if(i.button||i.which!==1||i.metaKey||i.ctrlKey||i.shiftKey||i.altKey||i.defaultPrevented)return;const{a:f,url:m,options:_}=Je(i);if(!f||!m)return;const k=f instanceof SVGAElement;if(!k&&m.protocol!==location.protocol&&!(m.protocol==="https:"||m.protocol==="http:"))return;const E=(f.getAttribute("rel")||"").split(/\s+/);if(f.hasAttribute("download")||E.includes("external")||_.reload||(k?f.target.baseVal:f.target))return;const[b,v]=m.href.split("#");if(v!==void 0&&b===location.href.split("#")[0]){V=!0,Ee(U),n.url=m,K.page.set({...D,url:m}),K.page.notify();return}we({url:m,scroll:_.noscroll?Re():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:m.href===location.href},accepted:()=>i.preventDefault(),blocked:()=>i.preventDefault(),type:"link"})}),addEventListener("popstate",i=>{if(i.state){if(i.state[C]===U)return;const f=i.state[C]-U;we({url:new URL(location.href),scroll:ne[i.state[C]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{U=i.state[C]},blocked:()=>{history.go(-f)},type:"popstate",delta:f})}}),addEventListener("hashchange",()=>{V&&(V=!1,history.replaceState({...history.state,[C]:++U},"",location.href))});for(const i of document.querySelectorAll("link"))i.rel==="icon"&&(i.href=i.href);addEventListener("pageshow",i=>{i.persisted&&K.navigating.set(null)})},_hydrate:async({status:a,error:u,node_ids:p,params:i,routeId:f,data:m,form:_})=>{var b;l=!0;const k=new URL(location.href);let E;try{const v=p.map(async(O,L)=>{const I=m[L];return _e({loader:me[O],url:k,params:i,routeId:f,parent:async()=>{const N={};for(let P=0;P<L;P+=1)Object.assign(N,(await v[P]).data);return N},server_data_node:ge(I)})});E=await Q({url:k,params:i,branch:await Promise.all(v),status:a,error:u,form:_,route:(b=le.find(O=>O.id===f))!=null?b:null})}catch(v){if(v instanceof Me){await oe(new URL(v.location,location.href));return}E=await se({status:v instanceof Se?v.status:500,error:te(v,{url:k,params:i,routeId:f}),url:k,routeId:f})}Ae(E)}}}async function He(r,e){const t=new URL(r);t.pathname=r.pathname.replace(/\/$/,"")+Tt;const s=await he(t.href,{headers:{"x-sveltekit-invalidated":e.map(c=>c?"1":"").join(",")}}),o=await s.text();if(!s.ok)throw new Error(JSON.parse(o));return Gt(o)}function te(r,e){var t;return r instanceof Se?r.body:(t=Ut.handleError({error:r,event:e}))!=null?t:{message:e.routeId!=null?"Internal Error":"Not Found"}}const zt=["hash","href","host","hostname","origin","pathname","port","protocol","search","searchParams","toString","toJSON"];function ce(r,e){for(const t of zt)Object.defineProperty(e,t,{get(){throw new Error(`The navigation shape changed - ${r}.${t} should now be ${r}.url.${t}`)},enumerable:!1});return e}function fe(){return()=>{}}async function Wt({env:r,hydrate:e,paths:t,target:s,trailing_slash:o}){it(t);const c=Kt({target:s,base:t.base,trailing_slash:o});lt({client:c}),e?await c._hydrate(e):c.goto(location.href,{replaceState:!0}),c._start_router()}export{Wt as start};
