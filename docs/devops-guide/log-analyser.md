---
id: devops-guide-log-analyser
title: Self-Hosting Guide - Log Analyser
sidebar_label: Log Analyser - 日志分析器
---

## 概述

该项目提供了一个简化的设置，旨在收集、解析和可视化由 Jitsi Meet 组件生成的日志数据。集成包括：

- 用于配置 Loki 和 OpenTelemetry Collector 的 Docker Compose 设置文件 (`log-analyser.yml`)。
- 用于配置 Grafana 的 Docker Compose 设置文件 (`grafana.yml`)。
- 一个统一的 Docker Compose 命令，可以同时启动所有服务。
- 关于如何配置 Grafana 将 Loki 作为日志数据源的说明，以实现增强的可视化和分析。

## 入门

### 前提条件

在开始之前，请确保您的系统上已安装以下内容：

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 设置步骤

1. **克隆仓库：**

   克隆包含所需 Docker Compose 文件的 Jitsi Meet 仓库。

    ```bash
   git clone https://github.com/jitsi/docker-jitsi-meet.git
   cd docker-jitsi-meet
    ```

2. **更新 Jitsi Meet Docker Compose 配置：**

   为了启用日志收集和分析，您需要修改 Jitsi Meet 组件的 `docker-compose.yml` 文件。将以下配置添加到 `docker-compose.yml` 文件中的每个 Jitsi 服务：

    ```yaml
   logging:
     driver: "json-file"
     options:
       labels: "service"
    ```

3. **启动 Docker 容器：**

   使用以下命令启动所需的所有服务，包括 Jitsi Meet 组件、Grafana、Loki 和 OpenTelemetry：

    ```bash
   docker-compose -f docker-compose.yml -f log-analyser.yml -f grafana.yml up -d
    ```

   - **解释：**
     - 该命令组合多个 Docker Compose 文件以启动整个堆栈：
       - `docker-compose.yml` 启动 Jitsi Meet 组件。
       - `log-analyser.yml` 设置日志分析工具，包括 Loki 和 OpenTelemetry。
       - `grafana.yml` 初始化用于日志可视化的 Grafana。

### 访问 Grafana

启动服务后，按照以下步骤访问 Grafana：

1. **在浏览器中打开 Grafana：**

   访问 [http://localhost:3000](http://localhost:3000) 以打开 Grafana 界面。

2. **登录 Grafana：**

   使用以下默认登录凭据：

   - **用户名:** `admin`
   - **密码:** `admin`

   （建议首次登录后更改这些凭据以确保安全）。

### 预配置仪表盘

Grafana 配备了几个专门用于监控不同 Jitsi Meet 组件的预配置仪表盘。这些仪表盘在你登录 Grafana 后会自动可用。

**重要提示❗️：** 要让这些仪表盘显示数据，必须由 Jitsi Meet 组件生成日志。以下是可用的仪表盘：

- **Jicofo 仪表盘**：可视化与 Jitsi Conference Focus (Jicofo) 相关的日志，它处理 Jitsi Meet 中的媒体和信令。
- **JVB 仪表盘**：专注于 Jitsi Videobridge (JVB) 日志，展示视频流和性能指标的详细信息。
- **Prosody 仪表盘**：监控用于信令的 XMPP 服务器 Prosody。
- **Web 仪表盘**：显示与 Jitsi Meet 前端相关的日志和指标。
- **Jitsi All 仪表盘**：一个汇总所有 Jitsi Meet 组件日志的综合仪表盘。


![Jitsi Meet Log Analyser Dashboard](2e54833e-4906-4429-81ce-7e56b7bf38d1)

### 使用 LogQL 过滤日志

除了预配置的仪表盘外，你还可以使用 LogQL（一种专为 Loki 设计的强大查询语言）在 Grafana 的 “Explore” 部分中探索和过滤日志。以下是如何过滤和分析日志的步骤：

1. **访问 Explore 部分：**

   在 Grafana 中，从左侧边栏导航到 **Explore** 标签。这部分允许你实时查询日志。

2. **选择 Loki 数据源：**

   在 Explore 部分，确保 **Data Source** 设置为 **Loki**，因为 Loki 是收集和管理 Jitsi Meet 组件日志数据的后端。

3. **使用 LogQL 进行过滤：**

   LogQL 允许你创建复杂的查询来过滤特定的日志。例如，以下 LogQL 查询过滤 `jitsi-jicofo` 组件的日志并解析它们：

    ```logql
   {exporter="OTLP"} | json | attributes_attrs_service="jitsi-jicofo"
    ```

   - **解释：**
     - `{exporter="OTLP"}`：选择通过 OpenTelemetry 导出的日志。
     - `| json`：将日志数据解析为 JSON，使其属性可供过滤。
     - `attributes_attrs_service="jitsi-jicofo"`：过滤 `attributes_attrs_service` 字段等于 `"jitsi-jicofo"` 的日志。

你可以根据需要修改查询以过滤其他组件的日志或调整查询条件。

有关 LogQL 的更多详细信息和高级用法，请参考 Grafana 官方的 [LogQL 文档](https://grafana.com/docs/loki/latest/logql/)。


![LogQL Query Example](f75c77a6-6f7b-41ae-9efe-855a5b426bdf)

## 使用方法

一旦设置完成，你就可以开始在 Grafana 中探索日志数据。预配置的仪表盘提供了从 Jitsi Meet 组件收集的日志的深入可视化。使用这些仪表盘可以：

- **解析日志：** 查看从各个组件收集的详细日志。
- **可视化日志：** 通过各种图表、图形和面板分析日志数据，以获取系统性能和问题的见解。

### 自定义仪表盘

虽然预配置的仪表盘提供了一个良好的起点，但你可能希望自定义它们或创建新仪表盘以满足你的特定需求。以下是如何做到这一点的步骤：

1. **创建新仪表盘：**
   - 转到 Grafana 主页面，点击左侧边栏的 "+" 图标，然后选择 "Dashboard"。
   - 通过选择适当的数据源（Loki）和使用 LogQL 查询来添加面板以可视化不同的指标或日志。

2. **自定义现有仪表盘：**
   - 导航到现有仪表盘，点击任何面板上的 "Edit" 按钮（铅笔图标）。
   - 调整 LogQL 查询、可视化类型和面板设置以匹配你的要求。

3. **保存和分享仪表盘：**
   - 自定义后，保存仪表盘。你也可以将其导出为 JSON 文件以分享给他人或用于备份。
   - 导出仪表盘的步骤：
     - 点击仪表盘标题以打开选项菜单。
     - 选择 **"Dashboard settings"** > **"JSON Model"**。
     - 点击 **"Download JSON"** 将文件保存在本地。

4. **为 Jitsi Meet 仪表盘贡献：**
   - 如果你创建或自定义的仪表盘可能对更广泛的 Jitsi 社区有益，你可以通过更新相关的仪表盘 JSON 文件来贡献。
   - 具体步骤如下：
     - 按照上面描述的步骤导出自定义仪表盘的 JSON 文件。
     - 在代码库中找到相应的 Jitsi 组件仪表盘 JSON 文件（例如，`jicofo-dashboard.json`、`jvb-dashboard.json`）。
     - 用你的更改更新现有的 JSON 文件。
     - 向代码库提交一个拉取请求，附上更新的 JSON 文件和对所做更改的简要描述。
   - 这有助于改善预配置的仪表盘，使你的贡献能够惠及所有用户。

5. **Grafana 配置：**
   - Jitsi Meet Log Analyser 使用 Grafana 配置来管理仪表盘。当你在代码库中更新仪表盘 JSON 文件时，堆栈部署时会自动在 Grafana 中配置这些仪表盘。
   - 这确保每个使用该代码库的人都能获得仪表盘的最新版本，而无需手动导入。

通过遵循这些步骤，你不仅可以自定义自己的监控设置，还可以将改进反馈给 Jitsi 社区。

### 故障排除

如果在设置或使用 Jitsi Meet Log Analyser 时遇到问题，以下是一些常见问题及其解决方案：

1. **Grafana 未启动：**
   - 使用 `docker ps` 检查 Grafana 容器是否正在运行，并使用 `docker logs grafana` 检查是否有错误。

2. **Grafana 仪表盘中没有日志：**
   - 确保 Jitsi Meet 组件正在生成日志。清除浏览器缓存，重新加载 Grafana。确保 OpenTelemetry、Loki 和 Grafana 容器都在运行，使用 `docker ps` 检查，并使用 `docker logs <container_name>` 检查每个容器的日志以寻找问题。

3. **OpenTelemetry 收集器未转发日志：**
   - 使用 `docker logs otel` 检查 OpenTelemetry 的日志，确保它连接到正确的端点，并验证日志格式是否正确。

4. **Grafana 身份验证失败：**
   - 使用 `docker restart grafana otel` 重启 Grafana。如果仍然失败，使用 `docker-compose down -v` 删除数据卷并重启，以重置为默认凭据（admin/admin）。

5. **查询缓慢：**
   - 如果 LogQL 查询缓慢，尝试在 Grafana 中优化查询。

6. **权限问题：**
   - 如果遇到权限问题，请确保 Docker 对存储日志的目录具有必要的访问权限。

7. **Docker 网络问题：**
   - 验证 Docker 网络连接、IP 范围，如有必要，重启网络。

8. **OpenTelemetry 收集器未转发日志：**
   - 检查 OpenTelemetry 日志，验证配置，并确保日志格式兼容。

9. **Docker 容器未能启动：**
   - 使用 `docker-compose logs` 查看详细启动错误，检查是否存在常见问题，如配置错误。

## 致谢

感谢你对 Jitsi Meet Log Analyser 项目的关注！如果你遇到任何问题或有疑问，请随时联系项目维护者或为代码库贡献。
