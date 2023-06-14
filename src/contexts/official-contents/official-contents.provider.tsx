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
    const hash = window.location.hash;
    const branding_state = sessionStorage.getItem('toggleBranding');

    if (!branding_state) {
      sessionStorage.setItem('toggleBranding', '0');
    }

    if (hash === '#toggleBranding') {
      sessionStorage.setItem('toggleBranding', '1');
    }

    if (hash === '#toggleBranding' && branding_state === '1') {
      sessionStorage.setItem('toggleBranding', '0');
    }
  }, [window.location.hash]);

  useEffect(() => {
    const branding_is_disabled = sessionStorage.getItem('toggleBranding') === '1';
    if (branding_is_disabled || !isOfficialHost()) {
      setIsOfficialDomain(false);
    } else {
      setIsOfficialDomain(true);
    }
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
