import React, { useMemo, ReactNode, useState, useEffect } from 'react';
import { domains } from '@site/src/utils';
import { IOfficialContents, OfficialContentsContext } from './official-contents.context';
import useBrandingState from '@site/src/hooks/useBrandingState';

type TAuthProviderProps = {
  children: ReactNode;
};

const OfficialContentsProvider = ({ children }: TAuthProviderProps) => {
  const { is_official_domain } = useBrandingState();

  const context_object: IOfficialContents = useMemo(() => {
    return {
      is_official_domain,
    };
  }, [is_official_domain]);

  return (
    <OfficialContentsContext.Provider value={context_object}>
      {children}
    </OfficialContentsContext.Provider>
  );
};

export default OfficialContentsProvider;
