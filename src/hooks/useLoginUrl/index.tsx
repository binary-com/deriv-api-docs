import { getAppId, getIsLocalhost, getIsBrowser } from '@site/src/utils';
import { DEFAULT_WS_SERVER, VERCEL_DEPLOYMENT_APP_ID } from '@site/src/utils/constants';
import { useCallback } from 'react';

const useLoginUrl = () => {
  const isBrowser = getIsBrowser();

  const getUrl = useCallback(
    (language: string) => {
      if (isBrowser) {
        const isLocalHost = getIsLocalhost();
        const appId = getAppId(isLocalHost);

        const config_server_url = localStorage.getItem('config.server_url') ?? DEFAULT_WS_SERVER;
        const config_app_id = localStorage.getItem('config.app_id') ?? appId;

        localStorage.setItem('config.server_url', config_server_url);
        localStorage.setItem('config.app_id', config_app_id);

        return `https://${config_server_url}/oauth2/authorize?app_id=${config_app_id}&l=${language}`;
      }
      return `https://${DEFAULT_WS_SERVER}/oauth2/authorize?app_id=${VERCEL_DEPLOYMENT_APP_ID}&l=${language}`;
    },
    [isBrowser],
  );

  return { getUrl };
};

export default useLoginUrl;
