import React from 'react'
import Router from 'next/router'
import withGA from 'next-ga'
import App, { Container } from 'next/app'
import { API_URL, GA_CODE } from '../config'

class MyApp extends App {
  constructor(props) {
    super(props)
    this.state = this.state || {}
    this.state.headerMenu = this.props.headerMenu
    this.state.repertoryWorks = this.props.repertoryWorks
  }

  static async getInitialProps({ Component, ctx }) {
    // get page-specific data from (welcome|page|work)[.js] getInitialProps fn
    if (!ctx.req) {
      const pageProps = await Component.getInitialProps(ctx)
      return {
        pageProps
      }
    }

    // get data that only needs to be gotten once (during SSR)
    const [pageProps, headerMenuRes, repWorksRes] = await Promise.all([
      Component.getInitialProps(ctx),
      fetch(`${API_URL}/wp-json/menus/v1/menus/header-menu`),
      // fetch(`${API_URL}/wp-json/wp/v2/work?_embed&per_page=100`),
    ])
    const [headerMenu, repertoryWorks] = await Promise.all([
      headerMenuRes.json(),
      // repWorksRes.json()
    ])

    return {
      headerMenu,
      pageProps,
    }
  }

  render() {
    const {
      Component, pageProps, headerMenu
    } = this.props

    return (
      <Container>
        <div id="wrapper">
          <Component {...{
            pageProps, headerMenu, ...this.state,
          }}
          />
        </div>
      </Container>
    )
  }
}

// note that next-ga does not track on localhost
export default withGA(GA_CODE, Router)(MyApp)
