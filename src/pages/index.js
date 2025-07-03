import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: <>Jitsi用户，您好！</>,
    imageUrl: "img/undraw_code_review.svg",
    description: (
      <>
        Jitsi Meet 是一组开源项目，旨在为用户提供安全、可扩展且易于使用的视频会议平台，同时具备最先进的视频质量和功能。

        <br/><br/>

        在本网站上，你可以找到所有与 Jitsi 相关的文档资源。

        <br /><br/>

        让我们从 <a href="docs/intro">这里</a> 开始吧。
      </>
    ),
  },
  {
    title: <>功能齐全</>,
    imageUrl: "img/undraw_real_time_sync.svg",
    description: (
      <>
        Jitsi Meet 支持所有主流浏览器以及移动设备。
        
        <br /><br />

        我们的 API 允许开发者轻松将 Jitsi Meet 集成到现有的应用程序中，无论是基于网页的应用，还是原生移动应用。
        
        <br /><br />
        
        你可以使用我们在 
        {" "}
        <a href="https://meet.jit.si" target="_blank">
          meet.jit.si
        </a>{" "} 
        提供的免费实例，或通过现成的 Debian 软件包或全面的 Docker 配置，实现自主托管。
      </>
    ),
  },
  {
    title: <>JaaS：Jitsi即服务(Jitsi as a Service)</>,
    imageUrl: "img/undraw_going_up.svg",
    description: (
      <>
        想要在避免自托管和可扩展性管理复杂性的同时，获得灵活的配置选项？
        
        <br /><br />
        
        JaaS 是你的理想选择。8x8 提供的 Jitsi 即服务 (JaaS) 是一款企业级视频会议平台，允许开发者、组织和企业轻松构建并部署视频解决方案。通过 Jitsi 即服务，我们让你能够使用 Jitsi 的强大功能，运行在我们的全球平台上，让你专注于构建安全且具有品牌标识的视频体验。 
        
        <br /><br />
        点击 此处了解更多 {" "}
        <a href="https://jaas.8x8.vc" target="_blank">
          here
        </a> 信息。
      </>
    ),
  },
];

function VideoContainer() {
  return (
    <div className="container text--center margin-bottom--xl margin-top--lg">
      <div className="row">
        <div className="col">
          <h2>What is Jitsi?</h2>
          <iframe
            
            src="https://www.youtube.com/embed/TB7LlM4erx8"
            title="What is Jitsi?"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title="Jitsi Meet"
      description="State-of-the-art video conferencing you can self-host."
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div>
            先进的视频会议系统，支持自主托管<br/><br/>
            <p>『翻译』日期：2024-10-11 来源：Jitsi-Meet中文交流群（246483851） —— Ryan Yim</p>
          </div>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--secondary button--lg",
                styles.getStarted
              )}
              to={"docs/intro"}
            >
              Get started!
            </Link>
          </div>
        </div>
      </header>
      <main>
        <VideoContainer />
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map(({ imageUrl, title, description }, idx) => (
                  <div key={idx} className={clsx("col col--4", styles.feature)}>
                    {imageUrl && (
                      <div className="text--center margin-bottom--lg">
                        <img
                          className={styles.featureImage}
                          src={useBaseUrl(imageUrl)}
                          alt={title}
                        />
                      </div>
                    )}
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
