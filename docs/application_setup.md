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

#### Deriv API Token

Please visit our Dashboard to create your API token, in the **Manage Tokens** tab create your token with the appropriate access level required by your application features.

:::caution
You need a token with \`admin\` scope to create application.
:::

#### Deriv App ID

In Dashboard select **Register application** tab and create you application with appropriate options, you can change these config in tab **Manage applications** as well.

Make sure the **Authorization** and **Verification** URLs are correct based on your implementation.

:::caution
For detailed instructions on how to create deriv applications, please refer to [Setting up a Deriv Application](docs/application_setup)
:::