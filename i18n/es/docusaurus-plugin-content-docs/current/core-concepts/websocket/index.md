---
title: WebSocket
hide_title: false
draft: false
sidebar_label: WebSocket
sidebar_position: 0
tags:
  - concepto
  - websocket
keywords:
  - operar
  - concepto
  - websockets
description: '¿Qué es un WebSocket?'
---

## ¿Qué son los WebSockets?

El protocolo `WebSocket` , descrito en la especificación [RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455), proporciona una forma de intercambiar datos entre el navegador y el servidor a través de una conexión persistente. Los datos se pueden pasar en ambas direcciones como "paquetes" sin interrumpir la conexión ni necesitar solicitudes HTTP adicionales.

WebSocket es especialmente útil para los servicios que requieren un intercambio continuo de datos, por ejemplo, sistemas de negociación en tiempo real, etc.

## Un ejemplo sencillo

Para abrir una conexión WebSocket, necesitamos crear `new WebSocket` utilizando el protocolo especial `ws` o `wss` en la Url. Así es como puede hacerlo en `JavaScript`:

```js
let socket = new WebSocket('wss: //ws.binaryws.com/websockets/ v3?app_id=1089 ');
```

:::caution
Usar `wss://` es siempre la mejor opción. El protocolo `wss://` no solo está cifrado, sino que también es más confiable.

Por otro lado, los datos `ws://` no están cifrados y pueden ser visibles para los intermediarios. Servidores proxy antiguos pueden encontrar encabezados "extraños" y terminar la conexión.

`wss://` significa WebSocket sobre TLS, de forma similar a cómo HTTPS es HTTP sobre TLS. Con la capa de seguridad de transporte, el remitente cifra los datos y el receptor los descifra. Esto significa que los paquetes de datos cifrados pueden pasar satisfactoriamente a través de proxies sin ser inspeccionados.
:::

Una vez creado el socket, debemos escuchar los eventos que contiene. Hay 4 eventos en total:

- Abierto — Conexión establecida
- Mensaje — Datos recibidos
- Error – error de WebSocket
- Cerrar — Conexión cerrada

El envío de un mensaje se puede hacer a través de socket.send (data).

Este es un ejemplo en `JavaScript`:

```js
const app_id = 1089; //Sustitúyalo por su app_id o déjelo como 1089 para realizar pruebas.
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

## ¿Por qué necesitamos WebSockets y cuándo debemos evitarlos?

Los WebSockets son una herramienta esencial de comunicación cliente-servidor. Para aprovechar al máximo su potencial, es importante entender cómo pueden ser útiles y cuándo es mejor evitar su uso. Se explica ampliamente en la siguiente sección.

Utilice WebSockets en los siguientes casos:

1. Al desarrollar una aplicación web en tiempo real. El uso más habitual de WebSocket es en el desarrollo de aplicaciones en tiempo real, donde ayuda a una visualización continua de los datos en el extremo del cliente. Como el servidor back-end devuelve estos datos de forma continua, un WebSocket permite enviar o transmitir estos datos sin interrupciones en la conexión ya abierta. El uso de WebSockets agiliza la transmisión de datos y aprovecha el rendimiento de la aplicación.
2. Para sitios web comerciales, como Deriv. En este caso, WebSocket ayuda a gestionar los datos que impulsa el servidor back-end implementado en el cliente.
3. Al crear una aplicación de chat. Los desarrolladores de aplicaciones de chat solicitan ayuda a WebSockets en operaciones como un intercambio único y la publicación/transmisión de mensajes. Como se utiliza la misma conexión WebSocket para enviar/recibir mensajes, la comunicación se vuelve fácil y rápida.

Ahora que hemos establecido dónde se deben usar los WebSockets, veamos dónde es mejor evitarlos. Esto le ayudará a evitar problemas operativos innecesarios.

Los WebSockets no deben incorporarse cuando lo único que se necesita es recuperar datos antiguos o datos que se van a procesar solo una vez. En estos casos, el uso de protocolos HTTP es una buena elección.

## WebSocket frente a HTTP

Como se emplean los protocolos HTTP y WebSocket para la comunicación de aplicaciones, las personas a menudo se confunden y les resulta difícil elegir uno.

Como se dijo anteriormente, WebSocket es un protocolo bidireccional y enmarcado. Por otro lado, HTTP es un protocolo unidireccional que funciona por encima del protocolo TCP.

Como el protocolo WebSocket es capaz de soportar la transmisión continua de datos, se utiliza principalmente en el desarrollo de aplicaciones en tiempo real. HTTP no tiene estado y se usa para el desarrollo de [aplicaciones RESTful](https://de.wikipedia.org/wiki/Representational_State_Transfer) y [de SOAP](https://de.wikipedia.org/wiki/SOAP) . SOAP todavía puede usar HTTP para la implementación, pero REST es ampliamente conocido y utilizado.

En WebSocket, la comunicación se produce en ambos extremos, lo que lo convierte en un protocolo más rápido. En HTTP, la conexión está construida en un extremo, lo que la hace un poco más lenta que WebSocket.

WebSocket usa una conexión TCP unificada y necesita que una de las partes termine la conexión. Hasta que esto suceda, la conexión permanecerá activa. HTTP necesita crear una conexión distinta para solicitudes independientes. Una vez completada la solicitud, la conexión se interrumpe automáticamente.

## ¿Cómo se establecen las conexiones de WebSocket?

El proceso comienza con un protocolo de enlace de WebSocket que implica el uso de un nuevo esquema (ws o wss). Para ayudarle a entender, considérelos equivalentes a HTTP y HTTP seguro (HTTPS) respectivamente.

Con este esquema, se espera que los servidores y los clientes sigan el protocolo de conexión WebSocket estándar. El establecimiento de la conexión WebSocket comienza con una solicitud HTTP de mejora que incluye un par de encabezados, como Connection: Upgrade, Upgrade: WebSocket, SEC-WebSocket- Key, etc.

Así es como se establece esta conexión:

1. **The Request :** El encabezado de mejora de la conexión indica el protocolo de enlace WebSocket, mientras que la clave Sec-WebSocket-Key presenta un valor aleatorio codificado en Base64. Este valor se genera arbitrariamente durante cada protocolo de enlace de WebSocket. Además de lo anterior, el encabezado clave también forma parte de esta solicitud.

Los encabezados de la lista anterior, cuando se combinan, forman una solicitud GET HTTP. Tendrá datos similares:

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

Para aclarar la Sec-WebSocket-Version, se puede explicar la versión del protocolo WebSocket lista para usar para el cliente.

2. **The Response:** El encabezado de respuesta, Sec-WebSocket-Accept, incluye el resto del valor enviado en el encabezado de solicitud Sec-WebSocket-Key. Esto está conectado con una especificación de protocolo particular y se usa ampliamente para mantener a raya la información engañosa. En otras palabras, mejora la seguridad de la API y evita que los servidores mal configurados creen errores en el desarrollo de la aplicación.

Si la solicitud enviada anteriormente es correcta, se recibirá una respuesta similar a la secuencia de texto que se menciona a continuación:

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: rG8wsswmHTJ85lJgAE3M5RTmcCE=
```

## Referencias

- ** [WebSockets APIs - MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)**
- ** [WebSocket - Javascript Info](https://javascript.info/websocket)**
