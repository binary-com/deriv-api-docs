import React from 'react';
import styles from './SourceButton.module.scss';

type TSourceButton = {
  is_code_open: boolean;
  setIsCodeOpen: (value: boolean) => void;
};

const SourceButton = ({ is_code_open, setIsCodeOpen }: TSourceButton) => {
  return (
    <div
      onClick={() => setIsCodeOpen(!is_code_open)}
      className={styles.sourceButtonMain}
      title='JSON'
    >
      {'{'}
      {'}'}
    </div>
  );
};

export default SourceButton;
