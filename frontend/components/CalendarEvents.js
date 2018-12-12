import React from 'react'
import compareAsc from 'date-fns/compare_asc'
import isBefore from 'date-fns/is_before'
import urlParse from 'url-parse'

const CalendarEvents = ({ events }) => {
  const now = new Date()
  const pastEvents = events
    .filter(({ sort_date }) => isBefore(sort_date, now))
    .sort(compareAsc)
  const upcomingEvents = events
    .filter(({ sort_date }) => !isBefore(sort_date, now))
    .sort(compareAsc)
  const labels = ['Upcoming Events', 'Past Events']
  return (
    <div id="calendar-events">
      {[upcomingEvents, pastEvents].map((eventsGroup, i) => (
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
                {eventsGroup.map(({
                  name, date, location, link,
                }) => (
                  <tr key={name}>
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
              </tbody>
            </table>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default CalendarEvents
