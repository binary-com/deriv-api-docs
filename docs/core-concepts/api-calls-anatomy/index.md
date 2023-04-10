---
title: API Calls Anatomy
hide_title: true
draft: false
sidebar_label: API Calls anatomy
sidebar_position: 1
tags:
  - concept
keywords:
  - trading
  - concept
description: Deriv API calls Anatomy
---
## Subscribe and Send

Every API call has the send functionality and several API calls provide the subscribe functionality.

### Subscribe

Several API calls provide `subscribe` functionality, they create stream of messages for you, which means when you subscribe to them every time that particular event happens for example [Tick History](https://api.deriv.com/api-explorer#ticks_history), you'll get the updated values and data.

These API calls have an `optional` `subscribe` field, and if you pass `1` to them, the subscription will start and server will continue to send the requested data until you call the `forget`  for your API call you want to `unsubscribe` or `forget`.

Usually data provided by this type of calls will be considered as data source for other API calls or features.

:::caution
For more information on forget API call please check [Forget](https://api.deriv.com/api-explorer#forget) and [Forget All](https://api.deriv.com/api-explorer#forget_all) out in API explorer.
:::

### Send

If you call an API call with `send` functionality, server will only send back the requested data one time. so if you need to get the updated data you have to send the API call again, usually this method will be used based on other other API call responses or UI events such as `Click`, `Scroll`, etc.

## Request Data

In order to make it easier for you to handle the `request` and `response` flow of your websocket connection, every deriv websocket API calls has a general structure. you can use it for caching, validation, request and response synchronization, etc.

### API Call Method Name

Every `request` has a `method name` field which gets usually a `number` or `1` as value.

:::caution
API Call Method Name is always required. this field determines the data you'll get from our websocket server.
:::

### Required Fields

Every request data has several required fields which you must provide them and they may contain optional fields as well, let's explore this with an example on `Residence List`:

`Residence List` Call returns a list of countries and 2-letter country codes, suitable for populating the account opening form.

Request data for this call is like so:

```ts
{
  residence_list: 1; // Api Call Method Name
  passthrough?: object; // Optional
  req_id?: number; // Optional
}
```

The `residence_list` field is the `method name` for the call and is required, there may be other required fields which are related to type of the request you wanna send. if you want to know more about `Residence List` and other API calls please check them out in [API Explorer](https://api.deriv.com/api-explorer#residence_list).

### Optional Fields

Every Call has several `Optional` fields as well, `passthrough` and `req_id` are always part of the request data but you can choose to opt-out and not use them.

#### Passthrough Field

Whatever you pass to this field will be returned back to you on `response` object, this can be helpful when you need to simulate stateful flow for your `requests` and `responses`.

#### Req Id Field

You may want to `tag` your requests and pass them through our `websocket` calls. you can do it by passing a `number` to this field. it can be helpful when you need to map `requests` to `responses`.

:::caution
There may be other optional fields for a request which are only related to that API call, please check our [API Explorer](https://api.deriv.com/api-explorer) to get familiar with them.
:::

## Response Data

When you get the response for the call, there will be a `Field` with the same name as the `method name`. and it contains the actual data.

The response for the `Residence List` call:

```js
{
  echo_req: {
    req_id: 1,
    residence_list: 1,
  },
  msg_type: 'residence_list',
  req_id: 1,
  residence_list: [
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
                            }
                        },
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
            "tin_format": [
                "^[A-Ta-t0-9]\\d{8}[A-Wa-w]$"
            ],
            "value": "al"
        },
        // ....
  ],
};
```

Here the `residence_list` is the `method name` and it contains the actual data you requested. the array is removed here for brevity sake, you can check the actual response [here](https://api.deriv.com/api-explorer#residence_list).

### The `echo_req` Field

This `Field` contains the exact `Request Data` we sent to the server.

### The `msg_type` Field

This `Field` helps you determine which message data you're getting on `message` event of the websocket connection. for example your `onmessage` event handler for you websocket connection is `Javascript` would be:

```js
socket.onmessage = (event) => {
  const receivedMessage = JSON.parse(event.data);

  switch (receivedMessage.msg_type) {
    case "residence_list":
      console.log("The residence list is : ",receivedMessage.residence_list)
      break;
    case "other_request_identifier"
      console.log("the response", receivedMessage.some_other_request_identifier)
    default:
      console.log("receivedMessage", receivedMessage)
      break;
  }
}
```

### The `req_id` Field

This is the `Optional` passed to the `Request Data`, you can use it for `validation`, `synchronization`, `caching`, etc.

:::tip
The `msg_type` is always present on the response data.
:::