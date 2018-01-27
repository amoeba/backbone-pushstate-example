# Backbone.js w/ Fancy URLs via PushState (and more)

This repo contains a very simple Backbone.js app based upon the following resources:

- https://github.com/bouzuya/backbone-pushstate-example (for the app)
- https://gist.github.com/andfinally/8388113 (for the Apache config required to)
- http://readystate4.com/2012/05/17/nginx-and-apache-rewrite-to-support-html5-pushstate/ (for the final Apache config I used)

I had numerous motivations with this repo:

- Demonstrate the use of the `pushState()` API to support normal URLs (`/#route/` becomes `/route/`)
- Include the necessary Apache server configuration to support what's called stateless entry. This allows users to enter your Backbone app anywhere, not just at the root
- Make use of a modern-day development toolchain with the usual `package.json` and Webpack to create a single JS bundle

## Stateless Entry

Stateless entry basically involves serving your `index.html` in front of a web server that redirects requests that don't directly point to your `index.html` to it, preserving the path and query parameters along the way.
This is done with using Apache and `mod_rewrite`:

```text
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

## How to run it

To run with all the features, including stateless entry, you can either run it with Node (easy) or Apache (requires Docker):

### With Node

```sh
# Install dependencies for the app
npm install

# Use webpack to build a single application JS bundle
npm build

# Start a simple Express.js server
npm run dev
```

### With Apache (via Docker)

```sh
# Install dependencies for the app
npm install

# Use webpack to build a single application JS bundle
npm build

# Build the Docker image
docker build -t apache .

# Run it on port 8080 (in the foreground)
docker run -p 8080:80 apache
```

Alternatively, you can run it without stateless entry by running any webserver.
I recommend [devd](https://github.com/cortesi/devd).
