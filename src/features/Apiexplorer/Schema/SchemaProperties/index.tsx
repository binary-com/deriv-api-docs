import React, { Suspense } from 'react';
import { TJsonSchemaType } from '../SchemaBody';
import SourceButton from '../SourceButton/SourceButton';
import RecursiveProperties from '../RecursiveContent/RecursiveProperties';
import Loader from '@site/src/components/Loader';

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

  const ReactJson = React.lazy(() => import('react-json-view'));

  return (
    <React.Fragment>
      <SourceButton is_code_open={is_code_open} setIsCodeOpen={setIsCodeOpen} />
      {is_code_open ? (
        <React.Fragment>
          <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
            <ReactJson src={JSON.parse(data)} theme='tube' />
          </Suspense>
        </React.Fragment>
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
