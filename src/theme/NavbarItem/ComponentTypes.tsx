/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import UserNavbarItem from '@site/src/components/UserNavbarItem';
import ApiTokenNavbarItem from '@site/src/components/ApiTokenNavbarItem';
import NavbarSeparator from '@site/src/components/NavbarSeparator';
import LanguageSwitcher from '@site/src/components/LanguageSwitcher';

// We have to provide custom in the name of the component
export default {
  ...ComponentTypes,
  'custom-user-navbar-item': UserNavbarItem,
  'custom-api-token-navbar-item': ApiTokenNavbarItem,
  'custom-navbar-separator': NavbarSeparator,
  'custom-language-switcher-navbar-item': LanguageSwitcher,
};
