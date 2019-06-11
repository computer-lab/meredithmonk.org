import React from 'react'
import Link from 'next/link'
import urlParse from 'url-parse'

function clickMenuItem() {
  window.setTimeout(() => {
    if ($('.navbar-collapse.show').length) $('.navbar-toggler').trigger('click')
  }, 50)
}

export const getLocation = (href) => {
  const url = urlParse(href)
  return url.pathname
}

export const getSlug = (url) => {
  const parts = url.split('/')
  return parts.length > 2 ? parts[parts.length - 2] : ''
}

export const createLink = (item, index) => {
  if (item.link) {
    return (
      <Link
        prefetch
        as={`${getLocation(item.link)}`}
        href={`/page?slug=${item.slug}&apiRoute=page`}
        key={item.id}
      >
        <a>{item.title.rendered}</a>
      </Link>
    )
  }

  let slug = getSlug(item.url)
  let asSlug
  if (slug === 'about') {
    asSlug = 'about/biography'
    slug = 'biography'
  } else if (slug === 'education') {
    asSlug = 'education/workshops'
    slug = 'workshops'
  } else if (slug === 'support') {
    asSlug = 'support/give'
    slug = 'give'
  } else if (slug === 'store') {
    asSlug = 'store/cds'
    slug = 'cds'
  } else {
    asSlug = slug
  }

  return (
    <Link
      prefetch
      as={`/${asSlug}/`}
      href={`/page?slug=${slug}&apiRoute=${item.object}`}
      key={index}
    >
      <a className="nav-link" onClick={clickMenuItem}>{item.title}</a>
    </Link>
  )
}
