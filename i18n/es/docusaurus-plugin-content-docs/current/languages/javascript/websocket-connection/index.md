---
title: Conexión WebSocket
sidebar_label: Conexión WebSocket
sidebar_position: 1
tags:
  - javascript
keywords:
  - js
  - conexión websocket
description: '¿cómo configurar una conexión WebSocket con la Deriv Api?'
---

:::precaución

Si no está familiarizado con WebSockets, consulte [nuestra documentación](/docs/core-concepts/websocket).

:::

### Configurar una conexión WebSocket<!-- To create a websocket connection, we want to use the Deriv websocket URL with an `app_id`. You can create your own app_id within your \[dashboard\](/dashboard) or keep the default `1089` app_id for testing. Keep in mind that eventually, you should make your own app_id. Especially if you would like to monetize your application. -->A continuación, crearemos una conexión WebSocket a Deriv WebSocket Server como se muestra a continuación:

```js title="index.js"
const app_id = 1089; //Sustitúyalo por su app_id o déjelo como 1089 para realizar pruebas.
const websocket = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`);
```

:: :info  
`app_id = 1089` es solo para fines de prueba. Actualícelo con su propio app_id cuando publique su aplicación en un entorno de producción. Consulte [esta guía](/docs/setting-up-a-deriv-application) para crear una nueva aplicación para usted.
:::

En este punto, estamos conectados al `servidor WebSocket`. Sin embargo, no recibimos ningún dato. Para enviar o recibir datos, hay que `suscribirse` a <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">eventos del websocket</a>.

Generalmente, hay 4 eventos en `conexiones WebSocket`:

- **cerrar**: Se dispara cuando una conexión con un WebSocket se cierra. También disponible a través de la propiedad onclose.
- **open**: Se dispara cuando se abre una conexión con un WebSocket. También disponible a través de la propiedad onopen.
- **Mensaje**: Se dispara cuando se reciben datos a través de un WebSocket. También disponible a través de la propiedad onmessage.
- **error**: Se activa cuando se cierra una conexión con un WebSocket debido a un error, por ejemplo, cuando no se puede enviar algún dato. También está disponible mediante la propiedad onerror.

Vamos a añadir un detector de eventos para estos eventos en nuestra conexión WebSocket.

```js title="index.js"
// suscribirse al evento `open`
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
});

// suscribirse al evento `message`
websocket.addEventListener('message', (event) => {
  console.log('new message received from server: ', event);
});

// suscribirse al evento `close`
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
});

// suscribirse al evento `error`
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event);
});
```

Ahora, abra el archivo `index.html` en el navegador y compruebe su consola de desarrollador. Debería ver solo el registro de `conexiones WebSocket establecidas`.

### Enviar y recibir datos

Nuestro servidor WebSocket proporciona la funcionalidad [ping/pong](/api-explorer#ping). Usémoslo en nuestro proyecto de demostración para enviar y recibir datos. Cambie los detectores de eventos para `abrir` y `mensajes` de la siguiente manera:

:::precaución
La función `enviar` en la conexión WebSocket, sólo recibe `string`, `ArrayBuffer`, `Blob`, `TypedArray` y `DataView`. Puede leer más sobre ellos en [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send). Esto significa que, si deseamos enviar un `objeto`, primero debemos encadenarlo con `JSON.stringify`.
:::

```js title="index.js"
// suscribirse al evento `open`
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);
});

// suscribirse al evento `message`
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('new message received from server: ', receivedMessage);
});
```

El `ReceivedMessage` sería un objeto como este:

```js
{
  echo_req: {
      ping: 1
  },
  msg_type: "ping",
  ping: "pong"
}
```

Felicidades :tada:

Acaba de crear su primer proyecto de demostración con WebSockets.

:::consejo
La solicitud `ping` se usa principalmente para probar la conexión o para mantenerla activa.
:::

### Mantenga viva la conexión WebSocket

De forma predeterminada, `conexiones WebSocket` se cerrarán cuando no se envíe tráfico entre ellas durante aproximadamente **180 segundos**. Una forma de mantener activa la conexión es enviar solicitudes de [ping](/api-explorer#ping) con intervalos de **120 segundos**. Esto mantendrá la conexión viva y activa.

Un ejemplo de configuración simple sería el siguiente:

```js title="index.js"
const ping_interval = 12000; // está en milisegundos, lo que equivale a 120 segundos
let interval;
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // para mantener viva la conexión
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// suscribirse al evento `close
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});
```

Ahora, cuando la conexión es `establecida`, comenzamos a enviar solicitudes de `ping` con intervalos de `12000 ms`.

Su código final debería ser:

```js title="index.js"
const app_id = 1089; // Sustitúyalo por su app_id o déjelo como 1089 para realizar pruebas.
const websocket = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // está en milisegundos, lo que equivale a 120 segundos
let interval;

// suscribirse al evento `open`
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // para mantener viva la conexión
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// suscribirse al evento `message`
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('new message received from server: ', receivedMessage);
});

// suscribirse al evento `close`
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});

// suscribirse al evento `error`
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event);
});
```
