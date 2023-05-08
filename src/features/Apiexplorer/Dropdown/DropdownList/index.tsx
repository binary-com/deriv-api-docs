import React from 'react';
import { playground_requests } from '@site/src/utils/playground_requests';
import clsx from 'clsx';
import styles from './DropdownList.module.scss';

type TDropdownList = {
  selected: string;
  setSelected: (value: string) => void;
  selected_value: string;
  handleChange: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, value: string) => void;

  searchResults: string;
  setIsActive: (value: boolean) => void;
  setSearchResults: (result: string) => void;
};

const DropdownList = ({
  selected,
  setSelected,
  handleChange,
  setIsActive,
  searchResults,
  setSearchResults,
}: TDropdownList) => {
  return (
    <div>
      <input
        autoFocus
        type='text'
        data-testid='searchInput'
        className={styles.dropdownSearch}
        onChange={(event) => {
          setSearchResults(event.target.value);
        }}
      />
      <div className={styles.dropdownList}>
        <div className={styles.dropdownSelect}>
          <span>Select API Call - Version 3</span>
        </div>
        <div className={styles.dropdownStart}>
          <span>ALL CALLS</span>
        </div>
        {playground_requests
          .filter((option) => {
            return option.title.toLowerCase().includes(searchResults.toLowerCase()) ? option : null;
          })
          .map((option) => (
            <div
              key={option.name}
              onClick={(e) => {
                setSelected(option.title);
                setIsActive(false);
                handleChange(e, option.name);
              }}
              className={clsx(styles.dropdownItem, {
                [styles.dropdownSelected]: selected === option.title,
              })}
              data-testid={`apiDropdownItems{option.name}`}
            >
              {option.title}
            </div>
          ))}
      </div>
    </div>
  );
};

export default DropdownList;
