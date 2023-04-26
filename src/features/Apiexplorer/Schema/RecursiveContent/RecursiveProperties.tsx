import React from 'react';
import SchemaDescription from './SchemaDescription';
import SchemaObjectContent from './SchemaObjectContent';

type TRecursiveProperties = {
  is_open: boolean;
  properties: any;
  value: any;
};

const RecursiveProperties = ({ is_open, properties, value }: TRecursiveProperties) => {
  const keys = properties && Object.keys(properties);
  if (!is_open) {
    return null;
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
            <SchemaObjectContent key={key} key_value={key} properties={properties} />
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};
export default RecursiveProperties;
