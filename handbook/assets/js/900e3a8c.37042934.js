"use strict";(self.webpackChunk_jitsi_handbook=self.webpackChunk_jitsi_handbook||[]).push([[9826],{3822:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>d,metadata:()=>r,toc:()=>c});var t=n(4848),s=n(8453);const d={id:"dev-guide-web-jitsi-meet",title:"Developer Guide for Jitsi Meet - Jitsi Meet\u5f00\u53d1\u6307\u5357",sidebar_label:"Jitsi Meet development - Jitsi Meet\u5f00\u53d1"},o=void 0,r={id:"dev-guide/dev-guide-web-jitsi-meet",title:"Developer Guide for Jitsi Meet - Jitsi Meet\u5f00\u53d1\u6307\u5357",description:"\u672c\u6307\u5357\u5c06\u5e2e\u52a9\u60a8\u8bbe\u7f6e\u5f00\u53d1\u73af\u5883\uff0c\u4ee5\u5f00\u59cb\u5728 Jitsi Meet \u7f51\u7edc\u5e94\u7528\u7a0b\u5e8f\u4e0a\u8fdb\u884c\u5de5\u4f5c\u3002",source:"@site/docs/dev-guide/web-jitsi-meet.md",sourceDirName:"dev-guide",slug:"/dev-guide/dev-guide-web-jitsi-meet",permalink:"/handbook/docs/dev-guide/dev-guide-web-jitsi-meet",draft:!1,unlisted:!1,editUrl:"https://github.com/jitsi/handbook/edit/master/docs/dev-guide/web-jitsi-meet.md",tags:[],version:"current",lastUpdatedAt:1729006689e3,frontMatter:{id:"dev-guide-web-jitsi-meet",title:"Developer Guide for Jitsi Meet - Jitsi Meet\u5f00\u53d1\u6307\u5357",sidebar_label:"Jitsi Meet development - Jitsi Meet\u5f00\u53d1"},sidebar:"docs",previous:{title:"Web",permalink:"/handbook/docs/category/web"},next:{title:"Modifying lib-jitsi-meet - \u4fee\u6539lib-jitsi-meet",permalink:"/handbook/docs/dev-guide/dev-guide-ljm"}},l={},c=[{value:"\u6784\u5efa\u6e90\u4ee3\u7801",id:"\u6784\u5efa\u6e90\u4ee3\u7801",level:2},{value:"\u4f7f\u7528 webpack-dev-server \u8fdb\u884c\u5f00\u53d1\u8fd0\u884c",id:"\u4f7f\u7528-webpack-dev-server-\u8fdb\u884c\u5f00\u53d1\u8fd0\u884c",level:3},{value:"\u8bc1\u4e66\u9519\u8bef",id:"\u8bc1\u4e66\u9519\u8bef",level:4},{value:"\u6784\u5efa .debs \u6587\u4ef6",id:"\u6784\u5efa-debs-\u6587\u4ef6",level:3},{value:"\u4ece\u73b0\u6709\u90e8\u7f72\u7684\u6e90\u4ee3\u7801\u8fd0\u884c",id:"\u4ece\u73b0\u6709\u90e8\u7f72\u7684\u6e90\u4ee3\u7801\u8fd0\u884c",level:3}];function a(e){const i={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.p,{children:"\u672c\u6307\u5357\u5c06\u5e2e\u52a9\u60a8\u8bbe\u7f6e\u5f00\u53d1\u73af\u5883\uff0c\u4ee5\u5f00\u59cb\u5728 Jitsi Meet \u7f51\u7edc\u5e94\u7528\u7a0b\u5e8f\u4e0a\u8fdb\u884c\u5de5\u4f5c\u3002"}),"\n",(0,t.jsx)(i.h2,{id:"\u6784\u5efa\u6e90\u4ee3\u7801",children:"\u6784\u5efa\u6e90\u4ee3\u7801"}),"\n",(0,t.jsx)(i.admonition,{type:"note",children:(0,t.jsx)(i.p,{children:"\u9700\u8981 Node.js >= 16 \u548c npm >= 8\u3002"})}),"\n",(0,t.jsx)(i.admonition,{type:"caution",children:(0,t.jsx)(i.p,{children:"\u4e0d\u652f\u6301 Windows\u3002"})}),"\n",(0,t.jsx)(i.p,{children:"\u5728 Debian/Ubuntu \u7cfb\u7edf\u4e0a\uff0c\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u65b9\u5f0f\u5b89\u88c5\u6240\u9700\u7684\u8f6f\u4ef6\u5305\uff1a"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:["\u4ece ",(0,t.jsx)(i.a,{href:"https://nodejs.org/en/download/",children:"https://nodejs.org/en/download/"})," \u4e0b\u8f7d\u201cLinux Binaries (x64)\u201d\u3002"]}),"\n",(0,t.jsxs)(i.li,{children:["\u6309\u7167\u4ee5\u4e0b\u8bf4\u660e\u5b89\u88c5 Node.js\uff1a",(0,t.jsx)(i.a,{href:"https://github.com/nodejs/help/wiki/Installation",children:"Node.js \u5b89\u88c5\u8bf4\u660e"}),"\u3002"]}),"\n"]}),"\n",(0,t.jsx)(i.p,{children:"\u7136\u540e\u7ee7\u7eed\uff1a"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-bash",children:"# \u514b\u9686\u4ee3\u7801\u5e93\ngit clone https://github.com/jitsi/jitsi-meet\ncd ./jitsi-meet\n\nnpm install\n\n# \u6784\u5efa Jitsi Meet \u5e94\u7528\u7a0b\u5e8f\uff0c\u53ea\u9700\u8f93\u5165\nmake\n"})}),"\n",(0,t.jsx)(i.admonition,{type:"warning",children:(0,t.jsxs)(i.p,{children:[(0,t.jsx)(i.strong,{children:"\u4e0d\u8981"}),"\u8fd0\u884c ",(0,t.jsx)(i.code,{children:"npm update"})," \u6216\u4f7f\u7528 ",(0,t.jsx)(i.code,{children:"yarn"}),"\uff0c\u4e5f\u4e0d\u8981\u5220\u9664 ",(0,t.jsx)(i.code,{children:"package-lock.json"}),"\u3002\u4f9d\u8d56\u9879\u88ab\u56fa\u5b9a\u662f\u6709\u539f\u56e0\u7684\u3002"]})}),"\n",(0,t.jsx)(i.h3,{id:"\u4f7f\u7528-webpack-dev-server-\u8fdb\u884c\u5f00\u53d1\u8fd0\u884c",children:"\u4f7f\u7528 webpack-dev-server \u8fdb\u884c\u5f00\u53d1\u8fd0\u884c"}),"\n",(0,t.jsx)(i.p,{children:"\u5728\u7ec8\u7aef\u4e2d\u4f7f\u7528\u4ee5\u4e0b\u547d\u4ee4\uff1a"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-bash",children:"make dev\n"})}),"\n",(0,t.jsxs)(i.p,{children:["\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0c\u4f7f\u7528\u7684\u540e\u7aef\u90e8\u7f72\u4e3a ",(0,t.jsx)(i.code,{children:"alpha.jitsi.net"}),"\u3002\u60a8\u53ef\u4ee5\u901a\u8fc7\u4f7f\u7528\u4ee3\u7406\u670d\u52a1\u5668\u5c06 Jitsi Meet \u5e94\u7528\u6307\u5411\u5176\u4ed6\u540e\u7aef\u3002\u4e3a\u6b64\uff0c\u8bf7\u8bbe\u7f6e ",(0,t.jsx)(i.code,{children:"WEBPACK_DEV_SERVER_PROXY_TARGET"})," \u53d8\u91cf\uff1a"]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-bash",children:"export WEBPACK_DEV_SERVER_PROXY_TARGET=https://your-example-server.com\nmake dev\n"})}),"\n",(0,t.jsxs)(i.p,{children:["\u5e94\u7528\u7a0b\u5e8f\u5e94\u8be5\u5728 ",(0,t.jsx)(i.a,{href:"https://localhost:8080/",children:"https://localhost:8080/"})," \u4e0a\u8fd0\u884c\u3002"]}),"\n",(0,t.jsx)(i.h4,{id:"\u8bc1\u4e66\u9519\u8bef",children:"\u8bc1\u4e66\u9519\u8bef"}),"\n",(0,t.jsx)(i.p,{children:"\u6d4f\u89c8\u5668\u53ef\u80fd\u4f1a\u663e\u793a\u8bc1\u4e66\u9519\u8bef\uff0c\u56e0\u4e3a\u5f00\u53d1\u8bc1\u4e66\u662f\u81ea\u7b7e\u540d\u7684\u3002\u53ef\u4ee5\u5b89\u5168\u5730\u5ffd\u7565\u8fd9\u4e9b\u8b66\u544a\u5e76\u7ee7\u7eed\u8bbf\u95ee\u60a8\u7684\u7f51\u7ad9\u3002"}),"\n",(0,t.jsx)(i.h3,{id:"\u6784\u5efa-debs-\u6587\u4ef6",children:"\u6784\u5efa .debs \u6587\u4ef6"}),"\n",(0,t.jsx)(i.p,{children:"\u8981\u5236\u4f5c\u4e00\u4e2a\u53ef\u4ee5\u8f7b\u677e\u90e8\u7f72\u5230\u516c\u5171\u6d4b\u8bd5\u670d\u52a1\u5668\u7684 deb\uff0c\u786e\u4fdd\u60a8\u62e5\u6709\u6240\u9700\u7684 lib-jitsi-meet \u6e90\u4ee3\u7801\uff0c\u7136\u540e\uff1a"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{children:"npm install\nmake\ndpkg-buildpackage -A -rfakeroot -us -uc -tc\n"})}),"\n",(0,t.jsx)(i.p,{children:"\u60a8\u5c06\u5728\u4e0a\u7ea7\u76ee\u5f55\u4e2d\u83b7\u5f97\u4e00\u5806 .deb \u6587\u4ef6\uff0c\u5e76\u53ef\u4ee5\u5c06\u66f4\u65b0\u7684\u6e90\u4ee3\u7801\u63a8\u9001\u5230\u60a8\u7684\u670d\u52a1\u5668\u5e76\u4f7f\u7528 jitsi-meet-web deb \u6587\u4ef6\u5b89\u88c5\u5b83\u3002"}),"\n",(0,t.jsx)(i.h3,{id:"\u4ece\u73b0\u6709\u90e8\u7f72\u7684\u6e90\u4ee3\u7801\u8fd0\u884c",children:"\u4ece\u73b0\u6709\u90e8\u7f72\u7684\u6e90\u4ee3\u7801\u8fd0\u884c"}),"\n",(0,t.jsxs)(i.p,{children:["\u8bf7\u53c2\u9605\u6587\u6863 ",(0,t.jsx)(i.a,{href:"https://community.jitsi.org/t/how-to-how-to-build-jitsi-meet-from-source-a-developers-guide/75422",children:"\u5982\u4f55\u4ece\u6e90\u4ee3\u7801\u6784\u5efa Jitsi Meet\uff1a\u5f00\u53d1\u8005\u6307\u5357"}),"\u3002"]})]})}function h(e={}){const{wrapper:i}={...(0,s.R)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},8453:(e,i,n)=>{n.d(i,{R:()=>o,x:()=>r});var t=n(6540);const s={},d=t.createContext(s);function o(e){const i=t.useContext(d);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function r(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),t.createElement(d.Provider,{value:i},e.children)}}}]);