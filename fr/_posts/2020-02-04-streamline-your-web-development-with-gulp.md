---
title: Automatisez Votre Développement Web Avec Gulp
tags: [gulp, workflow, development]
lang: fr
ref: gulp-tutorial
categories: [fr]
---
[Gulp][1] est un outil permettant d'automatiser les tâches de développement répétitives comme compiler le code source, minimiser le code produit, générer un projet, etc ...

[1]: https://gulpjs.com/ "Site officiel de Gulp"

## Pourquoi Gulp?

Il y a quelques années, j'ai travaillé sur un projet construit avec Grunt et, au départ, je pensais pouvoir m'en resservir. Malheureusement, je n'ai pas réussi à trouver un moyen de le faire fonctionner pour moi. Je pense que je n'ai pas réussi à trouver un tutoriel suffisamment clair sur comment installer et configurer Grunt. Je savais également gue Gulp pourrait m'aider à réaliser le même objectif donc j'ai essayé de voir si je pouvais trouver bon tutoriel. Le premier résultat de ma recherche Google était [un tutoriel sur CSS-Trick][2], et c'était juste ce dont j'avais besoin. Je me suis aussi servi de [cet autre tutoriel sur GitConnected][3], mais il n'est pas très explicite. C'est pourquoi j'ai décidé d'écrire cet article.

[2]: https://css-tricks.com/gulp-for-beginners/ "Article de CSS-Trick pour débuter avec Gulp"
[3]: https://levelup.gitconnected.com/how-to-setup-your-workflow-using-gulp-v4-0-0-5450e3d7c512 "Article de GitConnected sur configurer un processus de travail avec Gulp"

## Le processus

### Étape 1: Installer Gulp et les dépendences

La première étape est bien sur d'installer Gulp via npm à la ligne de commande. Si node et npm ne sont pas installés sur votre ordinateur, vous pouvez les télécharger [ici][4].

```txt
  npm install -g gulp
```

Pour les utilisateurs de Mac, n'oubliez pas d'éxécuter cette commande avec sudo car un utilisateur ordinaire n'aura pas les permissions requises pour une installation globale. Vous pouvez aussi l'installer localement, uniquement pour votre session utilisateur en ommettant simplement le paramètre `-g`.

[4]: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm "Documentation de NPM sur comment installer npm"

### Étape 2: Initialiser le projet

Une fois Gulp installé, nous sommes prêts à commencer. Nous pouvons maintenant créer un répertoire pour notre projet et naviguer dedans à la ligne de commande. Une fois dedans, nous pouvons initialiser npm, ce qui va nous crér un fichier package.json pour représenter les configurations de notre répertoire.

Remarque : désormais, il n'est plus nécessaire pour les utilisateurs de Mac de lancer les commandes en mode sudo, les étapes suivantes ne sont pertinentes que pour notre projet.

```txt
  npm init
```

Durant le processus d'initialisation, npm vous posera plusieurs questions dans le but d'établir le fichier package.json. Vous pouvez toujours éditer ce fichier manuellement plus tard.

Vous pouvez aussi exécuter `npm init` avec l'option `-y` et ces questions seront ignorées, utilisant ainsi les configurations par défaut.

Le fichier package.json devrait ressembler à cela:

```json
  {
    "name": "[Le nom de votre projet]",
    "version": "1.0.0",
    "description": "[La description de votre projet]",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "[Votre nom]",
    "license": "ISC",
  }
```

### Étape 3: Installer Gulp dans le projet

Une fois notre projet correctement initialisé, nous pouvons y installer Gulp, ce qui nous permettra d'automatiser les tâches les plus répétitives. À cette étape, nous allons installer Gulp ainsi que les autres plugins dont nous allons avoir besoin pour notre projet.

```txt
  npm install --save-dev gulp gulp-sass gulp-sourcemaps browser-sync gulp-useref gulp-postcss uncss postcss-uncss cssnano gulp-uglify del
```

Remarque : si vous développez votre projet avec less plutôt que sass, vous aurez besoin d'installer [`gulp-less`][5] au lieu de [`gulp-sass`][6]. Si c'est votre cas, remplacez simplement les références comme il conviendra tout au long de ce tutoriel.

L'option `--save-dev` informe npm que le package installé est requis pour le projet, mais uniquement pour le développement. Cela signifie que le package n'est pas requis lors du déploiement.

[5]: https://www.npmjs.com/package/gulp-less "Informations officielles sur le paquet gulp-less de NPM"
[6]: https://www.npmjs.com/package/gulp-sass "Informations officielles sur le paquet gulp-sass de NPM"

### Étape 4: Définir la structure du projet

Gulp est relativement flexible et s'adaptera à n'importe quelle structure de projet, cela ne signifie pas pour autant que nous devons laisser la structure être une proie à tous nos caprices. Il est toujours préférable de définir une structure à l'avance afin de savoir où placer quels fichiers.

Pour ce tutoriel, nous utiliserons la structure suivante, une organisation relativement courante pour une application web.

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

Le répertoire dist (abréviation de distribution) contiendra les fichiers optimisés pour le déploiement, alors que le répertoire src (abréviation de source) contiendra les fichiers de développement, plus lisibles, mais plus lourds. Vous aurez probablement remarqué le fichier gulpfile.js, ce fichier contiendra notre configuration pour Gulp. Il est possible de le compartimenter à volonté, mais il est absolument nécessaire et ne peut pas être nommé différemment.

### Étape 5: Développer les tâches de Gulp

Pour pouvoir utiliser Gulp, nous devons inclure le package dans notre gulpfile.js, sans cela, le compilateur ne sera pas capable de comprendre ce qu'est gulp.

Remarque : j'utilise [la notation ECMAScript 6][7] dans ce tutoriel car elle est plus structurée, mais la notation JavaScript standard fonctionnera tout aussi bien.

```javascript
  let gulp = require('gulp');
```

Cette déclaration indique à Node de chercher le package gulp dans node_modules, et de l'importer dans une variable afin de pouvoir l'utiliser dans le projet.

Nous pouvons écrire une tâche gulp de 2 façons:

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

La deuxième méthode a l'avantage de nous permettre de décider quelles tâches nous voulons exposer. Si nous voulons qu'une tâche reste interne au processus de Gulp, il suffit d'ommettre l'instruction `export`.

[7]: https://www.w3schools.com/js/js_es6.asp "Article de W3Schools sur ECMAScript 6"

#### Pré-traitement du CSS

Une des premières raisons d'utiliser Gulp (at autres outils simiolaires comme Grunt) est l'automatisation du pré-traitement des fichiers sass et less.

Une fois notre plugin installé, il nous suffit de l'importer dans le projet et de l'assigner à une variable avec l'instruction `require`.

Il nous suffit alors de l'insérer dans la tâche à l'aide de `.pipe()`.

Vous devriez avoir quelque chose comme cela dans votre gulpfile.js.

```javascript
  let sass = require('gulp-sass');

  let style = () => {
    return gulp.src('src/scss/main.scss')   // get scss source files ...
      .pipe(sass())                         // ... process them with gulp-sass plugin ...
      .pipe(gulp.dest('src/css'));          // ... and save the css result in the destination folder.
  };

  exports.style = style;
```

Pour s'assurer que cela fonctionne comme prévu, nous pouvons simplement insérer un fonction sass dans notre fichier main.scss, exécuter la commande `gulp style`, et nous pourrons voir apparaitre un fichier main.css, qui contiendra la (ou les) classe(s) définie(s) dans notre main.scss, dans notre dossier src/css.

#### Globbing

[Les globs][8] sont un concept très proche des expressions rationnelles, avec la particularité d'être conçus spécifiquement pour les chemins d'accès aux fichiers.

Il y a 4 principaux modèles à connaître :

1. `*.scss`: Le modèle `*` est un caractère de remplacement qui peut correspondre à n'importe quelle suite de caractères dans le répertoire courant. Dans ce cas, tous les fichiers terminant par `.scss` correspondront.
2. `**/*.scss`: Le modèle `**/*` est un caractère de remplacement plus puissant que `*` qui peut correspondre à n'importe quelle suite de caractère dans le répertoire courant et ses descendants.
3. `!not-me.scss`: Le modèle `!` indique l'exclusion du modèle suivant. Il permet d'exclure des résultats qui auraient autrement inclus par un modèle de caractère de remplacement. Dans ce cas, le fichier `not-me.scss` sera exclus du résultat.
4. `*.+(sass|scss)`: Le modèle `+()` correspond à plusieurs modèles. Ils doivent être séparés par un caractère pipe `|`. Dans ce cas, tous les fichiers terminant par `.scss` ou `.sass` correspondront.

Avec ces nouvelles connaissances, nous pouvons remplacer `'src/scss/main.scss'` par `'src/scss/**/*.scss'`
pour traiter tous les fichiers scss contenus dans notre dossier scss et ses descendants.

Remarque : si vous utilisez un glob plus générique comme `'src/**/*.scss'`, Gulp génèrera les fichiers appropriés, mais les imbriquera plus loin dans votre dossier css, vous donnant un résultat comme celui-ci :

```txt
  |- src
      |- scss
          |- main.scss
      |- css
          |- scss
              |- main.css
```

Avant d'aller plus loin, il serait judicieux de sauvegarder les chemins que nous désirons pour notre application dans une constante, afin de pouvoir s'y référer plus tard.

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

Pouvoir compiler nos fichiers scss à l'aide d'une simple commande comme `gulp style`, c'est bien, mais ce serait encore mieux de pouvoir le faire à chaque fois qu'un fichier change. Heureusement, Gulp peut gérer l'automatisation à l'aide d'un processus appelé `watch`.

[8]: https://gulpjs.com/docs/en/getting-started/explaining-globs "Documentation de Gulp sur les globs"

#### Surveillance

La méthode [`watch`][9] incluse dans Gulp lui permet d'observer l'ensemble des fichiers spécifiés, et d'automatiquement exécuter une action à chaque fois que l'un de ces ficiers change. Cela va nous permettre de compiler automatiquement nos fichiers scss quand ils changeront, sans avoir à retaper la commande `gulp style` a chaque fois.

La méthode `watch` s'utilise de la manière suivante :

```javascript
  gulp.watch(globs, [options], [task]);
```

Il convient de noter que les options et la tâche sont toutes deux des paramètres optionnels, bien qu'il ne serait pas logique de regarder des fichiers sans vouloir déclencher une tâche lorsque quelque chose change.

Dans notre cas, la fonction de surveillance ressemblera à cela :

```javascript
  gulp.watch(['src/**/*.scss'], sass);
```

Nous voulons l'envelopper dans une fonction d'observateur que nous appellerons en ligne de commande. Nous continueront de développer cette fonction dans ce tutoriel.

```javascript
  let watch = () => {
    gulp.watch(PATHS.STYLE.SRC).on('change', style);
  }
```

Ceci étant fait, Gulp va maintenant recompiler notre css à chaque fois qu'un fichier `.scss` change.

[9]: https://www.npmjs.com/package/gulp-watch "Informations officielles du paquet Gulp-Watch de NPM"

#### Traquer les changements

Cela peut ne pas sembler être le cas à ce stade, mais lorsque votre projet commence à prendre de la longueur, il devient plus difficile de savoir où un style spécifique est appliqué. Heureusement, nous pouvons utiliser [gulp-sourcemaps][10] pour remédier à ce problème.

Ce plugin mettra en correspondance tous vos changements dans un fichier `.map` que l'inspecteur du navigateur pourra ensuite utiliser pour vous dire où un style spécifique a été appliqué.

Il suffit de l'inclure dans notre projet et de l'injecter dans notre fonction de style.

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

C'est bien beau tout ça, mais si on essayait de rafraîchir notre navigateur aussi, afin de pouvoir s'assurer que tout fonctionne correctement sans avoir a rafraîchir manuellement? Nous pouvons le faire grâce au plugin Browser Sync.

[10]: https://www.npmjs.com/package/gulp-sourcemaps "Informations officielles du paquet gulp-sourcemaps de NPM"

#### Rafraîchissement automatique du navigateur

[Browser Sync][11] nous permet de faire tourner un serveur local sur notre projet, ce qui nous permet de rafraîchir en direct la page de notre navigateur.

La syntaxe pour inclure Browser Sync dans notre projet est légèrement différente :

```javascript
  let browserSync = require('browser-sync').create();
```

Une fois que Browser Sync est inclus dans notre projet, nous pouvons l'initialiser au début de notre fonction `watch()`

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

L'option baseDir indique à BrowserSync le répertoire à surveiller, assurez-vous que tous les fichiers produits sont contenus dans ce répertoire ou Browser Sync ne pourra pas les détecter.

Remarque : si vous utilisez déjà un serveur local via apache par exemple, vous pouvez régler l'option proxy pour que Browser Sync sache quelle adresse recharger automatiquement.

Écrivons maintenant une fonction pour rafraîchir la page du navigateur. Nous n'exposerons pas cette fonction puisqu'elle sera uniquement interne au processus de Gulp.

```javascript
  let reload = () => {
    browserSync.reload();
  }
```

Nous allons également ajouter la fonction `browserSync.stream()` à notre fonction de style afin que, plutôt que de rafraîchir la page, le nouveau css soit injecté dans la session en cours.

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

En appelant la fonction `reload()` à la fin de notre fonction de surveillance, nous nous assurons qu'après le traitement de nos modifications, la page du navigateur sera rechargée.

```javascript
  gulp.watch([PATHS.HTML.SRC, PATHS.JS.SRC]).on('change', reload);
```

À ce stade, votre gulpfile.js devrait ressembler à ceci :


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

Remarque : Je n'exporte plus la fonction `style()` puisque la fonction `watch()` s'en occupe toute seule.

De là, nous avons un répertoire de développement fonctionnel qui nous permettra de travailler sans avoir à nous soucier de la mise à jour constante de nos fichiers et de la fenêtre du navigateur. Mais qu'en est-il lorsque nous avons terminé, et que noussommes prêts à déployer notre application ?

[11]: https://www.browsersync.io/ "Site officiel de Browser Sync"
  
### Étape 6: Déploiement du CSS pour production

À ce stade, notre dossier src peut contenir un grand nombre de fichiers css et js différents, dispersés dans plusieurs branches de l'arbre. En outre, ces fichiers peuvent être assez volumineux pour des projets complexes.

#### Concaténer les fichiers de sortie en un

Pour commencer, nous voulons réduire le nombre d'appels au serveur. Pour cela, nous allons concaténer nos fichiers en quelques uns avec le plugin [useref][12].

Pour pouvoir fonctionner, useref lit des commentaires html spécifiques pour savoir quels fichiers il doit concaténer, dans quel ordre, et dans quel fichier de sortie.

```html
  <!-- build:[type] [destination file] -->
  <link|script>   <!-- first file to concatenate -->
  <link|script>   <!-- second file to concatenate -->
  <!-- endbuild -->
```

Le terme `[type]` indique à useref le type de fichier dont il s'agit. Il peut s'agir de `css`, `js`, ou `remove`. Le terme `remove` indique à useref que le bloc peut être ignoré.

Maintenant, écrivons une tâche `deploy()` pour useref.

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

Nous devons également ajouter les commentaires nécessaires dans notre fichier index.html.

```html
  <!-- build:css css/main.min.css -->
  <link rel="stylesheet" href="css/main.css">
  <!-- endbuild -->
```

Nous pouvons maintenant exécuter la commande suivante dans la ligne de commande pour concaténer nos fichiers.

```txt
  gulp deploy
```

Nous pouvons maintenant voir que notre dossier dist est une réplique de notre dossier src, sauf que notre dossier css contient maintenant un fichier `main.min.css` au lieu de `main.css` et le fichier index.html contient maintenant ce qui suit au lieu des 3 lignes que nous avions auparavant.

```html
  <link rel="stylesheet" href="css/main.min.css">
```

Notre dossier `src/css` contient du css agréable et lisible par l'homme, mais ce n'est pas ce que nous voulons mettre en production, un tel code est bon pour le développement mais nous avons besoin de quelque chose qui se charge plus rapidement et qui soit compatible avec tous les navigateurs pour notre environnement de production, c'est là que le postcss entre en jeu.

[12]: https://www.npmjs.com/package/gulp-useref "Informations officielles du paquet gul-useref de NPM"

#### Optimiser le CSS avec PostCSS

Le plugin [postcss][13] nous permet de traiter davantage nos fichiers css compilés en :

- supprimant les styles inutilisés avec uncss,
- minifiant le css produit avec cssnano,
- etc ...

Insérons postcss dans notre fonction de déploiement. Pour ce faire, nous devons également utiliser le plugin [`gulp-if`][14] pour nous assurer que seuls les fichiers css seront exécutés par postcss.

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

Vous pouvez voir que nous passons un ensemble de paramètres à postcss, c'est là que nous appellerons les différents sous-plugins que nous allons utiliser dans postcss.

[13]: https://github.com/postcss/gulp-postcss "Projet github officiel de gulp-postcss"
[14]: https://www.npmjs.com/package/gulp-if "Informations officielles du paquet gulp-if de NPM"

#### Éliminer le CSS non utilisé

Nous allons utiliser [uncss][15] pour supprimer toute classe css qui n'est pas utilisée dans le cadre de notre projet.

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

Vous pouvez voir que nous avons passé un objet comme paramètre à uncss :

- Le paramètre html est la liste des fichiers html à examiner pour trouver les classes inutilisées. Heureusement, nous pouvons utiliser des globs ici.
- Le paramètre ignore est une liste de noms de classes que nous voulons conserver, même si elles ne sont pas utilisées. Il est utile pour les classes que nous ne pouvons indiquer qu'avec du JavaScript, par exemple.

[15]: https://www.npmjs.com/package/postcss-uncss "Informations officielles du paquet postcss-uncss de NPM"

#### Minifier le CSS produit

Maintenant que tout css inutilisé a été supprimé, nous devons réduire le css produit, pour diminuer le temps de chargement de la page. Pour cela, nous utilisons [cssnano][17].

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

[17]: https://cssnano.co/ "Site officiel de CSSnano"

Remarque : si tous vos fichiers html ne se trouvent pas dans le même dossier, useref risque de ne pas réussir à concaténer correctement vos fichiers css et js. En outre, uncss provoquera des erreurs et ne parviendra pas à accomplir sa tâche. Si votre projet nécessite une structure plus complexe, vous devrez peut-être trouver une autre solution pour remédier à ce problème.

### Étape 7: Minifier JavaScript

Maintenant que nous sommes en mesure de produire un css propre et minifié, nous devons faire de même avec JavaScript. Heureusement, le processus est beaucoup plus simple dans ce cas, nous avons juste une étape de minification. Nous allons l'implémenter dans la fonction de déploiement avec [uglify][18].

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

Maintenant que nous avons pu générer tous les fichiers que nous voulions, nous devons nous assurer que nous ne les conservons pas une fois que nous n'en avons plus besoin. Ce processus s'appelle le nettoyage.

[18]: https://www.npmjs.com/package/gulp-uglify "Informations officielles sur le paquet gulp-uglify de NPM"

### Étape 8: S'assurer de ne pas garder de fichier indésirable

L'étape du nettoyage est la plus importante de notre flux de travail. En effet, elle permet de garantir l'intégrité de notre programme. Paradoxalement, même si c'est la dernière étape que je présente, c'est en fait la première étape du flux de travail.

Nous devons nous assurer, avant de générer quoi que ce soit, que le répertoire de destination est vide, de cette façon, nous pouvons être sûrs que la sortie que nous obtiendrons sera le résultat de notre travail et non un résidu de travaux antérieurs qui peuvent ou non avoir été réalisés par d'autres.

Pour automatiser cette étape, nous allons utiliser le plugin [del][19].

```javascript
  let del = require('del');
  let clean = () => {
    return del([PATHS.HTML.DEST, PATHS.STYLE.DEST, PATHS.JS.DEST], {allowEmpty: true});
  }
```

Insérons maintenant les fonctions de déploiement et de nettoyage dans le flux de travail. Pour cela, nous allons déplacer la fonction Browser Sync init dans sa propre fonction.

[19]: https://www.npmjs.com/package/del "Informations officielles sur le paquet del de NPM"

En fin de compte, votre gulpfile.js devrait maintenant ressembler à cela :

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

## Conclusion

Avec ce tutoriel, nous avons franchi quelques étapes simples pour mettre en place un workflow Gulp qui nous permet de développer nos projets web sans avoir à constamment recharger notre navigateur web et à compiler nos fichiers sass (ou less). Nous avons également créé une tâche build pour produire des fichiers prêts pour la production. Bien que cela puisse sembler beaucoup, c'est en fait minime comparé à tout ce que Gulp est capable de faire pour nous.

J'espère que vous vous sentez maintenant plus à l'aise avec Gulp et que vous êtes prêt à explorer par vous-même les innombrables possibilités qu'offre Gulp grâce à ses nombreux plugins disponibles.

Si vous pensez que j'ai fait une erreur, veuillez me le faire savoir dans les commentaires ci-dessous ou [me contacter][20], afin que je puisse m'assurer de régler ces problèmes.

[20]: /contact/ "contact me"
