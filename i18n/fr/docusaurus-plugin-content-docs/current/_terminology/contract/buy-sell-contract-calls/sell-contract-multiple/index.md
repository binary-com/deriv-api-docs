---
title: 'Contrats de vente : Comptes multiples'
hide_title: false
draft: false
sidebar_label: 'Contrats de vente : Comptes multiples'
sidebar_position: 4
tags:
  - concepts
  - vente
  - contrat
  - multiples
  - comptes
  - terminologie
keywords:
  - concepts
  - vente
  - contrat
  - multiples
  - comptes
  - terminologie
description: "Qu'est-ce que l'appel d'API de contrats de vente pour des comptes multiples ?"
---

### Qu'est-ce que l'appel d'API de contrats de vente pour des comptes multiples ?

Contrats de vente pour comptes multiples simultanément.

Utilise la réponse à code court de `buy_contract_for_multiple_accounts` pour identifier le contrat, ainsi que les jetons d'autorisation afin de sélectionner les comptes sur lesquels vendre ces contrats.

Notez que seuls les comptes identifiés par les jetons seront affectés. Le contrat ne sera pas vendu sur le compte actuellement autorisé, à moins que vous n'incluiez le jeton pour le compte actuel.
