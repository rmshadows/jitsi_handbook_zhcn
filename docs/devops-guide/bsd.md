---
id: devops-guide-bsd
title: 自托管指南 - FreeBSD/NetBSD/OpenBSD
sidebar_label: BSD
---

本文档意在作为 FreeBSD、NetBSD 和 OpenBSD 发行版中上游软件包的参考点。Jitsi 官方仅支持 Linux，关于 BSD 软件包的任何问题，请联系相应的邮件列表。

__注意__：许多安装步骤需要 root 权限。

## FreeBSD

FreeBSD 提供了 [Jitsi](https://www.freshports.org/net-im/jitsi-meet-full) 的端口以及如何配置它和当前限制的文档：https://wiki.freebsd.org/Jitsi。

可以通过 [net-im/jitsi-meet-full](https://www.freshports.org/net-im/jitsi-meet-full) 元端口（meta port）安装 Jitsi，它包含 Jitsi Videobridge、Jicofo 和 Jitsi Meet Web UI，以及 prosody、Jitsi prosody 插件、nginx 和其他所需的依赖项。有关如何构建端口的说明可以在 FreeBSD 基金会网站上找到：https://freebsdfoundation.org/freebsd-project/resourcesold/installing-a-port-on-freebsd/。

## NetBSD

NetBSD 提供了 [Jitsi Videobridge](https://pkgsrc.se/chat/jitsi-videobridge)、[Jicofo](https://pkgsrc.se/chat/jicofo)、[Jitsi prosody 插件](https://pkgsrc.se/chat/jitsi-meet-prosody) 和 [Jitsi Meet Web UI](https://pkgsrc.se/wip/jitsi-meet) 的独立端口。可以使用命令 `pkg_add <pkg-name>` 安装它们。

## OpenBSD

OpenBSD 提供了 [Jitsi](https://cvsweb.openbsd.org/cgi-bin/cvsweb/ports/meta/jitsi/) 的端口，并附带了如何配置 Jitsi 以进行单主机安装的详细说明，位于 [/usr/local/share/docs/pkg-readme/jitsi](https://cvsweb.openbsd.org/cgi-bin/cvsweb/ports/meta/jitsi/pkg/)。

可以通过命令 `pkg_add jitsi` 安装元端口（meta port），该端口包含 Jitsi Videobridge、Jicofo 和 Jitsi Meet Web UI 以及 prosody、Jitsi prosody 插件和其他必要的依赖项。

## 限制

- Jigasi 和 Jibri 尚未移植到任何 BSD 系统。
