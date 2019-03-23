import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import safeGet from 'lodash/get'
import sortBy from 'lodash/sortBy'

const RepertoryWorks = ({ repertoryWorks }) => (
  <div id="works-gallery">
    {sortBy(repertoryWorks, 'menu_order').map((work) => {
      const isCurrentRepertoryWork = work.acf.is_current_repertory_work
      const imgSrc = safeGet(work, "['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']['thumbnail']['source_url']") || 'https://via.placeholder.com/400x400'

      return (
        <div
          className={classNames(['work', 'card', isCurrentRepertoryWork && 'current'])}
          key={work.slug}
        >
          <Link
            prefetch
            as={`/current-repertory/${work.slug}/`}
            href={work.link}
          >
            <a>
              <img className="card-img-top" src={imgSrc} alt={work.title.rendered} />
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
      )
    })}
  </div>
)

export default RepertoryWorks
