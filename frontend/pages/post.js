import Layout from "../components/Layout.js";
import React, { Component } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu.js";
import { Config } from "../config.js";
import { createLink } from "../src/util.js";
import CalendarEvents from "../components/CalendarEvents.js";

class Post extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;
    const res = await fetch(
      `${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`
    );
    const post = await res.json();
    const childrenRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/pages?parent=${post.id}`
    );
    const children = await childrenRes.json();
    return { post, children };
  }

  render() {
    const {
      post,
      post: { acf },
      children
    } = this.props

    if (!post.title) return <Error statusCode={404} />;

    return (
      <Layout>
        <Menu menu={this.props.headerMenu} />

        {/* display submenu, if there are child pages */}
        { !!children.length &&
          <ul id="sub-nav">
            { children.map(createLink).map((child, i) =>
              <li key={i}>{child}</li>
            )}
          </ul>
        }

        <div
          dangerouslySetInnerHTML={{
            __html: post.content.rendered
          }}
        />

        {/* calendar events */}
        { acf && acf.events && <CalendarEvents events={acf.events} /> }
      </Layout>
    );
  }
}

export default PageWrapper(Post);
