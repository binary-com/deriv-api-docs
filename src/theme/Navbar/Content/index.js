import React from 'react';
import { useThemeConfig, ErrorCauseBoundary } from '@docusaurus/theme-common';
import { splitNavbarItems, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import useOfficialContentsContext from '@site/src/hooks/useOfficialContentsContext';
import styles from './styles.module.css';
function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
}
function NavbarItems({ items }) {
  const unofficial_domain_items = [];
  const { is_official_domain } = useOfficialContentsContext();

  for (const value of Object.values(items)) {
    if (value.label === 'Documentation' || value.position === 'right') {
      unofficial_domain_items.push(value);
    }
  }

  return (
    <>
      {is_official_domain ? (
        <React.Fragment>
          {items.map((item, i) => (
            <ErrorCauseBoundary
              key={i}
              onError={(error) =>
                new Error(
                  `A theme navbar item failed to render.
    Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
    ${JSON.stringify(item, null, 2)}`,
                  { cause: error },
                )
              }
            >
              <NavbarItem {...item} />
            </ErrorCauseBoundary>
          ))}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {unofficial_domain_items.map((unofficial_item, i) => (
            <ErrorCauseBoundary
              key={i}
              onError={(error) =>
                new Error(
                  `A theme navbar item failed to render.
        Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
        ${JSON.stringify(unofficial_item, null, 2)}`,
                  { cause: error },
                )
              }
            >
              <NavbarItem {...unofficial_item} />
            </ErrorCauseBoundary>
          ))}
        </React.Fragment>
      )}
    </>
  );
}
function NavbarContentLayout({ left, right }) {
  return (
    <div className='navbar__inner'>
      <div className='navbar__items'>{left}</div>
      <div className='navbar__items navbar__items--right'>{right}</div>
    </div>
  );
}
export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const searchBarItem = items.find((item) => item.type === 'search');
  return (
    <NavbarContentLayout
      left={
        // TODO stop hardcoding items?
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        // TODO stop hardcoding items?
        // Ask the user to add the respective navbar items => more flexible
        <>
          <NavbarItems items={rightItems} />
          <NavbarColorModeToggle className={styles.colorModeToggle} />
          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
        </>
      }
    />
  );
}
