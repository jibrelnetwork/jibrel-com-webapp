#!/bin/sh -e

RUNMODE="${1:-start}"
ENVIRONMENT="${ENV:-undefined}"

function prepare_and_check() {
    env $@ sh -c 'dockerize -template /etc/nginx/nginx.tpl.conf:/etc/nginx/nginx.conf'
    /usr/sbin/nginx -t
}

if [ "${RUNMODE}" = "check" ]; then
    echo "Checking default configuration..."
    prepare_and_check

    echo "Checks were completed successfully"
else
    echo "Starting jibrel-com-webapp service, version: `cat /app/version.txt` on node `hostname`, mode: ${ENVIRONMENT}"

    dockerize -template /etc/nginx/nginx.tpl.conf:/etc/nginx/nginx.conf

    /usr/sbin/nginx
fi
