import React from 'react';
import useApiToken from '@site/src/hooks/useApiToken';

const SelectedToken = () => {
  const { currentToken } = useApiToken();

  return <label>{currentToken.display_name}</label>;
};

export default SelectedToken;
