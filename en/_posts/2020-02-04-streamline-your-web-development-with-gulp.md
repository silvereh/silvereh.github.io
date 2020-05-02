---
title: Streamline Your Web Development With Gulp
tags: [gulp, workflow, development]
lang: en
ref: gulp-tutorial
categories: [en]
---
[Gulp][1] is a tool that allows the automation of tedious development tasks like compiling source code, minifying output code, build a project, etc ...

[1]: https://gulpjs.com/ "Gulp official website"

## Why Gulp?

In the past, I worked on a project built with Grunt and at first, I thought about using it again. Unfortunately, I couldn’t find a way to get it to work. I think I couldn’t find a tutorial clear enough on how to install and setup Grunt. I knew beforehand that Gulp could help me accomplish the same goal and so I went ahead to find a good tutorial. The first result in my Google search was [a tutorial from CSS-Trick][2], and it was just what I needed. I also used as a reference [this other tutorial on GitConnected][3], but it's not very explicit. That's why I decided to write this article.

[2]: https://css-tricks.com/gulp-for-beginners/ "CSS-Trick article on getting started with Gulp"
[3]: https://levelup.gitconnected.com/how-to-setup-your-workflow-using-gulp-v4-0-0-5450e3d7c512 "GitConnected article on setting up a workflow with Gulp"

## The process

### Step 1: Install Gulp and the dependencies

The first step is of course to install Gulp via npm in the command line. If you don't have node and npm installed on your machine, you can download them [here][4].

```txt
  npm install -g gulp
```

For Mac users, don’t forget to run it with sudo as a regular user will not have permission to install something globally. Alternatively, you can install it only on the current user session by omitting the `-g` parameter.

[4]: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm "NPM documentation on installing npm"

### Step2: Initialize the project

Once Gulp is installed, we are ready to get started. We can now create a project directory and navigate into it on the command line. Once inside our project directory, we can initialize npm, which will create a package.json file to represent our directory's settings.

Note: from this point and forward, it is not necessary anymore for Mac users to run in sudo mode since all the steps are now only relevant for the defined project.

```txt
  npm init
```

During the initialization process, npm will ask you several questions meant to establish the package.json file. You can always edit those options later by updating the package.json file.

Alternatively, you can run `npm init` with the `-y` flag and those questions will be skipped.

The package.json file will look something like this:

```json
  {
    "name": "[Your project name]",
    "version": "1.0.0",
    "description": "[Your project description]",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "[Your name]",
    "license": "ISC",
    "devDependencies": {
      "gulp": "^4.0.2"
    }
  }
```

### Step 3: Install Gulp in the project

Once our project correctly initialized, we can install Gulp into it, which will allow us to have Gulp automate the most tedious development tasks. In this step, we will install Gulp, along with all the plugins we will need for our project:

```txt
  npm install --save-dev gulp gulp-sass gulp-sourcemaps browser-sync gulp-useref gulp-postcss uncss postcss-uncss cssnano gulp-uglify del
```

Note: If you develop your project with less instead of sass, you will want tu install [`gulp-less`][5] instead of [`gulp-sass`][6]. If that's your case, simply replace the calls appropriately in your project as you follow along this tutorial.

The flag `--save-dev` informs npm that the package installed (in this case gulp) is required for the project, but only for development purpose. This means that this dependency will not be required in production.

[5]: https://www.npmjs.com/package/gulp-less "NPM official gulp-less package information"
[6]: https://www.npmjs.com/package/gulp-sass "NPM official gulp-sass package information"

### Step 4: Define the project structure

Gulp is very flexible and will adapt to any project structure, that doesn't mean we should let it be a prey to all of our whims. It's always better to define upfront what our project structure will be, so that we know where everything will go.

For this project, We will use the following structure, which is a very standard way of structuring a web application.

```txt
  |- dist/
  |- gulpfile.js
  |- node_modules/
  |- package.json
  |- src/
      |- assets/
      |- css/
      |- index.html
      |- js/
      |- scss/
```

We will use the dist folder (shorthand for distribution) to host production optimized files, while the src (shorthand for source) folder will contain our development code, more readable, but heavier. You probably noticed the gulpfile.js in our tree, this file will contain our configuration for Gulp. It is possible to compartmentalize it at will, but it is absolutely necessary and cannot be named differently.

### Step5: Writing gulp tasks

To be able to use Gulp, we need to require it in the gulpfile.js, otherwise, the compiler wouldn't be able to understand what gulp is.

Note: I use the [ECMAScript 6 notation][7] in this tutorial as it gives more structure and is more restricted, but standard JavaScript notation will work just the same.

```javascript
  let gulp = require('gulp');
```

This statement tells Node to look for the gulp package in node_modules, and import it into a variable so it can be used in the project.

There are 2 ways to write a gulp task:

1. 
```javascript
  gulp.task('task-name', () => {
    return gulp.src('path/to/src')              // get source files ...
      .pipe(gulpPlugin())                       // ... process them with divers plugins ...
      .pipe(gulp.dest('path/to/destination'));  // ... and save them in the destination folder.
  });
```
2.  
```javascript
  let taskName = () => {
    return gulp.src('path/to/src')              // get source files ...
      .pipe(gulpPlugin())                       // ... process them with divers plugins ...
      .pipe(gulp.dest('path/to/destination'));  // ... and save them in the destination folder.
  }
  exports.taskName = taskName;
```

The second method has the advantage of allowing you to decide which tasks you want to expose. If you want a task to stay internal to the Gulp process, just omit the `export` statement.

[7]: https://www.w3schools.com/js/js_es6.asp "w3schools article on ECMAScript 6"

#### Preprocessing

One of the first reasons to use Gulp (and other similar tools such as Grunt) is that they allow the automation of sass and less preprocessing.

Once a plugin has been installed, it needs to be made available in the project by assigning it to a variable with a `require` statement.

The next step is simply to pipe the plugin into our gulp task and it will then be executed each time the task is executed.

You should have something that looks like this in your gulpfile.js.

```javascript
  let sass = require('gulp-sass');

  let style = () => {
    return gulp.src('src/scss/main.scss')   // get scss source files ...
      .pipe(sass())                         // ... process them with gulp-sass plugin ...
      .pipe(gulp.dest('src/css'));          // ... and save the css result in the destination folder.
  };

  exports.style = style;
```

To make sure this works as expected, simply put a sass function into main.scss, run the `gulp style` command on the command line, and you will see that your src/css folder has been populated with a main.css file containing the class definition generated in main.scss.

#### Globbing

[Globs][8] are very similar to regular expressions, with the particularity that it's designed specifically for file paths.

There are 4 main patterns to be aware of:

1. `*.scss`: The `*` pattern is a wildcard that matches any suite of characters in the current directory. In this case, all files with a name ending in `.scss` will be matched.
2. `**/*.scss`: The `**/*` pattern is a more powerful wildcard than `*` that matches any suite of characters in the current directory and its children.
3. `!not-me.scss`: The `!` pattern indicates the exclusion of the following pattern, it allows to exclude results that would otherwise be included in a wildcard pattern. In this case, `not-me.scss` will be excluded from the result set.
4. `*.+(sass|scss)`: The `+()` pattern allows gulp to match multiple patterns. They need to be separated by a pipe `|` character. In this case, all files ending with `.scss` and `.sass` will be matched.

With this new knowledge, we can replace `'src/scss/main.scss'` with `'src/scss/**/*.scss'` to process all scss files contained within our scss folder and its children.


Note: If you use a more generic glob like `'src/**/*.scss'`, gulp will generate the appropriate files, but will nest them further into your css folder, ending with a result like that:

```txt
  |- src
      |- scss
          |- main.scss
      |- css
          |- scss
              |- main.css
```

Before going any further, let's save our desired paths into a constant, so we don't have to type them over and over as we progress.

```javascript
  const PATHS = {
    HTML: {
      SRC: './src/**/*.html',
      DEST: './dist'
    },
    JS: {
      SRC: './src/js/**/*.js',
      DEST: './dist/js'
    },
    STYLE: {
      SRC: './src/scss/**/*.scss',
      BUILD: './src/css/**/*.css',
      DEST: './src/css'
    }
  }
```

It's good to be able to compile our scss files with a simple command like `gulp style`, but if we have to manually run it everytime, there is no point in creating all this in the first place. Fortunately, Gulp can handle automation through a process called watching.

[8]: https://gulpjs.com/docs/en/getting-started/explaining-globs "Gulp documentation on globs"

#### Watching

The [`watch`][9] method provided by Gulp allows it to observe the specified set of files and automatically do an action when one of them changes. This will allow us to automatically compile our scss files when they change, without having to type the `gulp style` command every time.

The watch method is used with the following syntax:

```javascript
  gulp.watch(globs, [options], [task]);
```

It's worth noting that options and task are both optional parameters, though it wouldn't make sense to watch files without wanting to trigger a task when something changes.

In our case, the watch function will look like that:

```javascript
  gulp.watch(['src/**/*.scss'], sass);
```

We want to wrap it within a watcher function that we will call on the command line. We will build upon this wrapper function in this tutorial.

```javascript
  let watch = () => {
    gulp.watch(PATHS.STYLE.SRC).on('change', style);
  }
```

With that done, Gulp will now recompile our css each time a `.scss` file changes.

[9]: https://www.npmjs.com/package/gulp-watch "NPM official gulp-watch package information"

#### Keep track of changes

It may not seem like it at this point, but when your project starts to get long, it becomes more difficult to keep track of where a specific style is applied. Fortunately, we can use [gulp-sourcemaps][10] to remedy to this problem.

This plugin will map all your changes into a `.map` file that the browser inspector can then use to tell you where some specific style was applied.

We just need to include it in our project and inject it in our `style()` function.

```javascript
  let sourcemaps = require('gulp-sourcemaps');
  let style = () => {
    return gulp
      .src(PATHS.STYLE.SRC)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(PATHS.STYLE.DEST));
  }
```

All of that is good, but what about we try to automatically reload our browser window, so we can keep making sure that everything works as expected, without having to manually reload our browser window? This can be done thanks to the plugin Browser Sync.

[10]: https://www.npmjs.com/package/gulp-sourcemaps "NPM official gulp-sourcemaps package information"

#### Automatic browser reloading

[Browser Sync][11] allows us tu run a local server on our project, allowing us the live-reloading of our browser page.

The syntax for including Browser Sync in our project is slightly different:

```javascript
  let browserSync = require('browser-sync').create();
```

Once Browser Sync is included in our project, we can initialize it at the beginning of our `watch()` function.

```javascript
  browserSync.init({
    // You can tell browserSync to use this directory and serve it as a mini-server
    server: {
      baseDir: './src'
    }
    // If you are already serving your website locally using something like apache
    // You can use the proxy setting to proxy that instead
    proxy: 'yourlocal.dev'
  });
```

The option baseDir tells Browser Sync which directory to watch, make sure that all produced files are contained within this directory or Browser Sync won't be able to pick them up.

Note: if you're already running a local server via apache for example, you can set the proxy option to let Browser Sync know which address to automatically reload.

Now let's write a function to reload the browser page. We will not expose this function since it will only be internal to the Gulp process.

```javascript
  let reload = () => {
    browserSync.reload();
  }
```

We will also add the `browserSync.stream()` pipe to our style function so that, rather than reloading the page, the new css is injected into the current session.

```javascript
  let style = () => {
    return gulp
      .src(PATHS.STYLE.SRC)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(PATHS.STYLE.DEST))
      .pipe(browserSync.stream());
  }
```

By calling the reload function at the end of our `watch()` function, we ensure that after our changes have been processed, the browser page will be reloaded.

```javascript
  gulp.watch([PATHS.HTML.SRC, PATHS.JS.SRC]).on('change', reload);
```

At this point, your gulpfile.js should look like this:

```javascript
  let gulp = require('gulp'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      browserSync = require('browser-sync').create();

  const PATHS = {
    HTML: {
      SRC: './src/**/*.html',
      DEST: './dist'
    },
    JS: {
      SRC: './src/js/**/*.js',
      DEST: './dist/js'
    },
    STYLE: {
      SRC: './src/scss/**/*.scss',
      BUILD: './src/css/**/*.css',
      DEST: './src/css'
    },
  }

  let style = () => {
    return gulp
      .src(PATHS.STYLE.SRC)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(PATHS.STYLE.DEST))
      .pipe(browserSync.stream());
  }

  let reload = () => {
    browserSync.reload();
  }

  let watch = () => {
    browserSync.init({
      server: {
        baseDir: './src'
      }
    });
    gulp.watch(PATHS.STYLE.SRC).on('change', style);
    gulp.watch(PATHS.HTML.SRC).on('change', reload);
  }

  exports.watch = watch;
```

Note: I am not exporting the `style()` function anymore since the `watch()` function takes care of it all by itself.

From there, we have a working development directory that will allow us to work without having to worry about updating our files and browser window constantly. But what about when we are done, and we need to release some code?

[11]: https://www.browsersync.io/ "Browser Sync official website"
  
### Step 6: Releasing CSS for production

At this point, our src folder might contain a lot of different css and js files dispersed in several tree branches. In addition, those files can be fairly big for complex projects.

#### Concatenate output files into one

For starters, we want to reduce the number of server calls. For that, we will concatenate our files into a few with the plugin [useref][12].

To be able to work, useref reads specific html comments to know what files it needs to concatenate, in which order, and into which output file.

```html
  <!-- build:[type] [destination file] -->
  <link|script>   <!-- first file to concatenate -->
  <link|script>   <!-- second file to concatenate -->
  <!-- endbuild -->
```

`[type]` indicates to useref what type of file it is. It can be `css`, `js`, or `remove`. `remove` indicates to useref that the block should be skipped.

Now let's write a `deploy` task for useref.

```javascript
  let useref = require('gulp-useref');

  let deploy = () => {
    return gulp
      .src(PATHS.HTML.SRC)
      .pipe(useref())
      .pipe(gulp.dest(PATHS.HTML.DEST));
  }

  exports.deploy = deploy;
```

We also need to add the necessary comments in our index.html file.

```html
  <!-- build:css css/main.min.css -->
  <link rel="stylesheet" href="css/main.css">
  <!-- endbuild -->
```

We can now run the following in the command line to concatenate our files.

```txt
  gulp deploy
```

We can now see that our dist folder is a replica of our src folder, except that our css folder now contains a `main.min.css` file instead of `main.css` and the index.html file now contains the following instead of the 3 lines we had before.

```html
  <link rel="stylesheet" href="css/main.min.css">
```

Our `src/css` folder contains some nice, human-readable css, but that's not what we want to release into production, such code is good for development but we need something that will load faster and be cross browser compatible for our production environment, that's where postcss comes into play.

[12]: https://www.npmjs.com/package/gulp-useref "NPM official gul-useref package information"

#### Optimizing CSS with PostCSS

The [postcss][13] plugin allows us to process further our compiled css files by:

- removing unused styles with uncss,
- minifying the output css with cssnano,
- etc ...

Let's pipe postcss into our deploy function. To do so, we also need to use the plugin [`gulp-if`][14] to ensure that only css files will be run through postcss.

```javascript
  let postcss = require('gulp-postcss');
  let gulpif = require('gulp-if')
  let deploy = () => {
    return gulp
      .src(PATHS.HTML.SRC, {allowEmpty: true})
      .pipe(useref())
      .pipe(gulpif('**/*.css', postcss([ ])))
      .pipe(gulp.dest(PATHS.HTML.DEST));
  }
```

You can see we are passing an array of parameters to postcss, this is where we will call the different sub-plugins that we are going to use in postcss.

[13]: https://github.com/postcss/gulp-postcss "Official gulp-postcss github project"
[14]: https://www.npmjs.com/package/gulp-if "NPM official gulp-if package information"

#### Removing unused css

We are going to use [uncss][15] to remove any css class that is not used within our project.

```javascript
  let uncss = require('postcss-uncss');
  let deploy = () => {
    return gulp
      .src(PATHS.HTML.SRC)
      .pipe(useref())
      .pipe(gulpif('./**/*.css', postcss([
        uncss({
          html: PATHS.HTML.SRC,
          ignore: ['.ignore-me', '.hidden']
        })
      ])))
      .pipe(gulp.dest(PATHS.HTML.DEST));
  }
```

You can see we passed an object as parameter to uncss:

- The html parameter is the list of html files to look into to find unused classes. Fortunately we can use globs here.
- The ignore parameter is a list of class names that we want to conserve, even if they are not used. This is useful for classes that we might only set with JavaScript, for example.

[15]: https://www.npmjs.com/package/postcss-uncss "NPM official postcss-uncss package information"

#### Minifying CSS output

Now that any unused css has been removed, we need to minify the output, to reduce the page load. For that, we use [cssnano][17].

```javascript
  let cssnano = require('cssnano');
  let deploy = () => {
    return gulp
      .src(PATHS.HTML.SRC, {allowEmpty: true})
      .pipe(useref())
      .pipe(gulpif('**/*.css', postcss([
        uncss({
          html: PATHS.HTML.SRC,
          ignore: ['.ignore-me', '.hidden']
        }),
        cssnano()
      ])))
      .pipe(gulp.dest(PATHS.HTML.DEST));
  }
```

[17]: https://cssnano.co/ "CSSnano official website"

Note: If all your html files don't live in the same folder, useref might fail at concatenating your css and js files correctly. In addition, uncss will cause arrors and fail to accomplish its task. If your project requires a more complex structure, you might need to find a different solution to remedy to this problem.

### Step 7: Minifying JavaScript

Now that we are able to produce a clean, minified css, we need to do the same with JavaScript. Fortunately, the process is much simpler in this case, we just have a minification step. We will implement that in the `deploy()` function with [uglify][18].

```javascript
  let uglify = require('gulp-uglify');
  let deploy = () => {
    return gulp
      .src(PATHS.HTML.SRC, {allowEmpty: true})
      .pipe(useref())
      .pipe(gulpif('**/*.css', postcss([
        uncss({
          html: PATHS.HTML.SRC,
          ignore: ['.ignore-me', '.hidden']
        }),
        cssnano()
      ])))
      .pipe(gulpif(PATHS.JS.SRC, uglify()))
      .pipe(gulp.dest(PATHS.HTML.DEST));
  }
  let watch = () => {
    browserSync.init({
      server: {
      baseDir: './src'
    }
  });
  gulp.watch(PATHS.STYLE.SRC).on('change', style);
  gulp.watch([PATHS.JS.SRC, PATHS.HTML.SRC, PATHS.STYLE.BUILD], gulp.parallel(reload, deploy));
  }
```

Now that we have been able to generate all the files we wanted, we need to make sure that we are not conserving them once we don't need them anymore. This process is called cleaning.

[18]: https://www.npmjs.com/package/gulp-uglify "NPM official gulp-uglify package information"

### Step 8: Make sure to not keep unwanted generated files.

The cleaning step is the most important step of our workflow. Indeed, it will ensure the integrity of our build. Paradoxically, even though it is the last step I'm presenting, it actually is the first step of the workflow.

We need to make sure, before we generate anything, that the destination directory is empty, this way, we can be sure that the output we'll get will be the result of our work and not some residue of previous works that may or may not have been done by others.

To automate this step, we are going to use the plugin [del][19].

```javascript
  let del = require('del');
  let clean = () => {
    return del([PATHS.HTML.DEST, PATHS.STYLE.DEST, PATHS.JS.DEST], {allowEmpty: true});
  }
```

Let's now insert the deploy and clean functions into the workflow. For that we will move the Browser Sync init function into its own function.

[19]: https://www.npmjs.com/package/del "NPM official del package information"

In the end, your gulpfile.js should now look something like this:

```javascript
  let gulp = require('gulp'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      useref = require('gulp-useref'),
      gulpif = require('gulp-if'),
      postcss = require('gulp-postcss'),
      uncss = require('postcss-uncss'),
      cssnano = require('cssnano'),
      uglify = require('gulp-uglify'),
      del = require('del'),
      browserSync = require('browser-sync').create();

  const PATHS = {
    HTML: {
      SRC: './src/**/*.html',
      DEST: './dist'
    },
    JS: {
      SRC: './src/js/**/*.js',
      DEST: './dist/js'
    },
    STYLE: {
      SRC: './src/scss/**/*.scss',
      BUILD: './src/css/**/*.css',
      DEST: './src/css'
    },
  }

  let init = () => {
    browserSync.init({
      server: {
        baseDir: './src'
      }
    });
  }

  let reload = () => {
    browserSync.reload();
  }

  let clean = () => {
    return del([PATHS.HTML.DEST, PATHS.STYLE.DEST, PATHS.JS.DEST], {allowEmpty: true});
  }

  let style = () => {
    return gulp
      .src(PATHS.STYLE.SRC, {allowEmpty: true})
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(PATHS.STYLE.DEST))
      .pipe(browserSync.stream());
  }

  let deploy = () => {
    return gulp
      .src(PATHS.HTML.SRC, {allowEmpty: true})
      .pipe(useref())
      .pipe(gulpif('**/*.css', postcss([
        uncss({
          html: PATHS.HTML.SRC,
          ignore: ['.ignore-me', '.hidden']
        }),
        cssnano()
        ])))
      .pipe(gulpif(PATHS.JS.SRC, uglify()))
      .pipe(gulp.dest(PATHS.HTML.DEST));
  }

  let watch = () => {
    gulp.watch(PATHS.STYLE.SRC, style);
    gulp.watch([PATHS.JS.SRC, PATHS.HTML.SRC, PATHS.STYLE.BUILD], reload);
  }

  let dev = gulp.series(clean, gulp.parallel(init, style, watch));
  let build = gulp.series(clean, deploy);

  exports.dev = dev;
  exports.build = build;

  gulp.task('default', dev);
```

## Wrap it up

With this tutorial, we have gone through some simple steps to setup a Gulp workflow that allows us to develop our web projects without the hassle of constantly having to reload our web browser and compiling our sass (or less) files. We have also created a build task to produce production-ready files. Although it may seem like a lot, it actually is minimal compared to all that Gulp is able to do for us.

Hopefully, you now feel more comfortable with Gulp and are ready to explore on your own the countless possibilities that Gulp offers through its many available plugins.

If you feel like I made a mistake, please let me know in the comments below or [contact me][20], so I can make sure to address those issues.

[20]: /contact/ "contact me"
