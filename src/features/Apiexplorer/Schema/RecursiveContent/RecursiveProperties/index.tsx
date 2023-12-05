import React from 'react';
import SchemaDescription from '../SchemaDescription';
import SchemaObjectContent from '../SchemaObjectContent';
import StreamTypesObject from '../StreamTypesObject';

type TRecursiveProperties = {
  is_open: boolean;
  properties: any;
  value: any;
  jsonSchema?: any;
};

const RecursiveProperties = ({ is_open, properties, value, jsonSchema }: TRecursiveProperties) => {
  const keys = properties && Object.keys(properties);
  if (!is_open) {
    //if object is not open then ret null
    return null;
  }

  if ('oneOf' in value) {
    return <StreamTypesObject definitions={jsonSchema.definitions} />;
  }
  // this will be true when we are not inside properties obj? !!!!!!
  if (!keys) {
    return (
      <React.Fragment>
        <SchemaDescription description={value?.description} />
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {keys?.map((key, index) => {
        return (
          <React.Fragment key={key}>
            {index === 0 && value?.items?.description && (
              <SchemaDescription description={value.items.description} />
            )}
            {/* check if its forgetAll Request not response */}
            {key === 'forget_all' && 'oneOf' in value[key] ? (
              <SchemaObjectContent
                key={key}
                key_value={key}
                properties={properties}
                jsonSchema={jsonSchema}
                is_stream_types={true}
              />
            ) : (
              <SchemaObjectContent key={key} key_value={key} properties={properties} />
            )}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};
export default RecursiveProperties;
