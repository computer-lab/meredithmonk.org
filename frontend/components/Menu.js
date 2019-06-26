import React, { Component } from 'react'
import classNames from 'classnames'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { createLink } from '../src/util'

class Menu extends Component {
  isActive(link) {
    const { router } = this.props
    const currentPath = router.asPath
    console.log(currentPath)
    const linkBase = `/${link.props.as.split('/')[1]}`
    return currentPath.indexOf(linkBase) === 0
  }

  render() {
    const { menu, isDark } = this.props

    return (
      <nav className={`navbar navbar-expand-lg navbar-${isDark ? 'dark' : 'light'} container-fluid`}>
        <Link prefetch href="/welcome/?slug=welcome&apiRoute=welcome" as="/">
          <a className="navbar-brand">Meredith Monk</a>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav ml-auto">
            {
              menu.items.map(createLink).map((link, i, arr) =>
                <li onClick={() => console.log('click')} className={classNames('nav-item', { active: this.isActive(link) })} key={link.props.as}>
                  { link }
                </li>
              )
            }
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Menu)
