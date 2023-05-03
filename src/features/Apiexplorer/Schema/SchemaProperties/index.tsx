import React, { Suspense } from 'react';
import { TJsonSchemaType } from '../SchemaBody';
import SourceButton from '../SourceButton/SourceButton';
import RecursiveProperties from '../RecursiveContent/RecursiveProperties';
import { Circles } from 'react-loader-spinner';

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
  const Loader = () => (
    <Circles
      height='100'
      width='100'
      color='#d44c0d'
      ariaLabel='circles-loading'
      wrapperClass='loading'
    />
  );

  return (
    <React.Fragment>
      <SourceButton is_code_open={is_code_open} setIsCodeOpen={setIsCodeOpen} />
      {is_code_open ? (
        <React.Fragment>
          <Suspense fallback={<Loader />}>
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
