---
title: Obtener una lista de países
sidebar_label: Obtener una lista de países
sidebar_position: 2
tags:
  - country_list
  - javascript
keywords:
  - country_list
  - javascript
description: '¿Cómo obtener una lista de países en la Deriv Api?'
---

<!-- :::caution
You can learn more about countries [here](/docs/terminology/trading/residence-list)
::: -->

Para obtener una lista de países, actualice el receptor de eventos de apertura utilizando el siguiente enfoque:

```js title="index.js"
const ping_interval = 12000; // está en milisegundos, lo que equivale a 120 segundos
let interval;
// suscribirse al evento `open`
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  // para mantener viva la conexión
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});
```

Ahora, actualice el receptor de eventos del mensaje `` para renderizar los datos:

```js title="index.js"
// suscribirse al evento `message`
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  switch (receivedMessage.msg_type) {
    case 'residence_list':
      console.log('list of countries', receivedMessage.residence_list);
      break;
    case 'ping':
      console.log('ping/pong response: ', receivedMessage.ping);
      break;
    default:
      console.log('received message: ', receivedMessage);
      break;
  }
});
```

La respuesta debe ser un objeto:

```json
{
  "echo_req": {
    "req_id": 1,
    "residence_list": 1
  },
  "msg_type": "residence_list",
  "req_id": 1,
  "residence_list": [
    {
      "identity": {
        "services": {
          "idv": {
            "documents_supported": {},
            "has_visual_sample": 0,
            "is_country_supported": 0
          },
          "onfido": {
            "documents_supported": {},
            "is_country_supported": 0
          }
        }
      },
      "phone_idd": "35818",
      "text": "Aland Islands",
      "value": "ax"
    },
    {
      "identity": {
        "services": {
          "idv": {
            "documents_supported": {},
            "has_visual_sample": 0,
            "is_country_supported": 0
          },
          "onfido": {
            "documents_supported": {
              "driving_licence": {
                "display_name": "Driving Licence"
              },
              "national_identity_card": {
                "display_name": "National Identity Card"
              },
              "passport": {
                "display_name": "Passport"
              }
            },
            "is_country_supported": 1
          }
        }
      },
      "phone_idd": "355",
      "text": "Albania",
      "tin_format": ["^[A-Ta-t0-9]\\d{8}[A-Wa-w]$"],
      "value": "al"
    }
  ]
}
```

Con esta llamada, obtendrá información útil sobre los países admitidos, como:

- Un código de `2 letras` para cada país
- Proveedores de servicios de `Identidad` para cada país
- Formato del identificador fiscal del país (`tin_format`)
- etc.

Esto puede ser útil para los formularios de creación de cuentas, en los que necesita pedir a los usuarios que proporcionen información validada sobre su base de identidad, en función de su país de residencia.

:::precaución
Para las validaciones de dirección e identificación fiscal, utilice el 'tin_format' proporcionado para el país.
:::

El país del usuario es importante para sus próximos pasos. Determina qué activos y características pueden utilizar.

:::consejo
Es mejor obtener la lista de países antes de rellenar el formulario.
:::

:::peligro
Necesitará contenidos detallados sobre `IDV` y servicios de identidad `ONFIDO`, sus diferencias y posibilidades.
:::

Su código final será:

```js title="index.js"
const app_id = 1089; // Sustitúyalo por su app_id o déjelo como 1089 para las pruebas.
const websocket = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // está en milisegundos, lo que equivale a 120 segundos
let interval;

// suscríbase al evento `open`
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  // para mantener viva la conexión
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// suscribirse al evento `message`
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  switch (receivedMessage.msg_type) {
    case 'residence_list':
      console.log('list of countries', receivedMessage.residence_list);
      break;
    case 'ping':
      console.log('ping/pong response: ', receivedMessage.ping);
      break;
    default:
      console.log('received message: ', receivedMessage);
      break;
  }
});

// subscribe to `close` event
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});

// subscribe to `error` event
websocket.addEventListener('error', (event) => {
  console.log('ha ocurrido un error en nuestra conexión websocket', event);
});
```
