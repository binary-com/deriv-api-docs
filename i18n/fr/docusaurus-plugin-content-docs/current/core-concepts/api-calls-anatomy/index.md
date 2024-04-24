---
title: Anatomie des appels d'API
hide_title: false
draft: false
sidebar_label: Anatomie des appels d'API
sidebar_position: 1
tags:
  - concept
  - appels
  - anatomie
keywords:
  - trading
  - concept
  - appels
  - anatomie
description: Anatomie des appels d'API de Deriv
---

## S'abonner et envoyer

Tous les appels d'API disposent d'une fonctionnalité d'envoi qui permet de soumettre une demande et de recevoir une réponse. Certains appels d'API proposent également une fonctionnalité d'abonnement qui permet d'envoyer des mises à jour à votre application lorsque de nouvelles informations sont disponibles.

### Subscribe

Plusieurs appels d'API proposent la fonctionnalité `s'abonner`. Après votre abonnement à un appel d'API, vous recevrez un flux continu à partir des données de cet appel d'API en particulier.

Certains de ces appels d'API s'abonnent automatiquement (par exemple, [ticks](https://api.deriv.com/api-explorer#ticks)) et d'autres ont un champ facultatif `subscribe`. Si vous passez `1` au champ `subscribe`, l'abonnement démarrera et le serveur continuera à envoyer les données demandées jusqu'à votre désabonnement en appelant les appels d'API `Forget` ou `Forget all`.

Vous pouvez par exemple appeler [Historique des ticks](https://api.deriv.com/api-explorer#ticks_history) pour recevoir les données relatives à l'historique des ticks. Mais une fois que vous ajouterez l'option `subscribe` à cet appel, vous recevrez les données relatives à l'historique des ticks que vous avez demandées dans la première réponse. Ensuite, vous continuerez à recevoir une nouvelle réponse chaque fois qu'un nouveau tick sera publié par le serveur pour le symbole donné.

Dans le flux de messages provenant de `subscribe`, il existe un champ appelé `subscription`. Il s'agit du `Stream ID`. Cet identifiant vous permet d'identifier le flux de messages dans votre logique et d'arrêter le flux à l'aide des appels d'API `Forget` et `Forget All`.

Les données fournies par les appels d'API à l'aide de la fonctionnalité `subscribe` peuvent être utilisées comme source de données pour d'autres appels et fonctionnalités d'API.

### Envoyer

Si vous appelez l'API à l'aide de la fonctionnalité `envoyer`, le serveur ne renverra les données demandées qu'une seule fois. Pour obtenir des données à jour, vous devez renvoyer l'appel d'API. Cette méthode est généralement utilisée lorsque vous obtenez d'autres réponses à un appel d'API ou des événements d'interface utilisateur tels que `Click`, `Scroll`, etc.

### Forget

Si vous souhaitez arrêter le flux de messages créé par `subscribe`, vous devrez lancer l'appel d'API `Forget` avec le `Stream ID` approprié. Sinon, vous pouvez utiliser l'appel d'API `Forget All` pour arrêter les flux à l'aide de leur `Method name`.

: : :Attention  
Pour en savoir plus sur l'appel d'API `Forget`, consultez les sections relatives à [Forget](https://api.deriv.com/api-explorer#forget) et [Forget All](https://api.deriv.com/api-explorer#forget_all) dans l'API explorer.
:::

## Données de requête

Pour vous permettre de gérer plus facilement le flux de requêtes et de réponses de votre connexion WebSocket, chaque appel d'API Deriv WebSocket suit une structure normalisée. Vous pouvez l'utiliser pour la mise en cache, la validation, la synchronisation des requêtes et des réponses.

#### Nom de la méthode de l'appel d'API

Chaque `requête` de l'API WebSocket comprend un champ `nom de la méthode` qui sert d'identifiant unique de la requête. Dans la plupart des cas, `method name` recevra une valeur numérique de `1`. Cependant, dans certains cas, la propriété d'identifiant peut avoir une valeur de chaîne.

: : :Avertissement  
Le nom de la méthode de l'appel d'API est toujours requis. Ce champ indique les données que vous recevrez de notre serveur WebSocket.
:::

### Champs obligatoires

Les données de chaque requête comportent des champs obligatoires que vous devez renseigner, ainsi que de potentiels champs facultatifs. Parcourons-les à l'aide d'un exemple tiré de la `liste des résidences`.

Un appel `Residence List` renvoie une liste de pays et des codes de pays à deux lettres, qui peuvent être utilisés pour remplir le formulaire d'ouverture de compte.

Les données de requête de cet appel sont les suivantes :

```ts
{
  residence_list: 1; // Nom de la méthode de l'appel d'Api
  passthrough?: object; // Facultatif
  req_id?: number; // Facultatif
}
```

Le champ `residence_list` correspond au `method name` de l'appel et il est obligatoire. Le type de requête que vous souhaitez envoyer peut comporter des champs obligatoires supplémentaires. Pour en savoir plus sur `Residence List` et les autres appels d'API, consultez-les dans l'[API Explorer](https://api.deriv.com/api-explorer#residence_list).

### Champs facultatifs

Chaque appel comporte également plusieurs champs `Optional`. `Passthrough` et `req_id` font toujours partie des données de la requête, mais vous pouvez choisir de vous désinscrire et de ne pas les utiliser.

#### Le champ `passthrough`

Toute valeur que vous passez à ce champ vous sera renvoyé dans un objet `response` . Cela peut être utile lorsque vous souhaitez simuler un flux dynamique pour vos `requêtes` et `réponses`.

#### Le champ `req_id`

Il peut être nécessaire d'attribuer des `tag` à vos requêtes et de les faire passer par nos appels `WebSocket`. Pour ce faire, passez un `number` à ce champ. Cela peut être utile lorsque vous devez mapper des `requests` à des `responses`.

: : :Avertissement  
Pour en savoir plus sur les champs facultatifs supplémentaires spécifiques à chaque appel d'API, consultez notre [API Explorer](https://api.deriv.com/api-explorer).
:::

## Données de réponse

Lorsque vous recevez la réponse à l'appel, il y aura un `Field` portant le même nom que `method name`, qui contient les données réelles.

La réponse à l'appel `Residence List` :

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
} ;
```

Dans ce cas, le `residence_list` correspond à `method name` et il contient les données réelles que vous avez demandées. En bref, nous n'avons pas inclus le reste du tableau. Vous pouvez vérifier la réponse réelle [ici](https://api.deriv.com/api-explorer#residence_list).

#### Le champ `echo_req`

Ce `champ` contient les `données de requête` exactes que vous avez envoyées au serveur.

#### Le champ `msg_type`

Ce `Field` vous permet d'indiquer les données du `message` que vous recevez dans l'événement message de la connexion WebSocket. Par exemple, le gestionnaire d'événement `onmessage` de votre connexion WebSocket dans `JavaScript` serait :

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

#### Le champ `req_id`

Il s'agit du champ `Optional` transmis aux `Request Data` que vous pouvez utiliser à des fins de `validation`, de `synchronization`, de `caching`, etc.

: : :Conseil  
Le `msg_type` est toujours présent sur les données de réponse.
:::
