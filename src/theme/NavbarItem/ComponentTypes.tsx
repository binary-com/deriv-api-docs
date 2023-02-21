/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import UserNavbarItem from '@site/src/components/UserNavbarItem';
import ApiTokenNavbarItem from '@site/src/components/ApiTokenNavbarItem';

// We have to provide custom in the name of the component
export default {
  ...ComponentTypes,
  'custom-user-navar-item': UserNavbarItem,
  'custom-api-token-navbar-item': ApiTokenNavbarItem,
};
