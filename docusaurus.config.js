module.exports = {
  title: "Jitsi Meet",
  tagline: "State-of-the-art video conferencing you can self-host.",
  url: "https://civiccccc.ltd/",
  baseUrl: "/handbook/",
  organizationName: "jitsi",
  projectName: "handbook",
  favicon: "img/favicon.svg",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
          editUrl: "https://github.com/jitsi/handbook/edit/master/",
          path: "docs",
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: [require.resolve("./src/css/custom.css")],
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/docs/category/user-guide',
            from: [ '/docs/user-guide', '/docs/user-guide/user-guide-start' ],
          },
          {
            to: '/docs/category/developer-guide',
            from: [ '/docs/dev-guide', '/docs/dev-guide/dev-guide-start' ],
          },
          {
            to: '/docs/devops-guide/',
            from: '/docs/devops-guide/devops-guide-start',
          },
        ]
      }
    ]
  ],
  themeConfig: {
    prism: {
      additionalLanguages: ["java", "markdown", "bash", "gradle", "lua", "dart"],
      lang: {
        "shell": "bash"
      },
    },
    algolia: {
      appId: 'K2ODL876OV',
      apiKey: 'fc233b31ee025aa87cf553bd9e7ce9e9',
      indexName: 'jitsi',
    },
    navbar: {
      title: "Jitsi Meet Handbook",
      logo: {
        src: "img/logo.svg",
      },
      items: [
        {
          to: "docs/intro",
          label: "Docs - 文档",
          position: "left",
        },
        {
            to: "docs/category/sdks",
            label: "SDKs",
            position: "left",
        },
        {
          to: "docs/releases",
          label: "Releases - 发布",
          position: "left",
        },
        {
          href: "https://community.jitsi.org",
          label: "Community - 社区",
          position: "left",
        },
        {
          href: "https://jaas.8x8.vc",
          label: "JaaS",
          position: "left",
        },
        {
          href: 'https://github.com/jitsi',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    image: "img/undraw_online.svg",
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Introduction - 概述",
              to: "docs/intro",
            },
            {
              label: "User Guide - 用户指南",
              to: "docs/category/user-guide",
            },
            {
              label: "Developer Guide - 开发者指南",
              to: "docs/category/developer-guide",
            },
            {
              label: "Self-Hosting Guide - 自托管指南",
              to: "docs/devops-guide",
            },
          ],
        },
        {
          title: "Community - 社区",
          items: [
            {
              label: "Forum - 论坛",
              href: "https://community.jitsi.org",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/jitsinews",
            },
          ],
        },
        {
          title: "More - 更多",
          items: [
            {
              label: "Blog - 博客",
              href: "https://jitsi.org",
            },
            {
              label: "GitHub",
              href: "https://github.com/jitsi",
            },
            {
              label: "JaaS: Jitsi as a Service",
              href: "https://jaas.8x8.vc"
            },
          ],
        },
      ],
      logo: {
        alt: "8x8 Footer Logo",
        src: "img/8x8-copyright-icon.svg",
        href: "https://8x8.com",
      },
      copyright: `Copyright © 8x8, Inc.`,
    },
  },
};
