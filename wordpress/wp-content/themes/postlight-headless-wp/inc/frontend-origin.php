<?php

/**
 * @return str Frontend origin URL, i.e., http://localhost:3000.
 */
function get_frontend_origin() {
    return getenv('FRONTEND_URL') ? getenv('FRONTEND_URL') : 'http://localhost:3000';
}
