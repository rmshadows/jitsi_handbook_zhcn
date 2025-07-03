---
id: user-guide-advanced
title: User Guide (advanced) - 用户指南（高级）
sidebar_label: Advanced options - 高级选项
---

有一些选项可以调整邀请链接，以解锁 Jitsi 中更多功能。以下参数适用于网页、iframe 和移动版本。

所有列出的键都以 `config.` 为前缀。你选择一个键，将其与其值结合使用 `=`，并用 `&` 连接参数，例如 `#config.defaultLanguage=en&config.minParticipants=3`。

<!--
  功能实现请查看 -- See also for implementation:
  https://github.com/jitsi/jitsi-meet/blob/b0188a71841c966122c3cce8c7023b7de8e32a82/config.js
  https://github.com/jitsi/jitsi-meet/blob/b0188a71841c966122c3cce8c7023b7de8e32a82/react/features/base/config/configWhitelist.js
  https://github.com/jitsi/jitsi-meet/blob/b0188a71841c966122c3cce8c7023b7de8e32a82/react/features/base/config/functions.any.js#L70
-->

## 邀请

这些参数影响你在会议前或会议中邀请其他人的方式。

| 键                       | 值     | 效果                               |
| ------------------------ | ------ | ---------------------------------- |
| `disableInviteFunctions` | `true` | 禁用应用的邀请功能                 |
| `minParticipants`        | `2`    | 在开始通话之前覆盖参与者的最小数量 |
| `prejoinConfig.enabled`  | `true` | 在加入前显示中间页面，以便调整设备 |

## 用户界面

这些参数对用户界面有影响。

| 键                              | 值     | 效果                                                  |
| ------------------------------- | ------ | ----------------------------------------------------- |
| `defaultLanguage`               | `en`   | 更改用户界面的默认语言                                |
| `disableThirdPartyRequests`     | `true` | 本地生成头像，并禁用 callstats 集成                   |
| `enableDisplayNameInStats`      | `true` | 将参与者的显示名称发送给 callstats                    |
| `enableEmailInStats`            | `true` | 将电子邮件（如果可用）发送给 callstats 和其他分析工具 |
| `enableInsecureRoomNameWarning` | `true` | 如果房间名称被视为不安全，则显示警告标签              |

## 视频

使用这些参数来影响会议的视频。

| 键                            | 值     | 效果                   |
| ----------------------------- | ------ | ---------------------- |
| `desktopSharingFrameRate.min` | `5`    | 覆盖桌面共享的最低帧率 |
| `desktopSharingFrameRate.max` | `5`    | 覆盖桌面共享的最高帧率 |
| `startWithVideoMuted`         | `true` | 加入时禁用视频         |

## 音频

使用这些参数来影响会议的音频。

| 键                    | 值     | 效果                                 |
| --------------------- | ------ | ------------------------------------ |
| `disableAudioLevels`  | `true` | 禁用音频统计轮询（从而可能提高性能） |
| `disableRemoteMute`   | `true` | 禁用远程参与者的所有静音操作         |
| `startWithAudioMuted` | `true` | 加入时关闭音频输入                   |
| `startSilent`         | `true` | 静音音频输入和输出                   |
