(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{RZMt:function(S,f,r){},Zxc8:function(S,f,r){"use strict";r.r(f);var s=r("q1tI"),e=r.n(s),d=r("k3GJ"),F=r("MZF8"),n=r("dEAq"),g=r.n(n),E=r("H1Ra"),c=r("RZMt"),p=r.n(c);function m(u,l){return $(u)||W(u,l)||O(u,l)||b()}function b(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function O(u,l){if(!!u){if(typeof u=="string")return h(u,l);var a=Object.prototype.toString.call(u).slice(8,-1);if(a==="Object"&&u.constructor&&(a=u.constructor.name),a==="Map"||a==="Set")return Array.from(u);if(a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return h(u,l)}}function h(u,l){(l==null||l>u.length)&&(l=u.length);for(var a=0,i=new Array(l);a<l;a++)i[a]=u[a];return i}function W(u,l){var a=u==null?null:typeof Symbol!="undefined"&&u[Symbol.iterator]||u["@@iterator"];if(a!=null){var i=[],_=!0,v=!1,D,A;try{for(a=a.call(u);!(_=(D=a.next()).done)&&(i.push(D.value),!(l&&i.length===l));_=!0);}catch(t){v=!0,A=t}finally{try{!_&&a.return!=null&&a.return()}finally{if(v)throw A}}return i}}function $(u){if(Array.isArray(u))return u}function P(u,l){var a,i=(a=u.match(/\.(\w+)$/))===null||a===void 0?void 0:a[1];return i||(i=l.tsx?"tsx":"jsx"),i}var Z=function(l){var a,i,_,v=Object(s.useRef)(),D=Object(s.useContext)(n.context),A=D.locale,t=Object(n.useLocaleProps)(A,l),J=Object(n.useDemoUrl)(t.identifier),I=t.demoUrl||J,H=(F.a===null||F.a===void 0?void 0:F.a.location.hash)==="#".concat(t.identifier),G=Object.keys(t.sources).length===1,R=Object(n.useCodeSandbox)(((a=t.hideActions)===null||a===void 0?void 0:a.includes("CSB"))?null:t),k=Object(n.useRiddle)(((i=t.hideActions)===null||i===void 0?void 0:i.includes("RIDDLE"))?null:t),X=Object(n.useMotions)(t.motions||[],v.current),L=m(X,2),z=L[0],Q=L[1],V=Object(n.useCopy)(),B=m(V,2),Y=B[0],q=B[1],ee=Object(s.useState)(function(){return t.sources._?"_":Object.keys(t.sources)[0]}),N=m(ee,2),C=N[0],te=N[1],ue=Object(s.useState)(P(C,t.sources[C])),T=m(ue,2),M=T[0],ae=T[1],ne=Object(s.useState)(Boolean(t.defaultShowCode)),w=m(ne,2),y=w[0],re=w[1],le=Object(s.useState)(Math.random()),j=m(le,2),oe=j[0],U=j[1],x=t.sources[C][M]||t.sources[C].content,ce=Object(n.useTSPlaygroundUrl)(A,x),ie=Object(s.useRef)(),de=Object(n.usePrefersColor)(),me=m(de,1),se=me[0],K=t.actionBarRender,Ee=K===void 0?function(o){return o}:K;Object(s.useEffect)(function(){U(Math.random())},[se]);function _e(o){te(o),ae(P(o,t.sources[o]))}return e.a.createElement("div",{style:t.style,className:[t.className,"__dumi-default-previewer",H?"__dumi-default-previewer-target":""].filter(Boolean).join(" "),id:t.identifier,"data-debug":t.debug||void 0,"data-iframe":t.iframe||void 0},t.iframe&&e.a.createElement("div",{className:"__dumi-default-previewer-browser-nav"}),e.a.createElement("div",{ref:v,className:"__dumi-default-previewer-demo",style:{transform:t.transform?"translate(0, 0)":void 0,padding:t.compact||t.iframe&&t.compact!==!1?"0":void 0,background:t.background}},t.iframe?e.a.createElement("iframe",{title:"dumi-previewer",style:{height:String(t.iframe).replace(/(\d)$/,"$1px")},key:oe,src:I,ref:ie}):t.children),e.a.createElement("div",{className:"__dumi-default-previewer-desc","data-title":t.title},t.title&&e.a.createElement(n.AnchorLink,{to:"#".concat(t.identifier)},t.title),t.description&&e.a.createElement("div",{dangerouslySetInnerHTML:{__html:t.description}})),e.a.createElement("div",{className:"__dumi-default-previewer-actions"},Ee(e.a.createElement(e.a.Fragment,null,R&&e.a.createElement("button",{title:"Open demo on CodeSandbox.io",className:"__dumi-default-icon",role:"codesandbox",onClick:R}),k&&e.a.createElement("button",{title:"Open demo on Riddle",className:"__dumi-default-icon",role:"riddle",onClick:k}),t.motions&&e.a.createElement("button",{title:"Execute motions",className:"__dumi-default-icon",role:"motions",disabled:Q,onClick:function(){return z()}}),t.iframe&&e.a.createElement("button",{title:"Reload demo iframe page",className:"__dumi-default-icon",role:"refresh",onClick:function(){return U(Math.random())}}),!((_=t.hideActions)===null||_===void 0?void 0:_.includes("EXTERNAL"))&&e.a.createElement(n.Link,{target:"_blank",to:I},e.a.createElement("button",{title:"Open demo in new tab",className:"__dumi-default-icon",role:"open-demo",type:"button"})),e.a.createElement("span",null),e.a.createElement("button",{title:"Copy source code",className:"__dumi-default-icon",role:"copy","data-status":q,onClick:function(){return Y(x)}}),M==="tsx"&&y&&e.a.createElement(n.Link,{target:"_blank",to:ce},e.a.createElement("button",{title:"Get JSX via TypeScript Playground",className:"__dumi-default-icon",role:"change-tsx",type:"button"})),e.a.createElement("button",{title:"Toggle source code panel",className:"__dumi-default-icon".concat(y?" __dumi-default-btn-expand":""),role:"source",type:"button",onClick:function(){return re(!y)}})))),y&&e.a.createElement("div",{className:"__dumi-default-previewer-source-wrapper"},!G&&e.a.createElement(d.default,{className:"__dumi-default-previewer-source-tab",prefixCls:"__dumi-default-tabs",moreIcon:"\xB7\xB7\xB7",defaultActiveKey:C,onChange:_e},Object.keys(t.sources).map(function(o){return e.a.createElement(d.TabPane,{tab:o==="_"?"index.".concat(P(o,t.sources[o])):o,key:o})})),e.a.createElement("div",{className:"__dumi-default-previewer-source"},e.a.createElement(E.a,{code:x,lang:M,showCopy:!1}))))};f.default=Z},"oj0/":function(S,f,r){"use strict";r.r(f);var s=r("q1tI"),e=r.n(s),d=r("dEAq"),F=r.n(d),n=r("Zxc8"),g=e.a.memo(E=>{var c=E.demos,p=c["column-demo"].component,m=c["column-demo-1"].component,b=c["column-demo-2"].component,O=c["column-demo-3"].component,h=c["column-demo-4"].component;return e.a.createElement(e.a.Fragment,null,e.a.createElement(e.a.Fragment,null,e.a.createElement("div",{className:"markdown"},e.a.createElement("h2",{id:"\u57FA\u672C\u7528\u6CD5"},e.a.createElement(d.AnchorLink,{to:"#\u57FA\u672C\u7528\u6CD5","aria-hidden":"true",tabIndex:-1},e.a.createElement("span",{className:"icon icon-link"})),"\u57FA\u672C\u7528\u6CD5"),e.a.createElement("h3",{id:"n-\u6307\u6807-\u96F6\u7EF4\u5EA6"},e.a.createElement(d.AnchorLink,{to:"#n-\u6307\u6807-\u96F6\u7EF4\u5EA6","aria-hidden":"true",tabIndex:-1},e.a.createElement("span",{className:"icon icon-link"})),"N \u6307\u6807 \u96F6\u7EF4\u5EA6"),e.a.createElement("ul",null,e.a.createElement("li",null,"\u56FE\u8868\u6E32\u67D3\u4E0A\uFF0C\u6307\u6807\u4F5C\u4E3A ",e.a.createElement("code",null,"x \u8F74"),"\uFF0C\u6307\u6807\u503C\u4F5C\u4E3A ",e.a.createElement("code",null,"y \u8F74"),"\u3002"))),e.a.createElement(n.default,c["column-demo"].previewerProps,e.a.createElement(p,null)),e.a.createElement("div",{className:"markdown"},e.a.createElement("h3",{id:"\u5355\u6307\u6807-\u5355\u7EF4\u5EA6"},e.a.createElement(d.AnchorLink,{to:"#\u5355\u6307\u6807-\u5355\u7EF4\u5EA6","aria-hidden":"true",tabIndex:-1},e.a.createElement("span",{className:"icon icon-link"})),"\u5355\u6307\u6807 \u5355\u7EF4\u5EA6"),e.a.createElement("ul",null,e.a.createElement("li",null,"\u56FE\u8868\u6E32\u67D3\u4E0A\uFF0C\u7EF4\u5EA6\u4F5C\u4E3A ",e.a.createElement("code",null,"x \u8F74"),"\uFF0C\u6307\u6807\u4F5C\u4E3A ",e.a.createElement("code",null,"y \u8F74"),"\u3002"))),e.a.createElement(n.default,c["column-demo-1"].previewerProps,e.a.createElement(m,null)),e.a.createElement("div",{className:"markdown"},e.a.createElement("h3",{id:"\u5355\u6307\u6807-\u53CC\u7EF4\u5EA6"},e.a.createElement(d.AnchorLink,{to:"#\u5355\u6307\u6807-\u53CC\u7EF4\u5EA6","aria-hidden":"true",tabIndex:-1},e.a.createElement("span",{className:"icon icon-link"})),"\u5355\u6307\u6807 \u53CC\u7EF4\u5EA6"),e.a.createElement("ul",null,e.a.createElement("li",null,"\u56FE\u8868\u6E32\u67D3\u4E0A\uFF0C\u7B2C\u4E00\u7EF4\u5EA6\u4F5C\u4E3A ",e.a.createElement("code",null,"x \u8F74"),"\uFF0C\u6307\u6807\u4F5C\u4E3A ",e.a.createElement("code",null,"y \u8F74"),"\uFF0C\u7B2C\u4E8C\u7EF4\u5EA6\u4F5C\u4E3A ",e.a.createElement("code",null,"\u7CFB\u5217"),"\u3002"),e.a.createElement("li",null,"\u6570\u636E\u4E0A\uFF0C\u6570\u636E\u6761\u6570\u662F ",e.a.createElement("code",null,"\u300C\u5355\u6307\u6807 \u5355\u7EF4\u5EA6\u300D")," \u7684\u4E24\u500D\u3002"))),e.a.createElement(n.default,c["column-demo-2"].previewerProps,e.a.createElement(b,null)),e.a.createElement("div",{className:"markdown"},e.a.createElement("h3",{id:"\u591A\u6307\u6807-\u5355\u7EF4\u5EA6"},e.a.createElement(d.AnchorLink,{to:"#\u591A\u6307\u6807-\u5355\u7EF4\u5EA6","aria-hidden":"true",tabIndex:-1},e.a.createElement("span",{className:"icon icon-link"})),"\u591A\u6307\u6807 \u5355\u7EF4\u5EA6"),e.a.createElement("ul",null,e.a.createElement("li",null,"\u56FE\u8868\u6E32\u67D3\u4E0A\uFF0C\u7EF4\u5EA6\u4F5C\u4E3A ",e.a.createElement("code",null,"x \u8F74"),"\uFF0C\u6307\u6807\u5206 ",e.a.createElement("code",null,"\u7CFB\u5217")," \u5C55\u793A\u3002"))),e.a.createElement(n.default,c["column-demo-3"].previewerProps,e.a.createElement(O,null)),e.a.createElement("div",{className:"markdown"},e.a.createElement("h2",{id:"\u9AD8\u7EA7\u7528\u6CD5"},e.a.createElement(d.AnchorLink,{to:"#\u9AD8\u7EA7\u7528\u6CD5","aria-hidden":"true",tabIndex:-1},e.a.createElement("span",{className:"icon icon-link"})),"\u9AD8\u7EA7\u7528\u6CD5"),e.a.createElement("h3",{id:"\u56FE\u5F62\u4E0A\u663E\u793A\u6570\u5B57\u7684\u6761\u5F62\u56FE"},e.a.createElement(d.AnchorLink,{to:"#\u56FE\u5F62\u4E0A\u663E\u793A\u6570\u5B57\u7684\u6761\u5F62\u56FE","aria-hidden":"true",tabIndex:-1},e.a.createElement("span",{className:"icon icon-link"})),"\u56FE\u5F62\u4E0A\u663E\u793A\u6570\u5B57\u7684\u6761\u5F62\u56FE")),e.a.createElement(n.default,c["column-demo-4"].previewerProps,e.a.createElement(h,null))))});f.default=E=>{var c=e.a.useContext(d.context),p=c.demos;return e.a.useEffect(()=>{var m;E!=null&&(m=E.location)!==null&&m!==void 0&&m.hash&&d.AnchorLink.scrollToAnchor(decodeURIComponent(E.location.hash.slice(1)))},[]),e.a.createElement(g,{demos:p})}}}]);