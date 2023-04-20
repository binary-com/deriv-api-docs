---
title: Setting up a Deriv Application
sidebar_label: Setting up a Deriv Application
sidebar_position: 7
tags:
  - intro
  - application_setup
keywords:
  - intro
  - application_setup
description: How to setup Deriv Application
---
:::danger
For the reviewer, Links in this section will be provided in the future.
:::

#### Deriv Account

If you don't have a deriv account already you can visit the Sign Up page and create one, it's completely free. and if you already have an account please login with your account. for testing purposes and to prevent accidental money loss, make sure you're using your demo account not the real one for now.

:::caution
To create Deriv Applications you need an API Token with **admin** scope in the account you want to create your application with
:::

## How to create Deriv API Token



Please visit our Dashboard to create your API token, in the **Manage Tokens** tab create your token with the appropriate access level required by your application features.

**API Token Scopes:**

| API Token Scope     | Description                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Read                | This scope will allow third-party apps to view your account activity, settings, limits, balance sheets, trade purchase history, and more. |
| Trade               | This scope will allow third-party apps to buy and sell contracts for you, renew your expired purchases, and top up your demo accounts.    |
| Payments            | This scope will allow third-party apps to withdraw to payment agents and make inter-account transfers for you.                            |
| Trading Information | This scope will allow third-party apps to view your trading history.                                                                      |
| Admin               | This scope will allow third-party apps to open accounts for you, manage your settings and token usage, and more.                          |

![](/img/token_api.png)

To create a new API Token, follow these steps:

1. Select the scopes you need.
2. Provide a name for you token
3. Click **Create**

:::caution
You need a token with `admin` scope to create application.
:::

## How to create Deriv Application



In Dashboard select **Register application** tab and create you application with appropriate options, you can change these config in tab **Manage applications** as well.

| App Information Field | Description                                                                               |
| --------------------- | ----------------------------------------------------------------------------------------- |
| Account               | The account you want to create the application with                                       |
| API Token             | The API token you want to create the application with                                     |
| App Name              | Application Name                                                                          |
| Markup                | You can earn commission by adding a markup to the price of each trade                     |
| Authorization URL     | This allows clients to log in to your app using their Deriv accounts without an API token |
| Verification URL      | This URL will be used as the OAuth redirect URL for the OAuth authorization.              |

**To create an application follow these steps:**

1. Select the account you want to create the application with.
2. Select the API token added to your account ( it must have \`admin\` scope )
3. Provide a name for your application
4. Fill the **Markup** and **OAuth details** fields.
5. Select the **Authorization Scopes** needed by your application
6. Click **Click Register Application**

Make sure the **Authorization** and **Verification** URLs are correct based on your implementation.

For example, if your domain is **`https://example.com`** and your **Authorization and Authentication is being handled by** `verfiy`, your URLs will be:

**`https://example.com/verify`**