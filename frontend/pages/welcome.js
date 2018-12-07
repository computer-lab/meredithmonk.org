import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Error from 'next/error'
import Layout from '../components/Layout'
import { Config } from '../config'

class Index extends Component {
  static async getInitialProps() {
    const res = await fetch(
      `${Config.apiUrl}/wp-json/postlight/v1/page?slug=welcome`,
    )
    const post = await res.json()
    const childrenRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/pages?parent=${post.id}`,
    )
    const children = await childrenRes.json()
    return { post, children }
  }

  render() {
    const {
      headerMenu,
      pageProps: {
        post,
      },
    } = this.props

    if (!post.title) return <Error statusCode={404} />

    return (
      <Layout headerMenu={headerMenu} isDark>
        <video className="video" autoPlay loop>
          <source src="/static/background.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
          <source src="/static/background.webm" type='video/webm; codecs="vp8, vorbis"' />
          <source src="/static/background.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
          <img alt="background" src="/static/background.jpg" />
        </video>
        <div
          dangerouslySetInnerHTML={{
            __html: post.content.rendered,
          }}
        />
      </Layout>
    )
  }
}

export default Index
