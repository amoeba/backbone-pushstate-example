# backbone-pushstate-example

_An example Backbone.js application w/ path-only (no #!) URLs via PushState (and more)_

This repo contains a very simple Backbone.js app based upon the following resources:

- https://github.com/bouzuya/backbone-pushstate-example (for the app)
- https://gist.github.com/andfinally/8388113 (for the Apache config required to)
- http://readystate4.com/2012/05/17/nginx-and-apache-rewrite-to-support-html5-pushstate/ (for the final Apache config I used)

I had numerous motivations with this repo:

- Demonstrate the use of Backbone.js with the `pushState()` API to support path-only URLs instead of fragment identifiers (`/#route/` becomes `/route/`)
- Include the necessary Apache/node.js server configuration to support what's called stateless entry. This allows users to enter your Backbone app anywhere, not just at the root
- Make use of a modern JS development toolchain
  - [x] `package.json` for dependency management as an improvement over vendoring assets
  - [x] Webpack for building a single bundle `./dist/bundle.js` as an improvement over using something like Require.js
  - [x] Source maps (via Webpack) `./dist.bundle.js.map`
  - [ ] Hot Module Reloading (TODO)
  - [ ] ES6 (and beyond) support (TODO)
  - [ ] Support for more advanced JS features like async/await

## Stateless Entry

Stateless entry basically involves serving your `index.html` in front of a web server that redirects requests that don't directly point to your `index.html` to it, preserving the path and query parameters along the way.
This can be done with using Apache and `mod_rewrite`:

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

or with a node.js via a simple Express.js server:

```js
const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
const app = express();
const fs = require("fs");

app.use(express.static(__dirname + "/dist"));
app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "dist", "index.html"));
});
app.listen(port);
```

## How to run this

To run with all the features, including stateless entry, you can either run it with Node (easy) or Apache (requires Docker):

### With Node.js

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

### On [Zeit](https://zeit.com) w/ [`now`](https://zeit.co/now):

```sh
now .
```

Alternatively, you can run it without stateless entry by running any webserver.
I recommend [devd](https://github.com/cortesi/devd).
