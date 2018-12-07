import React, { Component } from 'react'
import Link from 'next/link'
import safeGet from 'lodash/get'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout'
import { Config } from '../config'

class Work extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query
    const res = await fetch(
      `${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}&_embed`,
    )
    const post = await res.json()
    return { post }
  }

  render() {
    const {
      headerMenu,
      pageProps: { post },
    } = this.props

    return (
      <Layout headerMenu={headerMenu}>
        <div className="row">
          <div className="col">
            <img className="work-featured-image" src={safeGet(post, "['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']['full']['source_url']")} alt={post.title.rendered} />
          </div>
        </div>
        <div className="row">
          <div className="col work-description" id="content">
            <div dangerouslySetInnerHTML={{
              __html: post.content.rendered,
            }}
            />
            <div className="see-more">
              <span className="arrow">←</span>
              <Link
                as="/current-repertory"
                href="/page?slug=current-repertory&apiRoute=page"
              >
                <a href="/">See more work</a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Work
