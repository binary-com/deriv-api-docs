import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  TSocketSubscribableEndpointNames,
  TSocketRequestProps,
} from '@site/src/configs/websocket/types';
import { Button } from '@deriv/ui';
import styles from '../RequestJSONBox/RequestJSONBox.module.scss';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useSubscription from '@site/src/hooks/useSubscription';
import useDisableSendRequest from '@site/src/hooks/useDisableSendRequest';
import LoginDialog from '../LoginDialog';
import PlaygroundSection from '../RequestResponseRenderer/PlaygroundSection';
import ValidDialog from '../ValidDialog';

export interface IResponseRendererProps<T extends TSocketSubscribableEndpointNames> {
  name: T;
  reqData?: string;
  auth: number;
}

function SubscribeRenderer<T extends TSocketSubscribableEndpointNames>({
  name,
  reqData,
  auth,
}: IResponseRendererProps<T>) {
  const { is_logged_in } = useAuthContext();
  const { disableSendRequest } = useDisableSendRequest();
  const { full_response, is_loading, subscribe, unsubscribe, error } = useSubscription<T>(name);
  const [response_state, setResponseState] = useState(false);
  const [toggle_modal, setToggleModal] = useState(false);
  const [is_not_valid, setIsNotValid] = useState(false);

  const subscribe_ref: any = useRef();

  useEffect(() => {
    if (error && error.code === 'AuthorizationRequired') {
      setToggleModal(true);
    }

    return () => {
      if (subscribe_ref.current) subscribe_ref.current.unsubscribe();
    };
  }, [error]);

  const parseRequestJSON = () => {
    let request_data: TSocketRequestProps<T> extends never ? undefined : TSocketRequestProps<T>;

    try {
      request_data = JSON.parse(reqData);
    } catch (error) {
      console.error('Could not parse the JSON data while trying to send the request: ', error);
      setIsNotValid(true);
      setToggleModal(false);
    }

    return request_data;
  };

  const handleClick = useCallback(() => {
    if (subscribe_ref.current) subscribe_ref.current.unsubscribe();
    subscribe_ref.current = subscribe(parseRequestJSON());
    setResponseState(true);
  }, [subscribe, unsubscribe]);

  const handleClear = () => {
    subscribe_ref.current?.unsubscribe?.();
    setResponseState(false);
  };

  return (
    <div>
      <div className={styles.btnWrapper}>
        <Button color='primary' disabled={disableSendRequest(auth)} onClick={handleClick}>
          Send Request
        </Button>
        <Button color='secondary' onClick={handleClear}>
          Clear
        </Button>
      </div>
      {is_not_valid ? (
        <ValidDialog setIsNotValid={setIsNotValid} setToggleModal={setToggleModal} />
      ) : !is_logged_in && auth == 1 && toggle_modal ? (
        <LoginDialog setToggleModal={setToggleModal} />
      ) : (
        <PlaygroundSection
          loader={is_loading}
          response_state={response_state}
          full_response={full_response}
          error={error}
          name={name}
        />
      )}
    </div>
  );
}

export default React.memo(SubscribeRenderer);
