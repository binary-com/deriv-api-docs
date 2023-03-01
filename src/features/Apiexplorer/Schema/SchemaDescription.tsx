import React from 'react';
import styles from './Schema.module.scss';

type SchemaDescriptionTypes = {
  description: string;
};

const HighlightCode = ({ description }: SchemaDescriptionTypes) => {
  const [first, code, ...rest] = description.split('`');
  return (
    <React.Fragment>
      {first}
      {code && <span className={`${styles.schemaRole} ${styles.schemaCode}`}>{code}</span>}
      {rest.length > 0 && <HighlightCode description={rest.join('`')} />}
    </React.Fragment>
  );
};

export default function SchemaDescription({ description }: SchemaDescriptionTypes) {
  return (
    <span className={styles.schemaBodyDescription}>
      <HighlightCode description={description} />
    </span>
  );
}
