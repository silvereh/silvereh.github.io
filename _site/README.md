This is the website for [BYUI Page Builder Component Library](https://www.byui.edu/page-builder/web-editing-tutorials/component-library).

The site is built using Jekyll and Gulp.

## Installation

### Install dependencies

1. [Ruby](https://www.ruby-lang.org/en/documentation/installation/ "Download Ruby")
1. [Bundler](http://bundler.io): `gem install bundler`
2. [Jekyll](http://jekyllrb.com/docs/installation/): `gem install jekyll`
3. [node.js and npm](https://docs.npmjs.com/getting-started/installing-node). For npm, you should be running at least major version 3. To update npm to the latest version, run `npm install npm@latest -g`.
4. [Gulp](https://github.com/gulpjs/gulp): `npm install -g gulp`

### Site setup

1. Clone the repo.
3. Run `bundle install` (or `bundle install --path vendor/bundle` if preferred)
4. Run `npm install` to install node modules. This takes a few minutes.

## Local development

Run `npm run serve` to serve the site locally and watch for file
changes. Initially, or anytime you want to rebuild the `_site` directory, you
should run `npm run serve:rebuild`, which will run the local build task before
serving the site.

The `serve` task uses the test and dev config files for local development.

If needed, run `npm install` to install any modules that were added since you
last served the site.

Thanks to `gulp.watch` and BrowserSync, any changes you make will trigger Gulp
to either regenerate the Jekyll site and automatically refresh your browser or,
if they're changes to CSS or images, inject the updated file(s) so a refresh
isn't needed. It's pretty cool!

You can toggle some options in the gulpfile:

- In the `serve` task, change `ghostMode` to `true` if you want to mirror clicks,
reloads, etc. across browsers. Useful for testing, hard on performance.
- In the `serve` task, change `open` to `false` if you don't want BrowserSync to
automatically open a browser window for you when you serve the site.

## Initial build

`npm install --save-dev gulp gulp-accessibility gulp-cache gulp-util gulp-notify gulp-run gulp-concat gulp-uglify gulp-sass gulp-sourcemaps gulp-postcss postcss-uncss uncss autoprefixer cssnano del browser-sync gulp-hub`

To run:

`bundle update`
`bundle install`
`npm install`