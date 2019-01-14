import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Error from 'next/error'
import Layout from '../components/Layout'
import AudioToggle from '../components/AudioToggle'
import { API_URL } from '../config'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      muted: true,
    }
  }

  static async getInitialProps() {
    const res = await fetch(
      `${API_URL}/wp-json/postlight/v1/page?slug=welcome`,
    )
    const post = await res.json()
    const childrenRes = await fetch(
      `${API_URL}/wp-json/wp/v2/pages?parent=${post.id}`,
    )
    const children = await childrenRes.json()
    return { post, children }
  }

  handleAudioToggle = () => {
    const { muted } = this.state
    this.setState({ muted: !muted })
  }

  render() {
    const {
      headerMenu,
      pageProps: {
        post,
      },
    } = this.props

    const { muted } = this.state

    if (!post.title) return <Error statusCode={404} />

    return (
      <Layout headerMenu={headerMenu} isDark>
        <video className="video" autoPlay muted={muted} loop>
          <source src="/static/background.mp4" type="video/mp4" />
          <source src="/static/background.webm" type="video/webm" />
          <source src="/static/background.ogv" type="video/ogg" />
          <img alt="background" src="/static/background.jpg" />
        </video>
        <div
          dangerouslySetInnerHTML={{
            __html: post.content.rendered,
          }}
        />
        <div className="audiotoggle" onClick={this.handleAudioToggle}>
          <AudioToggle muted={muted} />
        </div>
      </Layout>
    )
  }
}

export default Index
