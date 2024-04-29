---
title: Connexion WebSocket
sidebar_label: Connexion WebSocket
sidebar_position: 1
tags:
  - javascript
keywords:
  - js
  - connexion WebSocket
description: Comment configurer une connexion WebSocket à l'aide de l'API de Deriv ?
---

: : :Avertissement

Si vous n'êtes pas familier avec les WebSockets, veuillez consulter [notre documentation](/docs/core-concepts/websocket).

:::

### Configurer une connexion WebSocket<!-- To create a websocket connection, we want to use the Deriv websocket URL with an `app_id`. You can create your own app_id within your \[dashboard\](/dashboard) or keep the default `1089` app_id for testing. Keep in mind that eventually, you should make your own app_id. Especially if you would like to monetize your application. -->Ensuite, nous allons créer une connexion WebSocket au serveur WebSocket de Deriv comme indiqué ci-dessous :

```js title="index.js"
const app_id = 1089 ; // Remplacez cela par votre app_id ou laissez la valeur 1089 à des fins de tests.
const websocket = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`) ;
```

: : :Infos  
`app_id = 1089` est uniquement à des fins de test. Veuillez mettre cela à jour avec votre propre app_id lorsque vous publiez votre application dans un environnement de production. Veuillez lire [ce guide](/docs/setting-up-a-deriv-application) pour créer une nouvelle application pour vous-même.
:::

À ce stade, nous sommes connectés au `serveur WebSocket`. Mais nous ne recevons aucune donnée. Pour envoyer ou recevoir des données, nous devons `souscrire` à des <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">événements WebSocket</a>.

En général, nous avons 4 événements sur les `connexions WebSocket` :

- **close** : Renvoyé lorsqu'une connexion avec un WebSocket est fermée. Également disponible au moyen de la propriété onclose.
- **open** : Renvoyé lorsqu'une connexion avec un WebSocket est ouverte. Également disponible au moyen de la propriété onopen.
- **message** : Renvoyé lorsqu'une donnée est reçue au moyen d'un WebSocket. Également disponible au moyen de la propriété onmessage.
- **error** : Renvoyé lorsqu'une connexion avec un WebSocket a été fermée en raison d'une erreur, par exemple lorsque certaines données n'ont pas pu être envoyées. Également disponible au moyen de la propriété onerror.

Ajoutons un écouteur d'événements pour ces événements sur notre connexion WebSocket.

```js title="index.js"
// s'abonner à l'événement `open`
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
});

// s'abonner à l'événement `message`
websocket.addEventListener('message', (event) => {
  console.log('new message received from server: ', event);
});

// s'abonner à l'événement `close`
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
});

// s'abonner à l'événement `error`
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event);
});
```

Maintenant, ouvrez le fichier `index.html` dans notre navigateur et vérifiez votre console de développement. Vous ne devriez voir que le journal pour `WebSocket connection established`.

### Envoyer et recevoir des données

Notre serveur WebSocket fourni une fonctionnalité [ping/pong](/api-explorer#ping). Utilisons cela dans notre projet démo pour envoyer et recevoir des données. Modifiez les écouteurs d'événements pour `open` et `message` comme suit :

:::Avertissement
La fonction `send` de la connexion WebSocket reçoit uniquement `string`, `ArrayBuffer`, `Blob`, `TypedArray` et `DataView`. Vous pouvez en savoir plus à ce sujet sur [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send). En d'autres termes, si vous souhaitez envoyer un `objet`, nous devons d'abord convertir cela à l'aide de `JSON.stringify`.
:::

```js title="index.js"
// s'abonner à l'événement `open`
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);
});

// s'abonner à l'événement `message`
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('new message received from server: ', receivedMessage);
});
```

`ReceivedMessage` serait un objet comme suit :

```js
{
  echo_req: {
      ping: 1
  },
  msg_type: "ping",
  ping: "pong"
}
```

Félicitations :tada:

Vous avez créé votre premier projet démo avec WebSockets.

: : :Conseil  
La requête `ping` est principalement utilisée pour tester la connexion ou pour la garder active.
:::

### Garder la connexion WebSocket active

Par défaut, `WebSocket connections` seront fermées en l'absence d'envoi de trafic entre elles pendant environ **180 secondes**. Un moyen de garder la connexion active consiste à envoyer des requêtes [ping](/api-explorer#ping) à des intervalles de **120 secondes**. Cela permettra de garder la connexion active.

Voici un exemple de configuration simple :

```js title="index.js"
const ping_interval = 12000; // c'est en milliseconds, ce qui équivaut à 120 secondes
let interval;
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // Pour garder la connexion active
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// s'abonner à l'événement  `close`
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});
```

Une fois que la connexion est `établie`, commençons l'envoi de requêtes `ping` à des intervalles de `12000ms`.

Votre code final devrait ressembler à ceci :

```js title="index.js"
const app_id = 1089 ;// Remplacer par votre app_id ou laissez 1089 à des fins de tests.
const websocket = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // it's in milliseconds, which equals to 120 seconds
let interval;

// s'abonner à l'événement `open` 
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // Pour garder la connexion active
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// s'abonner à l'événement `message`
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('new message received from server: ', receivedMessage);
});

// s'abonner à l'événement `close`
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});

// s'abonner à l'événement `error`
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event);
});
```
