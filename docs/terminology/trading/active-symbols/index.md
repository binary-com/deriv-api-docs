---
title: Active Symbols
hide_title: false
draft: false
sidebar_label: Active Symbols
sidebar_position: 4
tags:
  - concepts
  - active-symbols
keywords:
  - concepts
  - active-symbols
description: What is active active symbols in deriv api
---

Basically it's the List of all currently active symbols (underlying markets upon which contracts are available for trading). you'll need this through out your application since it's what determines your [Tick](/docs/terminology/trading/tick/) stream request.

when you get the `active_symbols` you'll get :

```json
[
  {
    "allow_forward_starting": 0,
    "display_name": "AUD/JPY",
    "display_order": 1,
    "exchange_is_open": 1,
    "is_trading_suspended": 0,
    "market": "forex",
    "market_display_name": "Forex",
    "pip": 0.001,
    "subgroup": "none",
    "subgroup_display_name": "None",
    "submarket": "major_pairs",
    "submarket_display_name": "Major Pairs",
    "symbol": "frxAUDJPY",
    "symbol_type": "forex"
  },
  {
    "allow_forward_starting": 0,
    "display_name": "AUD/USD",
    "display_order": 2,
    "exchange_is_open": 1,
    "is_trading_suspended": 0,
    "market": "forex",
    "market_display_name": "Forex",
    "pip": 0.00001,
    "subgroup": "none",
    "subgroup_display_name": "None",
    "submarket": "major_pairs",
    "submarket_display_name": "Major Pairs",
    "symbol": "frxAUDUSD",
    "symbol_type": "forex"
  },
  {
    "allow_forward_starting": 0,
    "display_name": "BTC/USD",
    "display_order": 0,
    "exchange_is_open": 1,
    "is_trading_suspended": 0,
    "market": "cryptocurrency",
    "market_display_name": "Cryptocurrencies",
    "pip": 0.001,
    "subgroup": "none",
    "subgroup_display_name": "None",
    "submarket": "non_stable_coin",
    "submarket_display_name": "Cryptocurrencies",
    "symbol": "cryBTCUSD",
    "symbol_type": "cryptocurrency"
  }
]
```

You can read more about the `Active Symbols` on [API Explorer - Active Symbols](https://api.deriv.com/api-explorer#active_symbols)
