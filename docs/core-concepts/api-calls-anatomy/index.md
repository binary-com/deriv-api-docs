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

## API Call Types

We provide two types of API calls, `Subscription` and `Send Once` ( Fire and Forget )

### Subscription

Some API calls provide `subscription` ability, which means when you subscribe to them every time that particular event happens for example [Tick History](https://api.deriv.com/api-explorer#ticks_history), these API calls have an `optional` `subscription` field, which if you pass `1` to them, the subscription starts. most of the time data provided by this type of calls will be considered as data source for other calls or features.

### Send Once

`Send Once` API calls are just for getting some data as the name says for once. so if you want to get the updated data you have to send the API call again and get the updated data, most of the time API calls of this type will be used based on other other calls responses or even UI event events such as `Click`, `Scroll`, etc.

In order to make it easier for you to handle the `request` and `response` flow of your websocket connection, every deriv websocket API calls has a general structure. you can use them for caching, validation, request and response synchronization, etc.

## Request Data Anatomy

Request data anatomy means the `data` you send to the `websocket_connection.send` function, it doesn't matter if it's a `subscription` or a just `send once` request.

### Identifier Field

Every `request` has an `Identifier` field which is `unique` which gets usually a `number` or `1` as value.

:::caution
Identifier field is always required.
:::

### Required Fields

Every request data has several required fields which you must provide them and they may contain optional fields as well, let's explore this with an example on `Residence List`:

`Residence List` Call returns a list of countries and 2-letter country codes, suitable for populating the account opening form.

Request data for this call is like so:

```ts
interface IAssetIndex {
  residence_list: 1; // it must always be `1`
  passthrough?: object;
  req_id?: number;
}
```

The `residence_list` field is the `Identifier Field` for the call and is required here, there may other required fields which are related to type of the request you wanna send. if you want to know more about `Residence List` check [it](https://api.deriv.com/api-explorer#residence_list) out here.

### Optional Fields

Every Call has several `Optional` fields as well, `passthrough` and `req_id` are always part of the request data but you can choose to opt-out and not use them.

#### Passthrough Field

Whatever you pass to this field will be returned back to you on `response` object, this can be helpful when you wanna simulate some kinda stateful like flow for your `requests` and `responses`.

#### Req Id Field

You may want to `tag` your requests and pass them through our `websocket` calls. you can do it by passing a `number` to this field. it can be helpful when you wanna map `requests` to `responses`.

:::tip
`passthrough` and `req_id` are always optional and present in any API call.
:::

:::caution
There may be other optional fields for a request which are only related to that api call, please check our [API Explorer](https://api.deriv.com/api-explorer) to get familiar with them.
:::

## Response Data Anatomy

When you get the response for the call, there will be a `Field` with the same name as the `Identifier`. and it contains the actual data.

The response for the `Residence List` Call would be something like so:

```js
const response = {
  echo_req: {
    req_id: 1,
    residence_list: 1,
  },
  msg_type: 'residence_list',
  req_id: 1,
  residence_list: [...],
};
```

Here the `residence_list` is the `Identifier Field` and it contains the actual data you requested. the array is removed here for brevity sake, you can check the actual real response [here](https://api.deriv.com/api-explorer#residence_list).

### The `echo_req` Field

As you can see this `Field` contains the exact `Request Data` you sent to the server.

### The `msg_type` Field

This `Field` help you understand what kind of message you're getting on `message` event of the websocket connection. for example your `onmessage` event handler can be something like this:

```js
socket.onmessage = (event) => {
  const receivedMessage = JSON.parse(event.data);

  switch (receivedMessage.msg_type) {
    case "residence_list":
      console.log("The residence list is : ",receivedMessage.residence_list)
      break;
    case "some_other_request_identifier"
      console.log("the response", receivedMessage.some_other_request_identifier)
    default:
      console.log("receivedMessage", receivedMessage)
      break;
  }
}
```

So based on the `msg_type` you get in the response, you can update your logic.

### The `req_id` Field

This is the `Optional` passed to the `Request Data`, you can use it for `validation`, `synchronization`, `caching`, etc.

:::tip
The `msg_type` is always present on the response data.
:::
