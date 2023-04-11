---
title: Authorization and Authentication
hide_title: false
draft: false
sidebar_label: Authorization and Authentication
sidebar_position: 2
tags:
  - authentication
  - authorization
keywords:
  - deriv-authentication
  - deriv-authorization
description: deriv api authentication and authorization
---
Without authentication and authorization you'll only get access to roughly half of our API calls and features. for example in order to buy contracts or utilize the `Copy Trading` features you have to authenticate and authorize your users.

## Before we start

You have to make sure you have all the requirements mentioned bellow to continue with `authorization` and `authentication`.

### Requirements

1. Deriv Account 
2. Deriv API Token with the appropriate access level
3. Deriv App ID 

:::note
Please refer to [Setting up a Deriv Application](docs/application_setup) for detailed instruction how to create Deriv API token and Applications
:::

## Authentication Process

Third-party developers can authorize calls to the API in two different ways: via API token or via OAuth2.

### API Token

An API token is a unique identifier of a client that requests access from a server. It's the simplest way of authorization.

The access level for each API token has to match the required access level of each API call, which can be found in the [API Explorer](https://api.deriv.com/api-explorer) as well.

For example, on the screenshot below, you can see that to be able to use the Account Status, a token with read access level must be used.

![](/img/acc_status_scope_api_explorer.png)

Following the authorization of a Websocket connection, subsequent calls on that connection will be considered user actions.

Please bear in mind that the API token can be used with any app, so both your app and your clients need to keep it secure.

### OAuth2

OAuth stands for Open Authorization - a protocol that allows a client access resources hosted on a server on behalf of the user without revealing the credentials.

This type of authorization allows clients to log in to third-party apps using their Deriv accounts without creating an API token. In this case, the third-party app does not see the user's password or permanent API token, which makes it safer.

The OAuth2 authentication requires more steps to set up, but it is the safest way for developers to share access to their app with their clients.

For more information on OAuth2, visit [this guide](https://aaronparecki.com/oauth-2-simplified/).

Here is the visual representation of how the OAuth authorization connection works:

![](/img/how_oauth_works.png)

## Sign In / Sign Up

In order to Authenticate your user, specify the URL that will be used as the OAuth Redirect URL on the [Dashboard](/dashboard) page, **Register application** tab in the **OAuth details** fields and then Add a login button on your website or app and direct users to **https://oauth.binary.com/oauth2/authorize?app_id=your_app_id** where your_app_id is the ID of your app.