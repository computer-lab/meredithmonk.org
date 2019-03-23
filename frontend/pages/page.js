import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Error from 'next/error'
import { withRouter } from 'next/router'
import classNames from 'classnames'
import sortBy from 'lodash/sortBy'
import safeGet from 'lodash/get'
import Layout from '../components/Layout'
import { API_URL } from '../config'
import { createLink } from '../src/util'
import CalendarEvents from '../components/CalendarEvents'
import Shop from '../components/Shop'
import RepertoryWorks from '../components/RepertoryWorks'
import MailingListSignup from '../components/MailingListSignup'

class Page extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query

    // get data for this page
    const pageRes = await fetch(
      `${API_URL}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`,
    )

    // get data for the top ancestor of this page, if it's different from this page
    const ancestorSlug = context.asPath.split('/')[1]
    let ancestor
    let thisPage
    if (ancestorSlug !== slug) {
      const ancestorRes = await fetch(
        `${API_URL}/wp-json/postlight/v1/${apiRoute}?slug=${ancestorSlug}`,
      )
      ancestor = await ancestorRes.json()
    } else {
      thisPage = await pageRes.json()
      ancestor = {
        id: thisPage.id,
      }
    }

    // get menu items for this page, if they exist
    const menuItemRes = await fetch(
      `${API_URL}/wp-json/wp/v2/pages?parent=${ancestor.id}`,
    )

    const menuItems = await menuItemRes.json()
    const page = thisPage || await pageRes.json()

    return { page, menuItems }
  }

  isSectionActive(slug) {
    const { router } = this.props
    const currentPath = router.asPath
    return currentPath.indexOf(slug) === 0
  }

  isPageActive(child) {
    const { router } = this.props
    const currentPath = router.asPath
    return currentPath === child.props.as
  }

  render() {
    const {
      router,
      headerMenu,
      repertoryWorks,
      pageProps: {
        page,
        page: { acf },
        menuItems,
      },
    } = this.props

    if (!page.title) return <Error statusCode={404} />

    return (
      <Layout headerMenu={headerMenu}>
        <div className={classNames('row', 'content-row', { cols: !!menuItems.length }, `page-${page.slug}`)}>
          <div className={classNames('col', { solo: !menuItems.length })} id="content">
            {/* <h1>{page.title.rendered}</h1> */}
            <div dangerouslySetInnerHTML={{
              __html: page.content.rendered,
            }}
            />

            {/* calendar events */}
            { acf && acf.events && <CalendarEvents events={acf.events} /> }

            {/* shop */}
            {acf
              && (
                <div>
                  {acf.featured_product_image
                      && (
                        <div className="featured-product">
                          <img alt="featured product" src={safeGet(acf, 'featured_product_image.sizes.thumbnail')} />
                          <div dangerouslySetInnerHTML={{
                            __html: acf.featured_product_description,
                          }}
                          />
                        </div>
                      )
                  }
                  {acf.product_categories
                      && <Shop categories={acf.product_categories} />
                  }
                </div>
              )
          }

            {/* repertory works */}
            { this.isSectionActive('/current-repertory') && <RepertoryWorks repertoryWorks={repertoryWorks} />}

            {/* mailing list signup */}
            { router.asPath.indexOf('/mailing-list') > -1 && <MailingListSignup />}
          </div>
          { !!menuItems.length
            && (
              <div className="col-md-3" id="subnav">
                <ul id="sub-nav">
                  {
                    sortBy(menuItems, 'menu_order')
                      .map(createLink)
                      .map(child => (
                        <li
                          className={classNames({ active: this.isPageActive(child) })}
                          key={child.props.as}
                        >
                          {child}
                        </li>
                      ))
                  }
                </ul>
              </div>
            )
        }
        </div>
      </Layout>
    )
  }
}

export default withRouter(Page)
