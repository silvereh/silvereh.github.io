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
  buildStyles: function buildStyles(scssRoot, destinations) {
    let stream = gulp
      .src(paths.sassFiles + scssRoot)
      .pipe(sass({
        style: 'compressed',
        trace: true,
        loadPath: [paths.sassFiles]
      }))
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

    // stream
    //   .pipe(postcss([
    //     uncss({
    //       html: [paths.jekyllHtmlFilesGlob, paths.siteHtmlFilesGlob],
    //       ignore: ['.ignore-me', '.hidden']
    //     }),
    //   ]));

    // // Pipe file to all destinations.
    // for (let i = 0; i < destinations.length; i++) {
    //   stream = stream.pipe(gulp.dest(destinations[i]));
    // }

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
  clean: function clean(items) {
    return del(items);
  },

  /**
   * Reloads browsersync session.
   */
  reload: function reload(callback) {
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
};
