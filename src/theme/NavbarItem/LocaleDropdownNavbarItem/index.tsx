import React, { useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import { useLocation } from '@docusaurus/router';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import type { LinkLikeNavbarItemProps } from '@theme/NavbarItem';
import type { Props } from '@theme/NavbarItem/LocaleDropdownNavbarItem';
// import useClickOutsideDropdown from '@site/src/hooks/useClickOutsideDropdown';

import styles from './styles.module.css';

export default function LocaleDropdownNavbarItem({
  mobile,
  dropdownItemsBefore,
  dropdownItemsAfter,
  ...props
}: Props): JSX.Element {
  const {
    i18n: { currentLocale, locales, localeConfigs },
  } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const { search, hash } = useLocation();

  const localeItems = locales.map((locale): LinkLikeNavbarItemProps => {
    const baseTo = `pathname://${alternatePageUtils.createUrl({
      locale,
      fullyQualified: false,
    })}`;
    // preserve ?search#hash suffix on locale switches
    const to = `${baseTo}${search}${hash}`;
    return {
      label: localeConfigs[locale].label,
      lang: localeConfigs[locale].htmlLang,
      to,
      target: '_self',
      autoAddBaseUrl: false,
      className:
        // eslint-disable-next-line no-nested-ternary
        locale === currentLocale
          ? // Similar idea as DefaultNavbarItem: select the right Infima active
            // class name. This cannot be substituted with isActive, because the
            // target URLs contain `pathname://` and therefore are not NavLinks!
            mobile
            ? 'menu__link--active'
            : 'dropdown__link--active'
          : '',
    };
  });

  const items = [...dropdownItemsBefore, ...localeItems, ...dropdownItemsAfter];

  // Mobile is handled a bit differently
  const dropdownLabel = mobile
    ? translate({
        message: 'Languages',
        id: 'theme.navbar.mobileLanguageDropdown.label',
        description: 'The label for the mobile language switcher dropdown',
      })
    : localeConfigs[currentLocale].label;

  // const [is_toggle_dropdown, setToggleDropdown] = useState(false);
  // const dropdown_toggle = is_toggle_dropdown ? styles.active : styles.inactive;

  // const dropdownRef = useRef(null);
  // useClickOutsideDropdown(dropdownRef, setToggleDropdown, false);

  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={<>{dropdownLabel === 'English' ? 'EN' : 'PT'}</>}
      items={items}
      // className={`${styles.displayMenu} ${dropdown_toggle}`}
      // onClick={() => setToggleDropdown((prev) => !prev)}
    />
  );
}
