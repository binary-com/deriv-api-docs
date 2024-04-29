---
title: Obtenir une liste de pays
sidebar_label: Obtenir une liste de pays
sidebar_position: 2
tags:
  - country_list
  - javascript
keywords:
  - country_list
  - javascript
description: Comment obtenir une liste de pays dans Deriv API ?
---

<!-- :::caution
You can learn more about countries [here](/docs/terminology/trading/residence-list)
::: -->

Pour obtenir une liste de pays, actualisez l'écouteur d'événements Open à l'aide de l'approche suivante :

```js title="index.js"
const ping_interval = 12000; // c'est en millisecondes, ce qui équivaut à 120 secondes
let interval;
// s'abonner à l'événement `open`
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established : ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  // pour garder la connexion active
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});
```

Ensuite, actualisez l'écouteur d'événements `message` pour présenter les données :

```js title="index.js"
// s'abonner à l'événement `message`
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  switch (receivedMessage.msg_type) {
    case 'residence_list':
      console.log('liste de pays', receivedMessage.residence_list);
      break;
    case 'ping':
      console.log('ping/pong response : ', receivedMessage.ping);
      break;
    default:
      console.log('received message : ', receivedMessage);
      break;
  }
});
```

La réponse doit être un objet :

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
      "text": "Îles Aland",
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
                "display_name": "Carte nationale d'identité"
              },
              "passport": {
                "display_name": "Passeport"
              }
            },
            "is_country_supported": 1
          }
        }
      },
      "phone_idd": "355",
      "text": "Albanie",
      "tin_format": ["^[A-Ta-t0-9]\\d{8}[A-Wa-w]$"],
      "value": "al"
    }
  ]
}
```

Grâce à cet appel, vous obtiendrez des informations utiles sur les pays pris en charge, comme :

- Un code `à 2 lettres` pour chaque pays
- Des fournisseurs de services d'`identité` par pays
- Un format d'identification fiscale du pays (`tin_format`)
- Etc.

Cela peut être utile pour les formulaires de création de compte, dans lesquels vous devez demander aux utilisateurs de fournir des informations approuvées sur leur base d'identité, en fonction de leur pays de résidence.

:::Avertissement
Pour les validations d'adresse et de numéro d'identification fiscale, veuillez utiliser le « tin_format » fourni pour le pays.
:::

Le pays de l'utilisateur est important pour les étapes suivantes. Il indique les actifs et les fonctionnalités qu'ils peuvent utiliser.

:::Conseil
Il est préférable d'obtenir la liste des pays avant de remplir votre formulaire.
:::

:::Attention
Vous aurez besoin d'informations détaillées sur les services d'identité `IDV` et `ONFIDO`, leurs différences et leurs possibilités.
:::

Votre code final ressemblera à ceci :

```js title="index.js"
const app_id = 1089; // Remplacez par votre app_id ou laissez 1089 pour les tests.
const websocket = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // c'est en millisecondes, ce qui équivaut à 120 secondes
let interval;

// s'abonner à l'événement `open`
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established:', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  // pour garder la connexion active
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// s'abonner à l'événement `message`
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  switch (receivedMessage.msg_type) {
    case 'residence_list':
      console.log('liste des pays', receivedMessage.residence_list);
      break;
    case 'ping':
      console.log('réponse ping/pong : ', receivedMessage.ping);
      break;
    default:
      console.log('message reçu : ', receivedMessage);
      break;
  }
});

// s'abonner à l'événement `close`
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed : ', event);
  clearInterval(interval);
});

// s'abonner à l'événement `error`
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event);
});
```
