#!/bin/sh -e

RUNMODE="${1:-start}"
ENVIRONMENT="${ENV:-undefined}"

function prepare_and_check() {
    env $@ sh -c 'dockerize -template /etc/nginx/nginx.tpl.conf:/etc/nginx/nginx.conf'
    env $@ sh -c 'dockerize -template /etc/nginx/include.d/headers.tpl.conf:/etc/nginx/include.d/headers.conf'
    /usr/sbin/nginx -t
}

if [ "${RUNMODE}" = "check" ]; then
    echo "Checking default configuration..."
    prepare_and_check

    echo "Checks were completed successfully"
else
    echo "Starting jibrel-com-webapp service, version: `cat /app/version.txt` on node `hostname`, mode: ${ENVIRONMENT}"

    dockerize \
        -template /etc/nginx/nginx.tpl.conf:/etc/nginx/nginx.conf \
        -template /etc/nginx/include.d/headers.tpl.conf:/etc/nginx/include.d/headers.conf \
        -template /app/company/index.html:/app/company/index.html \
        -template /app/id/settings.js:/app/id/settings.js \
        -template /app/id/index.html:/app/id/index.html \
        -template /app/investor/settings.js:/app/investor/settings.js \
        -template /app/investor/index.html:/app/investor/index.html

    /usr/sbin/nginx
fi
