import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import apiManager from '@site/src/configs/websocket';
import { getIsBrowser } from '@site/src/utils';
import { PlaygroundContext } from './playground.context';
import { TSocketResponseData } from '@site/src/configs/websocket/types';
import { TSocketEndpointNames } from '@site/src/configs/websocket/types';

type TPlaygroundProviderProps = {
  children: ReactNode;
};

if (getIsBrowser()) {
  apiManager.init();
  console.log('PlaygroundProvider');
}

const PlaygroundProvider = <T extends TSocketEndpointNames>({
  children,
}: TPlaygroundProviderProps) => {
  const [playground_history, setPlaygroundHistory] = useState<TSocketResponseData<T>[]>([]);

  useEffect(() => {
    if (playground_history.length > 5) {
      setPlaygroundHistory((prev) => prev.slice(1));
    }
  }, [playground_history]);

  const context_object = useMemo(() => {
    return {
      setPlaygroundHistory,
      playground_history,
    };
  }, [setPlaygroundHistory, playground_history]);

  return <PlaygroundContext.Provider value={context_object}>{children}</PlaygroundContext.Provider>;
};

export default PlaygroundProvider;
