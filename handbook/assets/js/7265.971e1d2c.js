(self.webpackChunk_jitsi_handbook=self.webpackChunk_jitsi_handbook||[]).push([[7265],{7293:(e,n,t)=>{"use strict";t.d(n,{A:()=>S});var a=t(6540),s=t(4848);function r(e){var n,t=function(e){var n=a.Children.toArray(e),t=n.find((function(e){return a.isValidElement(e)&&"mdxAdmonitionTitle"===e.type})),r=n.filter((function(e){return e!==t}));return{mdxAdmonitionTitle:null==t?void 0:t.props.children,rest:r.length>0?(0,s.jsx)(s.Fragment,{children:r}):null}}(e.children),r=t.mdxAdmonitionTitle,i=t.rest,c=null!=(n=e.title)?n:r;return Object.assign({},e,c&&{title:c},{children:i})}var i=t(4164),c=t(1312),o=t(7559);const l="admonition_xJq3",d="admonitionHeading_Gvgb",u="admonitionIcon_Rf37",m="admonitionContent_BuS1";function f(e){var n=e.type,t=e.className,a=e.children;return(0,s.jsx)("div",{className:(0,i.A)(o.G.common.admonition,o.G.common.admonitionType(n),l,t),children:a})}function h(e){var n=e.icon,t=e.title;return(0,s.jsxs)("div",{className:d,children:[(0,s.jsx)("span",{className:u,children:n}),t]})}function v(e){var n=e.children;return n?(0,s.jsx)("div",{className:m,children:n}):null}function p(e){var n=e.type,t=e.icon,a=e.title,r=e.children,i=e.className;return(0,s.jsxs)(f,{type:n,className:i,children:[a||t?(0,s.jsx)(h,{title:a,icon:t}):null,(0,s.jsx)(v,{children:r})]})}function g(e){return(0,s.jsx)("svg",Object.assign({viewBox:"0 0 14 16"},e,{children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})}))}var b={icon:(0,s.jsx)(g,{}),title:(0,s.jsx)(c.A,{id:"theme.admonition.note",description:"The default label used for the Note admonition (:::note)",children:"note"})};function j(e){return(0,s.jsx)(p,Object.assign({},b,e,{className:(0,i.A)("alert alert--secondary",e.className),children:e.children}))}function x(e){return(0,s.jsx)("svg",Object.assign({viewBox:"0 0 12 16"},e,{children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})}))}var N={icon:(0,s.jsx)(x,{}),title:(0,s.jsx)(c.A,{id:"theme.admonition.tip",description:"The default label used for the Tip admonition (:::tip)",children:"tip"})};function A(e){return(0,s.jsx)(p,Object.assign({},N,e,{className:(0,i.A)("alert alert--success",e.className),children:e.children}))}function y(e){return(0,s.jsx)("svg",Object.assign({viewBox:"0 0 14 16"},e,{children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})}))}var k={icon:(0,s.jsx)(y,{}),title:(0,s.jsx)(c.A,{id:"theme.admonition.info",description:"The default label used for the Info admonition (:::info)",children:"info"})};function C(e){return(0,s.jsx)(p,Object.assign({},k,e,{className:(0,i.A)("alert alert--info",e.className),children:e.children}))}function B(e){return(0,s.jsx)("svg",Object.assign({viewBox:"0 0 16 16"},e,{children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})}))}var w={icon:(0,s.jsx)(B,{}),title:(0,s.jsx)(c.A,{id:"theme.admonition.warning",description:"The default label used for the Warning admonition (:::warning)",children:"warning"})};function L(e){return(0,s.jsx)("svg",Object.assign({viewBox:"0 0 12 16"},e,{children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"})}))}var O={icon:(0,s.jsx)(L,{}),title:(0,s.jsx)(c.A,{id:"theme.admonition.danger",description:"The default label used for the Danger admonition (:::danger)",children:"danger"})};var E={icon:(0,s.jsx)(B,{}),title:(0,s.jsx)(c.A,{id:"theme.admonition.caution",description:"The default label used for the Caution admonition (:::caution)",children:"caution"})};var T={note:j,tip:A,info:C,warning:function(e){return(0,s.jsx)(p,Object.assign({},w,e,{className:(0,i.A)("alert alert--warning",e.className),children:e.children}))},danger:function(e){return(0,s.jsx)(p,Object.assign({},O,e,{className:(0,i.A)("alert alert--danger",e.className),children:e.children}))}},_={secondary:function(e){return(0,s.jsx)(j,Object.assign({title:"secondary"},e))},important:function(e){return(0,s.jsx)(C,Object.assign({title:"important"},e))},success:function(e){return(0,s.jsx)(A,Object.assign({title:"success"},e))},caution:function(e){return(0,s.jsx)(p,Object.assign({},E,e,{className:(0,i.A)("alert alert--warning",e.className),children:e.children}))}};const H=Object.assign({},T,_);function S(e){var n,t=r(e),a=(n=t.type,H[n]||(console.warn('No admonition component found for admonition type "'+n+'". Using Info as fallback.'),H.info));return(0,s.jsx)(a,Object.assign({},t))}},6896:(e,n,t)=>{"use strict";t.d(n,{A:()=>g});t(6540);var a=t(4164),s=t(1312),r=t(5260),i=t(4848);function c(){return(0,i.jsx)(s.A,{id:"theme.contentVisibility.unlistedBanner.title",description:"The unlisted content banner title",children:"Unlisted page"})}function o(){return(0,i.jsx)(s.A,{id:"theme.contentVisibility.unlistedBanner.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function l(){return(0,i.jsx)(r.A,{children:(0,i.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}function d(){return(0,i.jsx)(s.A,{id:"theme.contentVisibility.draftBanner.title",description:"The draft content banner title",children:"Draft page"})}function u(){return(0,i.jsx)(s.A,{id:"theme.contentVisibility.draftBanner.message",description:"The draft content banner message",children:"This page is a draft. It will only be visible in dev and be excluded from the production build."})}var m=t(7559),f=t(7293);function h(e){var n=e.className;return(0,i.jsx)(f.A,{type:"caution",title:(0,i.jsx)(d,{}),className:(0,a.A)(n,m.G.common.draftBanner),children:(0,i.jsx)(u,{})})}function v(e){var n=e.className;return(0,i.jsx)(f.A,{type:"caution",title:(0,i.jsx)(c,{}),className:(0,a.A)(n,m.G.common.unlistedBanner),children:(0,i.jsx)(o,{})})}function p(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(l,{}),(0,i.jsx)(v,Object.assign({},e))]})}function g(e){var n=e.metadata,t=n.unlisted,a=n.frontMatter;return(0,i.jsxs)(i.Fragment,{children:[(t||a.unlisted)&&(0,i.jsx)(p,{}),a.draft&&(0,i.jsx)(h,{})]})}},2153:(e,n,t)=>{"use strict";t.d(n,{A:()=>j});t(6540);var a=t(4164),s=t(1312),r=t(7559),i=t(8774),c=t(8587);const o={iconEdit:"iconEdit_Z9Sw"};var l=t(4848),d=["className"];function u(e){var n=e.className,t=(0,c.A)(e,d);return(0,l.jsx)("svg",Object.assign({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,a.A)(o.iconEdit,n),"aria-hidden":"true"},t,{children:(0,l.jsx)("g",{children:(0,l.jsx)("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})})}))}function m(e){var n=e.editUrl;return(0,l.jsxs)(i.A,{to:n,className:r.G.common.editThisPage,children:[(0,l.jsx)(u,{}),(0,l.jsx)(s.A,{id:"theme.common.editThisPage",description:"The link label to edit the current page",children:"Edit this page"})]})}var f=t(4586);function h(e){void 0===e&&(e={});var n=(0,f.A)().i18n.currentLocale,t=function(){var e=(0,f.A)().i18n,n=e.currentLocale;return e.localeConfigs[n].calendar}();return new Intl.DateTimeFormat(n,Object.assign({calendar:t},e))}function v(e){var n=e.lastUpdatedAt,t=new Date(n),a=h({day:"numeric",month:"short",year:"numeric",timeZone:"UTC"}).format(t);return(0,l.jsx)(s.A,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:(0,l.jsx)("b",{children:(0,l.jsx)("time",{dateTime:t.toISOString(),itemProp:"dateModified",children:a})})},children:" on {date}"})}function p(e){var n=e.lastUpdatedBy;return(0,l.jsx)(s.A,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:(0,l.jsx)("b",{children:n})},children:" by {user}"})}function g(e){var n=e.lastUpdatedAt,t=e.lastUpdatedBy;return(0,l.jsxs)("span",{className:r.G.common.lastUpdated,children:[(0,l.jsx)(s.A,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:n?(0,l.jsx)(v,{lastUpdatedAt:n}):"",byUser:t?(0,l.jsx)(p,{lastUpdatedBy:t}):""},children:"Last updated{atDate}{byUser}"}),!1]})}const b={lastUpdated:"lastUpdated_JAkA"};function j(e){var n=e.className,t=e.editUrl,s=e.lastUpdatedAt,r=e.lastUpdatedBy;return(0,l.jsxs)("div",{className:(0,a.A)("row",n),children:[(0,l.jsx)("div",{className:"col",children:t&&(0,l.jsx)(m,{editUrl:t})}),(0,l.jsx)("div",{className:(0,a.A)("col",b.lastUpdated),children:(s||r)&&(0,l.jsx)(g,{lastUpdatedAt:s,lastUpdatedBy:r})})]})}},6416:(e,n,t)=>{"use strict";t.d(n,{A:()=>pe});var a=t(6540),s=t(8453),r=t(5260),i=t(8587),c=t(2303),o=t(4164),l=t(5293),d=t(6342);function u(){var e=(0,d.p)().prism,n=(0,l.G)().colorMode,t=e.theme,a=e.darkTheme||t;return"dark"===n?a:t}var m=t(7559),f=t(8634),h=t(8426),v=t.n(h),p=(0,f.A)(/title=(["'])(.*?)\1/,{quote:1,title:2}),g=(0,f.A)(/\{([\d,-]+)\}/,{range:1}),b={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},bash:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},j=Object.assign({},b,{lua:{start:"--",end:""},wasm:{start:"\\;\\;",end:""},tex:{start:"%",end:""},vb:{start:"['\u2018\u2019]",end:""},vbnet:{start:"(?:_\\s*)?['\u2018\u2019]",end:""},rem:{start:"[Rr][Ee][Mm]\\b",end:""},f90:{start:"!",end:""},ml:{start:"\\(\\*",end:"\\*\\)"},cobol:{start:"\\*>",end:""}}),x=Object.keys(b);function N(e,n){var t=e.map((function(e){var t=j[e],a=t.start,s=t.end;return"(?:"+a+"\\s*("+n.flatMap((function(e){var n,t;return[e.line,null==(n=e.block)?void 0:n.start,null==(t=e.block)?void 0:t.end].filter(Boolean)})).join("|")+")\\s*"+s+")"})).join("|");return new RegExp("^\\s*(?:"+t+")\\s*$")}function A(e,n){var t=e.replace(/\n$/,""),a=n.language,s=n.magicComments,r=n.metastring;if(r&&g.test(r)){var i=r.match(g).groups.range;if(0===s.length)throw new Error("A highlight range has been given in code block's metastring (``` "+r+"), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges.");var c=s[0].className,o=v()(i).filter((function(e){return e>0})).map((function(e){return[e-1,[c]]}));return{lineClassNames:Object.fromEntries(o),code:t}}if(void 0===a)return{lineClassNames:{},code:t};for(var l=function(e,n){switch(e){case"js":case"javascript":case"ts":case"typescript":return N(["js","jsBlock"],n);case"jsx":case"tsx":return N(["js","jsBlock","jsx"],n);case"html":return N(["js","jsBlock","html"],n);case"python":case"py":case"bash":return N(["bash"],n);case"markdown":case"md":return N(["html","jsx","bash"],n);case"tex":case"latex":case"matlab":return N(["tex"],n);case"lua":case"haskell":case"sql":return N(["lua"],n);case"wasm":return N(["wasm"],n);case"vb":case"vba":case"visual-basic":return N(["vb","rem"],n);case"vbnet":return N(["vbnet","rem"],n);case"batch":return N(["rem"],n);case"basic":return N(["rem","f90"],n);case"fsharp":return N(["js","ml"],n);case"ocaml":case"sml":return N(["ml"],n);case"fortran":return N(["f90"],n);case"cobol":return N(["cobol"],n);default:return N(x,n)}}(a,s),d=t.split("\n"),u=Object.fromEntries(s.map((function(e){return[e.className,{start:0,range:""}]}))),m=Object.fromEntries(s.filter((function(e){return e.line})).map((function(e){var n=e.className;return[e.line,n]}))),f=Object.fromEntries(s.filter((function(e){return e.block})).map((function(e){var n=e.className;return[e.block.start,n]}))),h=Object.fromEntries(s.filter((function(e){return e.block})).map((function(e){var n=e.className;return[e.block.end,n]}))),p=0;p<d.length;){var b=d[p].match(l);if(b){var j=b.slice(1).find((function(e){return void 0!==e}));m[j]?u[m[j]].range+=p+",":f[j]?u[f[j]].start=p:h[j]&&(u[h[j]].range+=u[h[j]].start+"-"+(p-1)+","),d.splice(p,1)}else p+=1}t=d.join("\n");var A={};return Object.entries(u).forEach((function(e){var n=e[0],t=e[1].range;v()(t).forEach((function(e){null!=A[e]||(A[e]=[]),A[e].push(n)}))})),{lineClassNames:A,code:t}}const y="codeBlockContainer_Ckt0";var k=t(4848),C=["as"];function B(e){var n=e.as,t=(0,i.A)(e,C),a=function(e){var n={color:"--prism-color",backgroundColor:"--prism-background-color"},t={};return Object.entries(e.plain).forEach((function(e){var a=e[0],s=e[1],r=n[a];r&&"string"==typeof s&&(t[r]=s)})),t}(u());return(0,k.jsx)(n,Object.assign({},t,{style:a,className:(0,o.A)(t.className,y,m.G.common.codeBlock)}))}const w={codeBlockContent:"codeBlockContent_biex",codeBlockTitle:"codeBlockTitle_Ktv7",codeBlock:"codeBlock_bY9V",codeBlockStandalone:"codeBlockStandalone_MEMb",codeBlockLines:"codeBlockLines_e6Vv",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_o6Pm",buttonGroup:"buttonGroup__atx"};function L(e){var n=e.children,t=e.className;return(0,k.jsx)(B,{as:"pre",tabIndex:0,className:(0,o.A)(w.codeBlockStandalone,"thin-scrollbar",t),children:(0,k.jsx)("code",{className:w.codeBlockLines,children:n})})}var O=t(3807),E={attributes:!0,characterData:!0,childList:!0,subtree:!0};function T(e,n){var t=(0,a.useState)(),s=t[0],r=t[1],i=(0,a.useCallback)((function(){var n;r(null==(n=e.current)?void 0:n.closest("[role=tabpanel][hidden]"))}),[e,r]);(0,a.useEffect)((function(){i()}),[i]),function(e,n,t){void 0===t&&(t=E);var s=(0,O._q)(n),r=(0,O.Be)(t);(0,a.useEffect)((function(){var n=new MutationObserver(s);return e&&n.observe(e,r),function(){return n.disconnect()}}),[e,s,r])}(s,(function(e){e.forEach((function(e){"attributes"===e.type&&"hidden"===e.attributeName&&(n(),i())}))}),{attributes:!0,characterData:!1,childList:!1,subtree:!1})}var _=t(1765);const H="codeLine_lJS_",S="codeLineNumber_Tfdd",M="codeLineContent_feaV";function I(e){var n=e.line,t=e.classNames,a=e.showLineNumbers,s=e.getLineProps,r=e.getTokenProps;1===n.length&&"\n"===n[0].content&&(n[0].content="");var i=s({line:n,className:(0,o.A)(t,a&&H)}),c=n.map((function(e,n){return(0,k.jsx)("span",Object.assign({},r({token:e})),n)}));return(0,k.jsxs)("span",Object.assign({},i,{children:[a?(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)("span",{className:S}),(0,k.jsx)("span",{className:M,children:c})]}):c,(0,k.jsx)("br",{})]}))}var U=t(1312);function z(e){return(0,k.jsx)("svg",Object.assign({viewBox:"0 0 24 24"},e,{children:(0,k.jsx)("path",{fill:"currentColor",d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})}))}function R(e){return(0,k.jsx)("svg",Object.assign({viewBox:"0 0 24 24"},e,{children:(0,k.jsx)("path",{fill:"currentColor",d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"})}))}const V={copyButtonCopied:"copyButtonCopied_obH4",copyButtonIcons:"copyButtonIcons_eSgA",copyButtonIcon:"copyButtonIcon_y97N",copyButtonSuccessIcon:"copyButtonSuccessIcon_LjdS"};function D(e){var n=e.code,t=e.className,s=(0,a.useState)(!1),r=s[0],i=s[1],c=(0,a.useRef)(void 0),l=(0,a.useCallback)((function(){!function(e,n){var t=(void 0===n?{}:n).target,a=void 0===t?document.body:t;if("string"!=typeof e)throw new TypeError("Expected parameter `text` to be a `string`, got `"+typeof e+"`.");var s=document.createElement("textarea"),r=document.activeElement;s.value=e,s.setAttribute("readonly",""),s.style.contain="strict",s.style.position="absolute",s.style.left="-9999px",s.style.fontSize="12pt";var i=document.getSelection(),c=i.rangeCount>0&&i.getRangeAt(0);a.append(s),s.select(),s.selectionStart=0,s.selectionEnd=e.length;var o=!1;try{o=document.execCommand("copy")}catch(l){}s.remove(),c&&(i.removeAllRanges(),i.addRange(c)),r&&r.focus()}(n),i(!0),c.current=window.setTimeout((function(){i(!1)}),1e3)}),[n]);return(0,a.useEffect)((function(){return function(){return window.clearTimeout(c.current)}}),[]),(0,k.jsx)("button",{type:"button","aria-label":r?(0,U.T)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,U.T)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,U.T)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,o.A)("clean-btn",t,V.copyButton,r&&V.copyButtonCopied),onClick:l,children:(0,k.jsxs)("span",{className:V.copyButtonIcons,"aria-hidden":"true",children:[(0,k.jsx)(z,{className:V.copyButtonIcon}),(0,k.jsx)(R,{className:V.copyButtonSuccessIcon})]})})}function P(e){return(0,k.jsx)("svg",Object.assign({viewBox:"0 0 24 24"},e,{children:(0,k.jsx)("path",{fill:"currentColor",d:"M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"})}))}const q="wordWrapButtonIcon_Bwma",G="wordWrapButtonEnabled_EoeP";function W(e){var n=e.className,t=e.onClick,a=e.isEnabled,s=(0,U.T)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return(0,k.jsx)("button",{type:"button",onClick:t,className:(0,o.A)("clean-btn",n,a&&G),"aria-label":s,title:s,children:(0,k.jsx)(P,{className:q,"aria-hidden":"true"})})}function F(e){var n,t,s,r,i,c,l,m,f,h,v,g=e.children,b=e.className,j=void 0===b?"":b,x=e.metastring,N=e.title,y=e.showLineNumbers,C=e.language,L=(0,d.p)().prism,O=L.defaultLanguage,E=L.magicComments,H=function(e){return null==e?void 0:e.toLowerCase()}(null!=(n=null!=C?C:null==(t=j.split(" ").find((function(e){return e.startsWith("language-")})))?void 0:t.replace(/language-/,""))?n:O),S=u(),M=(s=(0,a.useState)(!1),r=s[0],i=s[1],c=(0,a.useState)(!1),l=c[0],m=c[1],f=(0,a.useRef)(null),h=(0,a.useCallback)((function(){var e=f.current.querySelector("code");r?e.removeAttribute("style"):(e.style.whiteSpace="pre-wrap",e.style.overflowWrap="anywhere"),i((function(e){return!e}))}),[f,r]),v=(0,a.useCallback)((function(){var e=f.current,n=e.scrollWidth>e.clientWidth||f.current.querySelector("code").hasAttribute("style");m(n)}),[f]),T(f,v),(0,a.useEffect)((function(){v()}),[r,v]),(0,a.useEffect)((function(){return window.addEventListener("resize",v,{passive:!0}),function(){window.removeEventListener("resize",v)}}),[v]),{codeBlockRef:f,isEnabled:r,isCodeScrollable:l,toggle:h}),U=function(e){var n,t;return null!=(n=null==e||null==(t=e.match(p))?void 0:t.groups.title)?n:""}(x)||N,z=A(g,{metastring:x,language:H,magicComments:E}),R=z.lineClassNames,V=z.code,P=null!=y?y:function(e){return Boolean(null==e?void 0:e.includes("showLineNumbers"))}(x);return(0,k.jsxs)(B,{as:"div",className:(0,o.A)(j,H&&!j.includes("language-"+H)&&"language-"+H),children:[U&&(0,k.jsx)("div",{className:w.codeBlockTitle,children:U}),(0,k.jsxs)("div",{className:w.codeBlockContent,children:[(0,k.jsx)(_.f4,{theme:S,code:V,language:null!=H?H:"text",children:function(e){var n=e.className,t=e.style,a=e.tokens,s=e.getLineProps,r=e.getTokenProps;return(0,k.jsx)("pre",{tabIndex:0,ref:M.codeBlockRef,className:(0,o.A)(n,w.codeBlock,"thin-scrollbar"),style:t,children:(0,k.jsx)("code",{className:(0,o.A)(w.codeBlockLines,P&&w.codeBlockLinesWithNumbering),children:a.map((function(e,n){return(0,k.jsx)(I,{line:e,getLineProps:s,getTokenProps:r,classNames:R[n],showLineNumbers:P},n)}))})})}}),(0,k.jsxs)("div",{className:w.buttonGroup,children:[(M.isEnabled||M.isCodeScrollable)&&(0,k.jsx)(W,{className:w.codeButton,onClick:function(){return M.toggle()},isEnabled:M.isEnabled}),(0,k.jsx)(D,{className:w.codeButton,code:V})]})]})]})}var Z=["children"];function $(e){var n=e.children,t=(0,i.A)(e,Z),s=(0,c.A)(),r=function(e){return a.Children.toArray(e).some((function(e){return(0,a.isValidElement)(e)}))?e:Array.isArray(e)?e.join(""):e}(n),o="string"==typeof r?F:L;return(0,k.jsx)(o,Object.assign({},t,{children:r}),String(s))}function J(e){return(0,k.jsx)("code",Object.assign({},e))}var Y=t(8774);var K=t(3427),Q=t(1422);const X="details_lb9f",ee="isBrowser_bmU9",ne="collapsibleContent_i85q";var te=["summary","children"];function ae(e){return!!e&&("SUMMARY"===e.tagName||ae(e.parentElement))}function se(e,n){return!!e&&(e===n||se(e.parentElement,n))}function re(e){var n=e.summary,t=e.children,s=(0,i.A)(e,te);(0,K.A)().collectAnchor(s.id);var r=(0,c.A)(),l=(0,a.useRef)(null),d=(0,Q.u)({initialState:!s.open}),u=d.collapsed,m=d.setCollapsed,f=(0,a.useState)(s.open),h=f[0],v=f[1],p=a.isValidElement(n)?n:(0,k.jsx)("summary",{children:null!=n?n:"Details"});return(0,k.jsxs)("details",Object.assign({},s,{ref:l,open:h,"data-collapsed":u,className:(0,o.A)(X,r&&ee,s.className),onMouseDown:function(e){ae(e.target)&&e.detail>1&&e.preventDefault()},onClick:function(e){e.stopPropagation();var n=e.target;ae(n)&&se(n,l.current)&&(e.preventDefault(),u?(m(!1),v(!0)):m(!0))},children:[p,(0,k.jsx)(Q.N,{lazy:!1,collapsed:u,disableSSRStyle:!0,onCollapseTransitionEnd:function(e){m(e),v(!e)},children:(0,k.jsx)("div",{className:ne,children:t})})]}))}const ie="details_b_Ee";function ce(e){var n=Object.assign({},(function(e){if(null==e)throw new TypeError("Cannot destructure "+e)}(e),e));return(0,k.jsx)(re,Object.assign({},n,{className:(0,o.A)("alert alert--info",ie,n.className)}))}function oe(e){var n=a.Children.toArray(e.children),t=n.find((function(e){return a.isValidElement(e)&&"summary"===e.type})),s=(0,k.jsx)(k.Fragment,{children:n.filter((function(e){return e!==t}))});return(0,k.jsx)(ce,Object.assign({},e,{summary:t,children:s}))}var le=t(1107);function de(e){return(0,k.jsx)(le.A,Object.assign({},e))}const ue="containsTaskList_mC6p";function me(e){if(void 0!==e)return(0,o.A)(e,(null==e?void 0:e.includes("contains-task-list"))&&ue)}const fe="img_ev3q";var he=t(7293);const ve={Head:r.A,details:oe,Details:oe,code:function(e){return function(e){return void 0!==e.children&&a.Children.toArray(e.children).every((function(e){return"string"==typeof e&&!e.includes("\n")}))}(e)?(0,k.jsx)(J,Object.assign({},e)):(0,k.jsx)($,Object.assign({},e))},a:function(e){return(0,k.jsx)(Y.A,Object.assign({},e))},pre:function(e){return(0,k.jsx)(k.Fragment,{children:e.children})},ul:function(e){return(0,k.jsx)("ul",Object.assign({},e,{className:me(e.className)}))},li:function(e){return(0,K.A)().collectAnchor(e.id),(0,k.jsx)("li",Object.assign({},e))},img:function(e){return(0,k.jsx)("img",Object.assign({decoding:"async",loading:"lazy"},e,{className:(n=e.className,(0,o.A)(n,fe))}));var n},h1:function(e){return(0,k.jsx)(de,Object.assign({as:"h1"},e))},h2:function(e){return(0,k.jsx)(de,Object.assign({as:"h2"},e))},h3:function(e){return(0,k.jsx)(de,Object.assign({as:"h3"},e))},h4:function(e){return(0,k.jsx)(de,Object.assign({as:"h4"},e))},h5:function(e){return(0,k.jsx)(de,Object.assign({as:"h5"},e))},h6:function(e){return(0,k.jsx)(de,Object.assign({as:"h6"},e))},admonition:he.A,mermaid:function(){return null}};function pe(e){var n=e.children;return(0,k.jsx)(s.x,{components:ve,children:n})}},7763:(e,n,t)=>{"use strict";t.d(n,{A:()=>u});var a=t(8587),s=(t(6540),t(4164)),r=t(5195);const i={tableOfContents:"tableOfContents_bqdL",docItemContainer:"docItemContainer_F8PC"};var c=t(4848),o=["className"],l="table-of-contents__link toc-highlight",d="table-of-contents__link--active";function u(e){var n=e.className,t=(0,a.A)(e,o);return(0,c.jsx)("div",{className:(0,s.A)(i.tableOfContents,"thin-scrollbar",n),children:(0,c.jsx)(r.A,Object.assign({},t,{linkClassName:l,linkActiveClassName:d}))})}},5195:(e,n,t)=>{"use strict";t.d(n,{A:()=>b});var a=t(8587),s=t(6540),r=t(6342),i=["parentIndex"];function c(e){var n=e.map((function(e){return Object.assign({},e,{parentIndex:-1,children:[]})})),t=Array(7).fill(-1);n.forEach((function(e,n){var a=t.slice(2,e.level);e.parentIndex=Math.max.apply(Math,a),t[e.level]=n}));var s=[];return n.forEach((function(e){var t=e.parentIndex,r=(0,a.A)(e,i);t>=0?n[t].children.push(r):s.push(r)})),s}function o(e){var n=e.toc,t=e.minHeadingLevel,a=e.maxHeadingLevel;return n.flatMap((function(e){var n=o({toc:e.children,minHeadingLevel:t,maxHeadingLevel:a});return function(e){return e.level>=t&&e.level<=a}(e)?[Object.assign({},e,{children:n})]:n}))}function l(e){var n=e.getBoundingClientRect();return n.top===n.bottom?l(e.parentNode):n}function d(e,n){var t,a,s=n.anchorTopOffset,r=e.find((function(e){return l(e).top>=s}));return r?function(e){return e.top>0&&e.bottom<window.innerHeight/2}(l(r))?r:null!=(a=e[e.indexOf(r)-1])?a:null:null!=(t=e[e.length-1])?t:null}function u(){var e=(0,s.useRef)(0),n=(0,r.p)().navbar.hideOnScroll;return(0,s.useEffect)((function(){e.current=n?0:document.querySelector(".navbar").clientHeight}),[n]),e}function m(e){var n=(0,s.useRef)(void 0),t=u();(0,s.useEffect)((function(){if(!e)return function(){};var a=e.linkClassName,s=e.linkActiveClassName,r=e.minHeadingLevel,i=e.maxHeadingLevel;function c(){var e=function(e){return Array.from(document.getElementsByClassName(e))}(a),c=function(e){for(var n=e.minHeadingLevel,t=e.maxHeadingLevel,a=[],s=n;s<=t;s+=1)a.push("h"+s+".anchor");return Array.from(document.querySelectorAll(a.join()))}({minHeadingLevel:r,maxHeadingLevel:i}),o=d(c,{anchorTopOffset:t.current}),l=e.find((function(e){return o&&o.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)}));e.forEach((function(e){!function(e,t){t?(n.current&&n.current!==e&&n.current.classList.remove(s),e.classList.add(s),n.current=e):e.classList.remove(s)}(e,e===l)}))}return document.addEventListener("scroll",c),document.addEventListener("resize",c),c(),function(){document.removeEventListener("scroll",c),document.removeEventListener("resize",c)}}),[e,t])}var f=t(8774),h=t(4848);function v(e){var n=e.toc,t=e.className,a=e.linkClassName,s=e.isChild;return n.length?(0,h.jsx)("ul",{className:s?void 0:t,children:n.map((function(e){return(0,h.jsxs)("li",{children:[(0,h.jsx)(f.A,{to:"#"+e.id,className:null!=a?a:void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,h.jsx)(v,{isChild:!0,toc:e.children,className:t,linkClassName:a})]},e.id)}))}):null}const p=s.memo(v);var g=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function b(e){var n=e.toc,t=e.className,i=void 0===t?"table-of-contents table-of-contents__left-border":t,l=e.linkClassName,d=void 0===l?"table-of-contents__link":l,u=e.linkActiveClassName,f=void 0===u?void 0:u,v=e.minHeadingLevel,b=e.maxHeadingLevel,j=(0,a.A)(e,g),x=(0,r.p)(),N=null!=v?v:x.tableOfContents.minHeadingLevel,A=null!=b?b:x.tableOfContents.maxHeadingLevel,y=function(e){var n=e.toc,t=e.minHeadingLevel,a=e.maxHeadingLevel;return(0,s.useMemo)((function(){return o({toc:c(n),minHeadingLevel:t,maxHeadingLevel:a})}),[n,t,a])}({toc:n,minHeadingLevel:N,maxHeadingLevel:A});return m((0,s.useMemo)((function(){if(d&&f)return{linkClassName:d,linkActiveClassName:f,minHeadingLevel:N,maxHeadingLevel:A}}),[d,f,N,A])),(0,h.jsx)(p,Object.assign({toc:y,className:i,linkClassName:d},j))}},8426:(e,n)=>{function t(e){let n,t=[];for(let a of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(a))t.push(parseInt(a,10));else if(n=a.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,a,s,r]=n;if(a&&r){a=parseInt(a),r=parseInt(r);const e=a<r?1:-1;"-"!==s&&".."!==s&&"\u2025"!==s||(r+=e);for(let n=a;n!==r;n+=e)t.push(n)}}return t}n.default=t,e.exports=t},8453:(e,n,t)=>{"use strict";t.d(n,{R:()=>i,x:()=>c});var a=t(6540);const s={},r=a.createContext(s);function i(e){const n=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),a.createElement(r.Provider,{value:n},e.children)}}}]);