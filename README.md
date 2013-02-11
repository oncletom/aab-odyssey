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

I'd like to share the progress made with this sample project:

* narrative interface: the user learns instantly how to use the interface
* channels navigation
* day to day schedule navigation
* Programmes linking for complementay informations
* automated install and build process
 * template generation
 * JavaScript linting to reduce in-app problems
 * custom Bootstrap grid mimicking the precepts of [GEL](http://www.bbc.co.uk/gel/web/foundations/universal-grid/the-grid)
* unit tests within the browser

### What is lacking

* inline JSDoc: I started to write it and I let it down when I realized I would not have
enough time to complete the work
* better UI: CSS transitions and animations would have improved the user
experience when showing new elements
 * navigation sliding from the top
 * sliding schedule (from the left or from the right, according to the *previous* or *next* day navigation
 order
 * better line-height in the schedule display to ease the reading
 * GEL iconography for time and duration concepts
* better error handling in case of request timeout or unexpected content
* bookmarks handling — clearly due to a lack of time
 * `pid` and broadcast content stored in localStorage
 * starred broadcasts view for an easy and quick access
* functional tests
 * CasperJS is high in my heart for this work
 * it would have enabled to detect regressions in the interface during the development process
 * and it would have prevented regressions in further developments
* continuous integration
 * the effort would have been very small to launch unit and functional tests with TravisCI for example
 * it's painless to deploy, very convenient and can't be forgotten

Moreover, the simple approach is quickly showing limitations as soon as we need
to nest templates/partials. It would have required to tweak Handlebars and to add
more complexity in the naive conception relying on `data-*` attributes. I don't have
regrets on that point, I thought that point as an experimentation.
Clearly, Angular (or any bi-directional client-side "MVC" framework) would have been
a huge win regarding this issue.

An unexpected issue is the lack of conversation for resolving the initial problem.
I figured out it has been quite a long time I've never done something without
strong interactions with the feature provider: what to do, goals, means, strategy
etc.

I've also lacked of giving to myself more explicit goals and milestones.
It is harder to have such a self-organization than within a team where the need of
external communication is stronger. Working with ourself only can easily lead
to the security and comfort to have all our ideas in our head, and they will
be easily coded.

At the moment, I clearly think there is frustration having lots of ideas on this
exercise, and having solved only a small part of the problem.

### The ideal world

If I put aside time and legacy code constraints, I had these ideas in mind:

* relying on Angular to deal with client-side templating (with explicit data binding)
* clicking on a broadcast would have faded-in its cover with a blurry effect in background
* AND it would have displayed a detailed "card" about the content without leaving the page (based on the Programme Ontology API)
* channels could be complementary, so as we could stack them vertically to visually
compare the scheduling of our favourite broadcasts
* iPlayer integration to replay past contents (or the previous episode of a scheduled episode)
* adaptative interface so as the same contents would fit perfectly on smartphones and tablets
* highlighting broadcasts we sometimes/regularly/often/declare to like to ease their spotting within the schedule