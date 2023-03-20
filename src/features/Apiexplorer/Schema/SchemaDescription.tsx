import React from 'react';
import { HighlightCode } from './HighlightCode';
import styles from './Schema.module.scss';

export type SchemaDescriptionTypes = {
  description: string;
};

export default function SchemaDescription({ description }: SchemaDescriptionTypes) {
  return (
    <span className={styles.schemaBodyDescription}>
      <HighlightCode description={description} />
    </span>
  );
}
