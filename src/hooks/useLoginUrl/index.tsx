import { deriv_urls } from '@site/src/utils/loginurls';
import { useCallback } from 'react';

const useLoginUrl = (language) => {
  const getUrl = useCallback(() => {
    const config_server_url = localStorage.getItem('config.server_url');
    const config_app_id = localStorage.getItem('config.app_id');
    if (config_server_url && /qa/.test(config_server_url)) {
      return `https://${config_server_url}/oauth2/authorize?app_id=${config_app_id}&l=${language}`;
    }

    return `https://oauth.${deriv_urls.DERIV_HOST_NAME}/oauth2/authorize?app_id=${config_app_id}&l=${language}`;
  }, [language]);

  return { getUrl };
};

export default useLoginUrl;
