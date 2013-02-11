aab-odyssey
===========

A journey into the flow of broadcasting.

The goal of this project is to demonstrate abilities in building single-web page
with data issued from a CORS API.

## Install

After cloning the repository, static files has to be built (only sources are versionned).

```bash
npm install -g grunt-cli bower
npm install
grunt build
```

## Deploy

Once the project is installed, you have to generate a working copy once relevant:

```bash
grunt build
```

Copy, transfer and access the whole content of the `dist/` folder.

**Notice**: due to `webfont.com` restrictions, the *Gill Sans* font will be
properly rendered only if the content is browsed from a `localhost` domain.