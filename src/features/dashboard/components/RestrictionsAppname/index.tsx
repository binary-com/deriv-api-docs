import React from 'react';
import styles from './RestrictionsAppname.module.scss';

const RestrictionsAppname = () => {
  return (
    <ul className={styles.restrictions}>
      <li>Only alphanumeric characters with spaces and underscores are allowed.</li>
      <li>The name can contain up to 48 characters.</li>
      <li>Duplicate token names aren’t allowed.</li>
      <li>The name cannot contain “Binary”, “Deriv”, or similar words.</li>
    </ul>
  );
};

export default RestrictionsAppname;
