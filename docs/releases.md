---
id: releases
title: Releases - 发布
---

:::tip
Jitsi Meet 的版本发布说明可以在[此处](https://github.com/jitsi/jitsi-meet-release-notes)查看。
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="release">
  <TabItem value="mobile" label="移动端" default>
### Apps

| Android | Android (F-Droid) | iOS |
|:-:|:-:|:-:|
| [<img src="https://raw.githubusercontent.com/jitsi/handbook/master/docs/assets/google-play-badge.png" height="50" />](https://play.google.com/store/apps/details?id=org.jitsi.meet) | [<img src="https://raw.githubusercontent.com/jitsi/handbook/master/docs/assets/f-droid-badge.png" height="50" />](https://f-droid.org/en/packages/org.jitsi.meet/) | [<img src="https://raw.githubusercontent.com/jitsi/handbook/master/docs/assets/appstore-badge.png" height="50" />](https://itunes.apple.com/us/app/jitsi-meet/id1165103905) |

### Apps (beta)

如果你感兴趣并且想抢先体验正在开发中的新功能，可以在此注册参与我们的公开测试：

| Android | iOS |
|:-:|:-:|
| [Play Store Beta](https://play.google.com/apps/testing/org.jitsi.meet) | [TestFlight](https://testflight.apple.com/join/isy6ja7S)

### SDKs

| Android | iOS |
| :--: | :--: |
| [Maven repository](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-android-sdk#use-pre-build-sdk-artifactsbinaries) | [CocoaPods](https://cocoapods.org/pods/JitsiMeetSDK)
  </TabItem>
  <TabItem value="desktop" label="桌面端">
| Windows | macOS | GNU/Linux (AppImage) | GNU/Linux (Deb) |
| :--: | :--: | :--: | :--: |
| [下载](https://github.com/jitsi/jitsi-meet-electron/releases/latest/download/jitsi-meet.exe) | [下载](https://github.com/jitsi/jitsi-meet-electron/releases/latest/download/jitsi-meet.dmg) | [下载](https://github.com/jitsi/jitsi-meet-electron/releases/latest/download/jitsi-meet-x86_64.AppImage) | [下载](https://github.com/jitsi/jitsi-meet-electron/releases/latest/download/jitsi-meet-amd64.deb) |

桌面应用程序基于 Electron 构建。对于 macOS，它也可以作为 brew cask 提供，可以通过运行 `brew install jitsi-meet` 来安装。
  </TabItem>
  <TabItem value="server" label="服务端">
### Docker images - Docker镜像

在[这里](https://github.com/jitsi/docker-jitsi-meet/releases)查看Docker镜像。

### Debian/Ubuntu packages - Debian/Ubuntu软件包

* [`stable`](https://download.jitsi.org/stable/) ([安装说明](https://jitsi.org/downloads/ubuntu-debian-installations-instructions/))
* [`testing`](https://download.jitsi.org/testing/) ([安装说明](https://jitsi.org/downloads/ubuntu-debian-installations-instructions-for-testing/))
* [`nightly`](https://download.jitsi.org/unstable/) ([安装说明](https://jitsi.org/downloads/ubuntu-debian-installations-instructions-nightly/))

### Web frontend - Web前端

最新稳定版发布 | [![release](https://img.shields.io/badge/release-latest-green.svg)](https://github.com/jitsi/jitsi-meet/releases/latest) |
|---|---|

预构建的 [源代码构建](https://download.jitsi.org/jitsi-meet/src/) (Prebuilt) 也可用。

:::note
通常情况下，你不需要下载这个，因为它已经包含在 Debian 软件包和 Docker 镜像中。
:::
  </TabItem>
</Tabs>
