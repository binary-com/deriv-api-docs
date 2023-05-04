import React, { useState } from 'react';
import {
  TSocketResponse,
  TSocketSubscribableEndpointNames,
} from '@site/src/configs/websocket/types';
import { Button, Modal } from '@deriv/ui';
import style from '../RequestJSONBox/RequestJSONBox.module.scss';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { useCallback } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { Circles } from 'react-loader-spinner';
import useSubscription from '@site/src/hooks/useSubscription';
import useLoginUrl from '@site/src/hooks/useLoginUrl';

export interface IResponseRendererProps<T extends TSocketSubscribableEndpointNames> {
  name: T;
  reqData?: string;
  auth: number;
}

type TPlaygroundSection<T extends TSocketSubscribableEndpointNames> = {
  loader: boolean;
  responseState: boolean;
  full_response: TSocketResponse<T>;
  error: unknown;
  name: string;
};

export const LoginModal = (visible) => {
  const { getUrl } = useLoginUrl();

  const handleClick = () => {
    location.assign(getUrl('en'));
  };

  const handleSignUp = () => {
    location.assign('https://deriv.com/signup/');
  };
  if (visible?.visible) {
    return (
      <Modal defaultOpen>
        <Modal.Portal>
          <div className='modal-overlay'>
            <Modal.Overlay />
            <Modal.PageContent
              title={'Authorisation required'}
              has_close_button
              className={style.wrapper}
            >
              <div className={style.modal}>Log in or sign up to continue.</div>
              <div className={style.buttonWrapper}>
                <Button color='tertiary' onClick={handleSignUp} className={style.btn}>
                  Sign up
                </Button>
                <Button color='primary' onClick={handleClick} className={style.btn}>
                  Log in
                </Button>
              </div>
            </Modal.PageContent>
          </div>
        </Modal.Portal>
      </Modal>
    );
  }
  return null;
};

const PlaygroundSection = <T extends TSocketSubscribableEndpointNames>({
  loader,
  responseState,
  full_response,
  error,
  name,
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
            const key = full_response['msg_type'] ?? name;
            const ReactJson = require('react-json-view').default;
            const echo_req_json = {
              echo_req: full_response['echo_req'],
              msg_type: full_response['msg_type'],
              req_id: full_response['req_id'],
            };
            const main_object_json = { [key]: full_response[key] };

            return (
              <div>
                {full_response !== null ? (
                  <div className={style.reactJsonContainer}>
                    <ReactJson src={echo_req_json} theme='tube' />
                    <ReactJson src={main_object_json} theme='tube' />
                  </div>
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
  const { full_response, is_loading, subscribe, unsubscribe, error } = useSubscription<T>(name);
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
          full_response={full_response}
          error={error}
          name={name}
        />
      )}
    </div>
  );
}

export default SubscribeRenderer;
