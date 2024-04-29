---
title: Configuration du projet
sidebar_label: Configuration du projet
sidebar_position: 0
tags:
  - javascript
keywords:
  - js
  - configuration du projet
description: Configuration du projet JavaScript de Deriv API
---

### Créer un projet

Nous créerons une page `HTML` simple contenant notre fichier JavaScript, qui gérera notre connexion WebSocket. Créez d'abord un répertoire pour votre prochain projet :

```bash
mkdir deriv-websocket-demo
```

Accédez au dossier `deriv-websocket-demo` :

```bash
cd deriv-websocket-demo
```

Ensuite, créez les fichiers nécessaires comme vous le voyez ci-dessous :

```bash
touch index.html index.css index.js
```

:::Conseil
Nous vous conseillons d'utiliser le [code Visual Studio](https://code.visualstudio.com/) avec l'[extension du serveur Live](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) activé. Cela vous sera très utile lors de la mise en œuvre.
:::

Ouvrez ensuite le fichier `index.html` ou utilisez l'[extension du serveur Live](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

Modifiez maintenant le contenu des fichiers à l'aide de l'approche suivante :

```js title="index.js"
console.log("nous créerons notre connexion websocket ici") ;
```

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Deriv HTML JS Demo</title>
  </head>
  <body>
    <h2>Démo de l'API WebSocket de Deriv</h2>
    <script src="index.js" async defer />
  </body>
</html>
```

Une fois le contenu ajouté, nous pouvons lancer l'application en exécutant simplement le fichier `index.html` ou à l'aide de l'<a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">extension du serveur Live</a>. Lorsque vous exécutez votre application, vérifiez si `console.log` apparaît dans la console. Si c'est le cas, vous avez alors la confirmation que le fichier JavaScript fonctionne et que la connexion WebSocket peut être correctement mise en œuvre.

Pour configurer le WebSocket Deriv, vous pouvez accéder à la page [Connexion WebSocket](/docs/languages/javascript/websocket-connection).
