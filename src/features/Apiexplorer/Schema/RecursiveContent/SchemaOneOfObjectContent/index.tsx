import React, { Suspense, useState } from 'react';
import RecursiveProperties from '../RecursiveProperties';
import SchemaDescription from '../SchemaDescription';
import SourceButton from '../../SourceButton/SourceButton';
import styles from '../../Schema.module.scss';
import clsx from 'clsx';
import SchemaOneOfBodyHeader from '../SchemaOneOfBodyHeader';

const ReactJson = React.lazy(() => import('react-json-view'));

type TSchemaOneOfObjectContent = {
  property: any;
  key_title: string;
  jsonSchema: any;
};

export default function SchemaOneOfObjectContent({
  property,
  key_title,
  jsonSchema,
}: TSchemaOneOfObjectContent) {
  const { description, oneOf } = property;
  const [is_code_open, setIsCodeOpen] = useState<boolean>(false);
  const [index_arr, setIndexArr] = useState(Array(property.length).fill(false));

  const schema = property;
  let data;
  try {
    data = JSON.stringify(schema, null, 2);
  } catch (error) {
    data = '';
    console.error('There was an issue stringifying JSON data: ', error);
  }
  React.useEffect(() => {
    setIsCodeOpen(false);
    setIndexArr([]);
  }, [property]);

  const updateIndexArray = (index: number) => {
    setIndexArr((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = !newArray[index];
      return newArray;
    });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.schemaBodySignature}>
        <SourceButton is_code_open={is_code_open} setIsCodeOpen={setIsCodeOpen} />

        {/* Header */}
        <SchemaOneOfBodyHeader
          key_title={key_title}
          oneOf={oneOf}
          updateIndexArray={updateIndexArray}
        />
        {/* Description */}
        <SchemaDescription description={description} />

        {is_code_open && (
          <div className={styles.reactJsonView}>
            <ReactJson src={JSON.parse(data)} theme='tube' />
          </div>
        )}

        {!is_code_open && (
          <>
            {index_arr.map(
              (val, index) =>
                val === true && (
                  <RecursiveProperties
                    is_open
                    properties={oneOf[index]['properties']}
                    value={oneOf[index]}
                    jsonSchema={jsonSchema}
                    key={index}
                  />
                ),
            )}
          </>
        )}
      </div>
    </Suspense>
  );
}
