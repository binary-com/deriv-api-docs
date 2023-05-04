import React, { useState, useCallback } from 'react';
import { TSocketEndpointNames } from '@site/src/configs/websocket/types';
import { Button } from '@deriv/ui';
import useWS from '@site/src/hooks/useWs';
import useAuthContext from '@site/src/hooks/useAuthContext';
import PlaygroundSection from '../PlaygroundSection';
import LoginDialog from '../LoginDialog';
import styles from './RequestResponseRenderer.module.scss';
export interface IResponseRendererProps<T extends TSocketEndpointNames> {
  name: T;
  reqData?: string;
  auth: number;
}

function RequestResponseRenderer<T extends TSocketEndpointNames>({
  name,
  reqData,
  auth,
}: IResponseRendererProps<T>) {
  const { is_logged_in } = useAuthContext();
  const { full_response, is_loading, send, clear, error } = useWS<T>(name);
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
    <React.Fragment>
      <div className={styles.btnWrapper}>
        <Button color='primary' onClick={handleClick}>
          Send Request
        </Button>
        <Button color='secondary' onClick={handleClear}>
          Clear
        </Button>
      </div>
      {!is_logged_in && auth == 1 ? (
        <LoginDialog visible={error} />
      ) : (
        <PlaygroundSection
          loader={is_loading}
          responseState={responseState}
          full_response={full_response}
          error={error}
          name={name}
        />
      )}
    </React.Fragment>
  );
}

export default RequestResponseRenderer;
