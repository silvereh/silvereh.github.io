---
title: 100 Jours de Code - Jour 1
tags: [100DaysOfCode, development]
lang: fr
ref: 100daysofcode-day1
categories: [fr]
---
Aujourd'hui, j'ai décidé de commencer le [challenge #100DaysOfCode][1]. Pour ceux d'entre vous qui ne sauraient pas de quoi il s'agit, le concept est simple. Le but est de développer de bonnes habitudes. Pour ce challenge, vous devez passer au moins une heure par jour a coder, pendant 100 jours d'affilée, et poster à ce sujet sur [twitter][2] pour vous tenir responsable.

[1]: https://www.100daysofcode.com/ "Site officiel du challenge 100 Jours De Code"
[2]: https://twitter.com/hashtag/100DaysOfCode?src=hashtag_click "Hashtag #100DaysOfCode sur Twitter"

Pour aujourd'hui, j'ai rechrché une meilleure façon de déveloper ce site web. Pour l'instant, je me sers de Jekyll et Gulp pour avoir un processus relativement simple. Mais il y a un problème dans mon processus, le rechargement automatique du navigateur ne se déclenche qu'une seule fois, et je dois ensuite redémarrer mon server de développement. Ce problème contrecarre vraiment l'objectif d'utiliser Jekyll et Gulp à l'origine et n'est donc pas une très bonne solution.

Mon ami Matthew m'a conseillé il y a quelques semaines d'utiliser [Webpack][3] pour cela donc j'ai décidé d'essayer.

[3]: https://webpack.js.org/ "Site officiel de Webpack"

D'après les quelques essais que j'ai faits jusqu'à présent, il semble que la fonction de rechargement en direct de Webpack soit beaucoup plus robuste que celle de Gulp, mais je ne l'ai pas encore essayée sur un projet de plus grande envergure, seulement sur [l'exemple du tutoriel][4] sur le site web. Je vais continuer à creuser la question et je verrai où cela me mène à mesure que je progresse dans mon exploration de Webpack.

[4]: https://webpack.js.org/guides/getting-started/ "Tutoriel pour débuter avec Webpack"