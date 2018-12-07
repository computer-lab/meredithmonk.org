import React from 'react'
import App, { Container } from 'next/app'
import { Config } from '../config'

export default class MyApp extends App {
  constructor(props) {
    super(props)
    this.state = this.state || {}
    this.state.headerMenu = this.props.headerMenu
    this.state.repertoryWorks = this.props.repertoryWorks
  }

  static async getInitialProps({ Component, ctx }) {
    // get page-specific data from (welcome|page|work)[.js] getInitialProps fn
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    // get data that only needs to be gotten once (during SSR)
    if (ctx.req) {
      const headerMenuRes = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`,
      )
      const repertoryWorksRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/work?_embed`,
      )
      const headerMenu = await headerMenuRes.json()
      const repertoryWorks = await repertoryWorksRes.json()

      return {
        headerMenu,
        repertoryWorks,
        pageProps,
      }
    }

    return {
      pageProps,
    }
  }

  render() {
    const {
      Component, pageProps, headerMenu, repertoryWorks,
    } = this.props

    return (
      <Container>
        <div id="wrapper">
          <Component {...{
            pageProps, headerMenu, repertoryWorks, ...this.state,
          }}
          />
        </div>
      </Container>
    )
  }
}
