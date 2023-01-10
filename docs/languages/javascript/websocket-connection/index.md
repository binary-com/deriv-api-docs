---
title: Websocket Connection
sidebar_label: Websocket connection
sidebar_position: 1
tags:
  - javascript
keywords:
  - js
  - websocket-connection
description: how to setup websocket connection with deriv api?
---

:::caution

If you're not familiar with websockets, please check out [our documentation](/docs/core-concepts/websocket).

:::

### Setup websocket connection

next we'll create a websocket connection to `Dervi Websocket Server` like so:

```js title="index.js"
const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
const websocket = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`);
```

:::info
`app_id = 1089` is just for testing purposes, please update it with your own in production. please check [this](/docs/application_setup.md) to create a new app for yourself.

:::

at this point we're connected to the `websocket server` but we're not getting or recieving any data, to send/receive data we have to `subscribe` to [websocket events](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events).

generally we have 4 events on `websockets connections`:

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

Our websocket server provide `ping / pong` functionality, let's use it in our demo project to send and receive data. change the event listeners for `open` and `message` like so:

:::caution
The `send` function on websocket connection only receives `string`, `ArrayBuffer`, `Blob` and `TypedArray`, `DataView`, you can read more abou them [on MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send), which mean if we want to send an `object` we have stringify with `JSON.stringify` it first.
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
The `ping` request is mostly used to test the connection or to keep it alive.
:::

### Keep Websocket Connection Alive

By Defualt `Websocket connection` will be closed when no traffic is sent between them for more or less **180 seconds**. one way to keep the connection alive is to send `ping` request with interval of **120 seconds**, this way will keep the connection alive and active.

Simple example setup would be like so:

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

Now when the connection is `established` we start sending `ping` requests with `12000ms` intervals.

your final code should be:

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
