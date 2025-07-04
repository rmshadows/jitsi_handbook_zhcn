---
id: secure-domain
title: Secure Domain Setup - 安全域配置
sidebar_label: Authentication (Secure Domain) - 认证（安全域）
---

可以设置仅允许经过身份验证的用户创建新的会议室。
 每当有新会议室即将被创建时，Jitsi Meet 会要求输入用户名和密码。会议室创建后，其他用户可以通过匿名域加入会议。以下是需要进行的配置：

## Prosody 配置

如果你是通过 Debian 软件包安装的 Jitsi Meet，则需要在以下路径修改配置文件：`/etc/prosody/conf.avail/[你的主机名].cfg.lua`

以下示例假设主机名为 `jitsi.example.com`，请根据你的实际主机名替换。

### 启用认证

在 `VirtualHost "[你的主机名]"` 配置段内，将匿名认证替换为哈希密码认证：

```
VirtualHost "jitsi.example.com"
    authentication = "internal_hashed"
```

你在配置文件中看到的将是你自己的主机名，而不是 `jitsi.example.com`。

### 为访客启用匿名登录

在前一个 `VirtualHost` 配置段**之后**添加以下内容，以启用访客的匿名登录方式：

```
VirtualHost "guest.jitsi.example.com"
    authentication = "jitsi-anonymous"
    c2s_require_encryption = false
```

注意：`guest.jitsi.example.com` 是 Jitsi 内部使用的域名，您无需（且不应）为其创建 DNS 记录、生成 SSL/TLS 证书或进行任何 Web 服务器配置。虽然它是内部域名，但仍需将 `jitsi.example.com` 替换为您的主机名。

## Jitsi Meet 配置

在 `config.js` 文件中，需要设置 `anonymousdomain` 选项。

如果你是通过 Debian 软件包安装的 jitsi-meet，则应修改以下文件：`/etc/jitsi/meet/[你的主机名]-config.js`

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
 你只需要添加 `anonymousdomain` 这一行，注意逗号位置，避免语法错误。

## Jicofo 配置

运行 Jicofo 时，需要在额外的配置项中指定你的主域名。
 Jicofo 只会接受来自认证域的会议分配请求。
 这应作为新的 `authentication` 部分，添加到 `/etc/jitsi/jicofo/jicofo.conf` 中：

```
jicofo {
  authentication: {
    enabled: true
    type: XMPP
    login-url: "jitsi.example.com"
  }
}
```

将 `jitsi.example.com` 替换为你自己的主机名。不要新建 `jicofo` 配置段。
 请在已有的 `jicofo` 配置段内创建 `authentication` 配置段。

## 重启服务

以 `root` 用户身份重启 prosody、jicofo 和 jitsi-videobridge2 服务。

```
systemctl restart prosody
systemctl restart jicofo
systemctl restart jitsi-videobridge2
```

## 在 Prosody 中创建用户

最后，使用 `prosodyctl` 命令在 Prosody 中创建用户：

```
sudo prosodyctl register <username> <your-hostname> <password>
```

例如：

```
sudo prosodyctl register myname jitsi.example.com mypassword123
```

:::note
Docker 用户可能需要使用不同的配置路径。官方 [`jitsi/prosody`](https://github.com/jitsi/docker-jitsi-meet) 镜像的用户应使用以下方式调用 `prosodyctl`：

```
prosodyctl --config /config/prosody.cfg.lua register <username> meet.jitsi <password>
```

有关 `prosodyctl` 的完整文档，请参见 [官方文档](https://prosody.im/doc/prosodyctl)。
:::

## 从 Prosody 中删除用户

删除已有用户：

```
sudo prosodyctl unregister <username> <your-hostname>
```

例如：

```
sudo prosodyctl unregister myname jitsi.example.com
```

## 可选：Jigasi 配置

### 启用认证

如果你使用 Jigasi，需要通过编辑 `/etc/jitsi/jigasi/sip-communicator.properties` 中的以下几行来设置认证：

```
org.jitsi.jigasi.xmpp.acc.USER_ID=SOME_USER@SOME_DOMAIN
org.jitsi.jigasi.xmpp.acc.PASS=SOME_PASS
org.jitsi.jigasi.xmpp.acc.ANONYMOUS_AUTH=false
```

请注意，这里的密码是明文密码，而不是 Base64 编码。

### Debugging

如果遇到证书链相关问题，可能需要取消注释 `sip-communicator.properties` 中的以下配置：

```
net.java.sip.communicator.service.gui.ALWAYS_TRUST_MODE_ENABLED=true
```

:::note
此配置仅应在测试/调试阶段或受控环境下使用。确认是此问题后，建议通过其他方式解决，例如获取 Prosody 的签名证书，或将相关证书添加到 Jigasi 的信任库中。
:::

