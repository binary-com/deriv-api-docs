import React, { useState } from 'react';
import { TSocketEndpointNames } from '@site/src/configs/websocket/types';
import useWS from '@site/src/hooks/useWs';
import { Button, Modal } from '@deriv/ui';
import style from '../RequestJSONBox/RequestJSONBox.module.scss';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { useCallback } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
interface IDataThingyProps<T extends TSocketEndpointNames> {
  name: T;
  reqData?: string;
  auth: number;
}

function RequestResponseRenderer<T extends TSocketEndpointNames>({
  name,
  reqData,
  auth,
}: IDataThingyProps<T>) {
  const { data, is_loading, send, clear, error } = useWS<T>(name);
  const [res, setRes] = useState(false);

  const handleClick = useCallback(() => {
    clear();
    send(JSON.parse(reqData));
    setRes(true);
  }, [reqData, send, clear]);
  const handleClear = () => {
    clear();
    setRes(false);
  };

  const { is_logged_in } = useAuthContext();

  const loginModal = () => {
    if (error) {
      return (
        <Modal defaultOpen>
          <Modal.Portal>
            <Modal.Overlay />
            <Modal.PageContent
              title={'Authorization Required'}
              has_close_button
              has_title_separator
            >
              <div className={style.modal}>Please Login to fetch Response</div>
            </Modal.PageContent>
          </Modal.Portal>
        </Modal>
      );
    }
  };

  const playgroundSection = () => {
    if (is_loading) {
      return (
        <div>
          <h1>Loading........</h1>
        </div>
      );
    }
    return (
      <div
        id='playground-console'
        className={style.playgroundConsole}
        data-testid='playgroundConsole'
      >
        {res && (
          <BrowserOnly fallback={<div>Loading...</div>}>
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
      {!is_logged_in && auth == 1 ? loginModal() : playgroundSection()}
    </div>
  );
}

export default RequestResponseRenderer;
