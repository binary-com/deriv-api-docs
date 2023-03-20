import React, { useState, useRef } from 'react';
import { playground_requests } from '@site/src/utils/playground_requests';
import styles from './Dropdown.module.scss';
import clsx from 'clsx';
import { useOnClickOutside } from 'usehooks-ts';

type TDropdown = {
  selected: string;
  setSelected: (value: string) => void;
  selected_value: string;
  handleChange: (event: React.MouseEvent<HTMLOptionElement, MouseEvent>, value: string) => void;
};

type TDropdownList = {
  selected: string;
  setSelected: (value: string) => void;
  selected_value: string;
  handleChange: (event: React.MouseEvent<HTMLOptionElement, MouseEvent>, value: string) => void;

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
            <option
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
            </option>
          ))}
      </div>
    </div>
  );
};

export const Dropdown = ({ selected, setSelected, handleChange, selected_value }: TDropdown) => {
  const [isActive, setIsActive] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [searchResults, setSearchResults] = useState('');

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsActive(false);
    }
  };

  const handleToggleDropdown = () => {
    setIsActive(!isActive);
    setToggle(!toggle);
    setSearchResults('');
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div>
      <div className={styles.dropdown} ref={ref}>
        <div className={styles.dropdownBtn} onClick={handleToggleDropdown} data-testid='dropdown'>
          <span>{selected_value}</span>
          <span className={clsx(styles.arrow, { [styles.down]: isActive })} />
        </div>
        {isActive && (
          <div className={`${styles.dropdownContent} ${toggle ? styles.show : ''}`}>
            <DropdownList
              selected_value={selected_value}
              handleChange={handleChange}
              selected={selected}
              setSelected={setSelected}
              searchResults={searchResults}
              setIsActive={setIsActive}
              setSearchResults={setSearchResults}
            ></DropdownList>
          </div>
        )}
      </div>
    </div>
  );
};
