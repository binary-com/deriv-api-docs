import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import styles from './SearchButton.module.scss';

type TSearchButton = {
  setToggleSearch: Dispatch<SetStateAction<boolean>>;
  toggle_search: boolean;
};

const SearchButton = ({ setToggleSearch, toggle_search }: TSearchButton) => {
  const location = useLocation();

  const closeSearchHotkey = (event) => {
    const press_escape = event.key === 'Escape';
    const press_cmd_and_k = event.metaKey && event.key === 'k';

    if (press_escape || press_cmd_and_k) {
      setToggleSearch(false);
    }
  };

  const openSearchHotkey = (event) => {
    const press_cmd_and_k = event.metaKey && event.key === 'k';

    if (press_cmd_and_k) {
      setToggleSearch(true);
    }
  };

  const focusSearchInput = () => {
    // Using vanilla JS to get the element since it's a 3rd party library. I cannot access through React.
    const search_input = document.querySelector('.navbar__search-input') as HTMLFormElement;
    if (search_input) {
      const focusInput = () => search_input.focus();
      focusInput();
    }
  };

  useEffect(() => {
    setToggleSearch(false);
  }, [location]);

  useEffect(() => {
    if (toggle_search) {
      focusSearchInput();
      window.addEventListener('keydown', closeSearchHotkey);
      return () => window.removeEventListener('keydown', closeSearchHotkey);
    } else {
      window.addEventListener('keydown', openSearchHotkey);
      return () => window.removeEventListener('keydown', openSearchHotkey);
    }
  }, [toggle_search]);

  return (
    <React.Fragment>
      <button
        onClick={() => setToggleSearch((prev) => !prev)}
        className={styles.searchButton}
        data-testid='dt_search_button'
      />
      <div
        className='search-overlay'
        onClick={() => setToggleSearch(false)}
        data-testid='dt_search_overlay'
      />
    </React.Fragment>
  );
};

export default SearchButton;
