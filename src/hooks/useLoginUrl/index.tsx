import useIsBrowser from '@docusaurus/useIsBrowser';
import { getAppId, getIsLocalhost } from '@site/src/utils';
import { DEFAULT_WS_SERVER } from '@site/src/utils/constants';
import { useCallback } from 'react';

const useLoginUrl = () => {
  const isBrowser = useIsBrowser();

  const getUrl = useCallback(
    (language: string) => {
      let isLocalHost = true;
      if (isBrowser) {
        isLocalHost = getIsLocalhost();
      }

      const appId = getAppId(isLocalHost);

      const config_server_url = localStorage.getItem('config.server_url') ?? DEFAULT_WS_SERVER;
      const config_app_id = localStorage.getItem('config.app_id') ?? appId;

      localStorage.setItem('config.server_url', config_server_url);
      localStorage.setItem('config.app_id', config_app_id);

      return `https://${config_server_url}/oauth2/authorize?app_id=${config_app_id}&l=${language}`;
    },
    [isBrowser],
  );

  return { getUrl };
};

export default useLoginUrl;
