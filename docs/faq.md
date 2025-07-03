---
id: faq
title: FAQ - 常见问题回答
---

## 如何判断我的服务器实例是否在 NAT 后面？

一般来说，如果工具 ifconfig（或 ipconfig）显示分配的 IPv4 地址是私有/本地地址（10.x.x.x、172.16.x.x - 172.31.x.x 或 192.168.x.x），但你知道它的公共 IPv4 地址不同于此，那么该服务器很可能是在 NAT 后面。

如果你在 VPS 上托管服务器，且不确定，可以向你的 VPS 提供商的支持团队询问。

## 客户端在 `meet.jit.si` 创建的房间中能够正常通信，但在我自托管的实例中仍然能够连接，但彼此无法听到或看到。问题出在哪里？

很可能是服务器在 NAT 后面，但你没有添加特定于 NAT 的配置。请查看 [这个已解决的问题](https://community.jitsi.org/t/cannot-see-video-or-hear-audio-on-self-hosted-instance/)。你需要按照 [这里](devops-guide/devops-guide-quickstart#advanced-configuration) 的详细步骤进行操作。

## 两个参与者的时候它可以正常工作，但第三个参与者加入时，会崩溃或无法正常运行

P2P 模式正常工作，但在尝试通过 jitsi-videobridge2 传递流量时失败。

请检查你的防火墙/NAT 设置是否正确，特别是 UDP 10000。有关更多信息，请参见 [这里](devops-guide/devops-guide-quickstart#setup-and-configure-your-firewall)。

## 我可以静音和取消静音其他参与者吗？

如果你是会议的主持人，你可以静音所有人的麦克风。但是你不能取消其他人的麦克风静音，他们可以随时取消静音。

你可能想要设定一些“基本规则”，规定谁可以发言以及何时发言，就像任何实体会议或课堂一样。

如果你希望限制谁可以成为主持人，需要设置你的 Jitsi 实例并启用“安全域”。有关更多信息，请参见 [这里](#4-enable-secure-domain-if-you-are-using-your-instance-of-jitsi)。

## 如何保护我的 Jitsi 会议？

### _1. 创建一个“强大”会议室名称。_

使用一个强密码式的会议室名称，避免使用其他人可能想到的名称。你可以使用欢迎页面上的名称生成器，或自行生成一个“强大”名称。

例如，在 macOS 终端中，你可以使用 `uuidgen` 命令生成一串字母和数字（例如 B741B63E-C5E6-4D82-BAC4-048BE25D8CC7）。

你的会议室名称将在托管的 `meet.jit.si` 平台上显示为 `meet.jit.si/B741B63E-C5E6-4D82-BAC4-048BE25D8CC7`。

如果你使用像“test”或“LucysMeeting”这样的名称，很有可能其他用户也会使用类似的名称。

### _2. 为每次会议/视频会议使用不同的会议室名称。_

如果你需要进行多次会议，理想情况下为每次会议使用不同的会议室名称。

如果不太方便，至少为每一组参与者使用不同的会议室名称。

### _3. 给会议室设置密码。_

启动会议室后，为其设置密码。只有知道密码的人才能加入会议，但这不会影响已经加入的人。

你需要将密码告知所有参与者。

如果他们将密码分享给他人，其他人也可以加入会议。

### _4. 如果你使用自托管的 Jitsi 实例，启用“安全域”。_

除了上述建议之外，考虑启用[“安全域”配置](https://jitsi.github.io/handbook/docs/devops-guide/secure-domain)。这要求你（或其他人）输入用户名和密码才能开启会议室。它还允许你成为会议的主持人。

## 在浏览器上可以正常连接，但在 iOS 或 Android 应用中无法连接

这可能是因为你的 TLS 证书没有完整链条。你可以在[这里](https://whatsmychaincert.com/)检查你的证书链是否配置正确。

如果你使用的是 Let’s Encrypt 并通过 nginx 配置，应该有如下的配置行：

`ssl_certificate /etc/letsencrypt/live/jitsi.example.com/fullchain.pem;`

## 我可以录制并保存视频吗？

可以。有多种方法可以录制会议（使用外部软件或服务）：

_注意_：如果你想使用隐私友好的方法，建议使用方法 1 或 2。

1. **OBS**：使用 [OBS](https://obsproject.com/) 录制会议（例如浏览器窗口）。

2. **RTMP 服务器**：你需要设置自己的 RTMP 服务器，然后使用你的 RTMP URL 和流密钥，而不是按照[这里](https://jitsi.org/blog/live-streaming-with-jitsi-and-youtube/)描述的使用 YouTube 流密钥。自行部署的 Jitsi Meet 实例需要设置 Jibri 来实现此功能。

3. **Dropbox**：通过 Jitsi Meet [连接 Dropbox](/handbook/docs/dev-guide/dev-guide-web-integrations#creating-the-dropbox-app-for-dropbox-recording-integration)，并将视频保存到 Dropbox。

4. **视频服务/网站**：将你的会议直播到 YouTube 或其他网站（例如 Twitch），然后在那里获取录制的视频（参见 [操作指南](https://jitsi.org/blog/live-streaming-with-jitsi-and-youtube/)）。自托管的 Jitsi Meet 部署需要设置 Jibri 来实现此功能。

未来可能会有更多录制方法，但目前尚未准备好（例如 [本地录制](https://github.com/jitsi/jitsi-meet/issues/6014)）。

## 我在会议中设置了密码，但下次会议时它没有生效

一旦会议结束，密码也会被清除。因此，你需要为每次会议重新设置密码。

## 如何限制参与者人数？

1. 使用命令 `prosodyctl about` 查看 Prosody 的版本和插件目录，输出结果类似如下：

```
Prosody 0.11.6
# Prosody directories
Data directory: /var/lib/prosody
Config directory: /etc/prosody
Source directory: /usr/lib/prosody
Plugin directories:
/usr/share/jitsi-meet/prosody-plugins/
/usr/lib/prosody/modules/
```

2. 检查插件目录中是否有 `mod_muc_max_occupants.lua` 文件。

如果没有，请在插件目录中新建一个文件 `mod_muc_max_occupants.lua`，并从[这里](https://github.com/jitsi/jitsi-meet/blob/master/resources/prosody-plugins/mod_muc_max_occupants.lua)复制所有内容粘贴到该文件中。

如果文件已存在，请忽略此步骤。

3. 编辑 `/etc/prosody/conf.avail/meet.example.com.cfg.lua` 文件，在 conference.meet.example.com 的 "muc" 部分中将 `muc_max_occupants` 添加为启用的模块。

然后，在下面添加以下选项。需要同时定义 `muc_max_occupants` 和 `muc_access_whitelist`。

示例：

```
Component "conference.meet.example.com" "muc"
   storage = "memory"
   modules_enabled = {
       "muc_meeting_id";
       "muc_domain_mapper";
       "muc_max_occupants"; 
   }
   muc_max_occupants = "5"
   muc_access_whitelist = { "focus@auth.meet.example.com" }
   admins = { "focus@auth.meet.example.com" }
   muc_room_locking = false
   muc_room_default_public_jids = true
```

注意：`storage = ""` 的值与 Prosody 版本相关，你需要根据版本修改 `storage=""`。

- Prosody nightly747 storage = "null"
- Prosody 0.10 storage = "none"
- Prosody 0.11 storage = "memory"

4. 使用命令 `prosodyctl restart` 重启服务以生效。

5. 如果你想更新 Prosody，可以参考[这里](https://community.jitsi.org/t/how-to-how-do-i-update-prosody/72205)。

## 其他参与者反映我的屏幕共享画面非常亮，看起来像是被“洗过色”？

可能是你操作系统显示设置或显卡设置中启用了 HDR 流媒体。如果你使用 Windows，可以通过快捷键 `Win + Alt + B` 随时快速切换 HDR 开/关，即使在屏幕共享时也可以切换。

