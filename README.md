The site is built using Jekyll and Webpack.

## Installation

### Install dependencies

1. [Ruby](https://www.ruby-lang.org/en/documentation/installation/ "Download Ruby")
1. [Bundler](http://bundler.io): `gem install bundler`
2. [Jekyll](http://jekyllrb.com/docs/installation/): `gem install jekyll`
3. [node.js and npm](https://docs.npmjs.com/getting-started/installing-node). For npm, you should be running at least major version 3. To update npm to the latest version, run `npm install npm@latest -g`.
4. [Webpack](https://webpack.js.org/): `npm install -g webpack`

### Site setup

1. Clone the repo.
3. Run `bundle install` (or `bundle install --path vendor/bundle` if preferred)
4. Run `npm install` to install node modules. This takes a few minutes.

## Local development

Run `npm run watch:jekyll` to serve the site locally and watch for file
changes. In parallel, run `npm run watch:webpack` to watch for style and js changes.

If needed, run `npm install` to install any modules that were added since you
last served the site.

## Build for production

Run `npm run build` to build the site ready for production.