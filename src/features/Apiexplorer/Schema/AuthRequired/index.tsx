import React from 'react';
import clsx from 'clsx';
import styles from './AuthRequired.module.scss';

type AuthRequiredProps = {
  auth_scopes: Array<string>;
};

const AuthRequired = ({ auth_scopes: scopes }: AuthRequiredProps) => {
  return (
    <div>
      <span className={styles.schemaSubText}>Auth Required: </span>
      <span>
        {scopes.map((scope) => (
          <span className={clsx(styles.schemaRole, styles.schemaSubText)} key={scope}>
            {scope}
          </span>
        ))}
      </span>
    </div>
  );
};

export default AuthRequired;
