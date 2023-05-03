import React, { Suspense, useState } from 'react';
import RecursiveProperties from '../RecursiveProperties';
import SchemaDescription from '../SchemaDescription';
import SourceButton from '../../SourceButton/SourceButton';
import SchemaBodyHeader from '../SchemaBodyHeader';
import { Circles } from 'react-loader-spinner';
import styles from '../../Schema.module.scss';

type TSchemaObjectContent = {
  key_value: string;
  properties: any;
};

export default function SchemaObjectContent({ key_value, properties }: TSchemaObjectContent) {
  const [is_open_object, setIsOpenObject] = useState<boolean>(false);
  const [is_code_open, setIsCodeOpen] = useState<boolean>(false);
  const {
    type,
    description,
    default: defaultValue,
    pattern,
    examples,
    enum: _enum,
    title,
  } = properties[key_value];
  const value = properties[key_value];
  let data;
  try {
    data = JSON.stringify(value, null, 2);
  } catch (error) {
    data = '';
    console.error('There was an issue stringifying JSON data: ', error);
  }
  React.useEffect(() => {
    setIsCodeOpen(false);
    setIsOpenObject(false);
  }, [properties]);

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
    <div className={styles.schemaBodySignature}>
      <SourceButton is_code_open={is_code_open} setIsCodeOpen={setIsCodeOpen} />
      {/* Header */}
      <SchemaBodyHeader
        key_value={key_value}
        type={type}
        defaultValue={defaultValue}
        pattern={pattern}
        examples={examples}
        enum={_enum}
        title={title}
        is_open_object={is_open_object}
        setIsOpenObject={setIsOpenObject}
      />
      {/* Description */}
      <SchemaDescription description={description} />
      {/* RecursiveProperties */}
      <Suspense fallback={<Loader />}>
        <React.Fragment>
          {is_code_open && <ReactJson src={JSON.parse(data)} theme='tube' />}
        </React.Fragment>
      </Suspense>
      {!is_code_open && (
        <RecursiveProperties
          is_open={is_open_object}
          properties={value.properties || value?.items?.properties}
          value={value}
        />
      )}
    </div>
  );
}
