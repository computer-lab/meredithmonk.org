import Layout from "../components/Layout.js";
import React, { Component } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import Menu from "../components/Menu.js";
import { Config } from "../config.js";
import { createLink } from "../src/util.js";
//import bgMp4 from '../static/background.mp4';

class Index extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;
    const res = await fetch(
      `${Config.apiUrl}/wp-json/postlight/v1/page?slug=welcome`
    );
    const post = await res.json();
    const childrenRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/pages?parent=${post.id}`
    );
    const children = await childrenRes.json();
    return { post, children };
  }

  render() {
    let {
      headerMenu,
      pageProps: {
        post,
        children
      }
    } = this.props

    if (!post.title) return <Error statusCode={404} />;

    return (
      <Layout>
        <Menu menu={headerMenu} />
        <div className="container" id="main">
          <div>(hello, this template is pages/index.js, all the other pages are pages/page.js)</div>
          <video className="video" autoPlay loop>
            <source src="/static/background.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
          </video>
          <div
            dangerouslySetInnerHTML={{
              __html: post.content.rendered
            }}
          />
        </div>
      </Layout>
    );
  }
}

export default Index;
