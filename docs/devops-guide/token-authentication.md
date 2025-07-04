---
id: token-authentication
title: Token Authentication - 令牌认证
sidebar_label: Authentication (Token)
---

可以设置仅允许持有有效令牌的用户创建新的会议室。
 会议室创建后，其他用户可以通过匿名域加入会议。以下是需要进行的配置：

## Token package - Token 包

安装 `jitsi-meet-tokens` 软件包：

```
apt-get install jitsi-meet-tokens
```

根据提示设置 `Application ID` 和 `Application Secret`。
 该命令会将 `app_id` 和 `app_secret` 添加到 Prosody 配置中，并设置 `authentication`（认证方式）。

## Prosody configuration

如果你是通过 Debian 软件包安装的 Jitsi Meet，则需要修改以下路径下的文件：

`/etc/prosody/conf.avail/[你的主机名].cfg.lua`

以下示例中假设主机名为 `jitsi.example.com`。

安装完 token 包后，你将在 Prosody 配置中看到如下内容：

```
VirtualHost "jitsi.example.com"
    authentication = "token"
    app_id="myappid"
    app_secret="myappsecret"
---
---

Component "conference.jitsi.example.com" "muc"
    ---
    ---
    modules_enabled = {
        ---
        ---
        "token_verification";
        ---
        ---
    }
```

### allow_empty_token

添加 `allow_empty_token` 到 `VirtualHost` 中：

```
VirtualHost "jitsi.example.com"
    authentication = "token"
    app_id="myappid"
    app_secret="myappsecret"
    allow_empty_token = true
```

### persistent_lobby

添加 `persistent_lobby` 作为模块到 `VirtualHost` 中：

```
VirtualHost "jitsi.example.com"
    ---
    ---
    modules_enabled = {
        ---
        ---
        "muc_lobby_rooms";
        "persistent_lobby";
```

### muc_wait_for_host

将 `muc_wait_for_host` 添加为 `Component` 中的模块：

```
Component "conference.jitsi.example.com" "muc"
    ---
    ---
    modules_enabled = {
        ---
        "token_verification";
        "muc_wait_for_host";
    }
```

### Enable anonymous login for guests - 为访客启用匿名登录

将以下配置段**添加在前一个 VirtualHost 之后**，以启用访客的匿名登录方式：

```
VirtualHost "guest.jitsi.example.com"
    authentication = "jitsi-anonymous"
    c2s_require_encryption = false
```

请注意，`guest.jitsi.example.com` 是 Jitsi 内部使用的域名，您无需（且不应）为其创建 DNS 记录、生成 SSL/TLS 证书或进行任何 Web 服务器配置。虽然它是内部域名，但仍需将 `jitsi.example.com` 替换为您的主机名。

## Jitsi Meet configuration - Jitsi Meet 配置

在 `config.js` 中，需要设置 `anonymousdomain` 选项。

如果您是通过 Debian 软件包安装的 jitsi-meet，请在以下文件中进行修改：`/etc/jitsi/meet/[您的主机名]-config.js`

```
var config = {
    hosts: {
        domain: 'jitsi.example.com',
        anonymousdomain: 'guest.jitsi.example.com',
        // ...
    },
    // ...
}
```

你在配置文件中看到的是你自己的主机名，而不是 `jitsi.example.com`。
 你只需要添加 `anonymousdomain` 这一行。注意逗号的位置，避免语法错误。

## Jicofo configuration - Jicofo 配置

无需修改 Jicofo 配置文件。部分过时文档建议在 `jicofo.conf` 中启用认证，请不要这样做。
 当启用 `token` 认证时，`jicofo.conf` 中的认证必须保持禁用状态。

保持 `jicofo.conf` 文件不变，无需任何更改。

## Restart the services - 重启服务

以 `root` 用户身份重启 prosody、jicofo 和 jitsi-videobridge2 服务。

```
systemctl restart prosody
systemctl restart jicofo
systemctl restart jitsi-videobridge2
```
