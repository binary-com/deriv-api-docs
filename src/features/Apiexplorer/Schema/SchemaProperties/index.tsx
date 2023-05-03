import React from 'react';
import ReactJson from 'react-json-view';
import { TJsonSchemaType } from '../SchemaBody';
import SourceButton from '../SourceButton/SourceButton';
import RecursiveProperties from '../RecursiveContent/RecursiveProperties';
import BrowserOnly from '@docusaurus/BrowserOnly';

const SchemaProperties = ({ jsonSchema }: TJsonSchemaType) => {
  React.useEffect(() => {
    setIsCodeOpen(false);
  }, [jsonSchema]);
  const [is_code_open, setIsCodeOpen] = React.useState(false);
  let data = '';
  try {
    data = JSON.stringify(jsonSchema.default, null, 2);
  } catch (error) {
    data = '';
    console.error('There was an issue stringifying JSON data: ', error);
  }

  return (
    <React.Fragment>
      <SourceButton is_code_open={is_code_open} setIsCodeOpen={setIsCodeOpen} />
      {is_code_open ? (
        <BrowserOnly>{() => <ReactJson src={JSON.parse(data)} theme='tube' />}</BrowserOnly>
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

export default SchemaProperties;
