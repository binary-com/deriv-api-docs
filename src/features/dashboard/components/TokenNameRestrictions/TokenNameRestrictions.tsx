import React from 'react';
import styles from './TokenNameRestrictions.module.scss';

const TokenNameRestrictions = () => {
  return (
    <ol className={styles.tokenrestrictions}>
      <li>Only alphanumeric characters with spaces and underscores are allowed.</li>
      <li>Only 2-32 characters are allowed</li>
      <li>No duplicate token names are allowed for the same account.</li>
      <li>
        {
          'No keywords "deriv" or "binary" or words that look similar, e.g. "_binary_" or "d3eriv" are allowed.'
        }
      </li>
    </ol>
  );
};

export default TokenNameRestrictions;
