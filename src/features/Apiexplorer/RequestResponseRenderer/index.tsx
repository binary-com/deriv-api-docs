import React, { useState } from 'react';
import { TSocketEndpointNames, TSocketResponseData } from '@site/src/configs/websocket/types';
import useWS from '@site/src/hooks/useWs';
import { Button, Modal } from '@deriv/ui';
import style from '../RequestJSONBox/RequestJSONBox.module.scss';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { useCallback } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { Circles } from 'react-loader-spinner';
import useLoginUrl from '@site/src/hooks/useLoginUrl';
export interface IResponseRendererProps<T extends TSocketEndpointNames> {
  name: T;
  reqData?: string;
  auth: number;
}

type TPlaygroundSection<T extends TSocketEndpointNames> = {
  loader: boolean;
  responseState: boolean;
  data: TSocketResponseData<T>;
  error: unknown;
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
                <Button color='tertiary' onClick={handleSignUp}>
                  Sign up
                </Button>
                <Button color='primary' onClick={handleClick} className={style.btn}>
                  Login
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

const PlaygroundSection = <T extends TSocketEndpointNames>({
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

function RequestResponseRenderer<T extends TSocketEndpointNames>({
  name,
  reqData,
  auth,
}: IResponseRendererProps<T>) {
  const { is_logged_in } = useAuthContext();
  const { data, is_loading, send, clear, error } = useWS<T>(name);
  const [responseState, setResponseState] = useState(false);

  const handleClick = useCallback(() => {
    clear();
    send(JSON.parse(reqData));
    setResponseState(true);
  }, [reqData, send, clear]);

  const handleClear = () => {
    clear();
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

export default RequestResponseRenderer;
