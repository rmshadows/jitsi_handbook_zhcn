---
id: secure-domain
title: Secure Domain setup - 安全域配置
sidebar_label: Authentication (Secure Domain) - 认证（安全域）
---

可以设置为仅允许经过身份验证的用户创建新的会议室。当一个新的房间即将被创建时，Jitsi Meet 会提示输入用户名和密码。房间创建后，其他用户可以通过匿名域名加入会议。以下是需要配置的内容：

## Prosody 配置

如果你是通过 Debian 包安装的 Jitsi Meet，以下更改应在 `/etc/prosody/conf.avail/[your-hostname].cfg.lua` 文件中进行。

### 启用身份验证

在 `VirtualHost "[your-hostname]"` 块中，将匿名身份验证替换为哈希密码身份验证：

```
VirtualHost "jitsi-meet.example.com"
    authentication = "internal_hashed"
```

将 `jitsi-meet.example.com` 替换为你的主机名。

### 启用访客的匿名登录

**在前一个 VirtualHost 之后** 添加以下块以启用访客的匿名登录：

```
VirtualHost "guest.jitsi-meet.example.com"
    authentication = "anonymous"
    c2s_require_encryption = false
```

_注意：`guest.jitsi-meet.example.com` 仅用于 Jitsi 内部，不需要（也不应该）为它创建 DNS 记录、生成 SSL/TLS 证书或进行任何 web 服务器配置。虽然它是内部使用的，但仍应将 `jitsi-meet.example.com` 替换为你的主机名。_

## Jitsi Meet 配置

在 `config.js` 文件中，需要设置 `anonymousdomain` 选项。

如果你是通过 Debian 包安装的 jitsi-meet，以下更改应在 `/etc/jitsi/meet/[your-hostname]-config.js` 文件中进行。

```
var config = {
    hosts: {
            domain: 'jitsi-meet.example.com',
            anonymousdomain: 'guest.jitsi-meet.example.com',
            ...
        },
        ...
}
```

## Jicofo 配置

运行 Jicofo 时，需在附加的配置属性中指定你的主域名。Jicofo 只会接受来自经过身份验证的域的会议分配请求。应在 `/etc/jitsi/jicofo/jicofo.conf` 文件中添加以下新的 `authentication` 部分：

```
jicofo {
  authentication: {
    enabled: true
    type: XMPP
    login-url: jitsi-meet.example.com
 }
 ...
```

如果使用基于令牌的身份验证，类型应改为 `JWT`：

```
jicofo {
  authentication: {
    enabled: true
    type: JWT
    login-url: jitsi-meet.example.com
 }
 ...
```

## 在 Prosody 中创建用户（内部认证）

最后，运行 `prosodyctl` 来在 Prosody 中创建用户：

```
sudo prosodyctl register <username> jitsi-meet.example.com <password>
```

然后重启 Prosody、Jicofo 和 jitsi-videobridge2：

```
systemctl restart prosody
systemctl restart jicofo
systemctl restart jitsi-videobridge2
```

:::note
Docker 用户可能需要使用替代的配置路径。使用官方 [`jitsi/prosody`](https://github.com/jitsi/docker-jitsi-meet) 镜像的用户应按如下方式调用 `prosodyctl`。

```
prosodyctl --config /config/prosody.cfg.lua register <username> meet.jitsi <password>
```

关于 `prosodyctl` 的完整文档可以参考[官网](https://prosody.im/doc/prosodyctl)。
:::

## 可选：Jigasi 配置

### 启用身份验证

如果使用 Jigasi，可以通过编辑 `/etc/jitsi/jigasi/sip-communicator.properties` 文件中的以下行来启用身份验证：

````
org.jitsi.jigasi.xmpp.acc.USER_ID=SOME_USER@SOME_DOMAIN
org.jitsi.jigasi.xmpp.acc.PASS=SOME_PASS
org.jitsi.jigasi.xmpp.acc.ANONYMOUS_AUTH=false
````

注意：密码为明文密码，而非 base64 编码。

### 调试

如果遇到证书链问题，可能需要取消注释 `sip-communicator.properties` 文件中的以下行：

````
net.java.sip.communicator.service.gui.ALWAYS_TRUST_MODE_ENABLED=true
````

:::note
此设置仅应用于测试/调试或受控环境中。如果确认这是问题所在，应该通过其他方式解决（例如为 Prosody 获取签名证书，或将特定证书添加到 Jigasi 的信任库中）。
:::
