---
id: dev-guide-ljm-api
title: lib-jitsi-meet API (low level) - lib-jitsi-meet API（低级 API）
---

You can use Jitsi Meet API to create Jitsi Meet video conferences with a custom GUI.

## Installation

To embed Jitsi Meet API in your application you need to add Jitsi Meet API library

```html
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://meet.jit.si/libs/lib-jitsi-meet.min.js"></script>
```

Now you can access Jitsi Meet API through the `JitsiMeetJS` global object.

## Getting Started

1. The first thing you must do in order to use Jitsi Meet API is to initialize `JitsiMeetJS` object:

```javascript
JitsiMeetJS.init();
```

2. Then you must create the connection object:


```javascript
var connection = new JitsiMeetJS.JitsiConnection(null, null, options);
```


3. Now we can attach some listeners to the connection object and establish the server connection:

```javascript
connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, onConnectionFailed);
connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);

connection.connect();
```

4. After you receive the `CONNECTION_ESTABLISHED` event you are to create the `JitsiConference` object and
also you may want to attach listeners for conference events (we are going to add handlers for remote track, conference joined, etc. ):


```javascript
room = connection.initJitsiConference("conference1", confOptions);
room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
```

5. You also may want to get your local tracks from the camera and microphone:
```javascript
JitsiMeetJS.createLocalTracks().then(onLocalTracks);
```

NOTE: Adding listeners and creating local streams are not mandatory steps.

6. Then you are ready to create / join a conference :

```javascript
room.join();
```

After that step you are in the conference. Now you can continue with adding some code that will handle the events and manage the conference.

## Components

Jitsi Meet API has the following components:

* JitsiMeetJS

* JitsiConnection

* JitsiConference

* JitsiTrack

* JitsiTrackError

## Usage

:::note NOTE
JaaS customers, please follow [this example](https://github.com/jitsi/ljm-jaas-example) or check out the [live demo](https://jitsi.github.io/ljm-jaas-example).
:::

### JitsiMeetJS

您可以通过 `JitsiMeetJS` 对象访问以下方法和对象。

*  `JitsiMeetJS.init(options)` - 此方法初始化 Jitsi Meet API。
   `options` 参数是一个包含以下属性的 JS 对象：
    - `useIPv6` - 布尔属性
    - `disableSimulcast` - 布尔属性。启用/禁用多路复用。
    - `enableWindowOnErrorHandler` - 布尔属性（默认为 false）。启用/禁用全局 onerror 处理程序（window.onerror）。
    - `disableThirdPartyRequests` - 如果为 true，则禁用 callstats，并且不会包含 callstats API。
    - `enableAnalyticsLogging` - 布尔属性（默认为 false）。启用/禁用分析日志记录。
    - `externalStorage` - 实现存储接口的对象。如果指定，则使用该对象代替 `localStorage` 存储数据。
    - `callStatsCustomScriptUrl` - （可选）访问 callstats 客户端脚本的自定义 URL。
    - `useTurnUdp` - 布尔属性（默认为 false）。启用通过 UDP 进行 TURN 的 JVB。此选项禁用是因为不是非常有用（如果客户端可以使用 UDP，则可能也可以直接通过 UDP 连接到 JVB；但当已知 UDP TURN 在网络中被列入白名单时，启用 UDP TURN 仍然可能有用）。

*  `JitsiMeetJS.JitsiConnection` - `JitsiConnection` 构造函数。您可以使用它创建新的服务器连接。

*  `JitsiMeetJS.setLogLevel` - 更改库的日志级别。例如，要仅显示错误消息，您应该执行：

```javascript
JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
```

* `JitsiMeetJS.createLocalTracks(options)` - 创建媒体轨道，并通过 `Promise` 对象返回。如果被拒绝，则将 `JitsiTrackError` 实例传递给 catch 块。
  - `options` - JS 对象，包含本地媒体轨道的配置选项。您可以更改以下属性：
    1. `devices` - 传递给 GUM 的设备数组 - "desktop"、"video" 和 "audio"。如果该属性未设置，GUM 将尝试获取所有可用设备。
    2. `resolution` - 本地视频的首选分辨率。
    3. `constraints` - 创建轨道的首选编码属性（在浏览器的新版本中替代 "resolution"）。
    4. `cameraDeviceId` - 将要使用的视频设备的设备 ID。
    5. `micDeviceId` - 将要使用的音频设备的设备 ID。
    6. `minFps` - 视频流的最小帧率（传递给 GUM）。
    7. `maxFps` - 视频流的最大帧率（传递给 GUM）。
    8. `desktopSharingSourceDevice` - 应用于屏幕共享的视频输入源的设备 ID 或标签。
    9. `facingMode` - 摄像头的朝向模式（可能值 - 'user'、'environment'）。
    10. `firePermissionPromptIsShownEvent` - 可选布尔参数。如果设置为 `true`，则在浏览器显示 gUM 权限提示时，将触发 `JitsiMediaDevicesEvents.PERMISSION_PROMPT_IS_SHOWN`。
    11. `fireSlowPromiseEvent` - 可选布尔参数。如果设置为 `true`，则当浏览器花费过长时间来解析 gUM promise 时，将触发 `JitsiMediaDevicesEvents.USER_MEDIA_SLOW_PROMISE_TIMEOUT`。此事件与上述 `JitsiMediaDevicesEvents.PERMISSION_PROMPT_IS_SHOWN` 事件是互斥的。
  - `firePermissionPromptIsShownEvent` - __已弃用__。请使用 options.firePermissionPromptIsShownEvent。

* `JitsiMeetJS.createTrackVADEmitter(localAudioDeviceId, sampleRate, vadProcessor)` - 创建一个 TrackVADEmitter 服务，将音频轨道连接到 VAD（语音活动检测）处理器，以获得单个 PCM 音频样本的 VAD 评分。
  - `localAudioDeviceId` - 目标本地音频设备。
  - `sampleRate` - 发射器将运行的采样率。可能的值为 256、512、1024、4096、8192、16384。传递其他值将默认为最接近的邻居，即提供 4096 的值意味着发射器将每次处理 4096 个 PCM 样本的包，较高的值意味着更长的调用，较低的值意味着更多的调用但更短的时间。
  - `vadProcessor` - 执行 PCM 样本计算的 VAD 处理器。处理器需要实现以下函数：
    - `getSampleLength()` - 返回 calculateAudioFrameVAD 接受的样本大小。
    - `getRequiredPCMFrequency()` - 返回处理器工作的 PCM 频率，即（16KHz、44.1 KHz 等）。
    - `calculateAudioFrameVAD(pcmSample)` - 处理 32 位浮点 PCM 样本，其大小为 getSampleLength。

* `JitsiMeetJS.enumerateDevices(callback)` - __已弃用__。请使用 `JitsiMeetJS.mediaDevices.enumerateDevices(callback)` 替代。
* `JitsiMeetJS.isDeviceChangeAvailable(deviceType)` - __已弃用__。请使用 `JitsiMeetJS.mediaDevices.isDeviceChangeAvailable(deviceType)` 替代。
* `JitsiMeetJS.isDesktopSharingEnabled()` - 如果支持桌面共享，则返回 true；否则返回 false。注意：该方法只能在 `JitsiMeetJS.init(options)` 完成后使用，否则结果将始终为 null。
* `JitsiMeetJS.getActiveAudioDevice()` - 遍历系统中的所有音频设备，返回有关一个活跃设备的信息，即具有音频信号的设备。返回一个 Promise，解析为一个具有以下结构的对象：
  - `deviceId` - 包含找到的活跃音频轨道的设备 ID 的字符串。
  - `deviceLabel` - 包含音频设备标签的字符串。
* `JitsiMeetJS.getGlobalOnErrorHandler()` - 返回可用于附加到 window.onerror 的函数，如果启用 `options.enableWindowOnErrorHandler`，则返回库使用的函数。（函数（message、source、lineno、colno、error））。

* `JitsiMeetJS.mediaDevices` - JS 对象，包含与媒体设备交互的方法。可用的方法如下：
  - `isDeviceListAvailable()` - 如果支持获取设备列表，则返回 true；否则返回 false。
  - `isDeviceChangeAvailable(deviceType)` - 如果支持更改输入（相机/麦克风）或输出（音频）设备，则返回 true；否则返回 false。`deviceType` 是要更改的设备类型。未定义或 'input' 代表输入设备，'output' 代表音频输出设备。
  - `enumerateDevices(callback)` - 返回可用设备的列表，作为参数传递给回调函数。每个设备都是一个 MediaDeviceInfo 对象，具有以下属性：
    - `label` - 设备的名称
    - `kind` - "audioinput"、"videoinput" 或 "audiooutput"
    - `deviceId` - 设备的 ID
    - `groupId` - 组标识符，如果两个设备属于同一物理设备，则它们具有相同的组标识符；例如，具有内置摄像头和麦克风的监视器。
  - `setAudioOutputDevice(deviceId)` - 设置当前音频输出设备。`deviceId` - 来自 `JitsiMeetJS.enumerateDevices()` 的 'audiooutput' 设备 ID，'' 表示默认设备。
  - `getAudioOutputDevice()` - 返回当前使用的音频输出设备 ID，'' 表示默认设备。
  - `isDevicePermissionGranted(type)` - 返回一个 Promise，解析为 true，如果用户授予了媒体设备的权限。`type` - 'audio'、'video' 或 `undefined`。如果是 `undefined`，则检查是否同时授予了音频和视频权限。
  - `addEventListener(event, handler)` - 附加事件处理程序。
  - `removeEventListener(event, handler)` - 移除事件处理程序。

* `JitsiMeetJS.events` - JS 对象，包含 API 使用的所有事件。当您尝试订阅连接或会议事件时，您需要该 JS 对象。
  我们有两种事件类型 - 连接和会议。您可以使用以下代码访问事件 `JitsiMeetJS.events.<event_type>.<event_name>`。
  例如，如果您想使用在某人离开会议时触发的会议事件，可以使用以下代码 - `JitsiMeetJS.events.conference.USER_LEFT`。
  我们支持以下事件：
  1. `conference`
     - `TRACK_ADDED` - 收到流。（参数 - JitsiTrack）
     - `TRACK_REMOVED` - 移除流。（参数 - JitsiTrack）
     - `TRACK_MUTE_CHANGED` - JitsiTrack 被静音或取消静

音。
     - `TRACK_AUDIO_OUTPUT_CHANGED` - 音频输出设备已更改。
     - `USER_JOINED` - 用户加入会议。（参数 - User）
     - `USER_LEFT` - 用户离开会议。（参数 - User）
     - `DISPLAY_NAME_CHANGED` - 用户更改了他们的显示名称。（参数 - User）
     - `AVATAR_CHANGED` - 用户更改了他们的头像。（参数 - User）
     - `PARTICIPANT_ROLE_CHANGED` - 用户角色已更改。（参数 - User）
     - `SUBJECT_CHANGED` - 会议主题已更改。
     - `PASSWORD_REQUIRED` - 会议需要密码。
     - `PASSWORD_SET` - 会议设置了密码。
     - `PASSWORD_REMOVED` - 会议删除了密码。
     - `MESSAGE_RECEIVED` - 收到消息。（参数 - Message）
     - `MESSAGE_SENDER_CHANGED` - 消息发送者已更改。
     - `KICKED` - 用户已被踢出会议。
     - `KICKED_BY_SERVER` - 用户已被服务器踢出。
     - `MUTE_EVERYONE` - 会议中的所有用户都已被静音。
     - `UNMUTE_EVERYONE` - 会议中的所有用户已被取消静音。
     - `MEETINGS_ERRORS` - 会议错误。
     - `STARTED` - 会议已开始。
     - `ENDED` - 会议已结束。
     - `AVATAR_UPDATED` - 用户的头像已更新。
     - `USER_DROPPED` - 用户掉线。
     - `JVB_CONNECTION_ESTABLISHED` - JVB 连接已建立。
     - `JVB_CONNECTION_FAILED` - JVB 连接失败。
     - `JVB_CONNECTION_LOST` - JVB 连接丢失。
     - `JVB_CONNECTION_RESTORED` - JVB 连接恢复。
     - `CONFERENCE_MUC_JOINED` - 会议已经加入 MUC。
     - `CONFERENCE_MUC_LEFT` - 离开会议的 MUC。
     - `SPEAKER_STATS_UPDATED` - 演讲者统计信息已更新。
     - `USER_VIDEO_MUTED` - 用户已将视频静音。
     - `USER_AUDIO_MUTED` - 用户已将音频静音。
     - `AUDIO_MUTED` - 用户已静音。
     - `AUDIO_UNMUTED` - 用户已取消静音。
     - `VIDEO_MUTED` - 用户已关闭视频。
     - `VIDEO_UNMUTED` - 用户已开启视频。
  2. `connection`
     - `CONNECTION_ESTABLISHED` - 与服务器建立连接。
     - `CONNECTION_FAILED` - 连接到服务器失败。
     - `CONNECTION_DISCONNECTED` - 与服务器断开连接。
     - `CONNECTION_INTERRUPTED` - 与服务器的连接中断。
     - `CONNECTION_RESTORED` - 与服务器的连接恢复。

* `JitsiMeetJS.logLevels` - 可用日志级别的对象。可用级别如下：
  - `ERROR`
  - `WARN`
  - `INFO`
  - `DEBUG`

### JitsiConnection

该对象表示与服务器的连接。您可以使用构造函数 `JitsiMeetJS.JitsiConnection` 创建新的 `JitsiConnection` 对象。`JitsiConnection` 具有以下方法：

1. `JitsiConnection(appID, token, options)` - 构造函数。创建会议对象。

   - `appID` - Jitsi Meet 视频会议服务提供商的标识。**注意：尚未实现。您可以安全地传递 `null`**
   - `token` - 由 Jitsi Meet 视频会议服务提供商生成的密钥。该令牌将从 Jitsi Meet 服务器部署发送给提供商，以授权当前客户端。
   - `options` - 配置服务器连接的 JS 对象。您可以更改以下属性：
     1. `serviceUrl` - XMPP 服务 URL。例如，'wss://server.com/xmpp-websocket' 用于 Websocket 或 '//server.com/http-bind' 用于 BOSH。
     2. `bosh` - 已弃用，请使用 serviceUrl 指定 BOSH 或 Websocket URL。
     3. `hosts` - JS 对象
        - `domain`
        - `muc`
        - `anonymousdomain`
     4. `enableLipSync` - （可选）布尔属性，启用唇同步功能。当前仅在 Chrome 中有效，默认为禁用。
     5. `clientNode` - 在 XEP-0115 'c' 段中宣传的客户端节点名称。
     6. `xmppPing` - （可选）JS 对象 - xmpp ping 选项
        - `interval` - 发送 ping 请求的频率，默认：10000（10 秒）
        - `timeout` - 等待 ping 响应的时间，默认：5000（5 秒）
        - `threshold` - 允许的 ping 失败次数，默认：2
     7. `websocketKeepAlive` - （可选）设置 websocket keepalive GET 请求的间隔。默认值为 1 分钟（意味着加上一分钟的抖动）。
        用于某些部署，其中需要保持 stick table 条目活跃，使用这些 GET 请求。
     8. `websocketKeepAliveUrl` - （可选）用于 websocket keepalive GET 请求的特定 URL。

2. `connect(options)` - 建立服务器连接。

   - `options` - 包含 `id` 和 `password` 属性的 JS 对象。

3. `disconnect()` - 销毁服务器连接。

4. `initJitsiConference(name, options)` - 创建新的 `JitsiConference` 对象。

   - `name` - 会议的名称。
   - `options` - 配置会议的 JS 对象。您可以更改以下属性：
     - `audioQuality` - 与音频质量相关的设置。
       - `stereo`
       - `opusMaxAverageBitrate`
       - `enableOpusDtx`
     - `bridgeChannel` - 与桥接通道相关的设置。
       - `ignoreDomain` - 如果后端宣传多个 colibri websockets，该选项允许根据域名过滤其中一些。
       - `preferSctp` - 启用 SCTP 数据通道用于桥接通道。
     - `callStatsID` - callstats 凭据。
     - `callStatsSecret` - callstats 凭据。
     - `channelLastN`
     - `deploymentInfo`
       - `shard`
       - `userRegion`
     - `disableAudioLevels` - 布尔属性。启用/禁用音频级别。
     - `disableInitialGUM`
     - `disableRtx` - 布尔属性（默认为 false）。启用/禁用 RTX 的使用。
     - `disableSimulcast` - 启用/禁用模拟广播支持。
     - `e2eping`
       - `pingInterval`
     - `enableForcedReload`
     - `enableIceRestart`
     - `enableNoAudioDetection` - 布尔属性。
     - `enableOpusRed`
     - `enableTalkWhileMuted` - 布尔属性。
     - `enableNoisyMicDetection` - 布尔属性。
     - `enableRemb` - 布尔属性。启用/禁用 REMB 支持，默认为启用。
     - `enableTcc` - 启用/禁用 TCC 进行带宽估计，默认为启用。
     - `focusUserJid` - 焦点参与者的真实 JID - 可以在此处被覆盖。
     - `ignoreStartMuted` - 忽略来自 jicofo 的开始静音事件。
     - `p2p` - 与点对点相关的选项。
       - `enabled` - 启用或禁用点对点连接，如果禁用，所有媒体将通过 Jitsi Videobridge 路由。
       - `codecPreferenceOrder` - 提供一种在桌面端点上设置编解码器优先级的方法。
       - `mobileCodecPreferenceOrder` - 提供一种在移动设备上设置编解码器优先级的方法，包括 RN 和基于移动浏览器的端点。
       - `stunServers` - STUN 服务器列表，例如 `{ urls: 'stun:meet-jit-si-turnrelay.jitsi.net:443' }`
       - `backToP2PDelay` - 在第三个参与者离开房间后，会议切换回 P2P 的延迟（以秒为单位）。
     - `recordingType` - 要使用的录制类型。
     - `rttMonitor`
       - `enabled`
       - `initialDelay`
       - `getStatsInterval`
       - `analyticsInterval`
       - `stunServers`
     - `startAudioOnly`
     - `startAudioMuted`
     - `startWithAudioMuted`
     - `startVideoMuted`
     - `startWithVideoMuted`
     - `startSilent` - 启用静音模式，将音频标记为非活动状态，不会发送/接收音频。
     - `videoQuality` - 与桥接连接相关的视频质量设置。
       - `codecPreferenceOrder` - 提供一种在桌面端点上设置编解码器优先级的方法。
       - `mobileCodecPreferenceOrder` - 提供一种在移动设备上设置编解码器优先级的方法，包括 RN 和基于移动浏览器的端点。
       - `maxBitratesVideo` - 提供一种为不同编解码器指定比特率的方法。
     - `testing`

     **注意：如果设置了 4 和 5，则库将向 callstats 发送事件。否则，将禁用 callstats 集成。**

5. `addEventListener(event, listener)` - 订阅传入的监听器以响应事件。

   - `event` - `JitsiMeetJS.events.connection` 对象中的一个事件。
   - `listener` - 事件的处理程序。

6. `removeEventListener(event, listener)` - 移除事件监听器。

   - `event` - 事件。
   - `listener` - 要移除的监听器。

7. `addFeature` - 向本地参与者的支持功能列表中添加新功能。

   - `feature` - 字符串，功能名称。
   - `submit` - 布尔值，默认为 false；如果为 true，则新功能列表将立即提交给其他人。

8. `removeFeature` - 从本地参与者的支持功能列表中移除一个功能。

   - `feature` - 字符串，功能名称。
   - `submit` - 布尔值，默认为 false；如果为 true，则新功能列表将立即提交给其他人。

### JitsiConference

该对象表示一个会议。我们有以下方法来控制会议：

1. `join(password)` - 加入会议
   - `password` - 密码字符串。此参数不是必需的。

2. `leave()` - 离开会议。返回 Promise。

3. `myUserId()` - 获取本地用户 ID。

4. `getLocalTracks()` - 返回包含本地流的 JitsiTrack 对象的数组。

5. `addEventListener(event, listener)` - 将传入的监听器订阅到事件。
   - `event` - `JitsiMeetJS.events.conference` 对象中的一个事件。
   - `listener` - 事件的处理程序。

6. `removeEventListener(event, listener)` - 移除事件监听器。
   - `event` - 事件
   - `listener` - 要移除的监听器。

7. `on(event, listener)` - `addEventListener` 的别名

8. `off(event, listener)` - `removeEventListener` 的别名

9. `sendTextMessage(text)` - 向会议中的其他参与者发送给定字符串。

10. `setDisplayName(name)` - 更改本地参与者的显示名称。
    - `name` - 新的显示名称。

11. `sendCommand(name, values)` - 向其他参与者发送用户定义的系统命令
    - `name` - 命令的名称。
    - `values` - JS 对象。该对象具有以下结构：

    ```javascript
    {
        value: the_value_of_the_command,
        attributes: {}, // 以属性名称为键，属性值为值的映射。
        children: [] // 包含具有相同结构的 JS 对象的数组。
    }
    ```

    注意：当使用该方法时，传入的对象将添加到发送给其他参与者的每条系统消息中，可能会多次发送。

12. `sendCommandOnce(name, values)` - 仅一次向其他参与者发送用户定义的系统命令。

13. `removeCommand(name)` - 从发送给其他参与者的命令列表中移除命令。
    - `name` - 命令的名称。

14. `addCommandListener(command, handler)` - 添加命令监听器。
    - `command` - 命令名称的字符串。
    - `handler(values)` - 当从其他参与者接收到命令时调用的监听器。

15. `removeCommandListener(command)` - 移除指定命令的监听器。
    - `command` - 命令的名称。

16. `addTrack(track)` - 将 `JitsiLocalTrack` 对象添加到会议。如果添加同一视频类型的第二个视频流，将抛出错误。`camera` 和 `desktop` 被视为两种不同的视频源。因此，在首次向会议中添加视频源（相机或桌面）时，需要调用 `addTrack`，之后仅需使用 `replaceTrack` 用相同视频类型的另一个轨道替换现有轨道或将其从会议中移除。返回一个 Promise。
    - `track` - `JitsiLocalTrack` 对象。

17. `removeTrack(track)` - 将 `JitsiLocalTrack` 对象从会议中移除。返回 Promise。这不再在远端触发 `TRACK_REMOVED` 事件。同一 SSRC 将在添加另一种相同类型的轨道时被重用，以将信令消息降到最低。
    - `track` - `JitsiLocalTrack` 对象。

18. `isDTMFSupported()` - 检查至少一个用户是否支持 DTMF。

19. `getRole()` - 返回本地用户角色的字符串（“moderator” 或 “none”）。

20. `isModerator()` - 检查本地用户是否具有“moderator”角色。

21. `lock(password)` - 设置会议密码；返回 Promise。
    - `password` - 密码字符串。

    注意：仅对主持人可用。

22. `unlock()` - 解除会议密码；返回 Promise。
    
    注意：仅对主持人可用。

23. `kickParticipant(id, reason)` - 将参与者踢出会议。
    - `id` - 参与者 ID 的字符串。
    - `reason` - （可选）字符串，默认为 'You have been kicked.' - 踢出参与者的原因。

24. `setStartMutedPolicy(policy)` - 使所有新参与者加入时静音音频/视频。
    - `policy` - JS 对象，具有以下属性：
      - `audio` - 布尔值，如果音频流应静音。
      - `video` - 布尔值，如果视频流应静音。

    注意：仅对主持人可用。

25. `getStartMutedPolicy()` - 返回当前政策的 JS 对象：
    - `policy` - JS 对象，具有以下属性：
      - `audio` - 布尔值，如果音频流应静音。
      - `video` - 布尔值，如果视频流应静音。

26. `isStartAudioMuted()` - 检查加入时音频是否静音。

27. `isStartVideoMuted()` - 检查加入时视频是否静音。

28. `sendFeedback(overallFeedback, detailedFeedback)` - 通过 CallStats 发送给定反馈（如果启用）。
    - `overallFeedback` - 一个介于 1 和 5 之间的整数，表示用户反馈。
    - `detailedFeedback` - 用户的详细反馈。尚未使用。

29. `setSubject(subject)` - 更改会议主题。
    - `subject` - 新主题的字符串。

    注意：仅对主持人可用。

30. `sendEndpointMessage(to, payload)` - 通过数据通道发送消息。
    - `to` - 应该接收消息的端点的 ID。如果为空，则消息将发送给所有参与者。
    - `payload` - JSON 对象 - 消息的有效载荷。

抛出 NetworkError、InvalidStateError 或 Error 如果操作失败。

31. `sendEndpointStatsMessage(payload)` - 在桥接通道上发送 `EndpointStats` Colibri 消息。这应代替 `broadcastEndpointMessage` 用于将本地统计信息转发到所有远程端点。
    - `payload` - JSON 对象 - 消息的有效载荷。

抛出 NetworkError、InvalidStateError 或 Error 如果操作失败。

32. `broadcastEndpointMessage(payload)` - 通过数据通道发送广播消息。
    - `payload` - JSON 对象 - 消息的有效载荷。

抛出 NetworkError、InvalidStateError 或 Error 如果操作失败。

33. `replaceTrack` - 用新的 MediaStreamTrack 替换当前用作发送方源的轨道。新轨道必须为同一媒体类型（音频、视频等），并且切换轨道不应要求协商。`replaceTrack(oldTrack, newTrack)`。

抛出 NetworkError、InvalidStateError 或 Error 如果操作失败。

34. `setReceiverConstraints` - 设置从桥接请求的视频的约束。此单条消息应替代 `setLastN`、`setReceiverVideoConstraint` 和 `selectParticipants` 方法。这些约束仅适用于桥接连接。有关信令消息格式和 Jitsi Videobridge 如何分配带宽的更多信息，请参见 [此处](https://github.com/jitsi/jitsi-videobridge/blob/master/doc/allocation.md#new-message-format)。
    - `videoConstraints` - 对象，指定以下格式的约束。

    ```javascript
    {
       'lastN': 20, // 请求的来自桥接的视屏数量。
       'selectedSources': ['A', 'B', 'C'], // 首先优先的视频轨道源名称。
       'onStageSources': ['A'], // 被优先提升到更高分辨率的视频轨道源名称。
       'defaultConstraints': { 'maxHeight': 180 }, // 所有端点请求的默认分辨率。
       'constraints': { // 特定源的分辨率。
           'A': { 'maxHeight': 720 }
       }
    }
    ```

35. `setSenderVideoConstraint(resolution)` - 设置发送到 JVB 或对等方的所需分辨率（180、360、720）。

36. `isHidden` - 检查本地用户是否以“隐藏”用户身份加入。这是一种用于集成的特殊角色。

37. `setLocalParticipantProperty(propertyKey, propertyValue)` - 用于设置本地参与者的自定义属性（"fullName": "Full Name", favoriteColor: "red", "userId": 234）。这也可用于修改已设置的自定义属性。
    - `propertyKey` - 字符串 - 自定义属性名称。
    - `propertyValue` - 字符串 - 自定义属性值。

38. `getParticipants()` - 检索该会议中所有参与者的数组。

39. `revokeOwner(participantId)` - 撤销参与者的所有者权限。调用该函数的参与者应具有与目标参与者相同或更高的权限。此权限检查在 XMPP 服务器级别进行。

### JitsiTrack

该对象表示单个轨道 - 视频或音频。它们可以是远程轨道（来自通话中的其他参与者）或本地轨道（来自本地参与者的设备）。我们有以下方法来控制轨道：

1. `getType()` - 返回轨道类型的字符串（视频轨道返回 "video"，音频轨道返回 "audio"）。

2. `mute()` - 静音轨道。返回 Promise。

   注意：此方法仅对本地轨道实现。

3. `unmute()` - 取消静音轨道。返回 Promise。

   注意：此方法仅对本地轨道实现。

4. `isMuted()` - 检查轨道是否静音。

5. `attach(container)` - 将轨道附加到给定容器。

6. `detach(container)` - 从容器中移除轨道。

7. `dispose()` - 处理轨道。如果轨道已添加到会议中，轨道将被移除。返回 Promise。

   注意：此方法仅对本地轨道实现。

8. `getId()` - 返回轨道的唯一字符串。

9. `getParticipantId()` - 返回轨道所有者的 ID（字符串）。

   注意：此方法仅对远程轨道实现。

10. `getSourceName()` - 返回轨道的源名称。

11. `setAudioOutput(audioOutputDeviceId)` - 为轨道的 DOM 元素设置新的音频输出设备。视频轨道被忽略。

12. `getDeviceId()` - 返回与轨道相关联的设备 ID（仅限本地轨道）。

13. `isEnded()` - 如果轨道已结束，则返回 true。

14. `setEffect(effect)` - 通过用具有所需效果的新 MediaStream 替换现有的 MediaStream 来应用效果。将 "undefined" 传递给此函数以移除效果并恢复 `JitsiTrack` 上的原始 MediaStream。

    对于效果实例，必须定义以下方法。

    `startEffect()` - 启动效果并返回一个新的 MediaStream，该流将与现有流进行替换。

    `stopEffect()` - 停止效果。

    `isEnabled()` - 检查本地轨道是否支持该效果。

    注意：此方法仅对本地轨道实现。

### JitsiTrackError

该对象表示发生在 JitsiTrack 上的错误。它继承自 JavaScript 基础的 `Error` 对象，因此可以使用 `"name"`、`"message"` 和 `"stack"` 属性。对于与 GUM 相关的错误，暴露额外的 `"gum"` 属性，该属性是一个具有以下属性的对象：

- `error` - 原始 GUM 错误。
- `constraints` - 用于调用的 GUM 约束对象。
- `devices` - 在 GUM 调用中请求的设备数组（可能的值 - "audio"、"video"、"screen"、"desktop"、"audiooutput"）。
