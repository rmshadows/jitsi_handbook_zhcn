---
id: dev-guide-flutter-sdk
title: Flutter SDK
---

Jitsi Meet Flutter SDK 提供了与 Jitsi Meet 应用相同的用户体验，以 Flutter 插件的形式，让您可以在自己的 Flutter 应用中嵌入和自定义 Jitsi Meet。

## 使用 Flutter 的示例应用程序

如果您想了解如何轻松将 Jitsi Meet Flutter SDK 集成到 Flutter 应用程序中，请查看<br/>
[示例应用程序库](https://github.com/jitsi/jitsi-meet-sdk-samples#flutter)。

## 安装

### 添加依赖

从命令行添加依赖：

```bash
$ flutter pub add jitsi_meet_flutter_sdk
```

上述命令会将其添加到项目的 `pubspec.yaml` 文件中（您也可以手动完成）：

```yaml
dependencies:
    jitsi_meet_flutter_sdk: ^0.1.7
```

### 安装 

从终端安装软件包：

```bash
$ flutter pub get
```

### 导入文件

在您的 Dart 代码中导入以下文件：

```dart
import 'package:jitsi_meet_flutter_sdk/jitsi_meet_flutter_sdk.dart';
```

### 使用

#### 加入会议

首先，创建一个 `JitsiMeet` 对象，然后调用其 `join` 方法，并传入一个 `JitsiMeetConferenceOptions` 对象：

```dart
var jitsiMeet = JitsiMeet();
var options = JitsiMeetConferenceOptions(room: 'jitsiIsAwesome');
jitsiMeet.join(options);
```

## 配置

### iOS

确保在 `ios` 目录的 `Podfile` 中将 iOS 版本设置为 `15.1 或更高`：

```
platform :ios, '15.1'
```

该插件请求相机和麦克风访问权限，请确保在 `ios/Runner` 目录的 `Info.plist` 文件中包含所需条目：

```xml
<key>NSCameraUsageDescription</key>
<string>应用需要访问您的相机以进行会议。</string>
<key>NSMicrophoneUsageDescription</key>
<string>应用需要访问您的麦克风以进行会议。</string>
```

### Android

前往 `android/app/build.gradle`，确保将 `minSdkVersion` 设置为至少 `24`：

```gradle
android {
    ...
    defaultConfig {
        ...
        minSdkVersion 24
    }
}
```

Jitsi Meet Android SDK 的 `application:label` 字段将与您的应用程序冲突。请前往 `android/app/src/main/AndroidManifest.xml`，添加工具库并在应用程序标签中添加 `tools:replace="android:label"`。

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android" 
    xmlns:tools="http://schemas.android.com/tools">
    <application
        tools:replace="android:label"
        android:label="sample_app"
        android:name="${applicationName}"
        android:icon="@mipmap/ic_launcher">
        ...
    </application>
</manifest>
```

## 使用 API

### JitsiMeet

`JitsiMeet` 类是 SDK 的入口点。它用于启动会议屏幕，并发送和接收所有事件。

1. ####  JitsiMeet()

   该类的构造函数。

2. ####  join(JitsiMeetConferenceOptions options, [JitsiMeetEventListener? listener])

   使用给定选项加入会议，选项上可以选择性传入监听器。

   - `options`：会议选项
   - `listener`：用于监听原生 SDK 触发的事件的事件监听器

3. #### hangUp()

   本地参与者离开当前会议。

4. #### setAudioMuted(bool muted)

   根据 `muted` 参数设置本地参与者音频的静音状态。

5. #### setVideoMuted(bool muted)

   根据 `muted` 参数设置本地参与者视频的静音状态。

6. #### sendEndpointTextMessage(`{String? to, required String message}`)

   通过数据通道向特定参与者或所有参与者发送消息。如果 `to` 参数为空，消息将发送给会议中的所有参与者。

   要获取参与者 ID，应该监听 `participantsJoined` 事件，该事件的参数是 `participantId`，并且应该以某种方式存储。

7. #### toggleScreenShare(bool enabled)

   根据 `enabled` 参数设置本地参与者屏幕共享的状态。

8. #### openChat([String? to])

   打开聊天对话框。如果 `to` 包含有效的参与者 ID，将打开与该特定参与者的私聊。

9. #### sendChatMessage(`{String? to, required String message}`)

   向特定参与者或所有参与者发送聊天消息。如果 `to` 参数为空，消息将发送给会议中的所有参与者。

   要获取参与者 ID，应该监听 `participantsJoined` 事件，该事件的参数是 `participantId`，并且应该以某种方式存储。

10. #### closeChat()

    关闭聊天对话框。

11. #### retrieveParticipantsInfo()

    发送事件以触发 `participantsInfoRetrieved` 事件，该事件将包含参与者的信息。


### JitsiMeetConferenceOptions

该对象封装了加入会议时可以调整的所有选项。

示例：

```dart
var options = JitsiMeetConferenceOptions(
      serverURL: "https://meet.jit.si",
      room: "jitsiIsAwesomeWithFlutter",
      configOverrides: {
        "startWithAudioMuted": false,
        "startWithVideoMuted": false,
        "subject" : "Jitsi with Flutter",
      },
      featureFlags: {
        "unsaferoomwarning.enabled": false
      },
      userInfo: JitsiMeetUserInfo(
          displayName: "Flutter user",
          email: "user@example.com"
      ),
    );
```

- 可以添加到 `configOverrides` 的所有值可以在 [这里](https://github.com/jitsi/jitsi-meet/blob/master/config.js) 找到。

- 可以添加到 `featureFlags` 的所有值可以在 [这里](https://github.com/jitsi/jitsi-meet/blob/master/react/features/base/flags/constants.ts) 找到。

#### JitsiMeetUserInfo(`{String displayName, String email, String avatar}`)

JitsiMeetUserInfo 的构造函数。

P.S. 头像应为 URL。

### JitsiMeetEventListener

此类旨在用作来自原生 SDK 的事件监听器。它将接收事件处理程序作为参数。

#### conferenceJoined(String url)

    当加入会议时调用。
    - `url`：会议的 URL

#### conferenceTerminated(String url, Object? error)

    当活动会议结束时调用，无论是因为用户选择还是由于故障。
    
    - `url`：会议的 URL
    - `error`：如果会议正常结束则缺失，否则包含错误信息

#### conferenceWillJoin(String url)

    在加入会议之前调用。
    
    - `url`：会议的 URL

#### participantJoined(String? email, String? name, String? role, String? participantId) 

    当有参与者加入会议时调用。
    
    - `email`：参与者的电子邮件。如果远程参与者没有设置，则可能未设置。
    - `name`：参与者的名称。
    - `role`：参与者的角色。
    - `participantId`：参与者的 ID。

#### participantLeft(String? participantId)

    当参与者离开会议时调用。
    
    - `participantId`：离开的参与者的 ID。

#### audioMutedChanged(bool muted)

    当本地参与者的音频被静音或取消静音时调用。
    
    - `muted`：一个布尔值，指示音频是否被静音。

#### videoMutedChanged(bool muted)

    当本地参与者的视频被静音或取消静音时调用。
    
    - `muted`：一个布尔值，指示视频是否被静音。

#### endpointTextMessageReceived(String senderId, String message)

    当接收到一个端点文本消息时调用。
    
    - `senderId`：发送者的参与者 ID
    - `message`：内容。

#### screenShareToggled(String participantId, bool sharing)

    当参与者开始或停止共享其屏幕时调用。
    
    - `participantId`：参与者的 ID
    - `sharing`：屏幕共享的状态

#### chatMessageReceived(String senderId, String message, bool isPrivate, String? timestamp)

    当接收到聊天文本消息时调用。
    
    - `senderId`：发送该消息的参与者的 ID。
    - `message`：消息的内容。
    - `isPrivate`：如果消息是私密的，则为 true，否则为 false。
    - `timestamp`：消息的（可选）时间戳。

#### chatToggled(bool isOpen)

    当聊天对话框打开或关闭时调用。
    
    - `isOpen`：如果聊天对话框打开，则为 true，否则为 false。

#### participantsInfoRetrieved(String participantsInfo)

    当调用 `retrieveParticipantsInfo` 操作时调用。
    
    - `participantsInfo`：参与者信息的字符串列表。

#### readyToClose()

    当 SDK 准备关闭时调用。此时没有会议正在进行。

#### 监听器示例：

```dart
var listener = JitsiMeetEventListener(
      conferenceJoined: (url) {
        debugPrint("conferenceJoined: url: $url");
      },

      participantJoined: (email, name, role, participantId) {
        debugPrint(
          "participantJoined: email: $email, name: $name, role: $role, "
              "participantId: $participantId",
        );
        participants.add(participantId!);
      },

      chatMessageReceived: (senderId, message, isPrivate) {
        debugPrint(
          "chatMessageReceived: senderId: $senderId, message: $message, "
              "isPrivate: $isPrivate",
        );
      },

      readyToClose: () {
        debugPrint("readyToClose");
      },
    );
```
