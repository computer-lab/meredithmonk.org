import React, { Component } from 'react'
import Link from 'next/link'
import safeGet from 'lodash/get'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout'
import { API_URL } from '../config'

class Work extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query
    const res = await fetch(
      `${API_URL}/wp-json/postlight/v1/${apiRoute}?slug=${slug}&_embed`,
    )
    const post = await res.json()
    return { post }
  }

  render() {
    const {
      headerMenu,
      pageProps: { post },
    } = this.props

    const showFeaturedImage = false
    const is_current_repertory_work = safeGet(post, 'acf.is_current_repertory_work');

    return (
      <Layout headerMenu={headerMenu}>
        {showFeaturedImage && (
          <div className="row">
            <div className="col">
              <img className="work-featured-image" src={safeGet(post, "['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']['full']['source_url']")} alt={post.title.rendered} />
            </div>
          </div>
        )}
        <div className="row">
          <div className="col work-description" id="content">
            {is_current_repertory_work && (
              <div className="work-current-tag">
                <span>current</span>
                part of Meredith Monk and Vocal Ensemble’s current repertory
              </div>
            )}
            <div dangerouslySetInnerHTML={{
              __html: post.content.rendered,
            }}
            />
            <div className="see-more">
              <span className="arrow">←</span>
              <Link
                as="/repertory"
                href="/page?slug=repertory&apiRoute=page"
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
