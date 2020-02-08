const paths = require('../_assets/gulp_config/paths');

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      postcss = require('gulp-postcss'),
      uncss = require('postcss-uncss'),
      cssnano = require('cssnano'),
      del = require('del'),
      run = require('gulp-run'),
      gutil = require('gulp-util'),
      autoprefixer = require('autoprefixer'),
      browserSync = require('browser-sync').create();

module.exports = {
  /**
   * Compiles and places a CSS file.
   *
   * @param scssRoot
   *   The SCSS root file, e.g. 'styles.scss'.
   * @param destinations
   *   An array of destinations where the resulting CSS file should be placed.
   */
  buildStyles: (scssRoot, destinations, forceReload = false) => {
    let stream = gulp
      .src(paths.sassFiles + scssRoot)
      .pipe(sourcemaps.init())
      .pipe(sass({
        style: 'compressed',
        trace: true,
        loadPath: [paths.sassFiles]
      }))
      .pipe(sourcemaps.write())
      .pipe(postcss([
        autoprefixer({
          overrideBrowserslist: ['last 2 versions']
        }),
        cssnano()
      ]));

    // Pipe file to all destinations.
    for (let i = 0; i < destinations.length; i++) {
      stream = stream.pipe(gulp.dest(destinations[i]));
    }

    return stream
      .pipe(browserSync.stream())
      .on('error', gutil.log);
  },

  /**
   * Deletes the specified items.
   *
   * @param items
   *   An array of items to be deleted.
   */
  clean: (items) => {
    return del(items);
  },

  /**
   * Reloads browsersync session.
   */
  reload: (callback = null) => {
    browserSync.reload();
    callback();
  },

  /**
   * Runs a command.
   *
   * @param command
   *   The command to run.
   */
  runCommand: (command) => {
    return gulp.src('.')
      .pipe(run(command))
      .on('error', gutil.log);
  },

  /**
   * Removed unused css from produced CSS files.
   *
   * @param destination
   *   The folder where the css files are located.
   */
  cleanUnusedCss: (destination) => {
    return gulp
      .src(destination)
      .pipe(postcss([
        uncss({
          html: [paths.siteHtmlFilesGlob],
          ignore: ['.ignore-me', '.hidden']
        }),
      ]))
      .pipe(gulp.dest(destination))
      .pipe(browserSync.stream())
      .on('error', gutil.log);
  }
};
