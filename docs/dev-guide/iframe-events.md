---
id: dev-guide-iframe-events
title: Events - 事件
---

`JitsiMeetExternalAPI` 对象实现了 [EventEmitter] API，用于发出和监听事件。

您可以使用 **`addListener`** 方法向嵌入的 Jitsi Meet 添加事件监听器：

```javascript
api.addListener(event, listener);
```

如果您想移除一个监听器，可以使用 **`removeListener`** 方法：

```javascript
api.removeListener(event, listener);
```

**`event`** 参数是一个字符串对象，表示事件的名称。

**`listener`** 参数是一个函数对象，带有一个参数，当事件发生时会创建一个通知，并附带相关事件数据。

目前支持以下事件：

### cameraError

提供有关 Jitsi Meet 无法访问会议摄像头的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    type: string, // 表示错误的总体类型的常量。
    message: string // 有关错误的附加信息。
}
```

### avatarChanged

提供有关参与者头像变化的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    id: string, // 改变头像的参与者的 ID。
    avatarURL: string // 新的头像 URL。
}
```

### audioAvailabilityChanged

提供有关音频可用状态变化的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    available: boolean // 新的可用状态 - 布尔值
}
```

### audioMuteStatusChanged

提供有关音频静音状态变化的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    muted: boolean // 新的静音状态 - 布尔值
}
```

### breakoutRoomsUpdated

提供有关突发房间变化的通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    [roomId]: {
        id: string,
        jid: string,
        name: string,
        isMainRoom: true | undefined,
        participants: {
            [participantJid]: {
                displayName: string,
                jid: string,
                role: string
            }
        }
    },
    ...
}
```

### browserSupport

提供有关当前浏览器支持的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    supported: boolean
}
```

### contentSharingParticipantsChanged

提供当前正在共享屏幕的参与者 ID 的实时列表。

监听器接收一个具有以下结构的对象：

```javascript
{
    data: ["particId1", "particId2", ...]
}
```

### dataChannelOpened

指示数据通道已打开，因此可以通过它发送消息。

### endpointTextMessageReceived

提供通过数据通道接收到的文本消息的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    senderInfo: {
        jid: string, // 发送者的 jid
        id: string // 发送者的参与者 ID
    },
    eventData: {
        name: string, // 数据通道事件的名称：`endpoint-text-message`
        text: string // 来自发送者的接收到的文本
    }
}
```

### nonParticipantMessageReceived

提供有关非参与者发送的消息的事件通知，例如自定义 prosody 消息。

监听器接收一个具有以下结构的对象：

```javascript
{
        id: string, // 消息的 ID，可能为 null
        message: string // 接收到的消息
}
```

### faceLandmarkDetected

提供有关检测到面部地标的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    faceBox: {
        left: number, // 面部边界框距离左侧视频边缘的百分比
        right: number, // 面部边界框距离右侧视频边缘的百分比
        width: number // 面部边界框宽度占总视频宽度的百分比
    }, // 如果未传递 config.faceLandmarks.faceCenteringThreshold，则可能为未定义
    faceExpression: string // 请检查 https://github.com/jitsi/jitsi-meet/blob/master/react/features/face-landmarks/constants.js#L3 获取可用值
}
```

### errorOccurred

提供有关发生的错误的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    details: Object?, // 附加错误细节
    message: string?, // 错误消息
    name: string, // 错误的编码名称
    type: string, // 错误类型/来源，可能为：'CONFIG'，'CONNECTION'，'CONFERENCE'
    isFatal: boolean // 这是否是导致重连覆盖的致命错误
}
```

### knockingParticipant

提供有关大厅中敲门参与者的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    participant: {
        // 当前在大厅敲门的参与者的 ID 和名称
        id: string,
        name: string
    }
}
```

### largeVideoChanged

提供有关大视频显示变化的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    id: string // 现在在大视频舞台视图中的参与者的 ID。
}
```

### log

提供日志事件通知，日志级别是 [config.js] 文件中 **`apiLogLevels`** 属性中指定的值之一（如果未指定，则不会触发事件）。

监听器接收一个具有以下结构的对象：

```javascript
{
    logLevel: string, // 表示日志类型的常量（info, error, debug, warn）。
    args: string // 附加日志信息。
}
```

### micError

提供有关 Jitsi Meet 与麦克风访问问题的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    type: string, // 表示错误的总体类型的常量。
    message: string // 有关错误的附加信息。
}
```

### screenSharingStatusChanged

提供有关本地用户屏幕共享开启或关闭的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    on: boolean, // 是否开启屏幕共享
    details: {
        // 如果已知，屏幕共享的捕获来源。传递的值包括 'window'，'screen'，'proxy'，'device'。如果源类型未知或屏幕共享关闭，则会传递未定义的值。
        sourceType: string|undefined
    }
}
```

### dominantSpeakerChanged

提供有关主导发言者变化的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    id: string // 新主导发言者的参与者 ID
}
```

### raiseHandUpdated

提供有关参与者举手/放下手的事件通知。

监听器将接收一个具有以下结构的对象：

```javascript
{
    id: string,         // 举手/放下手的用户的参与者 ID
    handRaised: number  // 当手被举起时的时间戳，放下手时为 0。
}
```

### tileViewChanged

提供有关进入或退出瓷砖视图布局模式的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    enabled: boolean, // 瓷砖视图是否未显示
}
```

### chatUpdated

提供有关聊天状态更新的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    isOpen: boolean, // 聊天面板是否打开
    unreadCount: number // 未读消息计数
}
```

### incomingMessage

提供有关收到聊天消息的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    from: string, // 发送消息的用户的 ID
    nick: string, // 发送消息的用户的昵称
    privateMessage: boolean, // 是否为私人消息或群组消息
    message: string // 消息文本
}
```

### mouseEnter

提供鼠标进入 iframe 时的事件通知。

监听器接收一个具有以下结构的对象，基于 [MouseEvent]：

```javascript
{
    event: {
        clientX,
        clientY,
        movementX,
        movementY,
        offsetX,
        offsetY,
        pageX,
        pageY,
        x,
        y,
        screenX,
        screenY
    }
}
```

### mouseLeave

提供鼠标离开 iframe 时的事件通知。

监听器接收一个具有以下结构的对象，基于 [MouseEvent]：

```javascript
{
    event: {
        clientX,
        clientY,
        movementX,
        movementY,
        offsetX,
        offsetY,
        pageX,
        pageY,
        x,
        y,
        screenX,
        screenY
    }
}
```

### mouseMove

提供鼠标在 iframe 内移动时的事件通知。

该事件在可以通过覆盖 config.js 中的 mouseMoveCallbackInterval 属性进行配置的间隔内触发。

监听器接收一个具有以下结构的对象，基于 [MouseEvent]：

```javascript
{
    event: {
        clientX,
        clientY,
        movementX,
        movementY,
        offsetX,
        offsetY,
        pageX,
        pageY,
        x,
        y,
        screenX,
        screenY
    }
}
```

### participantMenuButtonClick

提供关于参与者上下文菜单按钮被点击的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    key: string, // 被按下的按钮键。键是 `toolbarButtons` 配置中定义的，
    participantId: string, // 被点击按钮的参与者的 ID，
    preventExecution: boolean // 按钮点击的执行是否被阻止
}
```

### toolbarButtonClicked

提供关于工具栏按钮被点击的事件通知，以及点击例程是否执行。

要覆盖按钮的点击，请使用以下配置覆盖：
https://github.com/jitsi/jitsi-meet/blob/042a2cb447bd9ff39ab3904e493952787bd30924/config.js#L547

监听器接收一个具有以下结构的对象：

```javascript
{
    key: string, // 被按下的按钮键。键是 `toolbarButtons` 配置中定义的，
    preventExecution: boolean // 点击例程执行是否被阻止。
}
```

### outgoingMessage

提供有关发送聊天消息的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    message: string, // 消息文本
    privateMessage: boolean // 是否为私人消息或群组消息
}
```

### displayNameChange

提供有关显示名称变化的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    id: string, // 改变显示名称的参与者的 ID
    displayname: string // 新的显示名称
}
```

### deviceListChanged

提供有关设备列表变化的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    devices: Object // 新的可用设备列表。
}
```

**注意：** **`device`** 对象的格式与 **`getAvailableDevices`** 结果格式相同。

### emailChange

提供有关电子邮件变化的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    id: string, // 改变电子邮件的参与者的 ID
    email: string // 新的电子邮件
}
```

### feedbackSubmitted

提供有关会议反馈提交的事件通知：

```javascript
{
    error: string // 提交过程中发生的错误（如果有）。
}
```

### filmstripDisplayChanged

提供有关电影条更新的可见性通知：

```javascript
{
    visible: boolean // 电影条是否显示或隐藏。
}
```

### moderationStatusChanged

提供有关管理状态变化的事件通知。

```javascript
{
    mediaType: string, // 管理更改的媒体类型。
    enabled: boolean // 管理是否启用。
}
```

### moderationParticipantApproved

提供有关参与者管理批准的事件通知。

```javascript
{
    id: string, // 获得批准的参与者的 ID。
    mediaType: string // 参与者获得批准的媒体类型。
}
```

### moderationParticipantRejected

提供有关参与者管理拒绝的事件通知。

```javascript
{
    id: string, // 被拒绝的参与者的 ID。
    mediaType: string // 参与者被拒绝的媒体类型。
}
```

### notificationTriggered

提供有关应用通知发生的事件通知。

```javascript
{
    title: string, // 通知标题。
    description: string // 通知描述。
}
```

### participantJoined

提供有关新参与者加入房间的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    id: string, // 参与者的 ID
    displayName: string // 参与者的显示名称
}
```

### participantKickedOut

提供有关参与者被移出房间的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    kicked: {
        id: string, // 被移出房间的参与者的 ID
        local: boolean // 参与者是否为本地参与者
    },
    kicker: {
        id: string // 移出其他参与者的参与者的 ID
    }
}
```

### participantLeft

提供有关参与者离开会议室的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    id: string // 参与者的 ID
}
```

### participantRoleChanged

提供关于本地用户角色变化的事件通知（例如，无、主持人、参与者）。

监听器接收一个具有以下结构的对象：

```javascript
{
    id: string, // 参与者的 ID
    role: string // 参与者的新角色
}
```

### participantsPaneToggled

提供关于参与者面板状态变化的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    open: boolean // 面板是否打开
}
```

### passwordRequired

提供关于参与者无法加入受密码保护的房间的事件通知。

### videoConferenceJoined

提供有关本地用户加入视频会议的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    roomName: string, // 会议的房间名称
    id: string, // 本地参与者的 ID
    displayName: string, // 本地参与者的显示名称
    avatarURL: string, // 本地参与者的头像 URL
    breakoutRoom: boolean // 当前房间是否为分组讨论室
}
```

### videoConferenceLeft

提供有关本地用户离开视频会议的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    roomName: string // 会议的房间名称
}
```

### conferenceCreatedTimestamp

提供视频会议开始时间的通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    timestamp: timestamp // 会议开始的时间
}
```

### videoAvailabilityChanged

提供关于视频可用性状态变化的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    available: boolean // 新的可用状态 - 布尔值
}
```

### videoMuteStatusChanged

提供关于视频静音状态变化的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    muted: boolean // 新的静音状态 - 布尔值
}
```

### videoQualityChanged

提供关于视频质量设置变化的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    videoQuality: number // 与新的视频质量设置相关的分辨率高度。
}
```

### readyToClose

提供 Jitsi Meet 准备关闭时的事件通知（即，挂断操作已完成）。

### recordingLinkAvailable

提供关于录制链接可用的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    link: string, // 录制链接
    ttl: number // 录制链接的有效时间
}
```

### recordingStatusChanged

提供关于录制状态变化的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    on: boolean // 新的录制状态 - 布尔值,
    mode: string // 录制模式，`local`、`stream` 或 `file`，
    error: string | undefined // 如果录制失败的错误类型，否则为未定义
    transcription: boolean // 是否激活了转录
}
```

### subjectChange

提供关于会议主题变化的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    subject: string // 新主题
}
```

### suspendDetected

提供有关检测到主机计算机中的挂起事件的通知。

### peerConnectionFailure

通知外部应用程序 PeerConnection 丢失连接。仅在 PC `failed` 但与 rtcstats 服务器仍保持连接时触发，表示在应用与 JVB 服务器或在 P2P 情况下的远程对等方之间建立链接时出现问题。仅在启用 rtcstats 时触发。

```javascript
{
    // PC 的类型，Peer2Peer 或 JVB 连接。
    isP2P: boolean,

    // 此连接是否之前已连接。如果是，则可能意味着
    // 连接中断；如果不是，则很可能意味着应用无法到达
    // JVB 服务器或在 P2P 的情况下，无法到达其他对等方。
    wasConnected: boolean
}
```

### transcribingStatusChanged

提供有关转录过程状态变化的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    on: boolean,
}
```

### transcriptionChunkReceived

提供关于新转录块可用的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    // 转录语言
    language: string,

    // 此块的 ID。
    messageID: string,

    // 参与者信息
    participant: {
        avatarUrl: string,
        id: string,
        name: string,
    },

    // 如果转录是最终的，文本将位于这里。
    final: string,

    // 如果转录不是最终的，但准确性高，文本将位于这里。
    stable: string,

    // 如果转录不是最终的，但准确性低，文本将位于这里。
    unstable: string,
}
```

### whiteboardStatusChanged

提供有关白板变化的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    status: string // 新的白板状态
}
```

### p2pStatusChanged

提供有关连接类型变化的事件通知。

监听器接收一个具有以下结构的对象：

```javascript
{
    isP2p: boolean|null // 新的连接类型是否为 P2P
}
```

[config.js]: https://github.com/jitsi/jitsi-meet/blob/master/config.js
[interface_config.js]: https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js
[EventEmitter]: https://nodejs.org/api/events.html
[MouseEvent]: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
