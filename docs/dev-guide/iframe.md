---
id: dev-guide-iframe
title: IFrame API
---

将 Jitsi Meet API 嵌入到您的网站或应用程序中，使您能够与同事、团队和利益相关者举办并提供安全的视频会议。Meet API 提供了一整套全面的会议功能。

您的 Jitsi 会议可以在任何设备上托管和参加，同时保护您的数据和隐私。您可以随时与会议参与者联系，消除旅行及其相关的不便。

IFrame API 使您能够将 Jitsi Meet 功能嵌入到您的会议应用程序中，因此您可以体验 [meet.jit.si](https://meet.jit.si/) 提供的全球分布式和高度可用的部署的全部功能。

您还可以嵌入并集成在 [meet.jit.si](https://meet.jit.si/) 平台上全球分布式和高度可用的部署。

:::note 注意
JaaS 客户，请确保您还阅读 [此处](https://developer.8x8.com/jaas/docs/iframe-api-overview)!
:::

:::tip
如果您在 Web 应用程序中使用 React，您可能想使用我们的 [React SDK](dev-guide-react-sdk)。
:::

## 集成

要在您的应用程序中启用 Jitsi Meet API，您必须使用以下 JavaScript (JS) Jitsi Meet API 库脚本之一并将其集成到您的应用程序中：

对于自托管在您的域中：

```javascript
<script src='https://<your-domain>/external_api.js'></script>
```

使用 meet.jit.si：

```javascript
<script src='https://meet.jit.si/external_api.js'></script>
```

## 移动支持

IFrame API 在移动浏览器上的工作方式与在桌面浏览器上相同。

### 在 Jitsi Meet 应用中打开会议

要使用 Jitsi Meet 应用打开会议，您可以使用我们的自定义 URL 方案，如下所示：

（假设会议为 https://meet.jit.si/test123）

* Android: `intent://meet.jit.si/test123#Intent;scheme=org.jitsi.meet;package=org.jitsi.meet;end`
* iOS: `org.jitsi.meet://meet.jit.si/test123`

这也适用于自定义服务器，只需将 `meet.jit.si` 替换为您的自定义服务器 URL。

## 创建 Jitsi Meet API 对象

在您集成了 Meet API 库后，您必须创建 Jitsi Meet API 对象。

Meet API 对象的格式为：

**`api = new JitsiMeetExternalAPI(domain, options)`**

API 对象构造函数使用以下选项：

* `domain`：用于构建会议 URL 的域名（例如，**`meet.jit.si`**）。

* `options`：包含属性的对象。

  IFrame 参数包括：

    * `roomName`：要加入的房间名称。

    * `width`：_可选._ 创建的 IFrame 宽度。

      宽度参数具有以下特征：

      - 数值表示以像素为单位的宽度。

      - 如果指定为字符串，格式为数字后跟 **`px`**、**`em`**、**`pt`** 或 **`%`**。

    * `height`：_可选._ 创建的 IFrame 的高度。

      高度参数具有以下特征：

      - 数值表示以像素为单位的高度。

      - 如果指定为字符串，格式为数字后跟 **`px`**、**`em`**、**`pt`** 或 **`%`**。

    * `parentNode`：将 IFrame 添加为子元素的 HTML DOM 元素。

    * `configOverwrite`：_可选._ 用于覆盖 [config.js] 文件中定义的选项的 JS 对象。

    * `interfaceConfigOverwrite`：_可选._ 用于覆盖 [interface_config.js] 文件中定义的选项的 JS 对象。

    * `jwt`：_可选._ [JWT](https://jwt.io/) 令牌。

    * `onload`：_可选._ IFrame 加载事件处理程序。

    * `invitees`：_可选._ 包含有关被邀请参加通话的参与者信息的对象数组。

    * `devices`：_可选._ 有关通话中使用的设备的信息映射。

    * `userInfo`：_可选._ 包含有关启动或加入会议的参与者信息（例如，电子邮件）的 JS 对象。

    * `lang`：_可选._ 默认会议语言。

    * `iceServers`：_可选._ 用于修改/删除现有 ice 服务器配置的规则对象。**注意：此属性目前是实验性的，未来可能会被删除！**

例如：

```javascript
const domain = 'meet.jit.si';
const options = {
    roomName: 'JitsiMeetAPIExample',
    width: 700,
    height: 700,
    parentNode: document.querySelector('#meet'),
    lang: 'de'
};
const api = new JitsiMeetExternalAPI(domain, options);
```

您可以使用以下内容设置通话的初始媒体设备：

```javascript
const domain = 'meet.jit.si';
const options = {
    ...
    devices: {
        audioInput: '<deviceLabel>',
        audioOutput: '<deviceLabel>',
        videoInput: '<deviceLabel>'
    },
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);
```

您可以使用 **`configOverwrite`** 和 **`interfaceConfigOverwrite`** 对象覆盖 [config.js] 文件和 [interface_config.js] 文件中设置的选项。

例如：

```javascript
const options = {
    ...
    configOverwrite: { startWithAudioMuted: true },
    interfaceConfigOverwrite: { DISABLE_DOMINANT_SPEAKER_INDICATOR: true },
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);
```

要将 JWT 令牌传递给 Jitsi Meet，请使用以下内容：

 ```javascript
const options = {
    ...
    jwt: '<jwt_token>',
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);
 ```

您可以使用以下内容设置通话的 **`userInfo`**（例如，电子邮件、显示名称）：

```javascript
var domain = "meet.jit.si";
var options = {
    ...
    userInfo: {
        email: 'email@jitsiexamplemail.com',
        displayName: 'John Doe'
    }
}
var api = new JitsiMeetExternalAPI(domain, options);
```

```javascript
export const Anchor = ({children, name}) => (
  <a
    name={name}
    id={name}
    href={"#" + name}>
    {children}
  </a>
);

<Anchor name={"ice-servers"}></Anchor>
```

您可以使用 **`iceServers`** 属性修改默认的 ice 服务器配置（**注意：此属性目前是实验性的，未来可能会被删除！**）：

```javascript
var domain = "meet.jit.si";
var options = {
    ...
    iceServers: {
        replace: [
            { // 用目标类型匹配的现有 ice 服务器的 URL 替换
                targetType: 'turn',
                urls: 'turn:example.com:443'
            },
            { // 用目标类型匹配的现有 ice 服务器的 URL 替换
                targetType: 'turns',
                urls: 'turns:example.com:443?transport=tcp'
            },
            { // 删除目标类型匹配的现有 ice 服务器
                targetType: 'stun',
                urls: null
            }
        ]
    },
    ...
}
var api = new JitsiMeetExternalAPI(domain, options);
```

配置瓦片视图：

您可以通过 **`interfaceConfigOverwrite`** 对象覆盖 [interface_config.js] 文件中的 **`TILE_VIEW_MAX_COLUMNS`** 属性来配置瓦片视图中的最大列数：

```javascript
const options = {
    ...
    interfaceConfigOverwrite: { TILE_VIEW_MAX_COLUMNS: 2 },
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);
```

:::note
**`TILE_VIEW_MAX_COLUMNS`** 接受的值范围从 1 到 5。默认值为 5。
:::


## 函数

所有函数的文档已在 [此处](/handbook/docs/dev-guide/dev-guide-iframe-functions) 中记录。

## 命令

所有命令的文档已在 [此处](/handbook/docs/dev-guide/dev-guide-iframe-commands) 中记录。

## 事件

所有事件的文档已在 [此处](/handbook/docs/dev-guide/dev-guide-iframe-events) 中记录。

[config.js]: https://github.com/jitsi/jitsi-meet/blob/master/config.js
[interface_config.js]: https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js
