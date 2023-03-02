/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import styles from './Schema.module.scss';
import RecursiveProperties from './RecursiveProperties';
import { TSourceButton } from './SchemaObjectContent';
import BrowserOnly from '@docusaurus/BrowserOnly';

type SchemaBodyObject = {
  jsonSchema: JSONSchematType;
};

type JSONSchematType = {
  properties: Record<string, unknown>;
  default?: any;
};

const SourceButton = ({ is_code_open, setIsCodeOpen }: TSourceButton) => {
  return (
    <div
      onClick={() => setIsCodeOpen(!is_code_open)}
      className={styles.sourceButtonMain}
      title='JSON'
    >
      {'{'}
      {'}'}
    </div>
  );
};

const Properities: React.FC<SchemaBodyObject> = ({ jsonSchema }) => {
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
    <div>
      <SourceButton is_code_open={is_code_open} setIsCodeOpen={setIsCodeOpen} />
      {is_code_open && (
        <BrowserOnly fallback={<div>Loading...</div>}>
          {() => {
            const ReactJson = require('react-json-view').default;
            return <ReactJson src={JSON.parse(data)} theme='tube' />;
          }}
        </BrowserOnly>
      )}
      {!is_code_open && (
        <RecursiveProperties
          is_open
          properties={jsonSchema.properties}
          value={jsonSchema.properties}
        />
      )}
    </div>
  );
};

const SchemaBody: React.FC<SchemaBodyObject> = ({ jsonSchema }) => {
  return (
    <div className={styles.schemaBody}>
      <Properities jsonSchema={jsonSchema} />
    </div>
  );
};

export default SchemaBody;
