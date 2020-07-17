# Jibrel Web Application Frontend

Private applications and pages for Jibrel Startup Investments Platform.

## Development

### nginx proxy config

```
server {
    listen       80;
    server_name  tokenize.local;
    location / {
        proxy_pass https://jibrelcom.develop.jibreldev.com;
    }
}

server {
    listen       80;
    server_name  id.tokenize.local;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}

server {
    listen       80;
    server_name  investor.tokenize.local;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}

server {
    listen       80;
    server_name  api.tokenize.local;

    location / {
        add_header 'Access-Control-Allow-Origin' $http_origin always;

        proxy_set_header 'Origin' 'http://id.jibrelcom.develop.jibreldev.com';
        proxy_hide_header 'Access-Control-Allow-Origin';
        proxy_cookie_domain '.jibrelcom.develop.jibreldev.com' '.jibrelcom.local';
        proxy_cookie_domain jibrelcom.develop.jibreldev.com jibrelcom.local;
        proxy_pass https://api.jibrelcom.develop.jibreldev.com;
    }
}
```

### /etc/hosts updates

```
...

127.0.0.1    tokenize.local
127.0.0.1    api.tokenize.local
127.0.0.1    id.tokenize.local
127.0.0.1    investor.tokenize.local
```

## Deployment

Required server run environment variables:

- `CSP_CONNECT_SRC` = `connect-src` part for Content-Security-Policy header. See [connect-src on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/connect-src) for details.
    - Example for production: `*.tokenize.jibrel.network` 
- `CSP_FRAME_SRC` = `frame-src` part for Content-Security-Policy header. See [frame-src on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-src) for details.
    - For production is set to empty value 
- `CSP_IMG_SRC` = `img-src` part for Content-Security-Policy header. See [img-src on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/img-src) for details.
    - Example for production: `tokenize.jibrel.network` 
- `CSP_STYLE_SRC` = `style-src` part for Content-Security-Policy header. See [style-src on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src) for details.
    - Example for production: `tokenize.jibrel.network` 
- `CSP_SCRIPT_SRC` = `script-src` part for Content-Security-Policy header. See [script-src on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src) for details.
    - Example for production: `tokenize.jibrel.network` 
- `CSP_MANIFEST_SRC` = `manifest-src` part for Content-Security-Policy header. See [manifest-src on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/manifest-src) for details.
    - Example for production: `tokenize.jibrel.network` 
