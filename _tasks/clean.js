const utils = require('./utils');
const paths = require('../_assets/gulp_config/paths');

const gulp = require('gulp');

// Deletes the entire _site directory.
const removeSite = ['_site'];
const cleanJekyll = () => { return utils.clean(removeSite); };
gulp.task('clean:jekyll', gulp.parallel(cleanJekyll));

// Deletes all processed scripts.
const removeScripts = [paths.jekyllJsFiles, paths.siteJsFiles];
const cleanScripts = () => { return utils.clean(removeScripts); };
gulp.task('clean:scripts', gulp.parallel(cleanScripts));

// Deletes all processed site styles.
const removeStyles = [paths.jekyllCssFiles, paths.siteCssFiles, '_includes/critical.css'];
const cleanStyles = () => { return utils.clean(removeStyles); };
gulp.task('clean:styles', gulp.parallel(cleanStyles));

// Runs all the clean commands.
gulp.task('clean', gulp.parallel(
  cleanJekyll,
  cleanScripts,
  cleanStyles
));
