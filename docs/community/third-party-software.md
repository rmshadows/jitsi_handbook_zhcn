---
id: third-party-software
title: Third-Party Software - 第三方软件
---

本页面包含与 Jitsi Meet 相关的项目链接，但这些项目**并非由 Jitsi 团队维护**。

请按字母顺序排列此列表。

:::warning
由于这些软件包不由 Jitsi 团队维护，如遇问题，请前往各自的论坛或问题追踪系统寻求帮助。
:::

## Cketti's Jitsi Hacks

一些使用注入脚本的额外功能。

https://jitsi-hacks.cketti.eu/

## Eparto Virtual Phone

这是一个 Chrome 扩展程序，允许用户将浏览器用作虚拟电话，并且无需打开任何网站即可发起基于 Jitsi 的通话。

Chrome 网上应用店:
[Eparto virtual phone extension](https://chromewebstore.google.com/detail/eparto-virtual-phone/njihflnogjnjnmflicfongbnehhpkhmj)

GitHub: https://github.com/emrahcom/eparto-virtual-phone

## Flutter plugin

适用于 Flutter 的插件。

https://pub.dev/packages/jitsi_meet

## Galaxy

Galaxy 是一个为 Jitsi 管理员和用户设计的网络应用程序，用于组织 Jitsi 会议、会议安排和与会者管理。支持 [JaaS](https://jaas.8x8.vc/) 和自托管的 Jitsi 部署。

GitHub: https://github.com/emrahcom/galaxy

Demo: https://eparto.net

## Galaxy-kc

这是使用 `Keycloak` 作为身份提供者的 `Galaxy` 版本。

https://github.com/emrahcom/galaxy-kc

## GStreamer pipeline integration

将 Jitsi Meet 会议与 GStreamer 管道集成。

https://github.com/avstack/gst-meet

## GStreamer plugin in C++

Jitsi Meet GStreamer 插件

https://github.com/mojyack/gstjitsimeet

## Jitok: Jitsi Token generator

用于生成与 Jitsi Meet 兼容的 JWT 的辅助网络工具和 API。

GitHub: https://github.com/jitsi-contrib/jitok

Demo: https://jitok.emrah.com/

Discussion: https://community.jitsi.org/t/jitok-jitsi-token-generator/94683

## Jitsi-Admin

一个开源平台，用于组织会议。包含了我们熟悉的各类大型会议工具的所有功能。

- 规划会议
- 使用用户登录凭据保护会议
- 为访问您的会议的每个用户生成报告
- 创建预约投票并一键将其转换为会议
- Docker 化以便于安装

Github: https://github.com/H2-invent/jitsi-admin

Demo: https://jitsi-admin.de

Docker:
https://github.com/H2-invent/jitsi-admin/wiki/Install-jitsi-admin-in-docker

## Jitsi Config Differ

一个网页应用，用于比较不同 Jitsi 版本之间的参考配置文件。
该工具旨在帮助用户在升级部署时识别配置项和默认值的潜在变化。

链接：[https://shawnchin.github.io/jitsi-config-differ/](https://shawnchin.github.io/jitsi-config-differ/)

GitHub 地址：[https://github.com/shawnchin/jitsi-config-differ](https://github.com/shawnchin/jitsi-config-differ)

## Jitsi URL Generator

一个简单的工具，用于展示如何组合 URL 参数以自定义 Jitsi。虽然它只展示了一小部分可能性，但希望能帮助用户熟悉，以便应用到白名单中的其他配置值。

https://shawnchin.github.io/jitsi-url-generator/

Github: https://github.com/shawnchin/jitsi-url-generator

## KeyCloak adapter

允许 Jitsi 使用 Keycloak 作为身份和 OIDC 提供者。

https://github.com/nordeck/jitsi-keycloak-adapter

## KeyCloak integration

用于身份验证的 KeyCloak 集成。

https://github.com/D3473R/jitsi-keycloak

## Outlook Plugin

为 Microsoft Outlook 添加 "安排 Jitsi 会议" 按钮的插件。

GitHub: https://github.com/timetheoretical/jitsi-meet-outlook

## Outlook Pluigin

根据 Microsoft 的现代架构编写的插件，添加 "安排 Jitsi 会议" 按钮到 Microsoft Outlook。

GitHub: https://github.com/diggsweden/jitsi-outlook

## Prosody Plugins

社区贡献的 Prosody 插件集合，可添加到自托管的 Jitsi 部署中。

https://github.com/jitsi-contrib/prosody-plugins

- **event_sync**: 在占用者或房间事件触发时向外部 API 发送 HTTP POST 请求。
- **frozen_nick**: 如果使用 JWT 认证且令牌上下文中提供了名称，则阻止用户更改显示名称。
- **jibri_autostart**: 当主持人进入房间时自动开始录制。
- **lobby_autostart**: 自动为所有房间启用大厅。
- **per\_room\_max\_occupants**：根据房间名称和子域名设置不同的最大参与人数。
* **secure\_domain\_lobby\_bypass**：允许通过安全域认证的用户绕过候场大厅（lobby）。
- **time_restricted**: 设置房间的时间限制，时间到后终止会议。
- **token_affiliation**: 根据令牌 (JWT) 中的隶属属性将用户提升为主持人。
- **token_lobby_bypass**: 根据令牌 (JWT) 中的标志允许某些用户绕过大厅。
- **token\_lobby\_ondemand**：根据令牌（JWT）中的标志启用候场大厅（lobby）。
- **token_owner_party**: 防止未经授权的用户创建房间，并在房间所有者离开时终止会议。

## SAML to Jitsi JWT Authentification

SAML 到 Jitsi JWT 认证

通过 Shibboleth 将 SAML 认证集成到 Jitsi Meet JWT 生成器中。

Github: https://github.com/Renater/Jitsi-SAML2JWT

## Unity plugin

在 Unity 环境（WebGL）中使用 lib-jitsi-meet 的插件。

https://github.com/avstack/jitsi-meet-unity-demo

在 Unity 环境（Android 和 iOS）中使用 lib-jitsi-meet 的插件。

https://github.com/SariskaIO/Sariska-Media-Unity-Demo

## Generic OIDC and SAML adapter

为 Jitsi 添加对 OIDC 和 SAML 的支持，同时启用 JWT 和匿名域。
对会议主持人进行身份验证，允许嘉宾无需身份验证即可加入会议。

Github: https://github.com/aadpM2hhdixoJm3u/jitsi-OIDC-SAML-adapter

Github: https://github.com/aadpM2hhdixoJm3u/jitsi-OIDC-adapter

