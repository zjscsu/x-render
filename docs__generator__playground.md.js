(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{Ov3d:function(g,_,n){"use strict";n.r(_);var c=n("q1tI"),t=n.n(c),f=n("dEAq"),O=n.n(f),i=n("Zxc8"),D=t.a.memo(d=>{var v=d.demos,C=v["generator-playground"].component;return t.a.createElement(t.a.Fragment,null,t.a.createElement(i.default,v["generator-playground"].previewerProps,t.a.createElement(C,null)))});_.default=d=>{var v=t.a.useContext(f.context),C=v.demos;return t.a.useEffect(()=>{var s;d!=null&&(s=d.location)!==null&&s!==void 0&&s.hash&&f.AnchorLink.scrollToAnchor(decodeURIComponent(d.location.hash.slice(1)))},[]),t.a.createElement(D,{demos:C})}},RZMt:function(g,_,n){},Zxc8:function(g,_,n){"use strict";n.r(_);var c=n("q1tI"),t=n.n(c),f=n("k3GJ"),O=n("MZF8"),i=n("dEAq"),D=n.n(i),d=n("H1Ra"),v=n("RZMt"),C=n.n(v);function s(a,o){return F(a)||$(a,o)||k(a,o)||W()}function W(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function k(a,o){if(!!a){if(typeof a=="string")return S(a,o);var r=Object.prototype.toString.call(a).slice(8,-1);if(r==="Object"&&a.constructor&&(r=a.constructor.name),r==="Map"||r==="Set")return Array.from(a);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return S(a,o)}}function S(a,o){(o==null||o>a.length)&&(o=a.length);for(var r=0,u=new Array(o);r<o;r++)u[r]=a[r];return u}function $(a,o){var r=a==null?null:typeof Symbol!="undefined"&&a[Symbol.iterator]||a["@@iterator"];if(r!=null){var u=[],m=!0,E=!1,b,p;try{for(r=r.call(a);!(m=(b=r.next()).done)&&(u.push(b.value),!(o&&u.length===o));m=!0);}catch(e){E=!0,p=e}finally{try{!m&&r.return!=null&&r.return()}finally{if(E)throw p}}return u}}function F(a){if(Array.isArray(a))return a}function M(a,o){var r,u=(r=a.match(/\.(\w+)$/))===null||r===void 0?void 0:r[1];return u||(u=o.tsx?"tsx":"jsx"),u}var Z=function(o){var r,u,m,E=Object(c.useRef)(),b=Object(c.useContext)(i.context),p=b.locale,e=Object(i.useLocaleProps)(p,o),J=Object(i.useDemoUrl)(e.identifier),R=e.demoUrl||J,H=(O.a===null||O.a===void 0?void 0:O.a.location.hash)==="#".concat(e.identifier),G=Object.keys(e.sources).length===1,T=Object(i.useCodeSandbox)(((r=e.hideActions)===null||r===void 0?void 0:r.includes("CSB"))?null:e),I=Object(i.useRiddle)(((u=e.hideActions)===null||u===void 0?void 0:u.includes("RIDDLE"))?null:e),X=Object(i.useMotions)(e.motions||[],E.current),j=s(X,2),z=j[0],Q=j[1],V=Object(i.useCopy)(),x=s(V,2),Y=x[0],q=x[1],ee=Object(c.useState)(function(){return e.sources._?"_":Object.keys(e.sources)[0]}),L=s(ee,2),y=L[0],te=L[1],ae=Object(c.useState)(M(y,e.sources[y])),B=s(ae,2),P=B[0],re=B[1],ne=Object(c.useState)(Boolean(e.defaultShowCode)),U=s(ne,2),h=U[0],oe=U[1],ie=Object(c.useState)(Math.random()),w=s(ie,2),le=w[0],N=w[1],A=e.sources[y][P]||e.sources[y].content,ue=Object(i.useTSPlaygroundUrl)(p,A),ce=Object(c.useRef)(),se=Object(i.usePrefersColor)(),de=s(se,1),me=de[0],K=e.actionBarRender,_e=K===void 0?function(l){return l}:K;Object(c.useEffect)(function(){N(Math.random())},[me]);function fe(l){te(l),re(M(l,e.sources[l]))}return t.a.createElement("div",{style:e.style,className:[e.className,"__dumi-default-previewer",H?"__dumi-default-previewer-target":""].filter(Boolean).join(" "),id:e.identifier,"data-debug":e.debug||void 0,"data-iframe":e.iframe||void 0},e.iframe&&t.a.createElement("div",{className:"__dumi-default-previewer-browser-nav"}),t.a.createElement("div",{ref:E,className:"__dumi-default-previewer-demo",style:{transform:e.transform?"translate(0, 0)":void 0,padding:e.compact||e.iframe&&e.compact!==!1?"0":void 0,background:e.background}},e.iframe?t.a.createElement("iframe",{title:"dumi-previewer",style:{height:String(e.iframe).replace(/(\d)$/,"$1px")},key:le,src:R,ref:ce}):e.children),t.a.createElement("div",{className:"__dumi-default-previewer-desc","data-title":e.title},e.title&&t.a.createElement(i.AnchorLink,{to:"#".concat(e.identifier)},e.title),e.description&&t.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.description}})),t.a.createElement("div",{className:"__dumi-default-previewer-actions"},_e(t.a.createElement(t.a.Fragment,null,T&&t.a.createElement("button",{title:"Open demo on CodeSandbox.io",className:"__dumi-default-icon",role:"codesandbox",onClick:T}),I&&t.a.createElement("button",{title:"Open demo on Riddle",className:"__dumi-default-icon",role:"riddle",onClick:I}),e.motions&&t.a.createElement("button",{title:"Execute motions",className:"__dumi-default-icon",role:"motions",disabled:Q,onClick:function(){return z()}}),e.iframe&&t.a.createElement("button",{title:"Reload demo iframe page",className:"__dumi-default-icon",role:"refresh",onClick:function(){return N(Math.random())}}),!((m=e.hideActions)===null||m===void 0?void 0:m.includes("EXTERNAL"))&&t.a.createElement(i.Link,{target:"_blank",to:R},t.a.createElement("button",{title:"Open demo in new tab",className:"__dumi-default-icon",role:"open-demo",type:"button"})),t.a.createElement("span",null),t.a.createElement("button",{title:"Copy source code",className:"__dumi-default-icon",role:"copy","data-status":q,onClick:function(){return Y(A)}}),P==="tsx"&&h&&t.a.createElement(i.Link,{target:"_blank",to:ue},t.a.createElement("button",{title:"Get JSX via TypeScript Playground",className:"__dumi-default-icon",role:"change-tsx",type:"button"})),t.a.createElement("button",{title:"Toggle source code panel",className:"__dumi-default-icon".concat(h?" __dumi-default-btn-expand":""),role:"source",type:"button",onClick:function(){return oe(!h)}})))),h&&t.a.createElement("div",{className:"__dumi-default-previewer-source-wrapper"},!G&&t.a.createElement(f.default,{className:"__dumi-default-previewer-source-tab",prefixCls:"__dumi-default-tabs",moreIcon:"\xB7\xB7\xB7",defaultActiveKey:y,onChange:fe},Object.keys(e.sources).map(function(l){return t.a.createElement(f.TabPane,{tab:l==="_"?"index.".concat(M(l,e.sources[l])):l,key:l})})),t.a.createElement("div",{className:"__dumi-default-previewer-source"},t.a.createElement(d.a,{code:A,lang:P,showCopy:!1}))))};_.default=Z}}]);
