---
id: dev-guide-react-sdk
title: React SDK
---

Jitsi Meet React SDK 提供与 Jitsi Meet 应用相同的用户体验，以可自定义的方式嵌入到您的应用中。

:::important
需要 React 16 或更高版本。
:::

## 使用 SDK 的示例应用

如果您想看看如何将 Jitsi Meet React SDK 轻松集成到 React 应用中，请查看我们的 [示例](https://github.com/jitsi/jitsi-meet-react-sdk/tree/main/example)。

## 安装

要在应用中访问 React SDK 模块，您需要将其作为依赖项安装：

```bash
npm install @jitsi/react-sdk
```

## 模块

SDK 提供两个具有类似属性的组件，旨在用于不同的用例。

### JitsiMeeting

在 React 项目中直接与自定义域一起使用：

```jsx
<JitsiMeeting
    domain={YOUR_DOMAIN}
    roomName="PleaseUseAGoodRoomName"
    configOverwrite={{
        startWithAudioMuted: true,
        disableModeratorIndicator: true,
        startScreenSharing: true,
        enableEmailInStats: false
    }}
    interfaceConfigOverwrite={{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
    }}
    userInfo={{
        displayName: 'YOUR_USERNAME'
    }}
    onApiReady={(externalApi) => {
        // 在这里您可以为 Jitsi Meet 外部 API 附加自定义事件监听器
        // 您也可以将其存储以执行命令
    }}
    getIFrameRef={(iframeRef) => { iframeRef.style.height = '400px'; }}
/>
```

#### `JitsiMeeting` 组件特有属性

* `domain`：可选。用于检索初始化 IFrame 的 external_api.js 文件的字段。如果省略，则默认为 `meet.jit.si`。

### JaaSMeeting

在 React 项目中直接与 `8x8.vc` 域一起使用：

```jsx
<JaaSMeeting
    appId={YOUR_APP_ID}
    roomName="PleaseUseAGoodRoomName"
    jwt={YOUR_VALID_JWT}
    configOverwrite={{
        disableThirdPartyRequests: true,
        disableLocalVideoFlip: true,
        backgroundAlpha: 0.5
    }}
    interfaceConfigOverwrite={{
        VIDEO_LAYOUT_FIT: 'nocrop',
        MOBILE_APP_PROMO: false,
        TILE_VIEW_MAX_COLUMNS: 4
    }}
    spinner={SpinnerView}
    onApiReady={(externalApi) => { ... }}
/>
```

...或与 `stage.8x8.vc` 域一起使用：

```js
<JaaSMeeting
    appId={YOUR_APP_ID}
    roomName="PleaseUseAGoodRoomName"
    ...
    useStaging={true}
/>
```

#### `JaaSMeeting` 组件特有属性

* `appId`：必填。提供一个独立的上下文并为房间名称加上前缀。
* `useStaging`：可选。指示是否使用暂存环境。

## 公共属性

组件模块支持与 Jitsi Meet IFrame 相似的自定义。以下属性可以传递给您的 `JitsiMeeting` 或 `JaaSMeeting` 实例。

* `roomName`：必填。要加入的房间名称。

* `configOverwrite`：可选。用于覆盖在 [config.js] 文件中定义的选项的 JS 对象。

* `interfaceConfigOverwrite`：可选。用于覆盖在 [interface_config.js] 文件中定义的选项的 JS 对象。

* `jwt`：可选。JWT（[JWT](https://jwt.io/)）令牌。

* `invitees`：可选。包含被邀请参与通话的参与者信息的对象数组。

* `devices`：可选。关于在通话中使用的设备的信息映射。

* `userInfo`：可选。包含开始或加入会议的参与者信息的 JS 对象（例如，电子邮件）。

* `release`：可选。关于 `stage.8x8.vc` 或 `8x8.vc` 发布版本的信息。期望格式为：`release-1234`。

* `spinner`：可选。IFrame 加载时显示的自定义加载动画。

* `onApiReady`：可选。用于事件和命令的外部 API 引用。

* `onReadyToClose`：可选。会议准备关闭时的回调。

* `getIFrameRef`：可选。IFrame 使用的父节点。

[config.js]: https://github.com/jitsi/jitsi-meet/blob/master/config.js
[interface_config.js]: https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js
