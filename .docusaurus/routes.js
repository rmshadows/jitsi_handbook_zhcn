import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/handbook/help',
    component: ComponentCreator('/handbook/help', '1ee'),
    exact: true
  },
  {
    path: '/handbook/search',
    component: ComponentCreator('/handbook/search', 'bba'),
    exact: true
  },
  {
    path: '/handbook/docs',
    component: ComponentCreator('/handbook/docs', '7ed'),
    routes: [
      {
        path: '/handbook/docs',
        component: ComponentCreator('/handbook/docs', 'd94'),
        routes: [
          {
            path: '/handbook/docs',
            component: ComponentCreator('/handbook/docs', 'cf8'),
            routes: [
              {
                path: '/handbook/docs/architecture',
                component: ComponentCreator('/handbook/docs/architecture', 'f5f'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/category/configuration',
                component: ComponentCreator('/handbook/docs/category/configuration', 'd1c'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/category/deployment',
                component: ComponentCreator('/handbook/docs/category/deployment', 'de9'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/category/developer-guide',
                component: ComponentCreator('/handbook/docs/category/developer-guide', 'ceb'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/category/mobile',
                component: ComponentCreator('/handbook/docs/category/mobile', 'a5a'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/category/sdks',
                component: ComponentCreator('/handbook/docs/category/sdks', '824'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/category/user-guide',
                component: ComponentCreator('/handbook/docs/category/user-guide', '689'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/category/web',
                component: ComponentCreator('/handbook/docs/category/web', '0c1'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/community/community-intro',
                component: ComponentCreator('/handbook/docs/community/community-intro', '937'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/community/third-party-software',
                component: ComponentCreator('/handbook/docs/community/third-party-software', '7b4'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/dev-guide/dev-guide-android-sdk',
                component: ComponentCreator('/handbook/docs/dev-guide/dev-guide-android-sdk', '374'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/dev-guide/dev-guide-configuration',
                component: ComponentCreator('/handbook/docs/dev-guide/dev-guide-configuration', '8d9'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/dev-guide/dev-guide-contributing',
                component: ComponentCreator('/handbook/docs/dev-guide/dev-guide-contributing', '91d'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/dev-guide/dev-guide-electron-sdk',
                component: ComponentCreator('/handbook/docs/dev-guide/dev-guide-electron-sdk', '6d6'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/dev-guide/dev-guide-flutter-sdk',
                component: ComponentCreator('/handbook/docs/dev-guide/dev-guide-flutter-sdk', '2c6'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/dev-guide/dev-guide-iframe',
                component: ComponentCreator('/handbook/docs/dev-guide/dev-guide-iframe', 'cd2'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/dev-guide/dev-guide-iframe-commands',
                component: ComponentCreator('/handbook/docs/dev-guide/dev-guide-iframe-commands', '868'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/dev-guide/dev-guide-iframe-events',
                component: ComponentCreator('/handbook/docs/dev-guide/dev-guide-iframe-events', 'b27'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/dev-guide/dev-guide-iframe-functions',
                component: ComponentCreator('/handbook/docs/dev-guide/dev-guide-iframe-functions', '300'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/dev-guide/dev-guide-ios-sdk',
                component: ComponentCreator('/handbook/docs/dev-guide/dev-guide-ios-sdk', '111'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/dev-guide/dev-guide-ljm',
                component: ComponentCreator('/handbook/docs/dev-guide/dev-guide-ljm', 'a30'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/dev-guide/dev-guide-ljm-api',
                component: ComponentCreator('/handbook/docs/dev-guide/dev-guide-ljm-api', '4c6'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/dev-guide/dev-guide-mobile-jitsi-meet',
                component: ComponentCreator('/handbook/docs/dev-guide/dev-guide-mobile-jitsi-meet', '11e'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/dev-guide/dev-guide-react-native-sdk',
                component: ComponentCreator('/handbook/docs/dev-guide/dev-guide-react-native-sdk', '392'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/dev-guide/dev-guide-react-sdk',
                component: ComponentCreator('/handbook/docs/dev-guide/dev-guide-react-sdk', 'ad1'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/dev-guide/dev-guide-web-integrations',
                component: ComponentCreator('/handbook/docs/dev-guide/dev-guide-web-integrations', 'af0'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/dev-guide/dev-guide-web-jitsi-meet',
                component: ComponentCreator('/handbook/docs/dev-guide/dev-guide-web-jitsi-meet', '45c'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/dev-guide/mobile-dropbox',
                component: ComponentCreator('/handbook/docs/dev-guide/mobile-dropbox', '573'),
                exact: true
              },
              {
                path: '/handbook/docs/dev-guide/mobile-feature-flags',
                component: ComponentCreator('/handbook/docs/dev-guide/mobile-feature-flags', '40d'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/dev-guide/mobile-google-auth',
                component: ComponentCreator('/handbook/docs/dev-guide/mobile-google-auth', '031'),
                exact: true
              },
              {
                path: '/handbook/docs/devops-guide/',
                component: ComponentCreator('/handbook/docs/devops-guide/', 'd32'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/devops-guide/cloud-api',
                component: ComponentCreator('/handbook/docs/devops-guide/cloud-api', '173'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/devops-guide/devops-guide-bsd',
                component: ComponentCreator('/handbook/docs/devops-guide/devops-guide-bsd', 'bd8'),
                exact: true
              },
              {
                path: '/handbook/docs/devops-guide/devops-guide-docker',
                component: ComponentCreator('/handbook/docs/devops-guide/devops-guide-docker', 'a93'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/devops-guide/devops-guide-log-analyser',
                component: ComponentCreator('/handbook/docs/devops-guide/devops-guide-log-analyser', 'ab9'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/devops-guide/devops-guide-opensuse',
                component: ComponentCreator('/handbook/docs/devops-guide/devops-guide-opensuse', 'eba'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/devops-guide/devops-guide-quickstart',
                component: ComponentCreator('/handbook/docs/devops-guide/devops-guide-quickstart', '2b3'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/devops-guide/devops-guide-requirements',
                component: ComponentCreator('/handbook/docs/devops-guide/devops-guide-requirements', '395'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/devops-guide/devops-guide-scalable',
                component: ComponentCreator('/handbook/docs/devops-guide/devops-guide-scalable', '390'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/devops-guide/devops-guide-videotutorials',
                component: ComponentCreator('/handbook/docs/devops-guide/devops-guide-videotutorials', 'adb'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/devops-guide/faq',
                component: ComponentCreator('/handbook/docs/devops-guide/faq', 'dcd'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/devops-guide/ldap-authentication',
                component: ComponentCreator('/handbook/docs/devops-guide/ldap-authentication', 'c85'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/devops-guide/reservation',
                component: ComponentCreator('/handbook/docs/devops-guide/reservation', 'c60'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/devops-guide/secure-domain',
                component: ComponentCreator('/handbook/docs/devops-guide/secure-domain', '1cb'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/devops-guide/speakerstats',
                component: ComponentCreator('/handbook/docs/devops-guide/speakerstats', '25f'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/devops-guide/turn',
                component: ComponentCreator('/handbook/docs/devops-guide/turn', 'b4c'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/devops-guide/videosipgw',
                component: ComponentCreator('/handbook/docs/devops-guide/videosipgw', 'a29'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/faq',
                component: ComponentCreator('/handbook/docs/faq', 'd2c'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/intro',
                component: ComponentCreator('/handbook/docs/intro', '250'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/releases',
                component: ComponentCreator('/handbook/docs/releases', 'df5'),
                exact: true,
                sidebar: "releases-sidebar"
              },
              {
                path: '/handbook/docs/security',
                component: ComponentCreator('/handbook/docs/security', '8ae'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/user-guide/client connection status indicators',
                component: ComponentCreator('/handbook/docs/user-guide/client connection status indicators', '7e1'),
                exact: true
              },
              {
                path: '/handbook/docs/user-guide/keyboard-shortcuts',
                component: ComponentCreator('/handbook/docs/user-guide/keyboard-shortcuts', '914'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/user-guide/supported-browsers',
                component: ComponentCreator('/handbook/docs/user-guide/supported-browsers', '59d'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/user-guide/user-guide-advanced',
                component: ComponentCreator('/handbook/docs/user-guide/user-guide-advanced', '127'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/user-guide/user-guide-basic',
                component: ComponentCreator('/handbook/docs/user-guide/user-guide-basic', 'ed8'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/user-guide/user-guide-jitsi-meet-for-google-calendar',
                component: ComponentCreator('/handbook/docs/user-guide/user-guide-jitsi-meet-for-google-calendar', 'c15'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/user-guide/user-guide-jitsi-meet-on-mobile',
                component: ComponentCreator('/handbook/docs/user-guide/user-guide-jitsi-meet-on-mobile', '7c5'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/user-guide/user-guide-join-jitsi-meeting',
                component: ComponentCreator('/handbook/docs/user-guide/user-guide-join-jitsi-meeting', '7a5'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/user-guide/user-guide-share-a-jitsi-meeting',
                component: ComponentCreator('/handbook/docs/user-guide/user-guide-share-a-jitsi-meeting', '5ed'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/handbook/docs/user-guide/user-guide-start-a-jitsi-meeting',
                component: ComponentCreator('/handbook/docs/user-guide/user-guide-start-a-jitsi-meeting', '89e'),
                exact: true,
                sidebar: "docs"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/handbook/',
    component: ComponentCreator('/handbook/', 'c10'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
