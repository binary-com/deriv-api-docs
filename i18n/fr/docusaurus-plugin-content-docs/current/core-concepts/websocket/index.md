---
title: WebSocket
hide_title: false
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
description: Qu'est-ce qu'un WebSocket ?
---

## Qu'est-ce que les WebSockets ?

Le protocole `WebSocket`, décrit dans la spécification [RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455), permet d'échanger des données entre un navigateur et un serveur via une connexion persistante. Ces données peuvent être transmises dans les deux sens sous forme de « paquets » sans interrompre la connexion ni nécessiter de requêtes HTTP supplémentaires.

WebSocket est particulièrement adapté aux services qui nécessitent un échange continu de données, par exemple les systèmes de trading en temps réel, etc.

## Un exemple simple

Pour ouvrir une connexion WebSocket, nous devons créer un `nouveau WebSocket` à l'aide du protocole spécial `ws`ou `wss` dans l'URL. Cela correspond à ceci en `JavaScript` :

```js
let socket = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');
```

:::Avertissement
L'utilisation de `wss://` est toujours recommandée. Le protocole `wss://` est non seulement crypté, mais aussi plus fiable.

En revanche, les données `ws://` ne sont pas cryptées et peuvent être visibles par des intermédiaires. Les anciens serveurs proxy peuvent rencontrer des en-têtes « étranges » et interrompre la connexion.

`wss://` renvoie à WebSocket over TLS, tout comme HTTPS renvoie à HTTP over TLS. Les données sont cryptées par l'expéditeur et décryptées par le destinataire grâce au protocole de sécurité de la couche transport. Cela signifie que les paquets de données cryptées peuvent correctement transiter par les proxys sans être inspectés.
:::

Une fois le socket créé, nous devons écouter les événements qui y surviennent. Il y a 4 événements au total :

- Open : Connexion établie
- Message : Données reçues
- Error : Erreur WebSocket
- Close : Connexion fermée

Un message peut être envoyé à l'aide de socket.send(data).

En voici un exemple en `JavaScript` :

```js
const app_id = 1089; // Remplacez cela par votre app_id ou laissez 1089 pour les tests.
const socket = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`);

socket.onopen = function (e) {
  console.log('[open] Connection established');
  console.log('Sending to server');
  const sendMessage = JSON.stringify({ ping: 1 });
  socket.send(sendMessage);
};

socket.onmessage = function (event) {
  console.log(`[message] Data received from server : ${event.data}`);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // p.ex. processus serveur arrêté ou réseau en panne
    // event.code est généralement 1006 dans ce cas
    console.log('[close] Connection died');
  }
};

socket.onerror = function (error) {
  console.log(`[error]`);
};
```

## Pourquoi devons-nous utiliser des WebSockets et quand ne pas en utiliser ?

Les WebSockets sont un outil de communication client-serveur essentiel. Pour en tirer le meilleur parti, il est important de connaître leur utilité et quand il vaut mieux éviter de les utiliser. La section suivante abordera cela en détail.

Utilisez les WebSockets dans les cas suivants :

1. ‍Lorsque vous développez une application Web en temps réel. L'utilisation la plus courante du WebSocket est le développement d'applications en temps réel, où elle permet un affichage continu des données au niveau du client. Comme le serveur dorsal (back-end) renvoie ces données en continu, un WebSocket permet de pousser ou de transmettre ces données de manière ininterrompue dans la connexion déjà ouverte. L'utilisation de WebSockets accélère cette transmission de données et exploite les performances de l'application.
2. Pour des sites Web d'échange tels que Deriv. Dans ce cas, le WebSocket aide au traitement des données qui sont transmises au client par le serveur dorsal déployé.
3. ‍Lors de la création d'une application de messagerie. Les développeurs d'applications de messagerie font appel aux WebSockets pour des opérations comme l'échange unique et la publication ou la diffusion de messages. La communication devient ainsi facile et rapide, car la même connexion WebSocket est utilisée pour l'envoi et la réception des messages.

Maintenant que nous savons quand utiliser des WebSockets, voyons quand il est préférable de ne pas les utiliser. Cela vous évitera ainsi des problèmes opérationnels inutiles.

L'utilisation des WebSockets est déconseillée lorsqu'il s'agit uniquement de récupérer des données anciennes ou des données qui ne doivent être traitées qu'une seule fois. Dans ces cas, l'utilisation des protocoles HTTP est plus appropriée.

## WebSocket vs HTTP

Les protocoles HTTP et WebSocket étant tous deux utilisés pour la communication des applications, les gens ont bien souvent du mal à faire un choix parmi les deux.

Comme indiqué précédemment, WebSocket est un protocole encadré et bidirectionnel. De plus, HTTP est un protocole unidirectionnel fonctionnant au-dessus du protocole TCP.

Le protocole WebSocket étant capable de prendre en charge la transmission continue de données, il est principalement utilisé dans le développement d'applications en temps réel. HTTP est un protocole sans état utilisé pour le développement d'applications [RESTful](https://de.wikipedia.org/wiki/Representational_State_Transfer) et [SOAP](https://de.wikipedia.org/wiki/SOAP). SOAP peut encore utiliser le protocole HTTP pour la mise en œuvre, mais REST est largement répandu et utilisé.

Dans WebSocket, la communication survient aux deux extrémités, ce qui en fait un protocole plus rapide. Dans le cas du protocole HTTP, la connexion est établie à une extrémité, ce qui la rend un peu plus lente que le protocole WebSocket.

WebSocket utilise une connexion TCP unifiée et nécessite une partie pour mettre fin à la connexion. Tant que cela se produit, la connexion reste active. Le protocole HTTP doit établir une connexion distincte pour chaque requête. Une fois la requête terminée, la connexion est interrompue automatiquement.

## Comment les connexions WebSocket sont-elles établies ?

Le processus commence par un établissement de connexion WebSocket qui implique l'utilisation d'un nouveau schéma (ws ou wss). Pour faire simple, considérez-les comme équivalents à HTTP et HTTP sécurisé (HTTPS) respectivement.

Avec ce système, les serveurs et les clients sont censés suivre le protocole de connexion standard WebSocket. L'établissement d'une connexion WebSocket commence par une mise à niveau de la requête HTTP qui comporte quelques en-têtes tels que Connection : Upgrade, Upgrade : WebSocket, Sec-WebSocket- Key, etc.

Voici comment établir cette connexion :

1. **Requête :** L'en-tête Connection Upgrade indique l'établissement de la connexion WebSocket, tandis que Sec-WebSocket-Key contient une valeur aléatoire codée en Base64. Cette valeur est générée arbitrairement lors de chaque établissement de connexion WebSocket. En plus de ce qui précède, l'en-tête de la clé fait également partie de cette requête.

Les en-têtes énumérés ci-dessus, lorsqu'ils sont combinés, forment une requête HTTP GET. Elle contiendra des données similaires :

```
GET ws://websocketexample.com:8181/ HTTP/1.1
Host : localhost:8181
Connection : Mise à niveau
Pragma : no-cache
Cache-Control : no-cache
Mise à niveau : websocket
Sec-WebSocket-Version : 13
Sec-WebSocket-Key : b6gjhT32u488lpuRwKaOWs==.
```

Pour clarifier Sec-WebSocket-Version, on peut expliquer la version du protocole WebSocket prête à être utilisée par le client.

2. **La réponse :** L'en-tête de réponse, Sec-WebSocket-Accept, comporte le reste de la valeur envoyée dans l'en-tête de la requête Sec-WebSocket-Key. Cela est lié à une spécification de protocole particulière et est largement utilisé pour éviter les informations trompeuses. En d'autres termes, cela renforce la sécurité de l'API et empêche les serveurs mal configurés de créer des erreurs dans le développement de l'application.

Si la demande envoyée précédemment aboutit, une réponse similaire à la séquence de texte ci-dessous sera reçue :

```
HTTP/1.1 101 Switching Protocols
Upgrade : websocket
Connection : Mise à jour
Sec-WebSocket-Accept : rG8wsswmHTJ85lJgAE3M5RTmcCE=
```

## Références

- ** [WebSockets APIs - MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)**
- ** [WebSocket - Javascript Info](https://javascript.info/websocket)**
