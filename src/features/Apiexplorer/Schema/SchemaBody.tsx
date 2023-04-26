/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import styles from './Schema.module.scss';
import RecursiveProperties from './RecursiveContent/RecursiveProperties';
import BrowserOnly from '@docusaurus/BrowserOnly';
import SourceButton from './SourceButton/SourceButton';

export type JSONSchemaType = {
  jsonSchema: {
    properties?: Record<string, unknown>;
    default?: any;
    info?: any;
  };
};

const Properities = ({ jsonSchema }: JSONSchemaType) => {
  React.useEffect(() => {
    setIsCodeOpen(false);
  }, [jsonSchema]);
  const [is_code_open, setIsCodeOpen] = React.useState(false);
  let data;
  try {
    data = JSON.stringify(jsonSchema.default, null, 2);
  } catch (_error) {
    data = '';
  }

  return (
    <React.Fragment>
      <SourceButton is_code_open={is_code_open} setIsCodeOpen={setIsCodeOpen} />
      {is_code_open ? (
        <BrowserOnly fallback={<div>Loading...</div>}>
          {() => {
            const ReactJson = require('react-json-view').default;
            return <ReactJson src={JSON.parse(data)} theme='tube' />;
          }}
        </BrowserOnly>
      ) : (
        <RecursiveProperties
          is_open
          properties={jsonSchema.properties}
          value={jsonSchema.properties}
        />
      )}
    </React.Fragment>
  );
};

const SchemaBody = ({ jsonSchema }: JSONSchemaType) => {
  return (
    <div className={styles.schemaBody}>
      <Properities jsonSchema={jsonSchema} />
    </div>
  );
};

export default SchemaBody;
