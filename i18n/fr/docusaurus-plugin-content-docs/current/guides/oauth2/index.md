---
title: OAuth2
hide_title: true
draft: false
sidebar_label: OAuth2
sidebar_position: 4
tags:
  - concept
  - gagner
  - gain
  - commission
  - majoration
keywords:
  - concept
  - gagner
  - gain
  - commission
  - majoration
description: Qu'est-ce que OAuth2 ?
---

## Qu'est-ce que OAuth2 ?

OAuth signifie Open Authorization, un protocole qui permet à un client d'accéder aux ressources d'un utilisateur sur un serveur sans révéler ses identifiants de connexion.

Ce type d'autorisation permet aux clients de se connecter à des applications tierces à l'aide de leurs comptes Deriv sans créer de jeton API. Dans ce cas, l'application tierce n'accède pas au mot de passe ou au jeton API permanent de l'utilisateur, ce qui la rend plus sûre.

L'authentification OAuth2 nécessite des étapes de configuration supplémentaires, mais c'est le moyen le plus sûr pour les développeurs d'autoriser l'accès à leur application aux clients.

Pour plus d'informations sur OAuth2, [lisez ce guide](https://aaronparecki.com/oauth-2-simplified/).

### Comment utiliser l'autorisation OAuth

1. Spécifiez l'URL qui sera utilisé comme **URL de redirection OAuth** sur la page d'inscription de l'application dans le champ **URL du site Web**.

2. Ajoutez un bouton de connexion sur votre site Web ou votre application et dirigez les utilisateurs à l'adresse `https://oauth.binary.com/oauth2/authorize?app_id=your_app_id` où your_app_id correspond à l'identifiant de votre application.

3. Après son inscription, l'utilisateur est redirigé vers l'URL que vous avez saisi comme **URL de redirection**. Des arguments, ainsi que des jetons de session, seront ajoutés à cet URL, ce qui ressemblera à ceci : `https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd&state=`

4. Dans les paramètres de l'URL, vous verrez tous les comptes et le jeton de session de chaque compte. Passez ces jetons à l'appel d'API Authorize afin d'effectuer des actions au nom du compte.
