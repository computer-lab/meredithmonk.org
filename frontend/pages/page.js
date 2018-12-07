import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import { withRouter } from 'next/router'
import classNames from "classnames";
import Menu from "../components/Menu.js";
import { Config } from "../config.js";
import { createLink } from "../src/util.js";
import CalendarEvents from "../components/CalendarEvents.js";
import Shop from "../components/Shop.js";
import RepertoryWorks from "../components/RepertoryWorks.js";
import sortBy from 'lodash/sortBy';
import safeGet from 'lodash/get';

class Page extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;

    // get data for this page
    const pageRes = await fetch(
      `${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`
    );

    // get data for the top ancestor of this page, if it's different from this page
    const ancestorSlug = context.asPath.split('/')[1]
    let ancestor, thisPage
    if (ancestorSlug !== slug) {
      const ancestorRes = await fetch(
        `${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${ancestorSlug}`
      );
      ancestor = await ancestorRes.json();
    } else {
      thisPage = await pageRes.json();
      ancestor = {
        id: thisPage.id
      }
    }

    // get menu items for this page, if they exist
    const menuItemRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/pages?parent=${ancestor.id}`
    );

    const menuItems = await menuItemRes.json();
    const page = thisPage || await pageRes.json();

    return { page, menuItems };
  }

  isSectionActive(slug) {
    const currentPath = this.props.router.asPath
    return currentPath.indexOf(slug) === 0
  }

  isPageActive(child) {
    const currentPath = this.props.router.asPath
    return currentPath === child.props.as
  }

  render() {
    const {
      headerMenu,
      repertoryWorks,
      pageProps: {
        page,
        page: { acf },
        menuItems,
      }
    } = this.props

    if (!page.title) return <Error statusCode={404} />;

    return (
      <Layout headerMenu={headerMenu}>
        <div className="row">
          <div className={classNames('col', {['solo']: !menuItems.length})} id="content">
            {/* <h1>{page.title.rendered}</h1> */}
            <div dangerouslySetInnerHTML={{
              __html: page.content.rendered
            }}>
          </div>

          {/* calendar events */}
          { acf && acf.events && <CalendarEvents events={acf.events} /> }

          {/* shop */}
          {acf &&
              <div>
                {acf.featured_product_image &&
                    <div class="featured-product">
                      <img src={safeGet(acf, 'featured_product_image.sizes.thumbnail')} />
                      <div dangerouslySetInnerHTML={{
                        __html: acf.featured_product_description
                      }}>
                    </div>
                  </div>
                }
                {acf.product_categories &&
                    <Shop categories={acf.product_categories} />
                }
              </div>
          }

          {/* repertory works */}
          { this.isSectionActive('/current-repertory') && <RepertoryWorks repertoryWorks={repertoryWorks} />}
        </div>
        { !!menuItems.length &&
            <div className="col-md-3" id="subnav">
              <ul id="sub-nav">
                { sortBy(menuItems, 'menu_order')
                    .map(createLink)
                    .map((child, i) =>
                      <li className={classNames({['active']: this.isPageActive(child)})} key={i}>
                        {child}
                      </li>
                    )}
                  </ul>
                </div>
        }
      </div>
    </Layout>
    );
  }
}

export default withRouter(Page);
