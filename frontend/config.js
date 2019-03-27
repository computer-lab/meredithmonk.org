export const API_URL = process.env.NODE_ENV == 'production'
  ? 'https://wordpress-dot-meredith-monk-website.appspot.com'
  : 'http://localhost:8080'
// note that next-ga does not track on localhost
export const GA_CODE = 'UA-130942031-1'
