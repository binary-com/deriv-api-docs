import { generateLoginUrl, getServerConfig } from '@site/src/utils';
import { useCallback } from 'react';

const useLoginUrl = () => {
  const getUrl = useCallback((language = 'en') => {
    const { appId, oauth } = getServerConfig();
    return generateLoginUrl(language, oauth, appId);
  }, []);

  return { getUrl };
};

export default useLoginUrl;
