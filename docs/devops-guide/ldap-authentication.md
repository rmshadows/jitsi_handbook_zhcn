---
id: ldap-authentication
title: LDAP authentication - LDAP 认证
sidebar_label: LDAP 认证
---

:::note
本文只是初稿，可能在您的系统上无法正常工作。它已在安装了 Prosody 0.11 的 Debian 11 系统上进行了测试，并对 OpenLDAP 目录进行身份验证。
:::

如果您希望将用户身份验证与 LDAP 目录进行，而不是使用本地 Prosody 用户数据库，可以使用 Cyrus SASL 包。使用此包，您可能能够验证用户提供的凭据与其他来源（如 PAM、SQL 等）进行匹配，但这超出了本文的范围。

## 前提条件

在遵循本文之前，请确保您已按照[身份验证（安全域）](secure-domain.md)的说明设置了 Prosody。

### 必需的包

在 Debian 系统上，您需要安装一些必需的包：

```
sudo apt-get install sasl2-bin libsasl2-modules-ldap lua-cyrussasl
sudo prosodyctl install --server=https://modules.prosody.im/rocks/ mod_auth_cyrus
```

前两个包是 Cyrus 的 `saslauthd` 所必需的，并允许它连接到 LDAP 目录。`lua-cyrussasl` 包允许 Prosody 访问 Cyrus SASL。

安装 [mod_auth_cyrus](https://modules.prosody.im/mod_auth_cyrus) 模块是必要的，因为对 Cyrus SASL 的支持已从主流 Prosody 中[移除](https://prosody.im/doc/cyrus_sasl)，并放置在社区模块库中。

## 安装和设置 Cyrus SASL

以下选项定义了基本的 LDAP 配置。有关可能选项的完整集，请参阅 [LDAP_SASLAUTHD](https://github.com/winlibs/cyrus-sasl/blob/master/saslauthd/LDAP_SASLAUTHD)。

默认情况下，Cyrus 的 `saslauthd` 在 `/etc/saslauthd.conf` 中查找其 LDAP 配置。因此，请创建此文件并输入类似以下内容以定义您的 LDAP 环境：

```
ldap_servers: ldaps://ldap.example.com
ldap_bind_dn: admin@example.com
ldap_bind_pw: topsecret
ldap_auth_method: bind
ldap_search_base: ou=people,dc=example,dc=com
```

:::note
您可能想要查看的一个省略选项是 `ldap_filter`，其默认值为 `uid=%u`，并且适用于许多系统。如果您使用的是 Samba 或 Microsoft AD 实例作为 LDAP 服务器，您可能需要将其更改为 `ldap_filter: (sAMAccountName=%U)`，因为许多配置中 `uid` 默认为 NULL。您还可以使用 `ldap_filter` 来仅允许特定用户访问。有关此和其他选项的更多详细信息，请参阅上面链接的 `LDAP_SASLAUTHD` 文档。

请注意，Prosody 可能在用户名包含“@”符号时遇到问题。您可以通过将 `uid=%u` 更改为 `uid=%U` 来解决此问题，`%U` 被[定义](https://github.com/winlibs/cyrus-sasl/blob/d933c030ce12ec0668469d79ab8378e347a1b3ba/saslauthd/LDAP_SASLAUTHD#L126)为“%u 的用户部分（当 %u = test 时，%U = test@domain.tld）”。

:::

### 测试 LDAP 认证

要测试 LDAP 配置是否正常工作，您可以在指定强制 LDAP 认证机制的情况下以调试模式启动 `saslauthd`：

```
sudo saslauthd -d -a ldap
```

然后，可以在第二个终端中使用 SASL 认证服务器的测试工具。将 `user` 和 `password` 替换为存储在 LDAP 中的凭据。

```
sudo testsaslauthd -u user -p password
0: OK "Success."

sudo testsaslauthd -u user -p wrongpassword
0: NO "authentication failed"
```

测试后，您可以使用 `ctrl-c` 停止 `saslauthd`。

### 启用 `saslauthd` 服务

您需要编辑 `/etc/default/saslauthd` 文件，以使 `saslauthd` 服务在启动时运行，并使用 LDAP 进行身份验证。您可以使用 sed 快速完成此操作。

```
sudo sed -i -e "s/START=.*/START=yes/" -e "s/MECHANISMS=.*/MECHANISMS=\"ldap\"/" /etc/default/saslauthd
```

这将对 `/etc/default/saslauthd` 文件进行以下更改。

```
[...]
# Should saslauthd run automatically on startup? (default: no)
START=yes
[...]
# Example: MECHANISMS="pam"
MECHANISMS="ldap"
[...]
```

不需要将 `MECH_OPTIONS` 指向 LDAP 配置文件，因为这是该机制的默认设置。

现在您可以使用 `service` 脚本来启动、重启和停止 `saslauthd`：

```
sudo service saslauthd restart
```

如果遇到问题，请检查 `/var/log/auth.log` 中的 `saslauthd` 条目。

### Cyrus SASL 配置文件

Cyrus SASL 需要一个配置文件，以了解如何检查用户凭据。对于 Prosody，该文件的默认名称为 `prosody.conf`。其位置因操作系统和发行版而异，如下表所示：

| 平台              | 位置       |
| ----------------- | ---------- |
| Debian 和 Ubuntu  | /etc/sasl  |
| Arch, RHEL/CentOS | /etc/sasl2 |

因此，对于 Debian 系统，创建文件 `/etc/sasl/prosody.conf`。目录 `/etc/sasl` 可能尚未存在。

```
sudo mkdir /etc/sasl/

cat << 'EOF' | sudo tee /etc/sasl/prosody.conf > /dev/null
pwcheck_method: saslauthd
mech_list: PLAIN
EOF
```

:::note
文件名 `prosody.conf` 对应于 Prosody 配置中的 `cyrus_application_name` 值。由于我们没有更改默认值，因此其值为 `prosody`。
:::

Prosody 文档中有更多关于 [Cyrus SASL 相关设置](https://prosody.im/doc/cyrus_sasl) 的详细信息。

## 设置 Prosody

如果您已经成功测试了 LDAP 身份验证并启用了 `saslauthd` 服务，您可以通过在 `/etc/prosody/conf.avail/$(hostname -f).cfg.lua` 中更改 `authentication` 设置，将 Prosody 的身份验证更改为 Cyrus 后端，使用以下命令：

```
sed -i -E -e "/^ *VirtualHost \"$(hostname -f)\"/,/^ *VirtualHost/ {s/authentication ?=.*$/authentication = \"cyrus\"/}" /etc/prosody/conf.avail/$(hostname -f).cfg.lua
```

您可能还需要添加 `allow_unencrypted_plain_auth` 选项，以允许明文密码通过网络发送。*这并不推荐*，因为这会使设置变得不够安全。因此请先尝试不添加此行，只有在遇到身份验证问题时再添加它。

```
        authentication = "cyrus"
        allow_unencrypted_plain_auth = true
```

### 设置权限

Prosody 现在将尝试访问 `/var/run/saslauthd/` 中的 saslauthd 套接字，以与身份验证守护进程进行通信。此文件夹仅允许用户 `root` 和组 `sasl` 访问，而 Prosody 以系统用户/组 `prosody` 的身份运行。

最简单的解决方案是将 `sasl` 组添加到 `prosody` 用户，并重启服务。

```
sudo adduser prosody sasl
sudo service prosody restart
```
