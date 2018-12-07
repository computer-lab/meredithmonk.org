import React from 'react'
import Link from 'next/link'
import safeGet from 'lodash/get'
import sortBy from 'lodash/sortBy'

const RepertoryWorks = ({ repertoryWorks }) => (
  <div id="works-gallery">
    {sortBy(repertoryWorks, 'menu_order').map(work => (
      <div className="work card" key={work.slug}>
        <Link
          prefetch
          as={`/current-repertory/${work.slug}/`}
          href={work.link}
        >
          <a>
            <img className="card-img-top" src={safeGet(work, "['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']['thumbnail']['source_url']")} alt={work.title.rendered} />
          </a>
        </Link>
        <div className="card-body">
          <div className="work-name card-text">
            <Link
              prefetch
              as={`/current-repertory/${work.slug}/`}
              href={work.link}
            >
              <a>{work.title.rendered}</a>
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
)

export default RepertoryWorks
