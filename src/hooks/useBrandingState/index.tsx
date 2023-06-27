import { useEffect, useState } from 'react';
import { domains } from '@site/src/utils';

const useBrandingState = () => {
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
  }, [localStorage]);

  return { is_official_domain };
};

export default useBrandingState;
