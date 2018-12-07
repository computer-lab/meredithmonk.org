import React from 'react'
import urlParse from 'url-parse'
import safeGet from 'lodash/get'

function prettyLink(link) {
  const { hostname } = urlParse(link)
  let linkText = `Purchase at ${hostname}`

  if (hostname.match(/amazon/)) {
    linkText = 'Purchase on Amazon.com'
  }

  if (hostname.match(/itunes/)) {
    linkText = 'Download from iTunes'
  }

  if (hostname.match(/paypal/)) {
    linkText = 'Pay with PayPal'
  }

  return (
    <a href={link} rel="noopener noreferrer" target="_blank">{linkText}</a>
  )
}

const Shop = ({ categories }) => (
  <div id="shop">
    {categories.map(category => (
      <div className="category" key={category.name}>
        <h1 className="category-name">{category.name}</h1>
        <div className="products">
          {category.products.map(product => (
            <div className="product card" key={product.name}>
              <img className="card-img-top" src={safeGet(product, 'image.sizes.thumbnail')} alt={product.name} />
              <div className="card-body">
                <div className="product-name card-text">{product.name}</div>
                <div className="product-subtitle card-text">{product.subtitle}</div>
                <ul className="product-purchase-links">
                  {
                    product.purchase_links
                      .map(link => <li key={link}>{prettyLink(link.link)}</li>)
                  }
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)


export default Shop
