---
title: Project Setup
sidebar_label: Project Setup
sidebar_position: 0
tags:
  - javascript
keywords:
  - js
  - project-setup
description: js deriv api project setup
---

### Create Project

We're gonna create a simple `HTML` page with our javascript scripts which handles our websocket connection. create a directory for you next project:

```bash
mkdir deriv-websocket-demo
```

navigate to the `deriv-websocket-demo` folder:

```bash
cd deriv-websocket-demo
```

next create the needed files like so:

```bash
touch index.html index.css index.js
```

Now open the folder with your prefered code editor or IDE

:::tip
We suggest using [Visual Studio Code](https://code.visualstudio.com/) with [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) enabled, it will help you a lot going forward in implementations.
:::

Now Change the content of the files like so:

```js title="index.js"
console.log("we're gonna create websocket connection and all the other cool stuff here");
```

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Deriv Html JS Demo</title>
  </head>
  <body>
    <h2>Deriv Websocket API demo</h2>
    <script src="index.js" async defer />
  </body>
</html>
```

Now open the `index.html` file or use the [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

This was just a simple project setup and didn't much related to `Deriv Websockets` at all, please go to the next step.

your final code should be:

```js title="index.js"
console.log("we're gonna create websocket connection and all the other cool stuff here");
```

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Deriv Html JS Demo</title>
  </head>
  <body>
    <h2>Deriv Websocket API demo</h2>
    <script src="index.js" async defer />
  </body>
</html>
```
