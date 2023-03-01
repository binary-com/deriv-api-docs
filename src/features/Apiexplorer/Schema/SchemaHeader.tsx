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

const SchemaHeader: React.FC<SchemaHeaderProps> = ({
  title,
  description,
  auth_required,
  auth_scopes,
}) => {
  const AuthRequired: React.FC<AuthRequiredProps> = ({ auth_scopes: scopes }) => {
    return (
      <div>
        <span className={`${styles.schemaSubText}`}>Auth Required: </span>
        <span>
          {scopes.map((scope) => (
            <span className={`${styles.schemaRole} ${styles.schemaSubText}`} key={scope}>
              {scope}
            </span>
          ))}
        </span>
      </div>
    );
  };

  return (
    <div className={`${styles.schemaHeader}`}>
      <SchemaTitle className={`${styles.schemaTitle}`}>{title}</SchemaTitle>
      <div className={`${styles.schemaDescription}`}>
        <div className={auth_required ? `${styles.schemaAuthRequired}` : ''}>
          <div className={`${styles.schemaSubText} `}>{description}</div>
        </div>
        {auth_required ? <AuthRequired auth_scopes={auth_scopes} /> : null}
      </div>
    </div>
  );
};

export default SchemaHeader;
