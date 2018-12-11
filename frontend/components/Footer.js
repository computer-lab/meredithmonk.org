import React from 'react'

const Footer = ({ isDark }) => (
  <React.Fragment>
    <div id="footer" className={`${isDark ? 'dark' : ''}`}>
      <img alt="monk logo" src="/static/images/MM-Gold-transparent.png" />
      <address>
        <p>Meredith Monk/The House Foundation for the Arts</p>
        <p>260 West Broadway Suite 2</p>
        <p>New York, New York 10013</p>
        <p>☎ (212) 904-1330</p>
        <p><a href="&#109;&#097;&#105;&#108;&#116;&#111;:&#109;&#111;&#110;&#107;&#064;&#109;&#101;&#114;&#101;&#100;&#105;&#116;&#104;&#109;&#111;&#110;&#107;&#046;&#111;&#114;&#103;">monk@meredithmonk.org</a></p>
      </address>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossOrigin="anonymous" />
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossOrigin="anonymous" />
  </React.Fragment>
)

export default Footer
