import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Error from 'next/error'
import Layout from '../components/Layout'
import { API_URL } from '../config'

class Preview extends Component {
  constructor() {
    super()
    this.state = {
      post: null,
    }
  }

  componentDidMount() {
    const { url } = this.props
    const { id, wpnonce } = url.query
    fetch(
      `${API_URL}/wp-json/postlight/v1/post/preview?id=${id}&_wpnonce=${wpnonce}`,
      { credentials: 'include' }, // required for cookie nonce auth
    )
      .then(res => res.json())
      .then((res) => {
        this.setState({
          post: res,
        })
      })
  }

  render() {
    const { post } = this.state
    const { headerMenu } = this.props

    if (post && post.code && post.code === 'rest_cookie_invalid_nonce') return <Error statusCode={404} />

    return (
      <Layout headerMenu={headerMenu}>
        <h1>{post ? post.title.rendered : ''}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: post ? post.content.rendered : '',
          }}
        />
      </Layout>
    )
  }
}

export default Preview
