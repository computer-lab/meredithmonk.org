/* eslint-disable react/no-array-index-key */
import React from 'react'
import groupBy from 'lodash/groupBy'
import compareAsc from 'date-fns/compare_asc'
// import compareDesc from 'date-fns/compare_desc'
import isBefore from 'date-fns/is_before'
import urlParse from 'url-parse'

const CalendarEvents = ({ events }) => {
  const now = new Date()
  const getYear = ({ sort_date }) => sort_date.substring(0, 4)
  const pastEvents = events
    .filter(({ sort_date }) => isBefore(sort_date, now))
    .sort((a, b) => compareAsc(a.sort_date, b.sort_date))
  const groupedPastEvents = groupBy(pastEvents, getYear)
  const upcomingEvents = events
    .filter(({ sort_date }) => !isBefore(sort_date, now))
    .sort((a, b) => compareAsc(a.sort_date, b.sort_date))
  const groupedUpcomingEvents = groupBy(upcomingEvents, getYear)
  const labels = ['Upcoming Events', 'Past Events']

  return (
    <div id="calendar-events">
      {[groupedUpcomingEvents, groupedPastEvents].map((years, i) => (
        <React.Fragment key={labels[i]}>
          <h2>{labels[i]}</h2>
          <div id="calendar-events" className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Location</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(years).map(year => (
                  <React.Fragment>
                    <tr key={year} className="year-separator">
                      <td colSpan="3">{year}</td>
                    </tr>
                    {years[year].map(({
                      name, date, location, link,
                    }, k) => (
                      <tr key={year + k}>
                        <td>
                          <b>{name}</b>
                          {link && (
                            <>
                              <br />
                              <a className="event-link" href={link.url} target={link.target} title={link.title}>
                                {urlParse(link.url).hostname}
                              </a>
                            </>
                          )}
                        </td>
                        <td>{date}</td>
                        <td>{location}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default CalendarEvents
