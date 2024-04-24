---
title: Configuración de una aplicación Deriv
sidebar_label: Configuración de una aplicación Deriv
sidebar_position: 7
tags:
  - intro
  - solicitud
  - configuración
keywords:
  - intro
  - solicitud
  - configuración
description: Cómo configurar la aplicación Deriv
---

:::peligro
Para el examinador, los enlaces de esta sección se proporcionarán en el futuro.
:::

#### Cuenta Deriv

Si aún no tiene una cuenta Deriv, puede crear una fácilmente visitando nuestra página de registro o utilizando la llamada de API: [new_account_virtual](/api-explorer#new_account_virtual). Es completamente gratuito. Y si ya tiene una cuenta, por favor inicie sesión con los datos de su cuenta. Para evitar cualquier pérdida accidental de fondos durante las pruebas, le recomendamos que utilice su cuenta demo en lugar de una cuenta real.

Para ganar markup, obtenga una cuenta real Deriv para recibir sus ganancias mensuales. También puede crear una cuenta real utilizando las llamadas de API: [new_account_real](/api-explorer#new_account_real) o [new_account_maltainvest](/api-explorer#new_account_maltainvest).

:::Precaución
Para crear aplicaciones Deriv, necesitará un token de API con el alcance de administrador para la cuenta que desee utilizar para su aplicación.
:::

## Cómo crear un token de la API Deriv

Para crear su token de API, sólo tiene que ir al panel de control y seleccionar la pestaña **Manage Tokens** . A partir de ahí, cree un nuevo token que coincida con el nivel de acceso necesario para las funciones de su aplicación.

Para crear un nuevo token de API, siga estos pasos:

1. Seleccione los alcances que necesite.
2. Proporcione un nombre para su token
3. Haga clic en **Crear**

Como alternativa, puede crear un token de API a través de la llamada de API: [api_token](/api-explorer#api_token).

:::precaución
Necesita un token con el alcance de `Admin` para crear una aplicación.
:::

## Cómo crear una aplicación de Deriv

Para crear su aplicación con las opciones de configuración adecuadas, seleccione la pestaña **Registrar aplicación** en el panel de control. Puede realizar cambios en la configuración de su aplicación en cualquier momento en la pestaña **Gestionar aplicaciones** .

| Campo de información de la aplicación | Descripción                                                                                                         |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Cuenta                                | La cuenta con la que desea crear la aplicación                                                                      |
| Token API                             | El token de API con el que desea crear la aplicación                                                                |
| Nombre de la aplicación               | Nombre de la aplicación                                                                                             |
| Markup                                | La comisión añadida al precio comercial para obtener ingresos adicionales                                           |
| URL de autorización                   | La URL que permite a los clientes iniciar sesión en su aplicación utilizando sus cuentas Deriv sin un token de API. |
| URL de verificación                   | La URL de redirección de OAuth para la autorización OAuth                                                           |

**Para crear una aplicación, siga estos pasos:**

1. Seleccione la cuenta con la que desea crear la aplicación.
2. Seleccione el token de API añadido a su cuenta ( debe tener el alcance de \`Admin\` ).
3. Proporcione un nombre para su aplicación.
4. Rellene los campos **Markup** y **OAuth details** .
5. Seleccione los **Alcances de Autorización** que necesite su aplicación.
6. Haga clic en **Registrar aplicación**.

Asegúrese de que las URL **Autorización** y **Verificación** son correctas en función de su implementación.

Por ejemplo, si su dominio es **`https://example.com`** y su **autorización y autenticación son gestionadas por** `verfiy`, sus URL serán:

**`https://example.com/verify`**
