import Header from "./Header";
import Footer from "./Footer";
import Menu from './Menu';
import React from 'react';

const Layout = props => (
  <React.Fragment>
    <Header />
    <Menu menu={props.headerMenu} />
    <div className="container-fluid" id="main">
      {props.children}
    </div>
    <Footer />
  </React.Fragment>
);

export default Layout;
