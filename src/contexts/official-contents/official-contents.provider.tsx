import React, { useMemo, ReactNode, useState, useEffect } from 'react';
import { domains } from '@site/src/utils';
import { IOfficialContents, OfficialContentsContext } from './official-contents.context';

type TAuthProviderProps = {
  children: ReactNode;
};

const OfficialContentsProvider = ({ children }: TAuthProviderProps) => {
  const [is_official_domain, setIsOfficialDomain] = useState<boolean>(false);

  useEffect(() => {
    const host = window.location.host;
    const is_official_host = domains.includes(host);
    is_official_host ? setIsOfficialDomain(true) : setIsOfficialDomain(false);
  }, [setIsOfficialDomain]);

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
