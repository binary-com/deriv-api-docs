import React, { useState, useCallback, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import {
  TSocketResponseData,
  TSocketSubscribableEndpointNames,
} from '@site/src/configs/websocket/types';
import { Button } from '@deriv/ui';
import styles from '../RequestJSONBox/RequestJSONBox.module.scss';
import useAuthContext from '@site/src/hooks/useAuthContext';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useSubscription from '@site/src/hooks/useSubscription';
import LoginDialog from '../LoginDialog';

export interface IResponseRendererProps<T extends TSocketSubscribableEndpointNames> {
  name: T;
  reqData?: string;
  auth: number;
}

type TPlaygroundSection<T extends TSocketSubscribableEndpointNames> = {
  loader: boolean;
  responseState: boolean;
  data: TSocketResponseData<T>;
  error: unknown;
};

const PlaygroundSection = <T extends TSocketSubscribableEndpointNames>({
  loader,
  responseState,
  data,
  error,
}: TPlaygroundSection<T>) => {
  if (loader) {
    return (
      <div>
        <Circles
          height='100'
          width='100'
          color='#d44c0d'
          ariaLabel='circles-loading'
          wrapperClass='loading'
        />
      </div>
    );
  }
  return (
    <div
      id='playground-console'
      className={styles.playgroundConsole}
      data-testid='dt_playground_section'
    >
      {responseState && (
        <BrowserOnly
          fallback={
            <Circles
              height='100'
              width='100'
              color='#d44c0d'
              ariaLabel='circles-loading'
              wrapperClass='loading'
            />
          }
        >
          {() => {
            const ReactJson = require('react-json-view').default;
            return (
              <div data-testid='dt_json_view'>
                {data !== null ? (
                  <ReactJson src={data} theme='tube' />
                ) : (
                  <ReactJson src={error} theme='tube' />
                )}
              </div>
            );
          }}
        </BrowserOnly>
      )}
    </div>
  );
};

function SubscribeRenderer<T extends TSocketSubscribableEndpointNames>({
  name,
  reqData,
  auth,
}: IResponseRendererProps<T>) {
  const { is_logged_in } = useAuthContext();
  const { data, is_loading, subscribe, unsubscribe, error } = useSubscription<T>(name);
  const [responseState, setResponseState] = useState(false);
  const [toggle_modal, setToggleModal] = useState(false);

  useEffect(() => {
    if (error) {
      setToggleModal(true);
    }
  }, [error]);

  const handleClick = useCallback(() => {
    unsubscribe();
    subscribe(JSON.parse(reqData));
    setResponseState(true);
  }, [reqData, subscribe, unsubscribe]);

  const handleClear = () => {
    unsubscribe();
    setResponseState(false);
  };

  return (
    <div>
      <div className={styles.btnWrapper}>
        <Button color='primary' onClick={handleClick}>
          Send Request
        </Button>
        <Button color='secondary' onClick={handleClear}>
          Clear
        </Button>
      </div>
      {!is_logged_in && auth == 1 && toggle_modal ? (
        <LoginDialog setToggleModal={setToggleModal} />
      ) : (
        <PlaygroundSection
          loader={is_loading}
          responseState={responseState}
          data={data}
          error={error}
        />
      )}
    </div>
  );
}

export default SubscribeRenderer;
