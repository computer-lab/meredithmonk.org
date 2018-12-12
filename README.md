# meredithmonk.org Headless Wordpress Site

meredithmonk.org is build using Postlight's Wordpress starter.

## Dev Setup

See wp-postlight instructions below.

## Deploy

Install the google cloud cli and login.

https://cloud.google.com/sdk/docs/quickstart-debian-ubuntu

To deploy the node frontend: 

`gcloud beta app deploy frontend/app.yaml  --no-cache`

To deploy the wordpress backend, add a `wp-config.php` file with database creds
to `wordpress`, and run:

`gcloud app deploy wordpress/app.yaml`

## Postlight Headless WordPress + React Starter Kit Info

Postlight's Headless WordPress + React Starter Kit is an automated toolset that will spin up two things:

1.  A WordPress backend that serves its data via the [WP REST API](https://developer.wordpress.org/rest-api/) and [GraphQL](http://graphql.org/) (**new!**).
2.  A server-side rendered React frontend using [Next.js](https://github.com/zeit/next.js/).

You can read all about it in [this handy introduction](https://trackchanges.postlight.com/introducing-postlights-wordpress-react-starter-kit-a61e2633c48c).

**What's inside:**

*   An automated installer script which bootstraps a core WordPress installation that provides an established, stable REST API.
*   A plugin which exposes a newer, in-progress [GraphQL API for WordPress](https://wpgraphql.com/).
*   The WordPress plugins you need to set up custom post types and custom fields ([Advanced Custom Fields Pro](https://www.advancedcustomfields.com/) and [Custom Post Type UI](https://wordpress.org/plugins/custom-post-type-ui/)).
*   Plugins which expose those custom fields and WordPress menus in the [WP REST API](https://developer.wordpress.org/rest-api/) ([ACF to WP API](https://wordpress.org/plugins/acf-to-wp-api/) and [WP-REST-API V2 Menus](https://wordpress.org/plugins/wp-rest-api-v2-menus/)).
*   All the starter WordPress theme code and settings headless requires, including pretty permalinks, CORS `Allow-Origin` headers, and useful logging functions for easy debugging.
*   A mechanism for easily importing data from an existing WordPress installation anywhere on the web using [WP Migrate DB Pro](https://deliciousbrains.com/wp-migrate-db-pro/) and its accompanying plugins (license required).
*   A starter frontend React app powered by [Next.js](https://learnnextjs.com/).
*   A [Docker](https://www.docker.com/) container and scripts to manage it, for easily running the frontend React app and backend locally or deploying it to any hosting provider with Docker support.

Let's get started.

## WordPress Backend

Before you install WordPress, make sure you have [Docker](https://www.docker.com) installed.

### Install

The following commands will get WordPress running on your machine using Docker, along with the WordPress plugins you'll need to create and serve custom data via the WP REST API.

```zsh
> docker-compose up -d
```
- Attach to the `wp_headless` container.
```zsh
> docker exec -it wp_headless /bin/bash
```
- Setup headless wordpress by running yarn
```zsh
> yarn install
```
When the installation process completes successfully:

*   The WordPress REST API is available at [http://localhost:8080](http://localhost:8080)
*   The WordPress GraphQL API is available at [http://localhost:8080/graphql](http://localhost:8080/graphql)
*   The WordPress admin is at [http://localhost:8080/wp-admin/](http://localhost:8080/wp-admin/) default login credentials `nedstark` / `winteriscoming`

### Import Data (Optional)

To import data and media from a live WordPress installation, you can use the Migrate DB Pro plugin, which is already installed. To do so, in the `robo.yml` file, set the plugin license and source install. Run `robo wordpress:setup`, then run `robo wordpress:import` to pull in the data.

### Extend the REST and GraphQL APIs

At this point you can start setting up custom fields in the WordPress admin, and if necessary, creating [custom REST API endpoints](https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/) in the Postlight Headless WordPress Starter theme. You can also [modify and extend the GraphQL API](https://wpgraphql.com/docs/getting-started/about).

The primary theme code is located in `wordpress/wp-content/themes/postlight-headless-wp`. Remember to [lint your code](README-linting.md) as you go.

## React Frontend

**Prerequisite:** Node 7 is required.

To spin up the frontend client app, run the following commands:

```zsh
> docker exec -it wp_headless /bin/bash
> cd frontend && yarn install && yarn start
```

The Next.js app will be running on [http://localhost:3000](http://localhost:3000).

### Docker

Most WordPress hosts don't also host Node applications, so when it's time to go live, you will need to find a hosting service for the frontend.

That's why we've packaged the frontend app in a Docker container, which can be deployed to a hosting provider with Docker support like Amazon Web Services or Google Cloud Platform. For a fast, easier alternative, check out [Now](https://zeit.co/now).

To run the Docker container locally:

1.  In `frontend/config.js`, replace `localhost:8080` with your publicly-accessible WordPress installation's domain name or IP address.
2.  Start the container by running this command:

```zsh
> yarn run deploy
```

## Troubleshooting Common Errors

**CORS errors**

If you have deployed your WordPress install and are having CORS issues be sure to update `/wordpress/wp-content/themes/postlight-headless-wp/inc/frontend-origin.php` with your frontend origin URL.

See anything else you'd like to add here? Please send a pull request!

---

Made with ❤️ by [Postlight](https://postlight.com). Happy coding!
