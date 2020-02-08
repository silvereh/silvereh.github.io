const paths = require('../_assets/gulp_config/paths');
const utils = require('./utils');

const concat = require('gulp-concat');
const gulp = require('gulp');
const gutil = require('gulp-util');
const run = require('gulp-run');
const uglify = require('gulp-uglify');

// Concatenates and uglifies global JS files and outputs result to the
// appropriate location.
// const jsDest = [paths.jekyllJsFiles];
const jsDest = [paths.includesBottom];
const buildScriptsGlobal = () => {
  return gulp
    .src([
      paths.jsFiles + '/lib' + paths.jsPattern,
      paths.jsFiles + '/*.js'
    ])
    .pipe(concat('main.js'))
    .pipe(uglify())

    // Only place in `assets` because Jekyll needs to process the file.
    .pipe(gulp.dest(jsDest))
    .on('error', gutil.log);
};
gulp.task('build:scripts', gulp.parallel(buildScriptsGlobal));
