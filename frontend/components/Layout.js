import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Menu from './Menu'

const Layout = ({ headerMenu, children, isDark }) => (
  <React.Fragment>
    <Header />
    <Menu menu={headerMenu} isDark={isDark} />
    <div className="container-fluid" id="main">
      {children}
    </div>
    <Footer isDark={isDark} />
  </React.Fragment>
)

export default Layout
