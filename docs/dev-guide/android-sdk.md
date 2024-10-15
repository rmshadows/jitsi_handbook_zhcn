---
id: dev-guide-android-sdk
title: Android SDK
---

Jitsi Meet Android SDK 提供了与 Jitsi Meet 应用相同的用户体验，并且可以以可自定义的方式嵌入到您的应用中。

:::important
需要 Android 7.0（API 级别 24）或更高版本。
:::

## 使用 SDK 的示例应用

如果您想了解将 Jitsi Meet SDK 集成到本地应用中有多简单，可以查看 [示例应用程序仓库](https://github.com/jitsi/jitsi-meet-sdk-samples#android)。

## 构建您自己的 SDK，或使用预构建的 SDK 组件/二进制文件

Jitsi 方便地在其 Maven 仓库中提供了预构建的 SDK 组件/二进制文件。当您不需要对 SDK 本身或其任何依赖项进行修改时，建议使用预构建的 SDK。这避免了构建和安装您自己的 SDK 组件/二进制文件的复杂性。

### 使用预构建的 SDK 组件/二进制文件

在您的项目中，添加 Maven 仓库 `https://github.com/jitsi/jitsi-maven-repository/raw/master/releases` 和依赖项 `org.jitsi.react:jitsi-meet-sdk` 到您的 `build.gradle` 文件中。

仓库通常放在项目根目录的 `build.gradle` 文件中：

```gradle title="build.gradle"
allprojects {
    repositories {
        maven {
            url "https://github.com/jitsi/jitsi-maven-repository/raw/master/releases"
        }
        google()
        mavenCentral()
        maven { url 'https://www.jitpack.io' }
    }
}
```

在较新版本的 Android Studio 中，可能在 `build.gradle` 中找不到 `allprojects{}`。在这种情况下，仓库应放入项目根目录的 `settings.gradle` 文件中：

```gradle title="settings.gradle"
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven {
            url "https://github.com/jitsi/jitsi-maven-repository/raw/master/releases"
        }
        maven {
            url "https://maven.google.com"
        }
    }
}
```

依赖项定义应放在各个模块的 `build.gradle` 文件中：

```gradle
dependencies {
    // (other dependencies)
    implementation ('org.jitsi.react:jitsi-meet-sdk:+') { transitive = true }
}
```

:::warning
请确保通过查看 [发布页面](https://github.com/jitsi/jitsi-meet-release-notes/blob/master/CHANGELOG-MOBILE-SDKS.md) 来固定您的依赖项。
:::

### 构建并使用您自己的 SDK 组件/二进制文件

<details>
<summary>显示构建说明</summary>

首先，请确保您的开发环境 [已正确设置](/docs/category/mobile)。

:::note 关于依赖项的说明
除了 SDK，Jitsi 还向 Jitsi Maven 仓库发布了一些 SDK 依赖项的二进制 Maven 组件（这些依赖项在其他地方无法公开获得）。当您计划使用从源代码构建的 SDK 时，您很可能会使用一个比生成二进制 SDK 组件时所用的源代码版本更新（或至少是 _不同_）的源代码版本。因此，您的项目可能需要的依赖项也可能与在 Jitsi Maven 仓库中发布的不同。这可能会导致构建问题，因为依赖项不可用。
:::

如果您希望使用从源代码构建的 SDK，您可能需要创建一个包含这些依赖项的本地 Maven 仓库。下面的文本描述了如何创建一个包含 SDK 以及这些依赖项的仓库。为了说明，我们将定义这个本地 Maven 仓库的位置为 `/tmp/repo`。

在源代码形式中，Android SDK 依赖项由 Jitsi Meet 项目的 `package.json` 和 `package-lock.json` 锁定。要获取这些数据，请在 jitsi-meet 项目目录中执行 NPM：

```shell
    npm install
```

Jitsi Meet SDK for Android 依赖的第三方 React Native _模块_ 会通过 NPM 以源代码或二进制形式下载。这些需要被组装成 Maven 组件，并然后发布到您的本地 Maven 仓库。提供了一个脚本来简化这个过程。在 jitsi-meet 项目仓库的根目录中运行：

```shell
    ./android/scripts/release-sdk.sh /tmp/repo
```

这将构建并发布 SDK 及其所有依赖项到指定的 Maven 仓库（在本例中为 `/tmp/repo`）。

您现在可以使用这些组件。在 _您的_ 项目中，将上面使用的 Maven 仓库 (`/tmp/repo`) 添加到您的顶层 `build.gradle` 文件中：

```gradle
    allprojects {
        repositories {
            maven { url "file:/tmp/repo" }
            google()
            mavenCentral()
            maven { url 'https://www.jitpack.io' }
        }
    }
```

您可以使用本地仓库替换 Jitsi 仓库（`maven { url "https://github.com/jitsi/jitsi-maven-repository/raw/master/releases" }`），前提是您已发布了 _所有_ 子项目。如果没有，您必须同时添加两个仓库。确保您的本地仓库列在首位！

然后，将依赖项 `org.jitsi.react:jitsi-meet-sdk` 定义到模块的 `build.gradle` 文件中：

```java
    implementation ('org.jitsi.react:jitsi-meet-sdk:+') { transitive = true }
```

请注意，不需要显式添加其他依赖项，因为它们会作为 `jitsi-meet-sdk` 的传递依赖项被引入。

</details>

## 使用 API

Jitsi Meet SDK 是一个 Android 库，体现了整个 Jitsi Meet 体验，并使其可被第三方应用重用。

首先，通过在您的 `build.gradle` 文件中添加以下行，为您的项目添加 Java 1.8 兼容性支持：

```gradle
compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
}
```

要开始使用，只需启动 `JitsiMeetActivity` 指向您想要加入的房间：

```java
// 在您的应用中的某个早期位置。
JitsiMeetConferenceOptions defaultOptions
        = new JitsiMeetConferenceOptions.Builder()
    .setServerURL(serverURL)
    // 当使用 JaaS 时，在此处设置获得的 JWT
    //.setToken("MyJWT")
    // 可以设置不同的功能标志
    // .setFeatureFlag("toolbox.enabled", false)
    // .setFeatureFlag("filmstrip.enabled", false)
    .setFeatureFlag("welcomepage.enabled", false)
    .build();
JitsiMeet.setDefaultConferenceOptions(defaultOptions);
// ...
// 构建用于加入会议的选项对象。SDK 将合并我们之前设置的默认选项和此次的选项。
JitsiMeetConferenceOptions options
        = new JitsiMeetConferenceOptions.Builder()
    .setRoom(roomName)
    // 音频和视频设置
    //.setAudioMuted(true)
    //.setVideoMuted(true)
    .build();
// 使用给定的选项启动新的活动。launch() 方法负责创建所需的 Intent 并传递选项。
JitsiMeetActivity.launch(this, options);
```

或者，您可以使用扩展了 `android.view.View` 的 `org.jitsi.meet.sdk.JitsiMeetView` 类。

请注意，当由于某种原因无法使用 `JitsiMeetActivity` 时，才需要扩展 `JitsiMeetView`。扩展 `JitsiMeetView` 需要手动将视图连接到活动，并使用大量样板代码。强烈建议使用活动(Activity)而不是视图(View)。

<details>
<summary>显示示例</summary>

```java
package org.jitsi.example;

import android.os.Bundle;
import android.support.v4.app.FragmentActivity;

import org.jitsi.meet.sdk.JitsiMeetView;
import org.jitsi.meet.sdk.ReactActivityLifecycleCallbacks;

// Example
//
public class MainActivity extends FragmentActivity implements JitsiMeetActivityInterface {
    private JitsiMeetView view;

    @Override
    protected void onActivityResult(
            int requestCode,
            int resultCode,
            Intent data) {
        JitsiMeetActivityDelegate.onActivityResult(
                this, requestCode, resultCode, data);
    }

    @Override
    public void onBackPressed() {
        JitsiMeetActivityDelegate.onBackPressed();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        view = new JitsiMeetView(this);
        JitsiMeetConferenceOptions options = new JitsiMeetConferenceOptions.Builder()
            .setRoom("https://meet.jit.si/test123")
            .build();
        view.join(options);

        setContentView(view);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        view.dispose();
        view = null;

        JitsiMeetActivityDelegate.onHostDestroy(this);
    }

    @Override
    public void onNewIntent(Intent intent) {
        JitsiMeetActivityDelegate.onNewIntent(intent);
    }

    @Override
    public void onRequestPermissionsResult(
            final int requestCode,
            final String[] permissions,
            final int[] grantResults) {
        JitsiMeetActivityDelegate.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    @Override
    protected void onResume() {
        super.onResume();

        JitsiMeetActivityDelegate.onHostResume(this);
    }

    @Override
    protected void onStop() {
        super.onStop();

        JitsiMeetActivityDelegate.onHostPause(this);
    }
}
```

</details>

### JitsiMeetActivity

此类封装了一个高级 API，以 Android `FragmentActivity` 的形式显示单个 `JitsiMeetView`。您可以在启动它时将 URL 作为 `ACTION_VIEW` 传递到 Intent 中，它将加入会议，并在会议结束或失败时自动终止（会调用活动的 finish()）。

### JitsiMeetView

`JitsiMeetView` 类是 Jitsi Meet SDK 的核心。它旨在显示 Jitsi Meet 会议（或欢迎页面）。

#### join(options)

加入由给定的 `JitsiMeetConferenceOptions` 指定的会议。

#### dispose()

释放与此视图相关的所有资源。此方法必须在持有此视图的 Activity 将要被销毁时调用，通常在 `onDestroy()` 方法中。

### JitsiMeetConferenceOptions

此对象封装了加入会议时可以调整的所有选项。

示例：

```java
ArrayList<Bundle> customToolbarButtons = new ArrayList<Bundle>();

Bundle firstCustomButton = new Bundle();
Bundle secondCustomButton = new Bundle();

firstCustomButton.putString("text", "Button one");
firstCustomButton.putString("icon", "https://w7.pngwing.com/pngs/987/537/png-transparent-download-downloading-save-basic-user-interface-icon-thumbnail.png");
firstCustomButton.putString("id", "btn1");

secondCustomButton.putString("text", "Button two");
secondCustomButton.putString("icon", "https://w7.pngwing.com/pngs/987/537/png-transparent-download-downloading-save-basic-user-interface-icon-thumbnail.png");
secondCustomButton.putString("id", "btn2");

customToolbarButtons.add(firstCustomButton);
customToolbarButtons.add(secondCustomButton);
        
JitsiMeetConferenceOptions options = new JitsiMeetConferenceOptions.Builder()
    .setServerURL(new URL("https://meet.jit.si"))
    .setRoom("MonthlyEndorsementsRebuildConsequently")
    .setAudioMuted(false)
    .setVideoMuted(false)
    .setAudioOnly(false)
    .setWelcomePageEnabled(false)
    .setConfigOverride("requireDisplayName", true)
    .setConfigOverride("customToolbarButtons", customToolbarButtons)
    .build();
```

请查看 `JitsiMeetConferenceOptions` 实现以获取所有可用选项。

### JitsiMeetActivityDelegate

此类处理 `JitsiMeetView` 与其封闭 `Activity` 之间的交互。通常用户不应直接使用此类，因为他们将使用已经完全集成的 `JitsiMeetActivity`。

它的所有方法都是静态的。

#### onActivityResult(...)

处理 SDK 启动的辅助活动的结果的辅助方法。应从活动的同名方法中调用。

#### onBackPressed()

应从活动的 `onBackPressed` 方法中调用的辅助方法。如果此函数返回 `true`，则表示该操作已处理，无需额外处理；否则，应用应调用父类的 `onBackPressed` 方法。

#### onHostDestroy(...)

应从活动的 `onDestroy` 方法中调用的辅助方法。

#### onHostResume(...)

应从活动的 `onResume` 或 `onStop` 方法中调用的辅助方法。

#### onHostStop(...)

应从活动的 `onStop` 方法中调用的辅助方法。

#### onNewIntent(...)

用于集成深度链接功能的辅助方法。如果您的应用活动以 "singleTask" 模式启动，则应从活动的 `onNewIntent` 方法中调用此方法。

#### onRequestPermissionsResult(...)

处理 SDK 内部权限请求的辅助方法。应从活动的同名方法中调用。

#### onUserLeaveHint()

用于集成自动画中画的辅助方法。应从活动的 `onUserLeaveHint` 方法中调用。

这是一个静态方法。

### 监听广播事件

SDK 广播了几个事件，用户可以对此进行监听。

```java
    IntentFilter intentFilter = new IntentFilter();
    intentFilter.addAction(BroadcastEvent.Type.CONFERENCE_JOINED.getAction());
    LocalBroadcastManager.getInstance(this).registerReceiver(broadcastReceiver, intentFilter);
```

请参阅 `JitsiMeetActivity`，它注册了所有事件并可以作为示例。

#### 支持的事件

##### CONFERENCE_JOINED

在加入会议时广播。`data` 包含以下信息：

- `url`: 会议 URL

##### CONFERENCE_TERMINATED

在主动结束或因故障结束活动会议时广播。`data` 包含以下信息：

- `url`: 会议 URL
- `error`: 如果会议正常结束则缺失，否则包含错误消息

##### CONFERENCE_WILL_JOIN

在加入会议之前广播。`data` 包含以下信息：

- `url`: 会议 URL

##### AUDIO_MUTED_CHANGED

在本地参与者的音频被静音或取消静音时广播。`data` 包含以下信息：

- `muted`: 一个布尔值，指示音频是否被静音。

##### PARTICIPANT_JOINED

在参与者加入会议时广播。`data` 包含以下信息：

- `email`: 参与者的电子邮件。如果远程参与者未设置，则可能不会设置。
- `name`: 参与者的姓名。
- `role`: 参与者的角色。
- `participantId`: 参与者的 ID。

##### PARTICIPANT_LEFT

当参与者离开会议时调用。`data` 包含以下信息：

- `participantId`: 离开的参与者的 ID。

##### ENDPOINT_TEXT_MESSAGE_RECEIVED

当接收到一个端点文本消息时广播。`data` HashMap 包含一个 `senderId` 键，值为发送者的 participantId 和一个 `message` 键，值为内容。

#### SCREEN_SHARE_TOGGLED

当参与者开始或停止共享屏幕时广播。`data` 包含以下信息：

- `participantId`: 开始或停止共享其屏幕的参与者的 ID。
- `sharing`: 如果参与者正在共享其屏幕，则为 true，否则为 false。

##### PARTICIPANTS_INFO_RETRIEVED

当调用 RETRIEVE_PARTICIPANTS_INFO 操作时广播。`data` HashMap 包含一个 `participantsInfo` 键，值为参与者信息列表和一个 `requestId` 键，值为在 RETRIEVE_PARTICIPANTS_INFO 操作中发送的 ID。

##### CHAT_MESSAGE_RECEIVED

当接收到聊天文本消息时广播。`data` 包含以下信息：

- `senderId`: 发送消息的参与者的 ID。
- `message`: 消息的内容。
- `isPrivate`: 如果消息是私有的，则为 true，否则为 false。
- `timestamp`: 消息的（可选）时间戳。

##### CHAT_TOGGLED

当聊天对话框打开或关闭时广播。`data` 包含以下信息：

- `isOpen`: 如果聊天对话框打开，则为 true，否则为 false。

##### VIDEO_MUTED_CHANGED

当本地参与者的视频被静音或取消静音时广播。`data` 包含以下信息：

- `muted`: 一个整数，指示视频是否被静音。0 表示未静音，4 表示已静音。

##### READY_TO_CLOSE

SDK 已准备好关闭/解除。

##### CUSTOM_OVERFLOW_MENU_BUTTON_PRESSED

当在溢出菜单中按下自定义按钮时广播。`data` 包含以下信息：

- `id`: 按下的自定义按钮的 ID。
- `text`: 按下的自定义按钮的标签。

### 广播操作

SDK 监听来自用户的广播操作并做出相应反应。

```java
    Intent muteBroadcastIntent = new Intent(BroadcastAction.Type.SET_AUDIO_MUTED.getAction());
    muteBroadcastIntent.putExtra("muted", muted);
    LocalBroadcastManager.getInstance(getApplicationContext()).sendBroadcast(muteBroadcastIntent);
```

意图可以手动构建（如上所示）或通过 `BroadcastIntentHelper` 中的方法构建。

请参阅 `JitsiMeetOngoingConferenceService` 以获取更多发送操作的示例。

#### 支持的操作

##### SET_AUDIO_MUTED

根据 `muted` 参数设置本地参与者音频静音状态。
期望意图额外信息中包含一个布尔值的 `muted` 键。

##### SET_VIDEO_MUTED

根据 `muted` 参数设置本地参与者视频静音状态。
期望意图额外信息中包含一个布尔值的 `muted` 键。

##### HANG_UP

本地参与者离开当前会议。
不期望任何额外值。

##### SEND_ENDPOINT_TEXT_MESSAGE

通过数据通道向特定参与者或所有参与者发送消息。
期望意图额外信息中包含 `to` 键，值为要发送消息的参与者的 ID，以及 `message` 键，值为实际消息内容。
如果 `to` 键不存在或其值为空，则消息将发送给会议中的所有参与者。

要获取 participantId，应监听 `PARTICIPANT_JOINED` 事件，该事件的 `data` 包含 ID，并应以某种方式存储。

##### TOGGLE_SCREEN_SHARE

根据 `enabled` 参数设置本地参与者的屏幕共享状态。
期望意图额外信息中包含一个布尔值的 `enabled` 键。

##### RETRIEVE_PARTICIPANTS_INFO

通知 SDK 检索参与者信息列表。SDK 将发出 `PARTIC

## ProGuard 规则

在项目中使用 SDK 时，必须添加一些 ProGuard 规则，以避免必要的代码被剥离。将以下内容添加到项目的规则文件中： [proguard-rules.pro](https://github.com/jitsi/jitsi-meet/blob/master/android/app/proguard-rules.pro)

## 画中画(Picture-in-Picture)

`JitsiMeetView` 在画中画模式下会自动调整其用户界面，以适应一个太小以容纳其“完整”用户界面的矩形。

## Dropbox 集成

要设置 Dropbox 集成，请按照以下步骤操作：

1. 在应用的 AndroidManifest.xml 中添加以下内容，并将 `<APP_KEY>` 更改为您的 Dropbox 应用密钥：

```xml
<activity
    android:configChanges="keyboard|orientation"
    android:launchMode="singleTask"
    android:name="com.dropbox.core.android.AuthActivity">
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.BROWSABLE" />
    <category android:name="android.intent.category.DEFAULT" />
    <data android:scheme="db-<APP_KEY>" />
  </intent-filter>
</activity>
```

2. 在应用的 strings.xml 中添加以下内容，并将 `<APP_KEY>` 更改为您的 Dropbox 应用密钥：

```xml
<string name="dropbox_app_key"><APP_KEY></string>
```
