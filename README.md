# Jibrel Web Application Frontend

Private applications and pages for Jibrel Startup Investments Platform.

## Development

### nginx proxy config

```
server {
    listen       80;
    server_name  jibrelcom.local;
    location / {
        proxy_pass https://jibrelcom.develop.jdev.network;
    }
}

server {
    listen       80;
    server_name  id.jibrelcom.local;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}

server {
    listen       80;
    server_name  investor.jibrelcom.local;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}

server {
    listen       80;
    server_name  api.jibrelcom.local;

    location / {
        add_header 'Access-Control-Allow-Origin' $http_origin always;

        proxy_set_header 'Origin' 'http://id.jibrelcom.develop.jdev.network';
        proxy_hide_header 'Access-Control-Allow-Origin';
        proxy_cookie_domain '.jibrelcom.develop.jdev.network' '.jibrelcom.local';
        proxy_cookie_domain jibrelcom.develop.jdev.network jibrelcom.local;
        proxy_pass https://api.jibrelcom.develop.jdev.network;
    }
}
```

### /etc/hosts updates

```
...

127.0.0.1    jibrelcom.local
127.0.0.1    api.jibrelcom.local
127.0.0.1    id.jibrelcom.local
127.0.0.1    investor.jibrelcom.local
```

## Deployment

Required server run environment variables:

- `ID_DOMAIN` = domain name for ID application. Must include protocol. Must not include trailing slash.
    - Example for production: `//id.jibrel.com`
- `API_BASE_URL` = base url to backend API. Must include protocol. Must not include trailing slash.
    - Example for production: `//api.jibrel.com`
- `CSP_CONNECT_SRC` = `connect-src` part for Content-Security-Policy header. See [connect-src on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/connect-src) for details.
    - Example for production: `*.jibrel.com` 
- `CSP_FRAME_SRC` = `frame-src` part for Content-Security-Policy header. See [frame-src on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-src) for details.
    - For production is set to empty value 
- `CSP_IMG_SRC` = `img-src` part for Content-Security-Policy header. See [img-src on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/img-src) for details.
    - Example for production: `jibrel.com` 
- `CSP_STYLE_SRC` = `style-src` part for Content-Security-Policy header. See [style-src on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src) for details.
    - Example for production: `jibrel.com` 
- `CSP_SCRIPT_SRC` = `script-src` part for Content-Security-Policy header. See [script-src on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src) for details.
    - Example for production: `jibrel.com` 
- `CSP_MANIFEST_SRC` = `manifest-src` part for Content-Security-Policy header. See [manifest-src on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/manifest-src) for details.
    - Example for production: `jibrel.com` 
