import { deriv_urls } from '@site/src/utils/constants';
import { useCallback } from 'react';

const useLoginUrl = (language) => {
  const getUrl = useCallback(() => {
    let config_server_url = localStorage.getItem('config.server_url');
    let config_app_id = localStorage.getItem('config.app_id');

    if (config_server_url && config_app_id) {
      if (config_server_url && /qa/.test(config_server_url)) {
        return `https://${config_server_url}/oauth2/authorize?app_id=${config_app_id}&l=${language}`;
      }
    } else {
      localStorage.setItem('config_server_url', 'green.binaryws.com');
      localStorage.setItem('config.app_id', '35014');

      config_server_url = localStorage.getItem('config.server_url');
      config_app_id = localStorage.getItem('config.app_id');

      return `https://oauth.${deriv_urls.DERIV_HOST_NAME}/oauth2/authorize?app_id=${config_app_id}&l=${language}`;
    }
  }, [language]);

  return { getUrl };
};

export default useLoginUrl;
