---
title: Autorisation et authentification
hide_title: false
draft: false
sidebar_label: Autorisation et authentification
sidebar_position: 2
tags:
  - authentification
  - autorisation
keywords:
  - deriv-authentication
  - deriv-authorisation
description: Autorisation et authentification de Deriv API
---

Sans autorisation ni authentification, vous n'aurez accès qu'à une partie de nos appels et fonctionnalités d'API. Par exemple, pour acheter des contrats ou utiliser les fonctions `Copier la transaction`, vos utilisateurs devront être authentifiés et autorisés par notre fournisseur **OAuth** ainsi que le **Serveur WebSocket**.

## Avant de commencer...

Assurez-vous que vous remplissez toutes les conditions ci-dessous pour continuer.

### Exigences

1. Compte Deriv
2. Jeton API Deriv avec le niveau d'accès approprié
3. Identifiant de l'application Deriv

: : :Remarque  
Reportez-vous à la section [Configuration d'une application Deriv](docs/setting-up-a-deriv-application.md) pour obtenir des instructions détaillées sur la façon de créer un jeton et une application API Deriv.
:::

### Jeton API

Un jeton API est l'identifiant unique d'un client qui demande l'accès à un serveur. C'est la méthode d'autorisation la plus simple.

Le niveau d'accès de chaque jeton API doit correspondre au niveau d'accès requis pour chaque appel d'API, également accessible à partir de [API Explorer](https://api.deriv.com/api-explorer).

Par exemple, sur la capture d'écran ci-dessous, vous constaterez qu'un jeton avec un niveau d'accès en lecture est nécessaire pour pouvoir accéder au statut du compte.

![](/img/acc_status_scope_api_explorer.png)

Suite à l'autorisation d'une connexion WebSocket, les appels suivants de cette connexion seront considérés comme des actions de l'utilisateur.

N'oubliez pas que le jeton API peut être utilisé avec n'importe quelle application. Votre application et vos clients doivent donc la sécuriser.

### OAuth2

OAuth signifie `Open Authorization`, un protocole qui permet à un client d'accéder à des ressources hébergées sur un serveur pour le compte de l'utilisateur sans révéler ses données personnelles.

Ce type d'autorisation permet aux clients de se connecter à des applications tierces à l'aide de leurs comptes Deriv sans créer de jeton API. Dans ce cas, l'application tierce n'a pas accès au mot de passe ou au jeton API permanent de l'utilisateur, ce qui la rend plus sûre.

La configuration de l'authentification OAuth2 nécessite des étapes supplémentaires, mais c'est le moyen le plus sûr pour les développeurs de partager l'accès à leur application avec leurs clients.

Pour en savoir plus sur OAuth2, lisez [ce guide](https://aaronparecki.com/oauth-2-simplified/).

Voici la représentation visuelle du fonctionnement de la connexion d'autorisation OAuth :

![Flux OAuth](/img/how_oauth_works.png 'Flux OAuth')

## Processus d'authentification

Pour authentifier votre utilisateur, spécifiez l'URL qui sera utilisé comme URL de redirection OAuth sur la page [Tableau de bord](/dashboard), l'onglet **Enregistrer l'application** dans les champs **Détails OAuth**. Ajoutez ensuite un bouton de connexion sur votre site Web ou votre application et dirigez les utilisateurs à l'adresse **`https://oauth.binary.com/oauth2/authorize?app_id=your_app_id`** où your_app_id est l'identifiant de votre application.

![Connexion Deriv OAuth](/img/oauth_login.png 'Connexion Deriv OAuth')

Après l'inscription ou la connexion d'un utilisateur, il est redirigé vers l'URL que vous avez saisi comme URL de redirection. Des arguments seront ajoutés à cet URL avec les jetons de session de l'utilisateur et ressemblera à ceci :

`https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd`

## Processus d'autorisation

Les paramètres de requête figurant dans l'URL de redirection correspondent aux comptes de l'utilisateur et les jetons de session associés. Vous pouvez mapper les paramètres de requête à un tableau au moyen de l'approche suivante :

```js
const user_accounts = [
  {
    account: 'cr799393',
    token: 'a1-f7pnteezo4jzhpxclctizt27hyeot',
    currency: 'usd',
  },
  {
    account: 'vrtc1859315',
    token: 'a1clwe3vfuuus5kraceykdsoqm4snfq',
    currency: 'usd',
  },
];
```

Pour autoriser l'utilisateur sur la base du compte **sélectionné** par l'utilisateur, lancez l'appel d'API [authorize](https://api.deriv.com/api-explorer#authorize) avec le **jeton de session** du compte **sélectionné** par l'utilisateur :

```js
{
  "authorize" : "a1-f7pnteezo4jzhpxclctizt27hyeot"
}
```

La réponse à l'appel `authorize` sera un objet comme celui ci-dessous :

```js
{
    "account_list" : [
      {
        "account_type" : "trading",
        "created_at" : 1647509550,
        "currency" : "USD",
        "is_disabled" : 0,
        "is_virtual" : 0,
        "landing_company_name" : "svg",
        "loginid" : "CR799393",
        "trading" : {}
      },
      {
        "account_type" : "trading",
        "created_at" : 1664132232,
        "currency" : "ETH",
        "is_disabled" : 0,
        "is_virtual" : 0,
        "landing_company_name" : "svg",
        "loginid" : "VRTC1859315",
        "trading" : {}
      },
    ],
    "balance" : 0,
    "country" : "id",
    "currency" : "USD",
    "email" : "user_mail@email_provider.com",
    "fullname" : " John Doe",
    "is_virtual" : 0,
    "landing_company_fullname" : "Deriv (SVG) LLC",
    "landing_company_name" : "svg",
    "local_currencies" : {
      "IDR" : {
        "fractional_digits" : 2
      }
    },
    "loginid" : "CR799393",
    "preferred_language" : "EN",
    "scopes" : [
      "read",
      "trade",
      "trading_information",
      "payments",
      "admin"
    ],
    "trading" : {},
    "upgradeable_landing_companies" : [
      "svg"
    ],
    "user_id" : 12345678
}
```

L'utilisateur est désormais autorisé et vous pouvez utiliser les appels d'API Deriv pour ce compte.
