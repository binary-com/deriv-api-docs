---
title: Tick
hide_title: false
draft: false
sidebar_label: Tick
sidebar_position: 3
tags:
  - tick
  - concept
keywords:
  - tick
  - trading
  - concept
description: What is a tick in deriv api
---

A tick is a measure of minimum upward or downward movement in the price of a trading commodity. We subscribe to the ticks functionality from the Deriv API web socket, which will return new tick data every second.

the example response for the `R_50` [Symbol](/docs/core-concepts/active-symbols/) to this functionality every second you'll an object like so:

```json
{
  "ask": 218.6403,
  "bid": 218.6203,
  "epoch": 1672127936,
  "id": "c21e5fcf-b0c4-6c23-2254-437bcc3f6176",
  "pip_size": 4,
  "quote": 218.6303,
  "symbol": "R_50"
}
```

You can read more about the `tick` on [API Explorer - Ticks](https://api.deriv.com/api-explorer#ticks)
