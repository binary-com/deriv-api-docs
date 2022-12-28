---
title: Residence List
hide_title: false
draft: false
sidebar_label: Residence List
sidebar_position: 2
tags:
  - concepts
  - resident-list
keywords:
  - concepts
  - resident-list
description: what is resident list in dervi api
---

List of countries and 2-letter country codes, suitable for populating the account opening form.

the example list can be something like so:

```json
[
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
            "passport": {
              "display_name": "Passport"
            }
          },
          "is_country_supported": 0
        }
      }
    },
    "phone_idd": "93",
    "text": "Afghanistan",
    "value": "af"
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
          "documents_supported": {},
          "is_country_supported": 0
        }
      }
    },
    "phone_idd": "35818",
    "text": "Aland Islands",
    "value": "ax"
  }
]
```

You can read more about the `Resident List` on [API Explorer - Resident List](https://api.deriv.com/api-explorer#residence_list)
