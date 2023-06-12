import React from 'react';
import useOfficialContentsContext from '@site/src/hooks/useOfficialContentsContext';

type TRenderOfficialContents = {
  children: React.ReactNode;
};

const RenderOfficialContents = ({ children }: TRenderOfficialContents) => {
  const has_replacement = children[1] ? <React.Fragment>{children[1]}</React.Fragment> : <></>;
  const { is_official_domain } = useOfficialContentsContext();
  return is_official_domain ? <React.Fragment>{children}</React.Fragment> : has_replacement;
};

export default RenderOfficialContents;
