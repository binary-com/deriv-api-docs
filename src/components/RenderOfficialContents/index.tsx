import React, { ReactNode } from 'react';
import useOfficialContentsContext from '@site/src/hooks/useOfficialContentsContext';

const RenderOfficialContents = ({ children }: { children: ReactNode }) => {
  const { is_official_domain } = useOfficialContentsContext();
  return is_official_domain ? children : <></>;
};

export default RenderOfficialContents;
