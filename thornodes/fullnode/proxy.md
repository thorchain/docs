---
description: Make API/RPC available externally
---

# Proxy

One easy way to make thornodes and midgards API or RPC endpoints available ecternally is by using a reverse proxy, a webserver that accepts all HTTP(S) requests and forwards them to the specific application.

{% hint style="info" %}
The steps shown here are tested on `Ubuntu 24.04`, different distributions may need adjustments to the commands.

All commands are meant to be run as root user, if not specified otherwise. Depending on the server installation, they may need to be run from a different user via `sudo`.
{% endhint %}

## DNS records

The reverse proxy needs a way to distinguish between the endpoints that it needs to address. One way to do this is by using different DNS records for each service, for example: `api.yourdomain.com`, `rpc.yourdomain.com`, `midgard.yourdomain.com`

## Install prerequisites

```sh
apt install -y --no-install-recommends nginx
```

## Configuration

### Remove default page

The default page is not needed and can be removed:

```sh
rm -f /etc/nginx/sites-enabled/default
```

### Enable THORNode API endpoint

When using a self built version of THORNode, the API endpoint is disabled by default and needs to be enabled in the thornode app config.

{% code title="/home/thornode/.thornode/config/app.toml" overflow="wrap" %}

```toml
[api]

# Enable defines if the API server should be enabled.
enable = true

# Swagger defines if swagger documentation should automatically be registered.
swagger = false

# Address defines the API server to listen on.
address = "tcp://127.0.0.1:1317"
```

{% endcode %}

Thornode needs to be restarted, for the changes to take effect.

```sh
systemctl restart thornode.service
```

### Proxy configuration

Create the required proxy configurations

{% tabs %}
{% tab title="API" %}

{% code title="/etc/nginx/sites-enabled/thornode-api" overflow="wrap" %}

```nginx
server {
  listen      80;
  server_name api.yourdomain.com;
  
  access_log  /var/log/nginx/thornode-api_access.log;
  error_log   /var/log/nginx/thornode-api_error.log;

  location / {
    proxy_pass                           http://localhost:1317/;
    proxy_set_header  Host               $http_host;
    proxy_set_header  X-Real-IP          $remote_addr;
    proxy_set_header  X-Forwarded-For    $proxy_add_x_forwarded_for;
    proxy_set_header  X-Forwarded-Proto  $scheme;
  }
}
```

{% endcode %}

{% endtab %}
{% tab title="RPC" %}

{% code title="/etc/nginx/sites-enabled/thornode-rpc" overflow="wrap" %}

```nginx
server {
  listen      80;
  server_name rpc.yourdomain.com;
  
  access_log  /var/log/nginx/thornode-rpc_access.log;
  error_log   /var/log/nginx/thornode-rpc_error.log;

  location / {
    proxy_pass                           http://localhost:27147/;
    proxy_set_header  Host               $http_host;
    proxy_set_header  X-Real-IP          $remote_addr;
    proxy_set_header  X-Forwarded-For    $proxy_add_x_forwarded_for;
    proxy_set_header  X-Forwarded-Proto  $scheme;
  }
}
```

{% endcode %}

{% endtab %}
{% tab title="MIDGARD" %}

{% code title="/etc/nginx/sites-enabled/midgard" overflow="wrap" %}

```nginx
server {
  listen      80;
  server_name midgard.yourdomain.com;
  
  access_log  /var/log/nginx/midgard_access.log;
  error_log   /var/log/nginx/midgard_error.log;

  location / {
    proxy_pass                           http://localhost:8080/;
    proxy_set_header  Host               $http_host;
    proxy_set_header  X-Real-IP          $remote_addr;
    proxy_set_header  X-Forwarded-For    $proxy_add_x_forwarded_for;
    proxy_set_header  X-Forwarded-Proto  $scheme;
  }
}
```

{% endcode %}

{% endtab %}
{% endtabs %}

## Restart proxy service

```sh
systemctl restart nginx.service
```
