---
title: Tick
hide_title: false
draft: false
sidebar_label: Tick
sidebar_position: 0
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

when you subscribe to this functionality every second you'll an object like so: 

```jsonc
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