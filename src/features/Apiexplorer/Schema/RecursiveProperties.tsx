import React from 'react';
import SchemaDescription from './SchemaDescription';
import SchemaObjectContent from './SchemaObjectContent';

type TRescursiveProperties = {
  is_open: boolean;
  properties: any;
  value: any;
};

export default function RecursiveProperties({ is_open, properties, value }: TRescursiveProperties) {
  const keys = properties && Object.keys(properties);
  if (!is_open) {
    return null;
  }
  if (!keys) {
    return (
      <React.Fragment>
        <SchemaDescription description={value.description} />
      </React.Fragment>
    );
  }
  return keys?.map((key, index) => {
    return (
      <React.Fragment key={key}>
        {index === 0 && value?.items?.description && (
          <SchemaDescription description={value.items.description} />
        )}
        <SchemaObjectContent key={key} key_value={key} properties={properties} />
      </React.Fragment>
    );
  });
}
