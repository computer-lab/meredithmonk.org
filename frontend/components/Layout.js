import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Menu from './Menu'

const Layout = ({ headerMenu, children }) => (
  <React.Fragment>
    <Header />
    <Menu menu={headerMenu} />
    <div className="container-fluid" id="main">
      {children}
    </div>
    <Footer />
  </React.Fragment>
)

export default Layout
