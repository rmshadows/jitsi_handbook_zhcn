---
id: dev-guide-iframe-commands
title: Commands - 指令
---

您可以通过在 **`JitsiMeetExternalAPI`** 对象上调用 **`executeCommand`** 来控制嵌入的 Jitsi Meet 会议：

```javascript
api.executeCommand(command, ...arguments);
```

命令参数是一个字符串，包含命令名称。

您还可以使用 **`executeCommands`** 方法执行多个命令：

```javascript
api.executeCommands(commands);
```

**`commands`** 参数是一个对象，其中命令名称作为键，命令的参数作为值：

```javascript
api.executeCommands({
    displayName: [ 'nickname' ],
    toggleAudio: []
});
```

支持以下命令：

### displayName

设置本地参与者的显示名称。

该命令需要一个参数来设置新的显示名称。

```javascript
api.executeCommand('displayName', '新昵称');
```

### password

设置房间的密码。

```javascript
// 设置频道的新密码
api.addEventListener('participantRoleChanged', function(event) {
    if (event.role === "moderator") {
        api.executeCommand('password', '密码');
    }
});
// 加入受密码保护的频道
api.on('passwordRequired', function ()
{
    api.executeCommand('password', '密码');
});
```

### toggleLobby

切换大堂模式的开启或关闭。

该命令需要所需的大堂模式状态作为参数。

```javascript
api.addEventListener('participantRoleChanged', function (event) {
    if(event.role === 'moderator') {
        api.executeCommand('toggleLobby', true);
    }
});
```

### sendTones

拨号音播放。

该命令需要所选的拨号音以及音调播放的长度和音调之间的时间间隔作为参数。

```javascript
api.executeCommand('sendTones', {
    tones: string, // 要播放的拨号音，例如 '12345#'。
    duration: number, // 可选。每个音调播放的毫秒数。默认是 200。
    pause: number // 可选。每个音调之间的毫秒数。默认是 200。
});
```

### startShareVideo

开始共享视频。

该命令需要一个指向 YouTube 视频或从网络流式传输的视频（例如 mp4 文件）的 URL。

```javascript
api.executeCommand('startShareVideo', url);
```

### stopShareVideo

停止共享视频（如果用户是视频的启动者）。

不需要参数。

```javascript
api.executeCommand('stopShareVideo');
```

### subject

设置会议的主题。

该命令需要作为参数的新主题，并且只有在参与者具有主持人角色时才能应用，或者在他们随后获得该角色后应用。

```javascript
api.executeCommand('subject', '新的会议主题');
```

### localSubject

设置会议的本地主题。

该命令需要作为参数的新本地主题，所有参与者均可应用，无论其角色如何。

```javascript
api.executeCommand('localSubject', '新的会议本地主题');
```

### toggleAudio

静音/取消静音本地参与者的音频。

不需要参数。

```javascript
api.executeCommand('toggleAudio');
```

### toggleVideo

静音/取消静音本地参与者的视频。

不需要参数。

```javascript
api.executeCommand('toggleVideo');
```

### toggleFilmStrip

隐藏或显示缩略图。

不需要参数。

```javascript
api.executeCommand('toggleFilmStrip');
```

### toggleChat

隐藏或显示聊天消息。

不需要参数。

```javascript
api.executeCommand('toggleChat');
```

### toggleRaiseHand

隐藏或显示举手。

不需要参数。

```javascript
api.executeCommand('toggleRaiseHand');
```

### toggleShareScreen

开始或停止屏幕共享。

不需要参数。

```javascript
api.executeCommand('toggleShareScreen');
```

### setNoiseSuppressionEnabled

启用或禁用当前音频轨道上的噪声抑制。

```javascript
api.executeCommand('setNoiseSuppressionEnabled', {
    enabled: boolean // 启用或禁用噪声抑制。
});
```

### toggleSubtitles

开始或停止字幕。

不需要参数。

```javascript
api.executeCommand('toggleSubtitles');
```

### toggleTileView

进入或退出平铺视图布局模式。

不需要参数。

```javascript
api.executeCommand('toggleTileView');
```

### hangup

结束通话。

不需要参数。

```javascript
api.executeCommand('hangup');
```

### endConference

结束当前会议（对所有人）。

该命令只能由会议主持人执行，并且需要为该部署启用结束会议支持。

```javascript
api.executeCommand('endConference');
```

### email

更改本地电子邮件地址。

该命令需要新的电子邮件地址作为单个参数。

```javascript
api.executeCommand('email', 'example@example.com');
```

### avatarUrl

更改本地头像 URL。

该命令需要新的头像 URL 作为单个参数。

```javascript
api.executeCommand('avatarUrl', 'https://avatars0.githubusercontent.com/u/3671647');
```

### sendCameraFacingMode

向给定参与者发送请求，以设置相机朝向模式为 `user` 或 `environment`。

接收参与者会显示一个确认对话框。如果未发送 `facingMode` 参数，则相机将在后续调用中在两个选项之间切换。

```javascript
api.executeCommand('sendCameraFacingMode', 'receiverParticipantId', 'facingMode');
```

### sendEndpointTextMessage

通过数据通道向另一参与者发送文本消息。

```javascript
api.executeCommand('sendEndpointTextMessage', 'receiverParticipantId', 'text');
```

### setLargeVideoParticipant

在大视频显示中显示参与者。

指定的参与者 ID（如果指定）将在大视频中显示。如果不传递参数，将根据主讲人/固定演讲者设置自动选择要显示在大视频上的参与者。

第二个参数是可选的，可以用于指定 `videoType`。启用多流支持时，可以指定所选参与者的桌面或相机视频。接受的值是 `'camera'` 和 `'desktop'`。默认值为 `'camera'`。任何无效值将被忽略并使用默认值。

```javascript
api.executeCommand('setLargeVideoParticipant', 'abcd1234', 'desktop');
```

### setVideoQuality

设置发送和接收的视频分辨率。

分辨率高度设置使用单个参数。

```javascript
api.executeCommand('setVideoQuality', 720);
```

### muteEveryone

静音所有会议参与者。

该命令只能由会议主持人执行，可以接受一个参数：`mediaType` - 要静音的媒体类型。

`mediaType` 可以是 'audio'（默认）或 'video'。

```javascript
api.executeCommand('muteEveryone', 'video');
```

### startRecording

开始本地录制、文件录制、流式会话或转录，使用传递的参数：

- **RTMP 流** - 录制模式设置为 **`stream`**，并带有 **`rtmpStreamKey`**。**`rtmpBroadcastID`** 值是可选的。

- **YouTube 流** - 录制模式设置为 **`stream`**，并带有 **`youtubeStreamKey`**。**`youtubeBroadcastID`** 值是可选的。

- **本地录制** - 录制模式设置为 **`local`**。**`onlySelf`** 值是可选的。

- **Dropbox 录制** - 录制模式设置为 **`file`**，并带有 Dropbox OAuth2 令牌。

  此外，应该在您使用的 Jitsi Meet 部署配置中启用 Dropbox 保存。

- **文件录制** - 录制模式设置为 **`file`**。**`extraMetadata`** 值是可选的。

  可选择性地传递 **`shouldShare`**。不需要其他参数。

- **转录** - 设置 `transcription` 选项为 `true`。

```javascript
api.executeCommand('startRecording', {
    mode: string, // 录制模式，可以是 `local`、`file` 或 `stream`。
    dropboxToken: string, // Dropbox oauth2 令牌。
    onlySelf: boolean,  // 是否仅录制本地流。仅适用于 `local` 录制模式。
    shouldShare: boolean, // 录制是否应该与参与者共享。仅适用于某些 Jitsi Meet 部署。
    rtmpStreamKey: string, // RTMP 流密钥。
    rtmpBroadcastID: string, // RTMP 广播 ID。
    youtubeStreamKey: string, // YouTube 流密钥。
    youtubeBroadcastID: string, // YouTube 广播 ID。
    extraMetadata: Object, // 文件录制的任何额外元数据。
    transcription: boolean, // 是否应开始转录。 
});
```

### stopRecording

停止进行中的 **`local`**、**`stream`**、**`file`** 录制或转录。

必须指定开始录制时使用的模式。

```javascript
api.executeCommand('stopRecording',
    mode: string, // 要停止的录制模式，`local`、`stream` 或 `file`
    transcription: boolean // 是否停止转录
);
```

### initiatePrivateChat

打开聊天窗口，并将具有给定参与者 ID 的参与者设置为消息接收者。

```javascript
api.executeCommand('initiatePrivateChat',
    participantID: string
);
```

### cancelPrivateChat

移除私聊参与者，从而将聊天窗口重置为群聊。

```javascript
api.executeCommand('cancelPrivateChat');
```

### kickParticipant

将具有给定参与者 ID 的参与者踢出会议。

```javascript
api.executeCommand('kickParticipant',
    participantID: string
);
```

### grantModerator

授予具有给定 ID 的参与者主持人权限。

```javascript
api.executeCommand('grantModerator',
    participantID: string
);
```

### overwriteConfig

使用传递给命令的 config 对象中的值覆盖 config.js 属性。

```javascript
api.executeCommand('overwriteConfig',
    config: Object
);
```

例如：

```javascript
api.executeCommand('overwriteConfig',
    {
      toolbarButtons: ['chat']
    }
);
```

将把 `toolbarButtons` 配置值覆盖为 `[chat]`，结果 UI 仅显示 `chat` 按钮。

### sendChatMessage

向特定参与者发送聊天消息或作为群聊消息发送。

```javascript
api.executeCommand('sendChatMessage',
    message: string, // 文本消息
    to: string, // 接收的参与者 ID 或空字符串/未定义表示群聊。
    ignorePrivacy: boolean // 如果应忽略隐私通知，则为 true。默认为 false。
);
```

### setFollowMe

允许主持人切换跟随我 功能。

```javascript
api.executeCommand('setFollowMe',
    value: boolean, // 如果参与者应该跟随您，则设置为 true，否则为 false
    recorderOnly: boolean // 记录者是否将是唯一跟随您的人。默认值为 false。
);
```

### setSubtitles

启用或禁用字幕。

```javascript
api.executeCommand('setSubtitles',
    enabled: boolean,
    displaySubtitles: boolean = true,
    language: string | null = 'en'
);
```

### setTileView

启用或禁用平铺视图模式。

```javascript
api.executeCommand('setTileView',
    enabled: boolean
);
```

### answerKnockingParticipant

批准或拒绝大堂中的敲门参与者。

```javascript
api.executeCommand('answerKnockingParticipant',
    id: string, // 参与者 ID
    approved: boolean
);
```

### toggleCamera

在移动网页上设置相机朝向模式为 `user` 或 `environment`。如果未发送 `facingMode` 参数，则在后续调用中在前后相机之间切换。

```javascript
api.executeCommand('toggleCamera', 'facingMode');
```

### toggleCameraMirror

切换本地视频的镜像。

```javascript
api.executeCommand('toggleCameraMirror');
```

### toggleVirtualBackgroundDialog

切换虚拟背景选择对话框。

```javascript
api.executeCommand('toggleVirtualBackgroundDialog');
```

### pinParticipant

固定会议参与者。

```javascript
api.executeCommand('pinParticipant',
    id?: string // 要固定的会议参与者的 ID，或 null 以取消固定所有
);
```

### setParticipantVolume

更改具有给定参与者 ID 的参与者的音量。

```javascript
api.executeCommand('setParticipantVolume',
    participantID: string,
    volume: number // 介于 0 和 1 之间的数字
);
```

### toggleParticipantsPane

更改参与者窗格的可见性状态。

```javascript
api.executeCommand('toggleParticipantsPane',
    enabled: boolean // 参与者窗格的可见性状态。
);
```

### toggleModeration

更改给定媒体类型的管理状态。

该命令需要两个参数：`enable` - 是否启用，以及 `mediaType` - 要更改管理的媒体类型。

```javascript
api.executeCommand('toggleModeration',
    enable: Boolean,
    mediaType: String // 可以是 'audio'（默认）或 'video'
);
```

### askToUnmute

请求具有给定 ID 的参与者取消静音。
如果启用了音频管理，还会批准该参与者的音频。

```javascript
api.executeCommand('askToUnmute',
    participantId: String
);
```

### approveVideo

如果启用了视频管理，则批准具有给定 ID 的参与者的视频。

```javascript
api.executeCommand('approveVideo',
    participantId: String
);
```

### rejectParticipant

拒绝具有给定 ID 的参与者对给定媒体类型的管理权限。

```javascript
api.executeCommand('rejectParticipant',
    participantId: String,
    mediaType: String // 可以是 'audio'（默认）或 'video'
);
```

### addBreakoutRoom

创建一个小组讨论室。

该命令只能由会议主持人执行。

```javascript
api.executeCommand('addBreakoutRoom',
    name: String // 可选。新房间的名称或主题。
);
```

### autoAssignToBreakoutRooms

自动分配参与者到小组讨论室。

该命令只能由会议主持人执行。

```javascript
api.executeCommand('autoAssignToBreakoutRooms');
```

### closeBreakoutRoom

关闭小组讨论室并将参与者送回主房间。

该命令只能由会议主持人执行。

```javascript
api.executeCommand('closeBreakoutRoom',
    roomId: String // 要关闭的房间 ID。
);
```

### joinBreakoutRoom

加入小组讨论室。如果省略参数，则加入主房间。

```javascript
api.executeCommand('joinBreakoutRoom',
    roomId: String // 可选。要加入的房间 ID。
);
```

### removeBreakoutRoom

移除小组讨论室。

该命令只能由会议主持人执行。

```javascript
api.executeCommand('removeBreakoutRoom',
    breakoutRoomJid: String // 要移除的小组讨论室的 JID。
);
```

### resizeFilmStrip

调整影片条的大小。

```javascript
api.executeCommand('resizeFilmStrip', {
    width: number // 所需的影片条宽度
});
```

### resizeLargeVideo

根据提供的尺寸调整大视频容器的大小。

```javascript
api.executeCommand('resizeLargeVideo',
    width: number, // 所需宽度
    height: number // 所需高度
);
```

### sendParticipantToRoom

将参与者发送到房间。

该命令只能由会议主持人执行。

```javascript
api.executeCommand('sendParticipantToRoom',
    participantId: String, // 参与者的 ID。
    roomId: String // 房间的 ID。
);
```

### overwriteNames

将给定参与者的名字覆盖为给定的新名字。（仅对发送该命令的参与者本地有效）

```javascript
api.executeCommand('overwriteNames', [{
        id: String, // 参与者的 ID。
        name: String // 新名字。
    }]
);
```

### showNotification

显示自定义通知。这仅影响本地用户。

如果提供了 `uid`，则该通知将替换具有相同 `uid` 的现有通知。`uid` 也可以传递给 `hideNotification` 命令，以程序化地隐藏通知。

```javascript
api.executeCommand('showNotification', {
  title: String, // 通知的标题。
  description: String, // 通知的内容。
  uid: String, // 可选。通知的唯一标识符。
  type: String, // 可选。可以是 'info'、'normal'、'success'、'warning' 或 'error'。默认为 'normal'。
  timeout: String // 可选。可以是 'short'、'medium'、'long' 或 'sticky'。默认为 'short'。
});
```

### hideNotification

隐藏具有给定 `uid` 的通知。

```javascript
api.executeCommand('hideNotification',
    uid: String // 要移除的通知的唯一标识符。
);
```

### toggleWhiteboard

切换白板的开启状态，重复切换将隐藏白板。

```javascript
api.executeCommand('toggleWhiteboard');
```

### setAssumedBandwidthBps

设置假定带宽（bps）。

```javascript
api.executeCommand('setAssumedBandwidthBps',
    assumedBandwidthBps: number // 必需。要设置的假定带宽值，以 bps 表示。
);
```

### setBlurredBackground

设置或移除用户摄像头的模糊虚拟背景。

```javascript
api.executeCommand('setBlurredBackground',
		blurType: String // 必需。要应用的模糊类型。接受的值为 'slight-blur'、'blur' 或 'none'。
);
```
