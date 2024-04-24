---
title: Anatomía de las llamadas API
hide_title: false
draft: false
sidebar_label: Anatomía de las llamadas API
sidebar_position: 1
tags:
  - concepto
  - llamadas
  - anatomía
keywords:
  - operar
  - concepto
  - llamadas
  - anatomía
description: Anatomía de las llamadas Deriv API
---

## Suscríbete y envía

Todas las llamadas API tienen una funcionalidad de envío para realizar una solicitud y recibir una respuesta. Algunas llamadas API también ofrecen una funcionalidad de suscripción que permite enviar actualizaciones a su aplicación cuando haya nueva información disponible.

### Suscribirse

Varias llamadas API proporcionan la funcionalidad de `subscribe`. Cuando se suscribe a una llamada API, recibirá un flujo continuo de los datos de esa llamada API en particular.

Algunas de estas llamadas API se suscriben automáticamente (por ejemplo, [ticks](https://api.deriv.com/api-explorer#ticks)) y otras tienen un campo opcional de `subscribe`. Si pasa `1` al campo `subscribe`, la suscripción se iniciará y el servidor continuará enviando los datos solicitados hasta que cancele la suscripción llamando a las llamadas API de `Forget` o `Forget all`.

Por ejemplo, puede llamar a [Historial de Ticks](https://api.deriv.com/api-explorer#ticks_history) para recibir datos del historial de ticks. Pero cuando agregue la opción `subscribe` a esta llamada, recibirá los datos del historial de ticks que solicito en la primera respuesta y seguirá recibiendo una nueva respuesta cada vez que el servidor publique un nuevo tick para el símbolo dado.

En el flujo de mensajes de `subscribe`, hay un campo llamado `subscription`. Este es el `Stream ID`. Con este ID, puede identificar el flujo de mensajes en su lógica y detenerlo con las llamadas API `Forget` y `Forget All`.

Los datos que proporcionan las llamadas API con la funcionalidad `subscribe` se pueden usar como fuente de datos para otras funciones y llamadas API.

### Enviar

Si usted llama la API con la funcionalidad `enviar`, el servidor solo devolverá los datos solicitados una vez. Para obtener datos actualizados, debe volver a enviar la llamada API. Por lo general, este método se usa cuando obtiene otras respuestas a llamadas de API o eventos de interfaz de usuario, como `Click`, `Scroll`y más.

### Olvidar

Si desea detener el flujo de mensajes creado por `subscribe`, tendrá que realizar la llamada API `Forget` con el `Stream ID` correcto. De lo contrario, puede usar la llamada API `Forget All` para detener las transmisiones por su `Method name`.

:::caution
Para más información sobre la llamada API `Forget`, echa un vistazo a [Forget](https://api.deriv.com/api-explorer#forget) y [Forget All](https://api.deriv.com/api-explorer#forget_all) en el explorador de API.
:::

## Solicitar datos

Para facilitarle la gestión del flujo de solicitudes y respuestas de su conexión de WebSocket, cada llamada API de Deriv WebSocket sigue una estructura estandarizada. Puede usarlo para el almacenamiento en caché, la validación, además de la sincronización de solicitudes y respuestas.

#### Nombre del método de llamada API

Cada `request` en la API de WebSocket incluye un campo `method name`, que sirve como identificador único para la solicitud. En la mayoría de los casos, este `method name` obtendrá un valor numérico de `1`. Sin embargo, hay algunos casos en los que la propiedad del identificador puede tener un valor de cadena.

:::caution
Siempre se requiere el Nombre del Método de la Llamada API. este campo determina los datos que obtendrá de nuestro servidor WebSocket.
:::

### Campos obligatorios

Los datos de cada solicitud tienen campos obligatorios que debe proporcionar, también pueden incluir campos opcionales. Exploremos esto con un ejemplo de `Residence List`.

Una llamada `Residence List` devuelve una lista de países y códigos de país de 2 letras, adecuados para rellenar el formulario de apertura de cuenta.

Los datos de solicitud para esta llamada son los siguientes:

```ts
{
  residence_list: 1; // Api Call Method Name
  passthrough?: object; // Optional
  req_id?: number; // Optional
}
```

El campo `residence_list` es el `method name` para la llamada y es obligatorio. Es posible que haya otros campos obligatorios relacionados con este tipo de solicitud que desee enviar. Para obtener más información sobre `Residence List` y otras llamadas API, eche un vistazo a [API Explorer](https://api.deriv.com/api-explorer#residence_list).

### Campos opcionales

Cada llamada también tiene varios campos `Optional`. `Passthrough` y `req_id` siempre forman parte de los datos de la solicitud, pero puede optar por excluirse y no usarlos.

#### El campo `passthrough`

Todo lo que pase a este campo se le devolverá dentro de un objeto de `respuestas` . Esto puede resultar útil cuando necesitas simular un flujo con estado para tus `solicitudes` y `respuestas`.

#### El campo `req_id`

Puede que necesite hacer `tag` a sus peticiones y pasarlas a través de nuestras llamadas `WebSocket`. Puede hacerlo pasando un `number` a este campo. Puede ser útil cuando necesite mapear `requests` a ` responses`.

:::caution
Para obtener información sobre los campos opcionales adicionales específicos de cada llamada API, consulte nuestro [API Explorer](https://api.deriv.com/api-explorer).
:::

## Datos de respuesta

Cuando obtenga la respuesta para la llamada, aparecerá un `Field` con el mismo nombre que el `method name`, que contiene los datos reales.

La respuesta para la llamada `Residence List`:

```js
{
  echo_req: {
    req_id: 1,
    residence_list: 1,
  },
  msg_type: 'residence_list',
  req_id: 1,
  residence_list: [
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
                            }
                        },
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
            "tin_format": [
                "^[A-Ta-t0-9]\\d{8}[A-Wa-w]$"
            ],
            "value": "al"
        },
        // ....
  ],
};
```

En este caso, el `residence_list` es el `method name` y contiene los datos reales que solicitó. Para resumir, no hemos incluido el resto de la matriz. Puede comprobar la respuesta real [aquí](https://api.deriv.com/api-explorer#residence_list).

#### El campo `echo_req`

Este `Field` contiene los `Request Data` exactos que envió al servidor.

#### El campo `msg_type`

Este `Field` le ayuda a determinar qué datos de `message` está recibiendo en el evento de mensaje de la conexión de WebSocket. Por ejemplo, su controlador de eventos `onmessage` para su conexión WebSocket en `JavaScript` sería:

```js
socket.onmessage = (event) => {
  const receivedMessage = JSON.parse(event.data);

  switch (receivedMessage.msg_type) {
    case "residence_list":
      console.log("The residence list is : ",receivedMessage.residence_list)
      break;
    case "other_request_identifier"
      console.log("the response", receivedMessage.some_other_request_identifier)
    default:
      console.log("receivedMessage", receivedMessage)
      break;
  }
}
```

#### El campo `req_id`

Este es el `Optional` que se pasa al `Request Data`, se puede usar para la `validation`, `synchronization`, `caching`, etc.

:::tip
El `msg_type` siempre está presente en los datos de respuesta.
:::
