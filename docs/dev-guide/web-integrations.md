---
id: dev-guide-web-integrations
title: Web integrations - Web集成
sidebar_label: Integrations - 集成
---

## 创建 Google API 客户端以集成 Google 日历和 YouTube

1. 登录 Google 管理员账户。
2. 转到 Google 云平台仪表板：[https://console.cloud.google.com/apis/dashboard](https://console.cloud.google.com/apis/dashboard)
3. 在“选择项目”下拉菜单中，点击“新建项目”。
4. 给项目命名。
5. 进入新项目的凭据设置。
6. 在凭据设置的凭据选项卡中，点击“创建凭据”，并选择“OAuth 客户端 ID”类型。
7. 创建 Web 应用程序，并添加应用程序将托管的域名（来源）。本地开发环境（例如：http://localhost:8000 ）可以在这里添加。
8. 在 Google 云平台仪表板中，点击日历项目的库设置。
9. 搜索 Google 日历 API（用于访问日历），点击其结果并启用它。
10. 对 YouTube 数据 API v3 做同样的操作。

## 创建 Microsoft 应用以集成 Microsoft Outlook

1. 访问 [https://apps.dev.microsoft.com/](https://apps.dev.microsoft.com/)
2. 按照“添加应用”流程进行操作。创建后，会显示一个包含多个 Graph 权限字段的页面。
3. 在“平台”下添加“Web”。
4. 为 Microsoft 身份验证流程添加重定向 URL，当用户确认身份验证后，目标域（如果可用）为“yourdomain.com”（部署地址），重定向 URL 为 `https://yourdomain.com/static/msredirect.html`。
5. 添加 Microsoft Graph 委派权限，如果该选项可用：Calendars.Read、Calendars.ReadWrite、Calendars.Read.Shared、Calendars.ReadWrite.Shared。
6. 勾选“允许隐式流”（如果可用，也勾选“限制令牌发放给此应用”）。
7. 保存更改。

## 创建 Dropbox 应用以集成 Dropbox 录制

1. 您需要一个 Dropbox 账户（如果您还没有，可以[在此处注册一个免费账户](https://www.dropbox.com/register)）。

2. 按照[入门指南](https://www.dropbox.com/developers/reference/getting-started?_tk=guides_lp&_ad=guides2&_camp=get_started#app%20console)中的描述，在应用控制台部分创建新应用。

3. 选择：

   1. “Dropbox API - 适用于需要访问 Dropbox 中文件的应用。”
   2. “应用文件夹 - 访问专为您的应用创建的单个文件夹。”
   3. 填写您的应用名称。

4. 您只需将新创建的应用密钥放入 `/etc/jitsi/meet/yourdeployment.com-config.js` 中：

   ```javascript
   dropbox: {
       appKey: '__dropbox_app_key__',
       redirectURI: 'https://yourdeployment.com/static/oauth.html'
   }
   ```

5. 在 Dropbox 表单中添加您的 Dropbox 重定向 URI `https://yourdeployment.com/static/oauth.html`。

6. 填写品牌信息。
