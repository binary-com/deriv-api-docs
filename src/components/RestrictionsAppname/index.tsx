import React from 'react';
import styles from './RestrictionsAppname.module.scss';

const RestrictionsAppname = () => {
  return (
    <ol className={styles.restrictions}>
      <li>Only alphanumeric characters with spaces, underscores, and hyphens are allowed.</li>
      <li>The name can contain up to 48 characters.</li>
      <li>Duplicate token names aren’t allowed.</li>
      <li>The name cannot contain “Binary”, “Deriv”, or similar words.</li>
    </ol>
  );
};

export default RestrictionsAppname;
