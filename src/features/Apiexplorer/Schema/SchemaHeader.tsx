import clsx from 'clsx';
import React from 'react';
import styles from './Schema.module.scss';
import SchemaTitle from './SchemaTitle';
import AuthRequired from './AuthRequired';

type SchemaHeaderProps = {
  title: string;
  description: string;
  auth_required: number;
  auth_scopes: Array<string>;
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
