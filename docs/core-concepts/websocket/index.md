---
title: WebSocket
hide_title: true
draft: false
sidebar_label: WebSocket
sidebar_position: 0
tags:
  - concept
  - websocket
keywords:
  - trading
  - concept
  - websockets
description: What is a WebSocket?
---

## What is a WebSocket?

The `WebSocket` protocol, described in the specification [RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455), provides a way to exchange data between browser and server via a persistent connection. The data can be passed in both directions as “packets”, without breaking the connection and the need of additional HTTP-requests.

WebSocket is especially great for services that require continuous data exchange, e.g. real-time trading systems and so on.

## A Simple example

To open a WebSocket connection, we need to create `new WebSocket` using the special protocol `ws`or `wss` in the url. Here is how you can do that in `JavaScript`:

```js
let socket = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');
```

:::caution
Always prefer `wss://`. The `wss://` protocol is not only encrypted, but also more reliable.

That’s because ws:// data is not encrypted, visible for any intermediary. Old proxy servers do not know about WebSocket, they may see “strange” headers and abort the connection.

On the other hand, `wss://` is WebSocket over TLS, (same as HTTPS is HTTP over TLS), the transport security layer encrypts the data at the sender and decrypts it at the receiver. So data packets are passed encrypted through proxies. They can’t see what’s inside and let them through.
:::

Once the socket is created, we should listen to events on it. There are totally 4 events:

- open – connection established,
- message – data received,
- error – WebSocket error,
- close – connection closed.

And if we’d like to send a message then socket.send(data) will do that.

Here’s an example in `JavaScript`:

```js
const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
const socket = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`);

socket.onopen = function (e) {
  console.log('[open] Connection established');
  console.log('Sending to server');
  const sendMessage = JSON.stringify({ ping: 1 });
  socket.send(sendMessage);
};

socket.onmessage = function (event) {
  console.log(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    consloe.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    console.log('[close] Connection died');
  }
};

socket.onerror = function (error) {
  console.log(`[error]`);
};
```

## Why do we need websocket and when should we avoid it?

WebSocket are an essential client-server communication tool and one needs to be fully aware of its utility and avoid scenarios to benefit from its utmost potential. It’s explained extensively in the next section.

Use WebSocket When You Are:

1. ‍Developing real-time web application
   The most customary use of WebSocket is in real-time application development wherein it assists in a continual display of data at the client end. As the backend server sends back this data continuously, WebSocket allows uninterrupted pushing or transmitting this data in the already open connection. The use of WebSockets makes such data transmission quick and leverages the application's performance.
2. A real-life example of such WebSocket utility is in the trading websites such as deriv. Here, WebSocket assist in data handling that is impelled by the deployed backend server to the client.
3. ‍Creating a chat application
   Chat application developers call out WebSocket for help in operations like a one-time exchange and publishing/broadcasting the messages. As the same WebSocket connection is used for sending/receiving messages, communication becomes easy and quick.

Now that it’s clear where WebSocket should be used, don’t forget to know the cases where it should be avoided and keep yourself away from tons of operational hassles.

WebSocket shouldn’t be taken onboard when old data fetching is the need of the hour or need data only for one-time processing. In these cases, using HTTP protocols is a wise choice.

## WebSocket vs HTTP

As both HTTP and WebSocket are employed for application communication, people often get confused and find it difficult to pick one out of these two. Have a look at the below-mentioned text and gain better clarity on HTTP and WebSocket.

As told previously, WebSocket is a framed and bidirectional protocol. On the contrary, to this, HTTP is a unidirectional protocol functioning above the TCP protocol.

As WebSocket protocol is capable to support continual data transmission, it’s majorly used in real-time application development. HTTP is stateless and is used for the development of [RESTful](https://de.wikipedia.org/wiki/Representational_State_Transfer) and [SOAP](https://de.wikipedia.org/wiki/SOAP) applications. Soap can still use HTTP for implementation, but REST is widely spread and used.

In WebSocket, communication occurs at both ends, which makes it a faster protocol. In HTTP, the connection is built at one end, making it a bit sluggish than WebSocket.

WebSocket uses a unified TCP connection and needs one party to terminate the connection. Until it happens, the connection remains active. HTTP needs to build a distinct connection for separate requests. Once the request is completed, the connection breaks automatically.

## How are WebSocket connections established?

The process starts with a WebSocket handshake that involves using a new scheme ws or wss. To understand quickly, you may consider them equivalent to HTTP and secure HTTP (HTTPS) respectively.

Using this scheme, servers and clients are expected to follow the standard WebSocket connection protocol. The WebSocket connection establishment begins with HTTP request upgrading that features a couple of headers such as Connection: Upgrade, Upgrade: WebSocket, Sec-WebSocket- Key, and so on.

Here is how this connection is established:

1. **The Request :** Connection Upgrade header denotes the WebSocket handshake while the Sec-WebSocket-Key features Base64-encoded random value. This value is arbitrarily generated during every WebSocket handshake. Besides the above, the key header is also a part of this request.

The above-listed headers, when combined, form an HTTP GET request. It will have similar data in it:

```
GET ws://websocketexample.com:8181/ HTTP/1.1
Host: localhost:8181
Connection: Upgrade
Pragma: no-cache
Cache-Control: no-cache
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: b6gjhT32u488lpuRwKaOWs==
```

To clarify, Sec-WebSocket-Version, one can explain the WebSocket protocol version ready to use for the client.

2. **The Response:** The response header, Sec-WebSocket-Accept, features the rest of value submitted in the Sec-WebSocket-Key request header. This is connected with a particular protocol specification and is used widely to keep misleading information at bay. In other words, it enhances the API security and stops ill-configured servers from creating blunders in the application development.

On the success of the previously-sent request, a response similar to the below-mentioned text sequence will be received:

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: rG8wsswmHTJ85lJgAE3M5RTmcCE=
```

## References

- ** [WebSockets APIs - MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)**
- ** [WebSocket - Javascript Info](https://javascript.info/websocket)**
