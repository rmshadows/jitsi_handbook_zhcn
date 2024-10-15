module.exports = {
  docs: [
    {
      type: "category",
      label: "Getting Started - 开始",
      items: [
        "intro",
        "architecture",
        "security",
        "faq",
      ],
    },
    {
      type: "category",
      label: "Community - 社区",
      link: {
        type: "doc",
        id: "community/community-intro",
      },
      items: [
        "community/third-party-software",
      ],
    },
    {
      type: "category",
      label: "User Guide - 用户指南",
      link: {
        type: "generated-index",
      },
      items: [
        "user-guide/supported-browsers",
        "user-guide/user-guide-join-jitsi-meeting",
        "user-guide/user-guide-start-a-jitsi-meeting",
        "user-guide/user-guide-share-a-jitsi-meeting",
        "user-guide/user-guide-jitsi-meet-on-mobile",
        "user-guide/user-guide-jitsi-meet-for-google-calendar",
        "user-guide/keyboard-shortcuts",
        "user-guide/user-guide-basic",
        "user-guide/user-guide-advanced",
      ],
    },
    {
      type: "category",
      label: "Developer Guide - 开发者指南",
      link: {
        type: "generated-index",
      },
      items: [
        "dev-guide/dev-guide-contributing",
        {
            type: "category",
            label: "SDKs",
            link: {
              type: "generated-index",
            },
            items: [
                "dev-guide/dev-guide-iframe",
                "dev-guide/dev-guide-ljm-api",
                "dev-guide/dev-guide-electron-sdk",
                "dev-guide/dev-guide-react-sdk",
                "dev-guide/dev-guide-android-sdk",
                "dev-guide/dev-guide-ios-sdk",
                "dev-guide/dev-guide-react-native-sdk",
                "dev-guide/dev-guide-flutter-sdk",
            ]
        },
        {
          type: "category",
          label: "Web",
          link: {
            type: "generated-index",
          },
          items: [
            "dev-guide/dev-guide-web-jitsi-meet",
            "dev-guide/dev-guide-ljm",
            "dev-guide/dev-guide-web-integrations",
            {
              type: "category",
              label: "IFrame API",
              link: {
                type: "doc",
                id: "dev-guide/dev-guide-iframe",
              },
              items: [
                "dev-guide/dev-guide-iframe-functions",
                "dev-guide/dev-guide-iframe-commands",
                "dev-guide/dev-guide-iframe-events"
              ]
            },
            "dev-guide/dev-guide-react-sdk",
            "dev-guide/dev-guide-ljm-api",
          ],
        },
        {
          type: "category",
          label: "Mobile - 移动端",
          link: {
            type: "generated-index",
          },
          items: [
            "dev-guide/dev-guide-mobile-jitsi-meet",
            "dev-guide/mobile-feature-flags",
            "dev-guide/dev-guide-android-sdk",
            "dev-guide/dev-guide-ios-sdk",
            "dev-guide/dev-guide-react-native-sdk",
            "dev-guide/dev-guide-flutter-sdk",
          ],
        },
        "dev-guide/dev-guide-configuration",
      ],
    },
    {
      type: "category",
      label: "Self-Hosting Guide - 自托管指南",
      link: {
        type: "doc",
        id: "devops-guide/devops-guide-start",
      },
      items: [
        {
          type: "category",
          label: "Deployment - 部署",
          link: {
            type: "generated-index",
          },
          items: [
            "devops-guide/devops-guide-requirements",
            "devops-guide/devops-guide-quickstart",
            "devops-guide/devops-guide-opensuse",
            {
              type: "category",
              label: "Docker",
              link: {
                type: "doc",
                id: "devops-guide/devops-guide-docker",
              },
              items: [
                {
                  type: "doc",
                  id: "devops-guide/devops-guide-log-analyser",
                  label: "Log Analyser - 日志分析器",
                },
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Configuration - 配置",
          link: {
            type: "generated-index",
          },
          items: [
            "devops-guide/secure-domain",
            "devops-guide/ldap-authentication",
            "devops-guide/devops-guide-scalable",
            "devops-guide/reservation",
            "devops-guide/turn",
            "devops-guide/speakerstats",
            "devops-guide/videosipgw",
            "devops-guide/cloud-api",
          ],
        },
        "devops-guide/devops-guide-videotutorials",
        "devops-guide/faq",
      ],
    },
  ],
  "releases-sidebar": [
    {
      type: "doc",
      label: "Releases - 发布",
      id: "releases",
    },
  ],
};
