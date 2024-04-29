---
title: Configuration d'une application Deriv
sidebar_label: Configuration d'une application Deriv
sidebar_position: 7
tags:
  - intro
  - application
  - configuration
keywords:
  - intro
  - application
  - configuration
description: Comment configurer l'application Deriv
---

:::Attention
Pour le réviseur, les liens de cette section seront fournis à l'avenir.
:::

#### Compte Deriv

Si vous n'avez pas encore de compte Deriv, vous pouvez facilement en créer un en visitant notre page d'inscription ou à l'aide de l'appel d'API [new_account_virtual](/api-explorer#new_account_virtual). C'est totalement gratuit. En revanche, si vous avez déjà un compte, veuillez vous connecter à l'aide des identifiants de votre compte. Pour éviter toute perte accidentelle de fonds pendant les tests, nous vous recommandons d'utiliser votre compte de démo plutôt qu'un compte réel.

Pour gagner une majoration, ouvrez un compte réel Deriv pour recevoir vos gains mensuels. Vous pouvez également créer un compte réel à l'aide des appels d'API [new_account_real](/api-explorer#new_account_real) ou [new_account_maltainvest](/api-explorer#new_account_maltainvest).

:::Avertissement
Pour créer des applications Deriv, vous aurez besoin d'un jeton API le champ Admin pour le compte que vous souhaitez utiliser pour votre application.
:::

## Comment créer un jeton API Deriv

Pour créer votre jeton API, accédez simplement au tableau de bord et sélectionnez l'onglet **Gérer les jetons**. Créez ensuite un nouveau jeton correspondant au niveau d'accès requis pour les fonctionnalités de votre application.

Pour créer un nouveau jeton API, procédez comme suit :

1. Sélectionnez les champs qu'il vous faut.
2. Nommez votre jeton
3. Cliquez sur **Créer**

Vous pouvez également créer un jeton API grâce à l'appel d'API [api_token](/api-explorer#api_token).

:::Avertissement
Vous avez besoin d'un jeton disposant de l'accès `Admin` pour créer une application.
:::

## Comment créer une application Deriv

Pour créer votre application avec les options de configuration appropriées, sélectionnez l'onglet **Enregistrer une application** dans le tableau de bord. Vous pouvez modifier la configuration de votre application quand vous le souhaitez dans l'onglet **Gérer les applications**.

| Champ d'informations sur l'application | Description                                                                                                     |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Compte                                 | Le compte avec lequel vous voulez créer l'application                                                           |
| Jeton API                              | Le jeton API avec lequel vous souhaitez créer l'application                                                     |
| Nom de l'application                   | Nom de l'application                                                                                            |
| Majoration                             | La commission ajoutée au prix de la transaction pour obtenir un revenu supplémentaire                           |
| URL d'autorisation                     | L'URL qui permet aux clients de se connecter à votre application à l'aide de leurs comptes Deriv sans jeton API |
| URL de vérification                    | L'URL de redirection OAuth pour l'autorisation OAuth                                                            |

**Pour créer une application, procédez comme suit :**

1. Sélectionnez le compte avec lequel vous souhaitez créer l'application.
2. Sélectionnez le jeton API ajouté à votre compte (il doit avoir l'accès \`Admin\`).
3. Nommez votre application.
4. Remplissez les champs **Majoration** et **Détails OAuth** .
5. Sélectionnez les **Champs d'autorisation** nécessaires à votre application.
6. Cliquez sur **Enregistrer l'application**.

Assurez-vous que les URL **Autorisation** et **Vérification** sont corrects en fonction de votre implémentation.

Par exemple, si votre domaine est **`https://example.com`** et que **votre autorisation et votre authentification sont gérées par** `verfiy`, vos URL correspondront à :

**`https://example.com/verify`**
