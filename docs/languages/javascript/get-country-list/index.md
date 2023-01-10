---
title: Get list of countries
sidebar_label: Get list of countries
sidebar_position: 2
tags:
  - country_list
  - javascript
keywords:
  - country_list
  - javascript
description: How to get list of countries in deriv api?
---

:::caution
You can learn more about countries [here](/docs/core-concepts/residence-list)
:::

To get countries list, please update the `open` event listener like so:

```js
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);
});
```

Now update the `message` event listener to render the data:

```js
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('get countries response', receivedMessage);
});
```

the response should be an object:

```json
{
  "echo_req": {
    "req_id": 1,
    "residence_list": 1
  },
  "msg_type": "residence_list",
  "req_id": 1,
  "residence_list": [
    {
      "identity": {
        "services": {
          "idv": {
            "documents_supported": {},
            "has_visual_sample": 0,
            "is_country_supported": 0
          },
          "onfido": {
            "documents_supported": {},
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
      "tin_format": ["^[A-Ta-t0-9]\\d{8}[A-Wa-w]$"],
      "value": "al"
    }
  ]
}
```

We this call, you'll get useful information for the supported countries, such as:

- `2-letter` code for each country
- `Identity` service providers for each country
- Country Tax Identifier Format (`tin_format`)
- etc

This can be useful on account creation forms, in which you need to ask your users to provide validated information about their identity base on their country of residence.

:::caution
For address, tax ID validations please the provided `tin_format` for the country.
:::

The country of your users is important for our next steps, since with it you can determine which assets and features the client can use.

:::tip
It's better if you get the list of countries before populating your form.
:::

:::danger
We need detailed content about `IDV` and `ONFIDO` identity services, their differences and possibilities
:::
