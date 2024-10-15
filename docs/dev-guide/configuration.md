---
id: dev-guide-configuration
title: Configuration - 配置
---

此页面描述了 Jitsi Meet 可用的配置选项。这些选项可以在服务器端的 `config.js` 文件中设置，或在应用程序中被覆盖。

:::note
标有 🚫 的选项不能通过 `configOverwrite` 覆盖。
:::

:::warning
此页面仍在完善中，尚未涵盖所有选项。
:::

## API

### apiLogLevels

类型: `Array`

指定哪些日志应通过“log”事件传递，如果定义了相应的处理程序。

默认值: **未设置**(**unset**)

```javascript
apiLogLevels: ['warn', 'log', 'error', 'info', 'debug']
```

### buttonsWithNotifyClick

类型: `Array`

工具栏按钮的点击/触摸事件可通过 API 的 `toolbarButtonClicked` 暴露。传递按钮的键（字符串）将阻止点击/触摸操作的执行；传递带有 `key` 和 `preventExecution` 为 `false` 的对象则不会阻止执行点击/触摸操作。以下数组展示了混合模式传递按钮的方式。

默认值: **未设置**

```javascript
buttonsWithNotifyClick: [
    'camera',
    {
        key: 'chat',
        preventExecution: false
    },
    {
        key: 'closedcaptions',
        preventExecution: true
    },
    'desktop',
    'download',
    'embedmeeting',
    'etherpad',
    'feedback',
    'filmstrip',
    'fullscreen',
    'hangup',
    'help',
    {
        key: 'invite',
        preventExecution: false
    },
    'livestreaming',
    'microphone',
    'mute-everyone',
    'mute-video-everyone',
    'participants-pane',
    'profile',
    {
        key: 'raisehand',
        preventExecution: true
    },
    'recording',
    'security',
    'select-background',
    'settings',
    'shareaudio',
    'sharedvideo',
    'shortcuts',
    'stats',
    'tileview',
    'toggle-camera',
    'videoquality',
    // The add passcode button from the security dialog.
    // 安全对话框中的添加密码按钮
    {
        key: 'add-passcode',
        preventExecution: false
    },
    '__end'
]
```

### customParticipantMenuButtons

类型：`Array<{ icon: string; id: string; text: string; }>`

默认值：**未设置(unset)**

可以在参与者上下文菜单中添加自定义按钮的列表。每个按钮将有一个图标，可以是 base64 编码的图像或图像的路径，一个唯一的 ID，以及一个显示在菜单中图标旁边的文本。此自定义按钮将触发 `participantMenuButtonClick` 事件，该事件将按钮的 ID 作为 `key`，并且 `participantId` 代表点击该按钮的参与者的 ID。

```javascript
customParticipantMenuButtons: [
    {
        icon: 'data:image/svg+xml;base64,...',
        id: 'custom-button',
        text: 'Custom Button'
    }
]
```

### customToolbarButtons

类型：`Array<{ icon: string; id: string; text: string; }>`

默认值：**未设置(unset)**

可以在工具栏中添加自定义按钮的列表。每个按钮将有一个图标，可以是 base64 编码的图像或图像的路径，一个唯一的 ID，以及一个显示在菜单中图标旁边的文本。此自定义按钮将触发 `toolbarButtonClicked` 事件，该事件将按钮的 ID 作为 `key`。

```javascript
customToolbarButtons: [
    {
        icon: 'data:image/svg+xml;base64,...',
        id: 'custom-toolbar-button',
        text: 'Custom Toolbar Button'
    }
]
```

### mouseMoveCallbackInterval

类型：`Number`

触发 `mouseMoved` iframe API 事件的默认间隔（毫秒）。

默认值：`1000`

```javascript
mouseMoveCallbackInterval: 1000
```

### participantMenuButtonsWithNotifyClick

类型：`Array`

参与者上下文菜单按钮，其点击/点击事件通过 API 的 `participantMenuButtonClick` 公开。传递按钮键的字符串将阻止执行点击/点击例程；传递带有 `key` 和 `preventExecution` 标志为 false 的对象将不阻止执行点击/点击例程。下面是混合模式传递按钮的数组示例。

默认值：**未设置**

```javascript
participantMenuButtonsWithNotifyClick: [
    'allow-video',
    {
        key: 'ask-unmute',
        preventExecution: false
    },
    'conn-status',
    'flip-local-video',
    'grant-moderator',
    {
        key: 'kick',
        preventExecution: true
    },
    {
        key: 'hide-self-view',
        preventExecution: false
    },
    'mute',
    'mute-others',
    'mute-others-video',
    'mute-video',
    'pinToStage',
    'privateMessage',
    {
        key: 'remote-control',
        preventExecution: false
    },
    'send-participant-to-room',
    'verify',
]
```

### useHostPageLocalStorage

类型：`Boolean`

当通过 IFrame API 使用 Jitsi Meet 时，此属性相关。为 `true` 时，Jitsi Meet 将使用宿主页面的本地存储，而不是其自己的存储。如果浏览器未在 iframe 内持久化本地存储，则此选项非常有用。

默认值：**未设置(unset)**

```javascript
useHostPageLocalStorage: true
```

## 音频 - Audio

### audioLevelsInterval

类型：`Number`

计算音频级别的间隔（毫秒）。

默认值：`200`

```javascript
audioLevelsInterval: 200
```

### audioQuality

类型：`Object`

指定音频质量的立体声和 opusMaxAverageBitrate 值以启用高清音频。请注意，启用此选项将禁用回声消除、噪声抑制和自动增益控制（AGC）。

默认值：**未设置**

```javascript
audioQuality: {
    stereo: false,
    opusMaxAverageBitrate: null // 范围在 6000 到 510000 之间的值。
}
```

### disableAudioLevels

类型：`Boolean`

禁用音频级别的测量。

默认值：`false`

```javascript
disableAudioLevels: false
```

### ~~disableSpeakerStatsSearch~~

类型：`Boolean`

指定演讲者统计信息中是否有搜索字段。

__已弃用__ 使用 `speakerStats.disableSearch` 替代。

默认值：`false`

```javascript
disableSpeakerStatsSearch: false
```

### disabledSounds

类型：`Array`

此数组中传递的声音将被禁用。

默认值：**未设置**

```javascript
disabledSounds: [
    // 'ASKED_TO_UNMUTE_SOUND'
    // 'E2EE_OFF_SOUND'
    // 'E2EE_ON_SOUND'
    // 'INCOMING_MSG_SOUND'
    // 'KNOCKING_PARTICIPANT_SOUND'
    // 'LIVE_STREAMING_OFF_SOUND'
    // 'LIVE_STREAMING_ON_SOUND'
    // 'NO_AUDIO_SIGNAL_SOUND'
    // 'NOISY_AUDIO_INPUT_SOUND'
    // 'OUTGOING_CALL_EXPIRED_SOUND'
    // 'OUTGOING_CALL_REJECTED_SOUND'
    // 'OUTGOING_CALL_RINGING_SOUND'
    // 'OUTGOING_CALL_START_SOUND'
    // 'PARTICIPANT_JOINED_SOUND'
    // 'PARTICIPANT_LEFT_SOUND'
    // 'RAISE_HAND_SOUND'
    // 'REACTION_SOUND'
    // 'RECORDING_OFF_SOUND'
    // '_ON_SOUND'
    // 'TALK_WHILE_MUTED_SOUND'
]
```

### enableNoAudioDetection

类型：`Boolean`

启用此选项将运行 lib-jitsi-meet 的无音检测模块，如果当前选定的麦克风没有音频输入，将通知用户，并在存在有效设备时建议其他设备。

默认值：`true`

```javascript
enableNoAudioDetection: true
```

### enableNoisyMicDetection

类型：`Boolean`

启用此选项将运行 lib-jitsi-meet 的噪声检测模块，如果当前选定的麦克风有除语音以外的噪声，将通知用户。其目的是让用户知道输入可能对其他会议参与者造成不适。

默认值：`true`

```javascript
enableNoisyMicDetection: true
```

### speakerStats

类型：`Object`

与演讲者统计功能相关的选项。

属性：

* `disabled` - 指定演讲者统计是否启用。
* `disableSearch` - 指定演讲者统计中是否有搜索字段。
* `order` - 指定演讲者统计中的参与者是否应排序，以及以何种优先级排序。

默认值：

```javascript
speakerStats: {
    disabled: false,
    disableSearch: false,
    order: [
        'role', // 主持人在顶部。
        'name', // 按名称字母顺序排列。
        'hasLeft', // 离开的参与者在底部。
    ], // 数组元素的顺序决定优先级。
}
```

### ~~speakerStatsOrder~~

类型：`Array`

指定演讲者统计中的参与者是否应排序，以及以何种优先级排序。

__已弃用__ 使用 `speakerStats.order` 替代。

默认值：

```javascript
speakerStatsOrder: [
    'role', // 主持人在顶部。
    'name', // 按名称字母顺序排列。
    'hasLeft', // 离开的参与者在底部。
], // 数组元素的顺序决定优先级。
```

### startAudioMuted

类型：`Number`

在第 N 个参与者之后，每个参与者将以静音状态开始音频。

默认值：**未设置**

```javascript
startAudioMuted: 10
```

### startAudioOnly

类型：`Boolean`

以音频模式启动会议（不接收或发送视频）。

默认值：**未设置**

```javascript
startAudioOnly: false
```

### startSilent

类型：`Boolean`

启用此选项（与 #params 一起）将禁用远程参与者的本地音频输出，要恢复，需重新加载。

默认值：**未设置**

```javascript
startSilent: false
```

### startWithAudioMuted

类型：`Boolean`

以静音状态开始通话。此选项仅适用于本地。

默认值：**未设置**

```javascript
startWithAudioMuted: false
```

## 分组会议 - Breakout rooms

### breakoutRooms

类型：`Object`

与分组会议功能相关的选项。

默认值：**未设置**

属性：

* `hideAddRoomButton` - 隐藏添加分组会议房间按钮。这替代了 `hideAddRoomButton`。
* `hideAutoAssignButton` - 隐藏自动分配参与者按钮。
* `hideJoinRoomButton` - 隐藏加入分组会议房间按钮。
* `hideModeratorSettingsTab` - 隐藏打开主持人设置选项卡的按钮。
* `hideMoreActionsButton` - 隐藏更多操作按钮。
* `hideMuteAllButton` - 隐藏静音所有按钮。

```javascript
breakoutRooms: {
    hideAddRoomButton: false,
    hideAutoAssignButton: false,
    hideJoinRoomButton: false
}
```

### ~~hideAddRoomButton~~

类型：`Boolean`

__已弃用__ 使用 `breakoutRooms.hideAddRoomButton` 替代。

隐藏添加分组会议房间按钮。

默认值：`false`

```javascript
hideAddRoomButton: false
```

## 呼叫统计 - Callstats

### callStatsConfigParams

类型: `Object`

callstats 初始化配置参数，如 API 中所述 [这里](https://docs.callstats.io/docs/javascript#callstatsinitialize-with-app-secret)。

```javascript
callStatsConfigParams: {
    disableBeforeUnloadHandler: true, // 禁用 callstats.js 的 window.onbeforeunload 参数。
    applicationVersion: "app_version", // 开发者指定的应用程序版本。
    disablePrecalltest: true, // 禁用预通话测试，默认启用。
    siteID: "siteID", // 呼叫/预通话测试的站点/校园名称/ID。
    additionalIDs: { // additionalIDs 对象，包含与应用程序相关的 ID。
        customerID: "客户标识符。示例：walmart。",
        tenantID: "租户标识符。示例：monster。",
        productName: "产品名称。示例：Jitsi。",
        meetingsName: "会议名称。示例：Jitsi loves callstats。",
        serverName: "服务器/中间盒名称。示例：jvb-prod-us-east-mlkncws12。",
        pbxID: "PBX 标识符。示例：walmart。",
        pbxExtensionID: "PBX 扩展标识符。示例：5625。",
        fqExtensionID: "完全限定的扩展标识符。示例：+71 (US) +5625。",
        sessionID: "会话标识符。示例：session-12-34"
    },
    collectLegacyStats: true, // 启用 Chrome 浏览器中收集传统统计数据
    collectIP: true // 启用本地 IP 地址的收集
}
```

### callStatsID

类型: `String`

必须提供应用程序 ID 以启用向 callstats.io 发送统计数据

```javascript
callStatsID: 'my-callstats-app-id'
```

### callStatsSecret

类型: `String`

必须提供密钥以启用向 callstats.io 发送统计数据

```javascript
callStatsSecret: 'my-callstats-secret'
```

### enableDisplayNameInStats

类型: `Boolean`

启用向 callstats 发送参与者的显示名称。

```javascript
enableDisplayNameInStats: false
```

### enableEmailInStats

类型: `Boolean`

启用向 callstats 和其他分析工具发送参与者的电子邮件（如果可用）

```javascript
enableEmailInStats: false
```

### feedbackPercentage

类型: `Number`

控制在启用 callstats 时向参与者显示自动反馈的百分比。默认值为 100%。如果设置为 0，则不会请求自动反馈。

```javascript
feedbackPercentage: 100
```

## 转录 - Transcriptions

### autoCaptionOnRecord 

__弃用__ 使用 `transcription.autoTranscribeOnRecord` 代替。

### preferredTranscribingLanguage

__弃用__ 使用 `transcription.preferredLanguage` 代替。

### transcribeWithAppLanguage

__弃用__ 使用 `transcription.useAppLanguage` 代替。

### transcribingEnabled

__弃用__ 使用 `transcription.enabled` 代替。

### transcription

类型: `Object`

转录相关选项。

属性：

* `enabled` - 启用转录（在 interface_config 中，可以配置字幕和按钮）。默认值：`false`。
* `translationLanguages` - 翻译语言。可用语言可以在 ./src/react/features/transcribing/translation-languages.json 中找到。
* `useAppLanguage` - 如果为 `true`，转录器将使用应用程序语言。应用程序语言可以由参与者在其设置中明确设置，也可以根据环境自动检测，例如如果应用程序在默认使用法语的 Chrome 实例中打开，则该参与者的转录将为法语。默认值：`true`。
* `preferredLanguage` - 转录器语言。此设置仅在 `useAppLanguage` 显式设置为 `false` 时有效。可用语言可以在 [这里](https://github.com/jitsi/jitsi-meet/blob/master/react/features/transcribing/transcriber-langs.json) 找到。默认值：`'en-US'`。
* `autoTranscribeOnRecord` - 启用在开始录制时自动启用转录。默认值：`true`。

```javascript
transcription: {
    enabled: true,
    translationLanguages: ['en-US', 'es'],
    useAppLanguage: false,
    preferredLanguage: 'en-US',
    autoTranscribeOnRecord: true
}
```

## 连接 - Connection

### bosh*

类型: `String`

BOSH URL。

```javascript
bosh: '//jitsi-meet.example.com/http-bind'
```

### disableRtx

类型: `Boolean`

禁用或启用RTX（RFC 4588）。

默认值: `false`

```javascript
disableRtx: true
```

### disableSimulcast

类型: `Boolean`

启用/禁用多播支持。

默认值: `false`

```javascript
disableSimulcast: true
```

### e2ee

类型: `Object`

配置端到端加密。

```javascript
e2ee: {
    labels: {
        labelTooltip: '提示',
        description: '描述',
        label: 'E2EE',
        warning: '警告'
    },
    externallyManagedKey: false
}
```

### e2eping

类型: `Object`

端到端（参与者对参与者）ping相关的选项。

属性:

* `enabled` - 是否启用端到端ping。
* `numRequests` - 等待响应的数量。
* `maxConferenceSize` - 启用端到端ping的最大会议规模。
* `maxMessagesPerSecond` - 整个会议每秒端到端ping消息的最大数量。用于控制消息的发送速度以减少后端负载。

```javascript
e2eping: {
    enabled: false,
    numRequests: 5,
    maxConferenceSize: 200,
    maxMessagesPerSecond: 250
}
```

### enableEncodedTransformSupport

类型: `Boolean`

启用支持浏览器中的编码转换。这允许在Safari浏览器中启用E2EE，前提是浏览器中启用了相应的标志。**实验功能**。

```javascript
enableEncodedTransformSupport: false
```

### enableForcedReload 🚫

类型: `Boolean`

当由于桥连接中断导致通话迁移时，启用客户端强制重新加载。

```javascript
enableForcedReload: true
```

### enableIceRestart

类型: `Boolean`

启用LJM中的ICE重启逻辑，并在ICE失败时显示页面重新加载的覆盖层。目前默认禁用，因为当Octo启用时，它会导致信令问题。另外，当执行“ICE重启”（实际上不是一个真正的ICE重启）时，客户端保持TCC序列号计数器，而桥则重置它。桥发送的媒体包从0开始的TCC序列号。

```javascript
enableIceRestart: true
```

### gatherStats

类型: `Boolean`

是否启用`TraceablePeerConnection`中的统计收集。这对调试（WebRTC统计的后处理/分析）很有用，正如在jitsi-meet-torture带宽估算测试中所做的那样。

```javascript
gatherStats: false
```

### hosts

类型: `Object`

应用连接的URL。

属性

* `domain` - XMPP域名
* `anonymousdomain` - 使用认证时，访客用户的域名。
* `authdomain` - 认证用户的域名。默认值为`domain`。
* `focus` - Focus组件的域名。默认值为 **focus.`domain`**。
* `muc` - XMPP MUC域名。

```javascript
hosts: {
    domain: 'jitsi-meet.example.com',
    anonymousdomain: 'guest.example.com',
    authdomain: 'jitsi-meet.example.com',
    focus: 'focus.jitsi-meet.example.com',
    muc: 'conference.jitsi-meet.example.com'
}
```

### p2p

类型: `Object`

点对点模式：当只有两个参与者时使用（如果启用）。

属性:

* `enabled` - 启用点对点模式。当启用时，如果房间中只有2个参与者，系统会尝试建立直接连接。如果成功，会议将停止通过JVB发送数据，而改为使用点对点连接。当第3个参与者加入时，会议将切换回JVB连接。
* `iceTransportPolicy` - 设置点对点连接的ICE传输策略。目前可用的值为`all`和`relay`，但未来可能会更改。枚举在[WebRTC标准](https://www.w3.org/TR/webrtc/#rtcicetransportpolicy-enum)中定义。如果未设置，默认值为`all`。
* `codecPreferenceOrder` - 提供一种方式在桌面端设置编解码器的优先顺序。
* `mobileCodecPreferenceOrder` - 提供一种方式在移动设备（包括React Native和移动浏览器端点）上设置编解码器的优先顺序。
* `preferredCodec` - __已弃用__ 使用`codecPreferenceOrder`或`mobileCodecPreferenceOrder`代替。
* `disabledCodec` - __已弃用__ 使用`codecPreferenceOrder`或`mobileCodecPreferenceOrder`代替。
* `backToP2PDelay` - 第三位参与者离开后，等待多长时间再切换回点对点模式（用于过滤页面重新加载情况）。
* `stunServers` - 点对点连接中将使用的STUN服务器。

```javascript
p2p: {
    enabled: true,
    enableUnifiedOnChrome: false,
    iceTransportPolicy: 'all',
    backToP2PDelay: 5,
    stunServers: [
        { urls: 'stun:jitsi-meet.example.com:3478' },
        { urls: 'stun:meet-jit-si-turnrelay.jitsi.net:443' }
    ]
}
```

### pcStatsInterval

类型: `Number`

调用`PeerConnection.getStats()`的间隔。

默认值: `10000`

```javascript
pcStatsInterval: 50000
```

### peopleSearchQueryTypes

类型: `Array`

在会议中邀请人时可以查询的实体类型。有效值为"phone"、"room"、"sip"、"user"、"videosipgw"和"email"。Jitsi实体类型的认证通过传递jwt完成，外部实体类型（如email）的认证通过传递另一种令牌（如peopleSearchTokenLocation）完成。

默认值: `[]`

```javascript
peopleSearchQueryTypes: ["user", "email"]
```

### peopleSearchUrl

类型: `String`

用于邀请对话框自动补全的目录端点。期望的响应格式是一个对象数组。每个对象应按以下格式进行。

```javascript
{
    id: int, // 实体ID
    type: string, // 实体类型（phone, room, user, email等）
    name: string, // 实体显示名称
    avatar?: string, // 实体头像的完整URL，可选
    number?: string, // 电话号码，必需
}
```

默认值: `""`

```javascript
peopleSearchUrl: "https://myservice.com/api/people"
```

### inviteServiceUrl

类型: `String`

发送邀请请求的端点。请求以POST方式发送，POST的内容为对象数组，格式与`peopleSearchUrl`的响应体相同。

默认值: `""`

```javascript
inviteServiceUrl: "https://myservice.com/api/invite"
```

### peopleSearchTokenLocation

类型: `String`

用于在目录中进行身份验证（如邮箱）。表示在localStorage中存储备用认证令牌的键名。如果未设置JWT值，将使用此备用令牌，并以`Authorization: Bearer`头部发送。

默认值: `""`

```javascript
peopleSearchTokenLocation: "service_token"
```

### useTurnUdp

类型: `Boolean`

使用TURN/UDP服务器连接jitsi-videobridge（默认情况下，TURN/UDP被过滤，因为桥本身通常可以通过UDP连接）。

```javascript
useTurnUdp: false
```

### webrtcIceTcpDisable

类型: `Boolean`

通过在信令中过滤本地和远程的TCP候选者来禁用ICE/TCP。

```javascript
webrtcIceTcpDisable: false
```

### webrtcIceUdpDisable

类型: `Boolean`

通过在信令中过滤本地和远程的UDP候选者来禁用ICE/UDP。

```javascript
webrtcIceUdpDisable: false
```

### websocket 🚫

类型: `String`

WebSocket URL。

```javascript
websocket: 'wss://jitsi-meet.example.com/xmpp-websocket'
```

## 共享文档Etherpad - Etherpad

### etherpad_base

类型: `String`

如果设置，将在右下角菜单添加一个“打开共享文档”链接，点击后将打开一个etherpad文档。

```javascript
etherpad_base: 'https://your-etherpad-installati.on/p/'
```

### openSharedDocumentOnJoin

类型: `Boolean`

如果启用了etherpad集成，将此设置为`true`时，参与者加入时会自动打开etherpad文档。此设置不影响移动应用程序，因为打开etherpad会遮盖会议控制，在这种情况下最好让用户自行选择是否打开etherpad。

```javascript
openSharedDocumentOnJoin: false
```

## 影片条 - Filmstrip

### disableFilmstripAutohiding

类型: `Boolean`

在屏幕宽度低于某个阈值时，阻止影片条自动隐藏。

默认值: `false`

```javascript
disableFilmstripAutohiding: true
```

### filmstrip

类型: `Object`

与影片条相关的选项。

默认值: **未设置**

属性:

* `disableResizable` - 禁止用户调整影片条大小。这也允许通过interfaceConfig选项配置影片条（宽度，瓷砖长宽比）。
* `disableStageFilmstrip` - 禁用舞台影片条（在垂直影片条旁边显示多个参与者）。

```javascript
filmstrip: {
    disableResizable: true,
    disableStageFilmstrip: false
}
```

## 面部特征点 - FaceLandmarks

### faceLandmarks

类型: `Object`

与面部特征点功能相关的选项。

属性：

* `enableFaceCentering` - 通过共享面部坐标来启用视频中的面部居中。
* `enableFaceExpressionsDetection` - 启用从视频中检测面部表情。
* `enableDisplayFaceExpressions` - 启用在发言者统计中显示面部表情。
* `enableRTCStats` - 启用对面部特征点的匿名统计收集。
* `faceCenteringThreshold` - 发送新面部居中坐标数据所需的最小面部移动百分比阈值。
* `captureInterval` - 处理新图像捕获以检测面部特征点的毫秒数。

```javascript
faceLandmarks: {
        enableFaceCentering: false,
        enableFaceExpressionsDetection: false,
        enableDisplayFaceExpressions: false,
        enableRTCStats: false,
        faceCenteringThreshold: 20,
        captureInterval: 1000
},
```

## Giphy

### giphy

类型: `Object`

Giphy集成的设置。

属性：

* `enabled` - 功能是否启用。
* `sdkKey` - 来自Giphy的SDK API密钥。
* `displayMode` - 显示模式可以是：
  - `tile` - 在发送GIF的参与者的瓷砖上显示GIF。
  - `chat` - 作为消息在聊天中显示GIF。
  - `all` - 以上所有。这是默认选项。
* `tileTime` - GIF在瓷砖上显示的时间（以毫秒为单位）。
* `rating` - 根据受众评级限制结果：
  - `g` - 被广泛接受为在公共环境中合适。这是默认选项。
  - `pg` - 在公共环境中常见，但不如广泛接受为合适。
  - `pg-13` - 通常不被看到，除非被寻找，但仍然常见。
  - `r` - 通常不被看到，除非被寻找，并且在看到时可能被认为令人不安。

```javascript
giphy: {
    enabled: true,
    sdkKey: 'example-key',
    displayMode: 'tile',
    tileTime: 7000,
    rating: 'pg'
}
```

## Gravatar

### gravatar

类型: `Object`

用于Gravatar兼容服务的设置。

属性：

* `baseUrl` 🚫 - Gravatar兼容服务的基本URL。默认值为Gravatar。
* `disabled` - 如果Gravatar应被禁用，则为真。

```javascript
gravatar: {
    baseUrl: 'https://www.gravatar.com/avatar/',
    disabled: false
}
```

### ~~gravatarBaseURL~~ 🚫

类型: `String`

__已弃用__ 使用 `gravatar.baseUrl` 替代。

Gravatar兼容服务的基本URL。

默认值: 'https://www.gravatar.com/avatar/'

```javascript
gravatarBaseURL: 'https://www.gravatar.com/avatar/'
```

## LastN

### channelLastN

类型: `Number`

频道“last N”属性的默认值。-1表示无限制。

```javascript
channelLastN: -1
```

### lastNLimits 🚫

类型: `Object`

根据会议参与者人数使用不同的“last N”值。对象中的键表示参与者人数，值为参与者人数达到或超过时要使用的“last N”。

在给定的示例映射中，只要会议中有至少5人但少于29人，“last N”将设置为20。当第30个参与者加入时，将降低为15。在达到第一个阈值之前，将使用`channelLastN`作为默认值。

```javascript
lastNLimits: {
    5: 20,
    30: 15,
    50: 10,
    70: 5,
    90: 2
}
```

### startLastN

类型: `Number`

提供一种通过UI控制lastN值的方式。当startLastN存在时，会议以startLastN的last-n值开始，选择质量水平时将使用channelLastN值，通过“管理视频质量”滑块。

```javascript
startLastN: 1
```

## 大厅 - Lobby

### ~~autoKnockLobby~~

类型: `Boolean`

__已弃用__ 使用 `lobby.autoKnock` 替代。

如果启用了大厅，则会自动开始敲门。

```javascript
autoKnockLobby: false
```

### ~~enableLobbyChat~~

类型: `Boolean`

__已弃用__ 使用 `lobby.enableChat` 替代。

启用大厅聊天。

```javascript
enableLobbyChat: false
```

### ~~hideLobbyButton~~

类型: `Boolean`

__已弃用__ 使用 `securityUi.hideLobbyButton` 替代。

隐藏大厅按钮。

```javascript
hideLobbyButton: false
```

### lobby

类型: `Object`

与大厅界面相关的选项。

默认值: **未设置**

属性：

* `autoKnock` - 如果启用了大厅，则会自动开始敲门。替代`autoKnockLobby`。
* `enableChat` - 启用大厅聊天。替代`enableLobbyChat`。

```javascript
lobby: {
    autoKnock: true,
    enableChat: false
}
```

## 会议主持人 - Moderator

### disableModeratorIndicator

类型: `Boolean`

隐藏会议主持人指示器。

默认值: `false`

```javascript
disableModeratorIndicator: true
```

### disableReactionsModeration

类型: `Boolean`

禁用反应的审核功能。

默认值: `false`

```javascript
disableReactionsModeration: true
```

### disableRemoteMute

类型: `Boolean`

禁用对远程参与者的静音操作。

默认值: `false`

```javascript
disableRemoteMute: true
```

## 通知 - Notifications

### notifications

类型: `Array`

使用此数组配置将显示给用户的通知。项目对应于该通知的标题或描述键。某些通知的显示还依赖于其他内部逻辑，因此在此处添加它们并不能确保它们始终显示。

该属性的假值将导致所有通知启用（例如 null、undefined、false）。

```javascript
notifications: []
```

### disabledNotifications

类型: `Array`

要禁用的通知列表。与上述设置配合使用。

```javascript
disabledNotifications: [
    'notify.chatMessages', // 在聊天窗口关闭时收到聊天消息时显示
    'notify.grantedTo', // 当授予参与者主持人权限时显示
]
```

## 参与者面板 - Participants Pane

### participantsPane

类型: `Object`

与参与者面板相关的选项。

默认: **未设置**

属性：

* `hideModeratorSettingsTab` - 隐藏打开主持人设置选项卡的按钮。
* `hideMoreActionsButton` - 隐藏更多操作按钮。
* `hideMuteAllButton` - 隐藏静音所有按钮。

```javascript
participantsPane: {
    hideModeratorSettingsTab: false,
    hideMoreActionsButton: false,
    hideMuteAllButton: false
}
```

## 录制 - Recording

### dropbox

类型: `Object`

启用Dropbox集成。

属性：

* `appKey` - 您的应用程序密钥。
* `redirectURI` - 用户认证后重定向的URL，默认使用

```javascript
dropbox: {
    appKey: 'DROPBOX_APP_KEY',
    redirectURI: 'https://jitsi-meet.example.com/subfolder/static/oauth.html'
}
```

### fileRecordingsEnabled

类型: `Boolean`

是否启用文件录制。

```javascript
fileRecordingsEnabled: false
```

### fileRecordingsServiceEnabled 🚫

类型: `Boolean`

当启用像Dropbox这样的集成时，仅会显示该集成，通过启用fileRecordingsServiceEnabled，既显示集成又显示通用录制服务（其配置和存储类型取决于jibri配置）。

```javascript
fileRecordingsServiceEnabled: true
```

### fileRecordingsServiceSharingEnabled 🚫

类型: `Boolean`

是否显示与其他人（例如会议参与者）共享文件录制的可能性，基于后端的实际实现。

```javascript
fileRecordingsServiceSharingEnabled: false
```

### hideRecordingLabel

类型: `Boolean`

设置录制标签为自动隐藏，而不是始终在屏幕上显示。

默认: `false`

```javascript
hideRecordingLabel: true
```

### localRecording

类型: `Object`

设置本地录制配置。

属性：

* `disable` - 是否禁用该功能。
* `notifyAllParticipants` - 是否在本地录制开始时通知所有参与者。

```javascript
localRecording: {
    disable: false,
    notifyAllParticipants: true
}
```

### recordingLimit 🚫

类型: `Object`

录制限制通知的选项。

属性：

* `limit` - 录制限制（分钟）。注意：此数字出现在通知文本中，但不强制执行实际录制时间限制。应在jibri中进行配置！
* `appName` - 具有无限录制的应用程序名称。
* `appURL` - 具有无限录制的应用程序的URL。

```javascript
recordingLimit: {
    limit: 60,
    appName: 'Unlimited recordings APP',
    appURL: 'https://unlimited.recordings.app.com/'
}
```

### recordings

类型: `Object`

录制功能的选项。

属性：

* `recordAudioAndVideo` - 如果为真（默认），则在录制对话框中默认选择录制音频和视频。
* `suggestRecording` - 如果为真，则在会议开始时显示通知，并带有启动录制的行动按钮（供有此权限的用户使用）。
* `showPrejoinWarning` - 如果为真，则在预加入屏幕中显示警告标签，指出您加入的通话可能会被录制。

```javascript
recordings: {
    recordAudioAndVideo: true,
    suggestRecording: false,
    showPrejoinWarning: true
}
```

## 屏幕共享 - Screen Sharing

### desktopSharingFrameRate

类型: `Object`

可选的桌面共享帧率选项。

默认: `{
    min: 5,
    max: 5
}`

```javascript
desktopSharingFrameRate: {
    min: 3,
    max: 10
}
```

### disableScreensharingVirtualBackground

类型: `Boolean`

禁用将屏幕共享用作虚拟背景的功能。

```javascript
disableScreensharingVirtualBackground: false
```

### screenshotCapture

类型: `Object`

屏幕截图捕获功能的选项。

属性：

* `enabled` - 启用该功能。
* `mode` - 屏幕截图捕获功能的模式。可以是 'recording' - 仅在录制也开启时进行屏幕共享截图，或 'always' - 始终进行屏幕共享截图。

```javascript
screenshotCapture: {
    enabled: true,
    mode: 'recording'
}
```

## 安全用户界面 - SecurityUi

### securityUi

类型: `Object`

与安全相关的用户界面元素选项。

默认: **未设置**

属性：

* `hideLobbyButton` - 隐藏大厅按钮。替换 `hideLobbyButton`。
* `disableLobbyPassword` - 隐藏设置和输入大厅密码的选项。

```javascript
securityUi: {
    hideLobbyButton: true,
    disableLobbyPassword: false
}
```

## 测试 - Testing

### testing

类型: `Object`

实验性功能。

默认: **未设置**

属性：

* `assumeBandwidth` - 允许从用户界面设置自定义带宽值。
* `disableE2EE` - 禁用端对端加密功能。用于调试与可插入流相关的问题。
* `mobileXmppWsThreshold` - 为给定数量的用户启用XMPP WebSocket（而不是BOSH）。
* `p2pTestMode` - P2P测试模式在会议中有两个参与者时禁用自动切换到P2P。
* `testMode` - 启用由jitsi-meet-torture消耗的测试特定功能。
* `noAutoPlayVideo` - 禁用*所有*新创建的视频元素的自动播放行为。这在客户端运行在资源有限的主机上时非常有用。

```javascript
testing: {
    assumeBandwidth: true,
    disableE2EE: false,
    mobileXmppWsThreshold: 10, // 为10%的用户启用移动设备上的XMPP WebSockets
    p2pTestMode: false,
    testMode: false,
    noAutoPlayVideo: false
}
```

## 视频 - Video

### constraints

类型: `Object`

用于视频捕获的符合W3C规范的视频约束。目前由返回true的浏览器使用lib-jitsi-meet的`util#browser#usesNewGumFlow`。约束与该配置的分辨率值独立。默认请求理想分辨率为720p。

```javascript
constraints: {
    video: {
        height: {
            ideal: 720,
            max: 720,
            min: 240
        }
    }
}
```

### disableAddingBackgroundImages

类型: `Boolean`

当为真时，用户无法添加更多图像作为虚拟背景。只有默认图像可用。

```javascript
disableAddingBackgroundImages: true
```

### disableH264

类型: `Boolean`

如果设置为true，禁用H.264视频编解码器，通过从SDP中删除它。

```javascript
disableH264: true
```

### disableLocalVideoFlip

类型: `Boolean`

禁用本地视频的翻转视频选项（从上下文菜单中）。

```javascript
disableLocalVideoFlip: true
```

### disableSelfView

类型: `Boolean`

禁用自视图图块（从图块视图和影片条中隐藏）。

```javascript
disableSelfView: true
```

### doNotFlipLocalVideo

类型: `Boolean`

用于取消设置本地视频的默认翻转状态的属性。当设置为 `true` 时，本地（自）视频将不再镜像。

```javascript
doNotFlipLocalVideo: true
```

### maxFullResolutionParticipants

类型: `Boolean`

在图块视图模式下，多少参与者之前接收的视频质量从HD降低到SD？使用 `-1` 禁用。

```javascript
maxFullResolutionParticipants: 5
```

### ~~preferH264~~

类型: `Boolean`

__已弃用__ 请在 `videoQuality` 部分使用 `preferredCodec` 替代。

优先使用H.264视频编解码器（如果支持）。注意，建议不要这样做，因为在使用H.264时不支持多路复用。对于1对1通话，此设置默认启用，可以在P2P部分进行切换。

### resolution

类型: `Number`

设置本地视频的首选分辨率（高度）。

默认: `720`

```javascript
resolution: 1080
```

### startVideoMuted

类型: `Number`

第N个参与者之后的每位参与者将开始时视频静音。

```javascript
startVideoMuted: 5
```

### startWithVideoMuted

类型: `Boolean`

以视频静音开始通话。仅适用于本地。

```javascript
startWithVideoMuted: true
```

### videoQuality

类型: `Object`

指定客户端的视频质量优化设置。

属性：

* `codecPreferenceOrder` - 提供一种在基于桌面的端点上设置编解码器优先级的方法。

```javascript
codecPreferenceOrder: [ 'AV1', 'VP9', 'VP8', 'H264' ],
```

* `mobileCodecPreferenceOrder` - 提供一种在移动设备上设置编解码器优先级的方法，包括RN和基于移动浏览器的端点。

```javascript
codecPreferenceOrder: [ 'VP8', 'H264', 'VP9' ],
```

编解码器特定的可扩展模式和最大比特率设置。

```javascript
av1: {
    maxBitratesVideo: {
        low: 100000,
        standard: 300000,
        high: 1000000,
        fullHd: 2000000,
        ultraHd: 4000000,
        ssHigh: 2500000
    },
    scalabilityModeEnabled: true,
    useSimulcast: false,
    useKSVC: true
},
h264: {
    maxBitratesVideo: {
        low: 200000,
        standard: 500000,
        high: 1500000,
        fullHd: 3000000,
        ultraHd: 6000000,
        ssHigh: 2500000
    },
    scalabilityModeEnabled: true
},
vp8: {
    maxBitratesVideo: {
        low: 200000,
        standard: 500000,
        high: 1500000,
        fullHd: 3000000,
        ultraHd: 6000000,
        ssHigh: 2500000
    },
    scalabilityModeEnabled: false
},
vp9: {
    maxBitratesVideo: {
        low: 100000,
        standard: 300000,
        high: 1200000,
        fullHd: 2500000,
        ultraHd: 5000000,
        ssHigh: 2500000
    },
    scalabilityModeEnabled: true,
    useSimulcast: false,
    useKSVC: true
},
```

* `disabledCodec` - __已弃用__ 请使用 `codecPreferenceOrder` 或 `mobileCodecPreferenceOrder` 替代。

* `preferredCodec` - __已弃用__ 请使用 `codecPreferenceOrder` 或 `mobileCodecPreferenceOrder` 替代。

* `minHeightForQualityLvl` - 此选项可用于覆盖与应用中使用的视频质量级别相对应的缩略图高度的默认阈值。在撰写本文时，允许的级别为：

  *    `low` - 低质量级别（在撰写时为180p）
  *    `standard` - 中等质量级别（360p）
  *    `high` - 高质量级别（720p）

  键应为正数，表示该质量级别的最小缩略图高度。使用默认配置值后，应用程序将在缩略图高度至少为360像素时使用“低”质量。如果缩略图高度达到720像素，则应用程序将切换到高质量。

## 白板 - Whiteboard

### whiteboard

类型: `Object`

与Excalidraw白板集成相关的选项。

默认: **未设置**

属性：

* `enabled` - 此功能是否启用。
* `collabServerBaseUrl` - 用于支持白板协作的 [服务器](https://github.com/jitsi/excalidraw-backend)。
* `userLimit` - 白板的用户访问限制，引入作为控制性能的手段。
* `limitUrl` - 有关白板及其使用限制的更多信息的链接。

```javascript
whiteboard: {
    enabled: true,
    collabServerBaseUrl: 'https://excalidraw-backend.example.com',
    userLimit: 25,
    limitUrl: 'https://example.com/blog/whiteboard-limits'
}
```
