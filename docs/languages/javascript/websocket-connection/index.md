---
title: Websocket connection
sidebar_label: Websocket connection
sidebar_position: 1
tags:
  - javascript
keywords:
  - js
  - websocket-connection
description: how to setup websocket connection with Deriv api?
---

:::caution

If you're not familiar with websockets, please check out [our documentation](/docs/core-concepts/websocket).

:::

### Setup

To create a websocket connection, we want to use the Deriv websocket URL with an `app_id`. You can create your own app_id within your [dashboard](/dashboard) or keep the default `1089` app_id for testing. Keep in mind that eventually, you should make your own app_id. Especially if you would like to monetize your application.

To setup the connection, add the following code in your JavaScript file:

```js title="index.js"
const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
const websocket = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`);
```

:::info
`app_id = 1089` is just for testing purposes, please update it with your own app_id when releasing your application on a production environment. please check [this guide](/docs/setting-up-a-deriv-application) to create a new app for yourself.
:::

At this point we are connected to the `websocket server`. But, we do not receive any data. To send or receive data, we have to `subscribe` to <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">websocket events</a>.

Generally we have 4 events on `websockets connections`:

- **close**:
  Fired when a connection with a WebSocket is closed. Also available via the onclose property
- **open**:
  Fired when a connection with a WebSocket is opened. Also available via the onopen property.
- **message**:
  Fired when data is received through a WebSocket. Also available via the onmessage property.
- **error**:
  Fired when a connection with a WebSocket has been closed because of an error, such as when some data couldn't be sent. Also available via the onerror property.

let's add an event listener for these events on our websocket connection

```js title="index.js"
// subscribe to `open` event
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
});

// subscribe to `message` event
websocket.addEventListener('message', (event) => {
  console.log('new message received from server: ', event);
});

// subscribe to `close` event
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
});

// subscribe to `error` event
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event);
});
```

Now open the `index.html` file in our browser and checkout your Developer Console, you should see only the log for `websocket connection established`.

### Send and receive data

Our websocket server provides a [Ping](/api-explorer#ping) call. In this case we can use it to test our websocket connection. Let's use it in our demo project to send and receive data. 

In your code, you can adjust the `open` and `message` eventlisteners with the following code in order to retrieve data from the `Ping` call:
:::caution
The `send` function only receives `string`, `ArrayBuffer`, `Blob` and `TypedArray`, `DataView`, data types. You can read more about them [on MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send). This means, if we want to send an `object`, we have to stringify it with `JSON.stringify` first.
:::

```js title="index.js"
// subscribe to `open` event
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);
});

// subscribe to `message` event
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('new message received from server: ', receivedMessage);
});
```

The `receivedMessage` would be an object like so:

```js
{
  echo_req: {
      ping: 1
  },
  msg_type: "ping",
  ping: "pong"
}
```

Congratulations :tada:

You just created your first demo project with websockets.

:::tip
The `Ping` request is mostly used to test the connection or to keep it alive.
:::

### Keep Websocket Connection Alive

By default, the `Websocket connection` will be closed when no traffic is sent after **180 seconds**. One way to keep the connection alive is by sending a [Ping](/api-explorer#ping) request with interval of **120 seconds**. This way you will keep the connection alive and active.

Here is an example of how you can set it up:

```js title="index.js"
const ping_interval = 12000; // it's in milliseconds, which equals to 120 seconds
let interval;
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // to Keep the connection alive
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// subscribe to `close` event
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});
```

Now when the connection is `established` we start sending `Ping` requests with `12000ms` intervals.

Your final code will then look like this:

```js title="index.js"
const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
const websocket = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // it's in milliseconds, which equals to 120 seconds
let interval;

// subscribe to `open` event
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // to Keep the connection alive
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// subscribe to `message` event
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('new message received from server: ', receivedMessage);
});

// subscribe to `close` event
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});

// subscribe to `error` event
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event);
});
```
