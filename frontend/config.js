export const API_URL = process.env.NODE_ENV == 'production'
  ? 'https://wordpress-dot-wordpress-test-222422.appspot.com'
  : 'http://localhost:8080'
// note that next-ga does not track on localhost
export const GA_CODE = 'UA-foo-x'
