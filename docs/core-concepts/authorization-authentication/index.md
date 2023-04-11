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

![](/img/token_api.png)

#### Deriv App ID

In Dashboard select **Register application** tab and create you application with appropriate options, you can change these config in **Manage application** tab as well.

:::caution
You need a token with \`admin\` scope to create application.
:::