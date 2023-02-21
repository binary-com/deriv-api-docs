import { generateLoginUrl, getServerConfig } from '@site/src/utils';
import { useCallback } from 'react';

const useLoginUrl = () => {
  const getUrl = useCallback((language = 'en') => {
    const { appId, serverUrl } = getServerConfig();
    return generateLoginUrl(language, serverUrl, appId);
  }, []);

  return { getUrl };
};

export default useLoginUrl;
