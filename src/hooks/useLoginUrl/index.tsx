import { generateLoginUrl, getServerConfig } from '@site/src/utils';
import { useCallback } from 'react';

const useLoginUrl = () => {
  const getUrl = useCallback((language = 'en') => {
    const { appId, oauth } = getServerConfig();
    const pathname = window.location.pathname;
    const route = pathname.replace(/\//g, '%2F');
    return generateLoginUrl(language, oauth, appId, route);
  }, []);

  return { getUrl };
};

export default useLoginUrl;
