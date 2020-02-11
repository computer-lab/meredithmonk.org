const express = require("express");
const next = require("next");
const favicon = require('serve-favicon');
const path = require('path');

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Listen to the App Engine-specified port, or 3000 otherwise
const PORT = process.env.PORT || 3000;

app
    .prepare()
    .then(() => {
        const server = express();

        server.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

        server.get("/*", (req, res) => {
            // redirect some pages to their first children
            // and handle .html suffixed paths from old site
            // must also edit src/util.js for client-side redirect
            if (req.path.match(/^\/about(\/|\.html|\/bio\.html)?$/)) {
                res.redirect('/about/biography/');
            }
            if (req.path.match(/^\/education(\/|\.html)?$/)) {
                res.redirect('/about/workshops/');
            }
            if (req.path.match(/^\/store(\/|\.html)?$/)) {
                res.redirect('/store/cds/');
            }
            if (req.path.match(/^\/support(\/|\.html)?$/)) {
                res.redirect('/support/give/');
            }
            if (req.path.match(/^\/calendar(\.html|\/past\.html|\/calendar_print\.html)$/)) {
                res.redirect('/calendar/current/');
            }

            // index.js : homepage
            // work.js  : repertory work individual page
            // page.js  : all other pages

            let slug = getSlug(req.path)
            let apiRoute = 'page'
            let templateFile = '/page'

            if (req.path === '/') {
                slug = 'welcome'
                templateFile = '/welcome'
            }

            // individual repertory work page
            if (req.path.indexOf('/repertory/') === 0 && req.path !== '/repertory/') {
                apiRoute = 'work'
                templateFile = '/work'
            }

            const queryParams = { slug, apiRoute };
            app.render(req, res, templateFile, queryParams);
        });

        server.listen(PORT, err => {
            if (err) throw err;
            console.log(`> Ready on port ${PORT}`);
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });

function getSlug(url) {
    const parts = url.split("/");
    return parts.pop() || parts.pop();
}
