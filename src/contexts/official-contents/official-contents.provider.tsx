import React, { useMemo, ReactNode, useState, useEffect } from 'react';
import { domains } from '@site/src/utils';
import { IOfficialContents, OfficialContentsContext } from './official-contents.context';

type TAuthProviderProps = {
  children: ReactNode;
};

const OfficialContentsProvider = ({ children }: TAuthProviderProps) => {
  const [is_official_domain, setIsOfficialDomain] = useState<boolean>(false);

  const isOfficialHost = () => {
    const host = window.location.host;
    return domains.includes(host);
  };

  useEffect(() => {
    const hide_branding = localStorage.getItem('hideBranding');

    if (!hide_branding) {
      localStorage.setItem('hideBranding', '0');
    }

    if (hide_branding === '1' || !isOfficialHost()) {
      setIsOfficialDomain(false);
    } else {
      setIsOfficialDomain(true);
    }
  }, []);

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
