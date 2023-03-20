import clsx from 'clsx';
import React from 'react';
import styles from './Schema.module.scss';
import SchemaTitle from './SchemaTitle';

type SchemaHeaderProps = {
  title: string;
  description: string;
  auth_required: number;
  auth_scopes: Array<string>;
};

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
const SchemaHeader = ({ title, description, auth_required, auth_scopes }: SchemaHeaderProps) => {
  return (
    <div className={styles.schemaHeader}>
      <SchemaTitle className={styles.schemaTitle}>{title}</SchemaTitle>
      <div className={styles.schemaDescription}>
        <div className={clsx({ [styles.schemaAuthRequired]: auth_required })}>
          <div className={styles.schemaSubText}>{description}</div>
        </div>
        {auth_required ? <AuthRequired auth_scopes={auth_scopes} /> : null}
      </div>
    </div>
  );
};

export default SchemaHeader;
