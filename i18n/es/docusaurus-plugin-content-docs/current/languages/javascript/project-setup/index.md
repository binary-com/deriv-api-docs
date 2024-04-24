---
title: Configuración del proyecto
sidebar_label: Configuración del proyecto
sidebar_position: 0
tags:
  - javascript
keywords:
  - js
  - project-setup
description: Configuración del proyecto Deriv API JavaScript
---

### Crear un proyecto

Vamos a crear una sencilla página `HTML` que contenga nuestro archivo JavaScript, que se encargará de nuestra conexión WebSocket. En primer lugar, cree un directorio para su próximo proyecto:

```bash
mkdir deriv-websocket-demo
```

Navegue hasta la carpeta `deriv-websocket-demo` :

```bash
cd deriv-websocket-demo
```

A continuación, cree los archivos necesarios tal y como ve a continuación:

```bash
touch index.html index.css index.js
```

:::consejo
Le sugerimos que utilice [Visual Studio Code](https://code.visualstudio.com/) con [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) activada. Esto le ayudará mucho con las implementaciones.
:::

Ahora, abra el archivo `index.html` o utilice la [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

Ahora, cambie el contenido de los archivos utilizando el siguiente método:

```js title="index.js"
console.log("crearemos aquí nuestra conexión websocket");
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
    <h2>Deriv WebSocket API demo</h2>
    <script src="index.js" async defer />
  </body>
</html>
```

Tras añadir el contenido, podemos ejecutar la aplicación simplemente ejecutando el archivo `index.html` o utilizando la <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">Live Server Extension</a>. Cuando ejecute su aplicación, compruebe en la consola si aparece el `console.log` . Entonces sabrá que el archivo JavaScript funciona para que la conexión websocket pueda implementarse correctamente.

Para configurar el websocket Deriv, puede acceder a la página [WebSocket connection](/docs/languages/javascript/websocket-connection) .
