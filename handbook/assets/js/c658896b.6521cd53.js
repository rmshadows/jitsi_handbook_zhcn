"use strict";(self.webpackChunk_jitsi_handbook=self.webpackChunk_jitsi_handbook||[]).push([[8170],{2537:(e,o,i)=>{i.r(o),i.d(o,{assets:()=>c,contentTitle:()=>l,default:()=>g,frontMatter:()=>s,metadata:()=>r,toc:()=>d});var n=i(4848),t=i(8453);const s={id:"mobile-google-auth",title:"Setting up Google sign-in integration - \u8bbe\u7f6e Google \u767b\u5f55\u96c6\u6210"},l=void 0,r={id:"dev-guide/mobile-google-auth",title:"Setting up Google sign-in integration - \u8bbe\u7f6e Google \u767b\u5f55\u96c6\u6210",description:"- \u5728\u6b64\u5904\u521b\u5efa Firebase \u9879\u76ee\uff1ahttps://firebase.google.com/\u3002\u60a8\u9700\u8981\u4e00\u4e2a\u5df2\u7b7e\u540d\u7684 Android \u6784\u5efa\uff0c\u60a8\u4e5f\u53ef\u4ee5\u4f7f\u7528\u8c03\u8bd5\u81ea\u7b7e\u540d\u6784\u5efa\uff0c\u53ea\u9700\u83b7\u53d6\u7b7e\u540d\u54c8\u5e0c\u5373\u53ef\u3002\u5df2\u7b7e\u540d\u5e94\u7528\u7684\u5bc6\u94a5\u54c8\u5e0c\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u65b9\u5f0f\u83b7\u53d6\uff08\u5728 macOS \u4e0a\uff09\uff1a",source:"@site/docs/dev-guide/mobile-google-auth.md",sourceDirName:"dev-guide",slug:"/dev-guide/mobile-google-auth",permalink:"/handbook/docs/dev-guide/mobile-google-auth",draft:!1,unlisted:!1,editUrl:"https://github.com/jitsi/handbook/edit/master/docs/dev-guide/mobile-google-auth.md",tags:[],version:"current",lastUpdatedAt:1729006689e3,frontMatter:{id:"mobile-google-auth",title:"Setting up Google sign-in integration - \u8bbe\u7f6e Google \u767b\u5f55\u96c6\u6210"}},c={},d=[];function a(e){const o={a:"a",code:"code",li:"li",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,n.jsxs)(o.ul,{children:["\n",(0,n.jsxs)(o.li,{children:["\u5728\u6b64\u5904\u521b\u5efa Firebase \u9879\u76ee\uff1a",(0,n.jsx)(o.a,{href:"https://firebase.google.com/%E3%80%82%E6%82%A8%E9%9C%80%E8%A6%81%E4%B8%80%E4%B8%AA%E5%B7%B2%E7%AD%BE%E5%90%8D%E7%9A%84",children:"https://firebase.google.com/\u3002\u60a8\u9700\u8981\u4e00\u4e2a\u5df2\u7b7e\u540d\u7684"})," Android \u6784\u5efa\uff0c\u60a8\u4e5f\u53ef\u4ee5\u4f7f\u7528\u8c03\u8bd5\u81ea\u7b7e\u540d\u6784\u5efa\uff0c\u53ea\u9700\u83b7\u53d6\u7b7e\u540d\u54c8\u5e0c\u5373\u53ef\u3002\u5df2\u7b7e\u540d\u5e94\u7528\u7684\u5bc6\u94a5\u54c8\u5e0c\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u65b9\u5f0f\u83b7\u53d6\uff08\u5728 macOS \u4e0a\uff09\uff1a","\n",(0,n.jsx)(o.pre,{children:(0,n.jsx)(o.code,{className:"language-bash",children:"keytool -list -printcert -jarfile the-app.apk\n"})}),"\n"]}),"\n",(0,n.jsxs)(o.li,{children:["\u5c06\u751f\u6210\u7684 ",(0,n.jsx)(o.code,{children:"google-services.json"})," \u6587\u4ef6\u653e\u7f6e\u5728 ",(0,n.jsx)(o.code,{children:"android/app"})," \u4e2d\uff0ciOS \u7684 ",(0,n.jsx)(o.code,{children:"GoogleService-Info.plist"})," \u6587\u4ef6\u653e\u7f6e\u5728 ",(0,n.jsx)(o.code,{children:"ios/app"})," \u4e2d\uff08\u60a8\u53ef\u4ee5\u5728\u6b64\u6b65\u9aa4\u505c\u6b62\uff0c\u4e0d\u9700\u8981\u6267\u884c\u5411\u5bfc\u4e2d\u5efa\u8bae\u7684\u9a71\u52a8\u7a0b\u5e8f\u548c\u4ee3\u7801\u66f4\u6539\uff09\u3002"]}),"\n",(0,n.jsxs)(o.li,{children:["\u60a8\u53ef\u80fd\u5e0c\u671b\u5728\u60a8\u7684 GIT \u914d\u7f6e\u4e2d\u6392\u9664\u8fd9\u4e9b\u6587\u4ef6\uff08\u8bf7\u52ff\u5728\u5e94\u7528\u7a0b\u5e8f\u672c\u8eab\u7684 ",(0,n.jsx)(o.code,{children:".gitignore"})," \u4e2d\u6392\u9664\u5b83\u4eec\uff01\uff09\u3002"]}),"\n",(0,n.jsxs)(o.li,{children:["\u60a8\u7684\u7f51\u7edc\u5ba2\u6237\u7aef ID \u5728\u521b\u5efa Firebase \u9879\u76ee\u65f6\u4f1a\u81ea\u52a8\u751f\u6210\u3002\u53ef\u4ee5\u5728 Google \u5f00\u53d1\u8005\u63a7\u5236\u53f0\u4e2d\u627e\u5230\u5b83\u4eec\uff08",(0,n.jsx)(o.a,{href:"https://console.developers.google.com/%EF%BC%89%E3%80%82",children:"https://console.developers.google.com/\uff09\u3002"})]}),"\n",(0,n.jsxs)(o.li,{children:["\u786e\u4fdd\u60a8\u7684\u914d\u7f6e\u53cd\u6620\u6b64 ID\uff0c\u901a\u8fc7\u5728 config.js \u4e2d\u8bbe\u7f6e ",(0,n.jsx)(o.code,{children:"googleApiApplicationClientID"}),"\u3002"]}),"\n",(0,n.jsxs)(o.li,{children:["\u5c06\u60a8\u7684 iOS \u5ba2\u6237\u7aef ID\uff08plist \u6587\u4ef6\u4e2d\u7684 REVERSED_CLIENT_ID\uff09\u4f5c\u4e3a\u5e94\u7528\u7a0b\u5e8f URL \u67b6\u6784\u6dfb\u52a0\u5230 ",(0,n.jsx)(o.code,{children:"ios/app/src/Info.plist"})," \u4e2d\uff08\u66ff\u6362\u5360\u4f4d\u7b26\uff09\u3002"]}),"\n",(0,n.jsx)(o.li,{children:"\u5728\u5f00\u53d1\u8005\u63a7\u5236\u53f0\u4e2d\u542f\u7528 YouTube API \u8bbf\u95ee\uff08\u89c1\u4e0a\u6587\uff09\uff0c\u4ee5\u542f\u7528\u76f4\u64ad\u3002"}),"\n"]})}function g(e={}){const{wrapper:o}={...(0,t.R)(),...e.components};return o?(0,n.jsx)(o,{...e,children:(0,n.jsx)(a,{...e})}):a(e)}},8453:(e,o,i)=>{i.d(o,{R:()=>l,x:()=>r});var n=i(6540);const t={},s=n.createContext(t);function l(e){const o=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function r(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),n.createElement(s.Provider,{value:o},e.children)}}}]);