---
id: videosipgw
title: Configuring a video SIP gateway - 配置一个视频SIP网关
sidebar_label: Video SIP gateway - 视频SIP网关
---

本文档描述了如何配置 jitsi-meet 以使用 sipgw jibri 并启用“添加人员对话框”中的房间。您需要有一个已配置为使用常规 SIP 视频设备的工作 Jibri 部署，更多信息请查看 [jibri 文档](https://github.com/jitsi/jibri/blob/master/README.md)。

该功能适用于系统的非访客，因此这依赖于 config.js 中的设置 `enableUserRolesBasedOnToken: true`，并在访问会议时提供 JWT 令牌。

* Jicofo 配置：
  编辑 `/etc/jitsi/jicofo/sip-communicator.properties`（或类似文件），设置适当的 MUC 以查找 Jibri 控制器。这应该与 Jibri 的 config.json 文件中引用的相同 MUC。设置此属性后重新启动 Jicofo。

```
  org.jitsi.jicofo.jibri.SIP_BREWERY=TheSipBrewery@conference.yourdomain.com
```

* Jitsi Meet 配置：

 - config.js：添加 

```
  enableUserRolesBasedOnToken: true,
  peopleSearchQueryTypes: ['conferenceRooms'],
  peopleSearchUrl: 'https://api.yourdomain.com/testpath/searchpeople',
```

上述设置与提供 JWT 令牌的组合将在邀请选项下启用一个按钮，该按钮将显示“添加人员”对话框。

## 人员搜索服务

在对话框中进行搜索时，将向 `peopleSearchUrl` 服务发出请求以获取结果。

请求的格式如下：

```
https://api.yourdomain.com/testpath/searchpeople?query=testroomname&queryTypes=[%22conferenceRooms%22]&jwt=somejwt
```

参数包括：

 - query - 用户输入的文本。
 - queryTypes - 我们想要的结果类型，包括人员、房间、会议室。这是来自 config.js 的 `peopleSearchQueryTypes` 的值。
 - jwt - 用户用于访问会议的令牌。

该服务的响应为以下格式的 JSON：

```
[
   {
       "id": "address@sip.domain.com",
       "name": "Some room name",
       "type": "videosipgw"
   },
  {
      "id": "address2@sip.domain.com",
      "name": "Some room name2",
      "type": "videosipgw"
  }
]
```

类型应为 `videosipgw`，`name` 是显示给用户的名称，`id` 是 SIP 地址，由 sipgw jibri 拨打。
