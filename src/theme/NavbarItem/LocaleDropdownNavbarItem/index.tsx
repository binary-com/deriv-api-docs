import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';
import { useLocation } from '@docusaurus/router';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import type { LinkLikeNavbarItemProps } from '@theme/NavbarItem';
import type { Props } from '@theme/NavbarItem/LocaleDropdownNavbarItem';

export default function LocaleDropdownNavbarItem({
  // mobile,
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
        locale === currentLocale ? 'dropdown__link--active' : '',
    };
  });

  const items = [...dropdownItemsBefore, ...localeItems, ...dropdownItemsAfter];

  const dropdownLabel = localeConfigs[currentLocale].label;

  return (
    <DropdownNavbarItem
      {...props}
      // mobile={mobile}
      label={<>{dropdownLabel === 'English' ? 'EN' : 'PT'}</>}
      items={items}
    />
  );
}
