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
            as={`/repertory/${work.slug}/`}
            href={work.link}
          >
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
            <a className="card-img-top" title={work.title.rendered} style={{ backgroundImage: `url(${imgSrc}` }} />
          </Link>
          <div className="card-body">
            <div className="work-name card-text">
              <Link
                prefetch
                as={`/repertory/${work.slug}/`}
                href={work.link}
              >
                <a
                  dangerouslySetInnerHTML={{
                    __html: work.title.rendered,
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      )
    })}
  </div>
)

export default RepertoryWorks
