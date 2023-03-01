import React from 'react';
import { Text } from '@deriv/ui';

type TSchemaTitle = {
  className: string;
  children: React.ReactNode;
};
const SchemaTitle = ({ className, children }: TSchemaTitle) => {
  return (
    <Text id='title' className={className}>
      {children}
    </Text>
  );
};

export default SchemaTitle;
