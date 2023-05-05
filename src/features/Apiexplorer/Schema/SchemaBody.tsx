/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import styles from './Schema.module.scss';
import SchemaProperties from './SchemaProperties';

export type TJsonSchemaType = {
  jsonSchema: {
    properties?: Record<string, unknown>;
    default?: any;
    info?: any;
  };
};

const SchemaBody = ({ jsonSchema }: TJsonSchemaType) => {
  return (
    <div className={styles.schemaBody}>
      <SchemaProperties jsonSchema={jsonSchema} />
    </div>
  );
};

export default SchemaBody;
