---
id: dev-guide-iframe-functions
title: Functions - 功能
---

使用以下 API 函数控制您嵌入的 Jitsi Meet 会议。

### captureLargeVideoScreenshot

捕获大视频视图（在舞台上）中参与者的屏幕截图。

```javascript
api.captureLargeVideoScreenshot().then(data => {
    // data 是一个只有一个参数的对象，dataURL
    // data.dataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAA..."
});
```

### getAvailableDevices

检索可用设备列表。

```javascript
api.getAvailableDevices().then(devices => {
    // devices = {
    //     audioInput: [{
    //         deviceId: 'ID'
    //         groupId: 'grpID'
    //         kind: 'audioinput'
    //         label: 'label'
    //     },....],
    //     audioOutput: [{
    //         deviceId: 'ID'
    //         groupId: 'grpID'
    //         kind: 'audioOutput'
    //         label: 'label'
    //     },....],
    //     videoInput: [{
    //         deviceId: 'ID'
    //         groupId: 'grpID'
    //         kind: 'videoInput'
    //         label: 'label'
    //     },....]
    // }
    ...
});
```

### getContentSharingParticipants

返回一个 Promise，解析为当前正在分享的参与者 ID 数组。

```javascript
api.getContentSharingParticipants().then(res => {
    // res.sharingParticipantIds = [particId1, particId2, ...]
});
```

### getCurrentDevices

检索当前选择的设备列表。

```javascript
api.getCurrentDevices().then(devices => {
    // devices = {
    //     audioInput: {
    //         deviceId: 'ID'
    //         groupId: 'grpID'
    //         kind: 'videoInput'
    //         label: 'label'
    //     },
    //     audioOutput: {
    //         deviceId: 'ID'
    //         groupId: 'grpID'
    //         kind: 'videoInput'
    //         label: 'label'
    //     },
    //     videoInput: {
    //         deviceId: 'ID'
    //         groupId: 'grpID'
    //         kind: 'videoInput'
    //         label: 'label'
    //     }
    // }
    ...
});
```

### getDeploymentInfo

检索包含有关部署的信息的对象。

```javascript
api.getDeploymentInfo().then(deploymentInfo => {
    // deploymentInfo = {
    //     region: 'deployment-region',
    //     shard: 'deployment-shard',
    //     ...
    // }
    ...
});
```

### getLivestreamUrl

检索当前直播流的直播 URL 的信息对象。

```javascript
api.getLivestreamUrl().then(livestreamData => {
    // livestreamData = {
    //     livestreamUrl: 'livestreamUrl'
    // }
    ...
});
```

### getParticipantsInfo

__已弃用__ 使用 `getRoomsInfo` 代替。

返回包含参与者信息的数组，如 ID、显示名称、头像 URL 和电子邮件。

```javascript
api.getParticipantsInfo();
```

### getRoomsInfo

返回可用房间及其详细信息的数组：

- `isMainRoom`（true，false）、`id`、`jid`
- participants: `Participant[]`
  - `id`
  - `jid`
  - `role`
  - `displayName`

```javascript
api.getRoomsInfo().then(rooms => {
    ... // 见响应示例结构
})
```

响应示例结构：

```json
{
  "rooms": [
    {
      "isMainRoom": true,
      "id": "room_name@conference.jitsi",
      "jid": "room_name@conference.jitsi/aaaaaa",
      "participants": [
        {
          "jid": "room_name@conference.jitsi/bbbbbb",
          "role": "participant",
          "displayName": "p1",
          "id": "bbbbbb"
        },
        {
          "jid": "room_name@conference.jitsi/cccccc",
          "role": "participant",
          "displayName": "p2",
          "id": "cccccc"
        }
      ]
    },
    {
    "isMainRoom": false,
    "id": "aaaaaa-bbb-cccc-dddd-qwertyuiopas",
    "jid": "aaaaaa-bbb-cccc-dddd-qwertyuiopas@breakout.jitsi",
    "participants": [{
        "jid": "aaaaaa-cccc-dddd-eeee-qwertyuiopas@jitsi/abcd1234",
        "role": "moderator",
        "displayName": "Participant name",
        "avatarUrl": "",
        "id": "abcd1234"
    }]
    },
  ]
}
```

### getSessionId

返回会议的唯一 ID (`sessionId`)。请注意，当处于预加入屏幕时 `sessionId` 不可用，并且在加入后不保证立即可用——在这种情况下，它将为空。

```javascript
api.getSessionId().then(sessionId => {
    // sessionId: string
    ...
});
```

### getVideoQuality

返回当前视频质量设置。

```javascript
api.getVideoQuality();
```

### getSupportedCommands

返回由 `api.executeCommand(command, ...arguments)` 支持的命令数组。

```javascript
api.getSupportedCommands();
```

### getSupportedEvents

返回由 `api.addListener(event, listener)` 支持的事件数组。

```javascript
api.getSupportedEvents();
```

### isDeviceChangeAvailable

如果设备更改可用，则解析为 true；如果不可用，则解析为 false。

```javascript
// 接受的 deviceType 值为 - 'output'、'input' 或未定义。
api.isDeviceChangeAvailable(deviceType).then(isDeviceChangeAvailable => {
    ...
});
```

### isDeviceListAvailable

如果设备列表可用，则解析为 true；如果不可用，则解析为 false。

```javascript
api.isDeviceListAvailable().then(isDeviceListAvailable => {
    ...
});
```

### isMultipleAudioInputSupported

如果支持多个音频输入，则解析为 true；如果不支持，则解析为 false。

```javascript
api.isMultipleAudioInputSupported().then(isMultipleAudioInputSupported => {
    ...
});
```

### pinParticipant

选择参与者 ID 作为固定参与者，以便始终接收该参与者的视频。第二个参数是可选的，可以用于指定 `videoType`。启用多流支持时，通过传递此参数可以指定应固定桌面视频或相机视频。接受的值为 `'camera'` 和 `'desktop'`，默认为 `'camera'`。任何无效值将被忽略，并使用默认值。

```javascript
api.pinParticipant(participantId, videoType);
```

### resizeLargeVideo

根据提供的尺寸调整大视频容器的大小。

```javascript
api.resizeLargeVideo(width, height);
```

### setAudioInputDevice

将音频输入设备设置为带有传递标签或 ID 的设备。

```javascript
api.setAudioInputDevice(deviceLabel, deviceId);
```

### setAudioOutputDevice

将音频输出设备设置为带有传递标签或 ID 的设备。

```javascript
api.setAudioOutputDevice(deviceLabel, deviceId);
```

### setLargeVideoParticipant

在大视频中显示具有给定参与者 ID 的参与者。

如果没有给定参与者 ID，将根据主导的固定发言者设置选择参与者。

```javascript
api.setLargeVideoParticipant(participantId);
```

### setVideoInputDevice

将视频输入设备设置为带有传递标签或 ID 的设备。

```javascript
api.setVideoInputDevice(deviceLabel, deviceId);
```

### startRecording

开始文件录制或流媒体会话。有关更多详细信息，请参见 `startRecording` 命令。

```javascript
api.startRecording(options);
```

### stopRecording

停止正在进行的文件录制、流媒体会话或转录。有关更多详细信息，请参见 `stopRecording` 命令。

```javascript
api.stopRecording(mode, transcription);
```

### getNumberOfParticipants

返回会议参与者的数量：

```javascript
const numberOfParticipants = api.getNumberOfParticipants();
```

### getAvatarURL

__已弃用__ 使用 `getRoomsInfo` 代替。

返回参与者的头像 URL：

```javascript
const avatarURL = api.getAvatarURL(participantId);
```

### getDisplayName

返回参与者的显示名称：

```javascript
const displayName = api.getDisplayName(participantId);
```

### getEmail

返回参与者的电子邮件：

```javascript
const email = api.getEmail(participantId);
```

### getIFrame

返回用于加载 Jitsi Meet 会议的 IFrame HTML 元素：

```javascript
const iframe = api.getIFrame();
```

### isAudioDisabled

返回一个 Promise，解析为当前音频禁用状态：

```javascript
api.isAudioDisabled().then(disabled => {
    ...
});
```

### isAudioMuted

返回一个 Promise，解析为当前音频静音状态：

```javascript
api.isAudioMuted().then(muted => {
    ...
});
```

### isVideoMuted

返回一个 Promise，解析为当前视频静音状态：

```javascript
api.isVideoMuted().then(muted => {
    ...
});
```

### isAudioAvailable

返回一个 Promise，解析为当前音频可用状态：

```javascript
api.isAudioAvailable().then(available => {
    ...
});
```

### isVideoAvailable

返回一个 Promise，解析为当前视频可用状态：

```javascript
api.isVideoAvailable().then(available => {
    ...
});
```

### isModerationOn

返回一个 Promise，解析为给定媒体类型的当前管理状态。

`mediaType` 可以是 `audio`（默认）或 `video`。

```javascript
api.isModerationOn(mediaType).then(isModerationOn => {
    ...
});
```

### isP2pActive

返回一个 Promise，解析为布尔值或 null，当没有会议时。

```javascript
api.isP2pActive().then(isP2p => {
    ...
});
```

### isParticipantForceMuted

返回一个 Promise，解析为给定参与者在给定媒体类型上的当前强制静音状态。

`mediaType` 可以是 `audio`（默认）或 `video`。

强制静音 - 管理已开启，参与者不允许解除静音给定媒体类型。

```javascript
api.isParticipantForceMuted(participantId, mediaType).then(isForceMuted => {
    ...
});
```

### isParticipantsPaneOpen

返回一个 Promise，解析为当前参与者面板状态。

```javascript
api.isParticipantsPaneOpen().then(state => {
    ...
});
```

### isStartSilent

返回一个 Promise，解析为会议是否以仅查看模式开始。

```javascript
api.isStartSilent().then(startSilent => {
    ...
});
```

### listBreakoutRooms

返回一个 Promise，解析为突发房间的映射。

```javascript
api.listBreakoutRooms().then(breakoutRooms => {
    ...
});
```

### invite

邀请给定数组中的参与者参加会议：

```javascript
api.invite([ {...}, {...}, {...} ]).then(() => {
    // 成功
}).catch(() => {
    // 失败
});
```

**注意：** 数组中被邀请者的格式取决于部署中使用的邀请服务。

PSTN 邀请对象具有以下结构：

```javascript
{
    type: 'phone',
    number: <string> // 以 E.164 格式的电话号码（例如 +31201234567）
}
```

SIP 邀请对象具有以下结构：

```javascript
{
    type: 'sip',
    address: <string> // sip 地址
}
```

### dispose

移除嵌入的 Jitsi Meet 会议：

```javascript
api.dispose();
```

**注意：** Jitsi 建议在页面卸载之前移除会议。
