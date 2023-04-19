import React, { useState } from 'react';
import {
  TSocketResponseData,
  TSocketSubscribableEndpointNames,
} from '@site/src/configs/websocket/types';
import { Button, Modal } from '@deriv/ui';
import style from '../RequestJSONBox/RequestJSONBox.module.scss';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { useCallback } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { Circles } from 'react-loader-spinner';
import useSubscription from '@site/src/hooks/useSubscription';

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

export const LoginModal = (visible) => {
  if (visible?.visible) {
    return (
      <Modal defaultOpen>
        <Modal.Portal>
          <Modal.Overlay />
          <Modal.PageContent title={'Authorization Required'} has_close_button has_title_separator>
            <div className={style.modal}>Please Login to fetch Response</div>
          </Modal.PageContent>
        </Modal.Portal>
      </Modal>
    );
  }
  return null;
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
      className={style.playgroundConsole}
      data-testid='playground-section'
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
              <div>
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
      <div className={style.btnWrapper}>
        <Button color='primary' onClick={handleClick}>
          Send Request
        </Button>
        <Button color='secondary' onClick={handleClear}>
          Clear
        </Button>
      </div>
      {!is_logged_in && auth == 1 ? (
        <LoginModal visible={error} />
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
