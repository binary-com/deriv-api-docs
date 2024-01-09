import React from 'react';
import SchemaDescription from '../SchemaDescription';
import SchemaObjectContent from '../SchemaObjectContent';
import StreamTypesObject from '../StreamTypesObject';
import SchemaOneOfObjectContent from '../SchemaOneOfObjectContent';

type TRecursiveProperties = {
  is_open: boolean;
  properties: any;
  value: any;
  jsonSchema: any;
};

const RecursiveProperties = ({ is_open, properties, value, jsonSchema }: TRecursiveProperties) => {
  const keys = properties && Object.keys(properties);

  if (!is_open) {
    return null;
  }
  if (value && 'oneOf' in value) {
    return (
      <React.Fragment>
        <StreamTypesObject definitions={jsonSchema.definitions} />
      </React.Fragment>
    );
  }
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
            {key === 'forget_all' && 'oneOf' in properties[key] ? (
              <SchemaObjectContent
                key={key}
                key_value={key}
                properties={properties}
                jsonSchema={jsonSchema}
                is_stream_types
              />
            ) : typeof properties[key] === 'object' && 'oneOf' in properties[key] ? (
              <SchemaOneOfObjectContent
                property={properties[key]}
                key_title={key}
                jsonSchema={jsonSchema}
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
