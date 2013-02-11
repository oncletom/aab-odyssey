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

## Self-criticism

This exercise is subject to self-criticism and explainations.

### Pre-requisites

First of all, I have only considered having a single webpage where the logic
would have been browser-side. It would have been almost easier to generate static
web pages with available data and tools like [frozen flask](http://pythonhosted.org/Frozen-Flask/),
[jekyll](https://github.com/mojombo/jekyll) or [punch](https://github.com/laktek/punch).

I once considered doing a `yeoman init angular` to scaffold an Angular project
using Sass and so on but I faced several issues:

* the generated `Gruntfile.js` was containing way too much concepts for something simple;
* I had to master Angular and Sass faster than ever to convince I knew how to use them;
* I expected the alleged simplicity of these tools would hide more complex concepts
and issues in the debugging process;
* I always feel guilty to load 30K of jQuery and 30K of Angular without having started to write a single line of code.

I thus chose a more lightweight approach:

* statically compiled Handlebars templates
* Zepto as a jQuery replacement to manipulate DOM etc. — jquip has been considered
but is ineffecient for an event-driven interface based on `trigger` and `on` mechanism
* event-driven components to dispatch data among various controllers

### What has been done

### What is lacking

### The ideal world