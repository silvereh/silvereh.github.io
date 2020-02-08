const paths = require('../_assets/gulp_config/paths');
const utils = require('./utils');

const gulp = require('gulp'),
  		sass = require('gulp-sass'),
  		sourcemaps = require('gulp-sourcemaps'),
  		postcss = require('gulp-postcss'),
  		uncss = require('postcss-uncss'),
      autoprefixer = require('autoprefixer'),
      gutil = require('gulp-util'),
  		cssnano = require('cssnano');

const mainStyleDests = [
  paths.jekyllCssFiles,
  paths.siteCssFiles,
];
const criticalStyleDests = ['_includes'];

const cleanUnusedCss = () => {
  return utils.cleanUnusedCss(paths.siteCssFiles);
}

const cleanUnusedCriticalCss = () => {
  return utils.cleanUnusedCss(criticalStyleDests);
}

const buildStylesMain = () => {
  return utils.buildStyles('/main.scss', mainStyleDests);
};
gulp.task('build:styles:main', gulp.series(buildStylesMain, cleanUnusedCss));

// Processes critical CSS, to be included in head.html.
const buildStylesCritical = () => {
  return utils.buildStyles('/critical*.scss', criticalStyleDests);
};
gulp.task('build:styles:critical', gulp.series(buildStylesCritical, cleanUnusedCriticalCss, utils.reload));

// Copies any other CSS files to the assets directory, to be used by pages/posts
// that specify custom CSS files.
const buildStylesOther = () => {
  return gulp
  	.src([paths.sassFiles + '/*.css'])
    .pipe(postcss([
      autoprefixer({
        overrideBrowserslist: ['last 2 versions']
      }),
      cssnano()
    ]))
    .pipe(gulp.dest(paths.jekyllCssFiles))
    .pipe(gulp.dest(paths.siteCssFiles))
    .on('error', gutil.log);
};
gulp.task('build:styles:css', gulp.series(buildStylesOther, cleanUnusedCss));

// Builds all site styles.
gulp.task('build:styles', gulp.series(
  gulp.parallel(
    buildStylesMain,
    buildStylesCritical,
    buildStylesOther
  ),
  utils.reload
));

gulp.task('clean:styles:unused', gulp.parallel(
  cleanUnusedCss,
  cleanUnusedCriticalCss
));