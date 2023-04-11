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
Without authentication and authorization you'll only get access to roughly half of our API calls and features. for example in order to buy contracts or utilize the \`Copy Trading\` features you have to authenticate and authorize your users.

## Before we start

You have to make sure you have all the requirements mentioned bellow to continue with `authorization` and `authentication`.

### Requirements

1. Deriv Account 
2. Deriv API Token with the appropriate access level
3. Deriv App ID 

:::danger
For the reviewer, Links in this section will be provided in the future.
:::

#### Deriv Account

If you don't have a deriv account already you can visit the Sign Up page and create one, it's completly free. and if you already have an account please login with your account. for testing purposes and to prevent accidental money loss, make sure you're using your demo account not the real one for now.

#### Deriv API Token

Please visit our Dashboard to create your API token, in the **Manage Tokens** tab create your token with the appropriate access level required by your application features.

![deriv API token creation](/img/token_api.png "deriv API token creation")

:::caution
You need a token with \`admin\` scope to create application.
:::

#### Deriv App ID

In Dashboard select **Register application** tab and create you application with appropriate options, you can change these config in tab **Manage applications** as well.

Make sure the **Authorization** and **Verification** URLs are correct based on your implementation.

![create deriv application](/img/create_app_id.png "deriv application creation")

:::caution
For detailed instructions on how to create deriv applications, please refer to [Setting up a Deriv Application](docs/application_setup)
:::

## Authentication Process

Third-party developers can authorize calls to the API in two different ways: via API token or via OAuth2.

### API Token

An API token is a unique identifier of a client that requests access from a server. It's the simplest way of authorization.

The access level for each API token has to match the required access level of each API call, which can be found in the [API Explorer](https://api.deriv.com/api-explorer) as well.

For example, on the screenshot below, you can see that to be able to use the Account Status, a token with read access level must be used.

![](/img/scope_api_explorer.png)

Following the authorization of a Websocket connection, subsequent calls on that connection will be considered user actions.

Please bear in mind that the API token can be used with any app, so both your app and your clients need to keep it secure.

### OAuth2

OAuth stands for Open Authorization - a protocol that allows a client access resources hosted on a server on behalf of the user without revealing the credentials.

This type of authorization allows clients to log in to third-party apps using their Deriv accounts without creating an API token. In this case, the third-party app does not see the user's password or permanent API token, which makes it safer.

The OAuth2 authentication requires more steps to set up, but it is the safest way for developers to share access to their app with their clients.

For more information on OAuth2, visit [this guide](https://aaronparecki.com/oauth-2-simplified/).

Here is the visual representation of how the OAuth authorization connection works:

![](/img/how_oauth_works.png)