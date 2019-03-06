import React from 'react'
import Head from 'next/head'
import stylesheet from '../src/styles/style.scss'
import fontawesome from '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

const Header = () => (
  <div>
    <Head>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <style dangerouslySetInnerHTML={{ __html: fontawesome }} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <meta charSet="utf-8" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,700|Roboto+Condensed" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Questrial&text=Merdithonk" rel="stylesheet" />
      <title>
        Meredith Monk
      </title>
    </Head>
  </div>
)

export default Header
