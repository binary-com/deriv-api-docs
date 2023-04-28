import React from 'react';
import clsx from 'clsx';
import styles from './HighlightCode.module.scss';
import { SchemaDescriptionTypes } from '../RecursiveContent/SchemaDescription';

export const HighlightCode = ({ description }: SchemaDescriptionTypes) => {
  if (!description) return null;

  const [first, code, ...rest] = description.split('`');
  return (
    <React.Fragment>
      {first}
      {code && <span className={clsx(styles.schemaRole, styles.schemaCode)}>{code}</span>}
      {rest.length > 0 && <HighlightCode description={rest.join('`')} />}
    </React.Fragment>
  );
};
