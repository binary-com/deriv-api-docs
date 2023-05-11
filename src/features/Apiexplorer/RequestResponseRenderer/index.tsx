import React, { useState, useCallback } from 'react';
import { TSocketEndpointNames, TSocketRequestProps } from '@site/src/configs/websocket/types';
import { Button } from '@deriv/ui';
import useWS from '@site/src/hooks/useWs';
import useAuthContext from '@site/src/hooks/useAuthContext';
import PlaygroundSection from './PlaygroundSection';
import LoginDialog from '../LoginDialog';
import styles from '../RequestJSONBox/RequestJSONBox.module.scss';
import { ValidDialog } from '../ValidDialog';

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
  const { data, is_loading, send, clear, error } = useWS<T>(name);
  const [toggle_modal, setToggleModal] = useState(false);
  const [response_state, setResponseState] = useState(false);
  const [is_valid, setIsValid] = useState(false);

  const parseRequestJSON = () => {
    let request_data: TSocketRequestProps<T> extends never ? undefined : TSocketRequestProps<T>;

    try {
      request_data = JSON.parse(reqData);
    } catch (error) {
      console.error('Could not parse the JSON data while trying to send the request: ', error);
    }

    return request_data;
  };

  const handleClick = useCallback(() => {
    if (auth === 1) setToggleModal(true);
    clear();
    send(parseRequestJSON());
    setResponseState(true);
    if (error) {
      setToggleModal(true);
      setIsValid(true);
    }

    console.log(is_valid);
  }, [reqData, send, clear, auth]);

  const handleClear = () => {
    clear();
    setToggleModal(false);
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
      {is_valid ? (
        <ValidDialog setIsValid={setIsValid} setToggleModal={setToggleModal} />
      ) : !is_logged_in && toggle_modal ? (
        <LoginDialog setToggleModal={setToggleModal} />
      ) : (
        <PlaygroundSection
          loader={is_loading}
          response_state={response_state}
          data={data}
          error={error}
        />
      )}
    </div>
  );
}

export default RequestResponseRenderer;
