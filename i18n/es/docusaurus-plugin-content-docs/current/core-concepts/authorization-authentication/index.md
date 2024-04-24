---
title: Autorización y autenticación
hide_title: false
draft: false
sidebar_label: Autorización y autenticación
sidebar_position: 2
tags:
  - autentificación
  - autorización
keywords:
  - autenticación deriv
  - autorización deriv
description: Autorización y autenticación del Deriv API
---

Sin autorización ni autenticación, solo tendrá acceso a aproximadamente la mitad de nuestras funciones y llamadas API. Por ejemplo, para comprar contratos o utilizar las funciones de `Copy Trading`, sus usuarios deben estar autenticados y autorizados por nuestro proveedor **OAuth** y **WebSocket Server**.

## Antes de empezar

Asegúrese de cumplir con todos los requisitos que se mencionan a continuación para continuar.

### Requisitos

1. Cuenta Deriv
2. Token de Deriv API con el nivel de acceso adecuado
3. ID de aplicación Deriv

:::note
Consulte [Setting up a Deriv application](/docs/setting-up-a-deriv-application) para obtener instrucciones detalladas sobre cómo crear un token y una aplicación de API de Deriv.
:::

### Token API

Un Token API es un identificador único de un cliente que solicita acceso desde un servidor. Es la forma más sencilla de autorización.

El nivel de acceso de cada Token API debe coincidir con el nivel de acceso requerido para cada llamada API, que también se puede encontrar en el [API Explorer](https://api.deriv.com/api-explorer).

Por ejemplo, en la captura de pantalla siguiente, puede ver que para poder usar el Estado de Cuenta, se debe usar un token con nivel de acceso de lectura.

![](/img/acc_status_scope_api_explorer.png)

Tras la autorización de una conexión de WebSocket, las llamadas posteriores a esa conexión se considerarán acciones del usuario.

Tenga en cuenta que el Token API se puede usar con cualquier aplicación, por lo que tanto su aplicación como sus clientes deben mantenerla segura.

### OAuth2

OAuth significa `Open Authorisation` - un protocolo que permite a un cliente acceder a recursos alojados en un servidor en nombre del usuario sin revelar las credenciales.

Este tipo de autorización permite a los clientes iniciar sesión en aplicaciones de terceros con sus cuentas de Deriv sin crear un Token API. En este caso, la aplicación de terceros no ve la contraseña del usuario ni el Token API permanente, lo que la hace más segura.

La autenticación OAuth2 requiere más pasos para configurarla, pero es la forma más segura para que los desarrolladores compartan el acceso a su aplicación con sus clientes.

Para más información sobre OAuth2, visite [this guide](https://aaronparecki.com/oauth-2-simplified/).

Esta es la representación visual de cómo funciona la conexión de autorización OAuth:

![Flujo de OAuth](/img/how_oauth_works.png 'Flujo de OAuth')

## El proceso de autenticación

Para autenticar a su usuario, especifique la URL que se utilizará como URL de redirección de OAuth en la página [Dashboard](/dashboard), pestaña **Register application** en los campos **OAuth details**. A continuación, añada un botón de inicio de sesión en su sitio web o aplicación y dirija a los usuarios a **`https://oauth.binary.com/oauth2/authorize?app_id=your_app_id`**, donde your_app_id es el ID de tu aplicación.

![Inicio de sesión de Deriv OAuth](/img/oauth_login.png 'Inicio de sesión de Deriv OAuth')

Una vez que un usuario se registre o inicie sesión, se le redirigirá a la URL que haya introducido como URL de redireccionamiento. A esta URL se le agregarán argumentos con los tokens de sesión del usuario y tendrá un aspecto similar al siguiente:

`https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd`

## El proceso de autorización

Los parámetros de consulta de la URL de redireccionamiento son las cuentas del usuario y sus tokens de sesión relacionados. Puede asignar los parámetros de consulta a una matriz mediante el siguiente enfoque:

```js
const user_accounts = [
  {
    account: 'cr799393',
    token: 'a1-f7pnteezo4jzhpxclctizt27hyeot',
    currency: 'usd',
  },
  {
    account: 'vrtc1859315',
    token: 'a1clwe3vfuuus5kraceykdsoqm4snfq',
    currency: 'usd',
  },
];
```

Para autorizar al usuario basándose en la cuenta **selected** del usuario, llame a la llamada API [authorize](https://api.deriv.com/api-explorer#authorize) con la cuenta **selected** del usuario **session token**:

```js
{
  "authorize": "a1-f7pnteezo4jzhpxclctizt27hyeot"
}
```

La respuesta para la llamada `authorize` sería un objeto como el siguiente:

```js
{
    "account_list": [
      {
        "account_type": "trading",
        "created_at": 1647509550,
        "currency": "USD",
        "is_disabled": 0,
        "is_virtual": 0,
        "landing_company_name": "svg",
        "loginid": "CR799393",
        "trading": {}
      },
      {
        "account_type": "trading",
        "created_at": 1664132232,
        "currency": "ETH",
        "is_disabled": 0,
        "is_virtual": 0,
        "landing_company_name": "svg",
        "loginid": "VRTC1859315",
        "trading": {}
      },
    ],
    "balance": 0,
    "country": "id",
    "currency": "USD",
    "email": "user_mail@email_provider.com",
    "fullname": " John Doe",
    "is_virtual": 0,
    "landing_company_fullname": "Deriv (SVG) LLC",
    "landing_company_name": "svg",
    "local_currencies": {
      "IDR": {
        "fractional_digits": 2
      }
    },
    "loginid": "CR799393",
    "preferred_language": "EN",
    "scopes": [
      "read",
      "trade",
      "trading_information",
      "payments",
      "admin"
    ],
    "trading": {},
    "upgradeable_landing_companies": [
      "svg"
    ],
    "user_id": 12345678
  }
```

Ahora, el usuario está autorizado y puede usar las llamadas de Deriv API en nombre de la cuenta.
