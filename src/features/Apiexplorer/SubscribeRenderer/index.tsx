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
import PlaygroundSection from '../RequestResponseRenderer/PlaygroundSection';
import LoginDialog from '../LoginDialog';
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
  const { is_logged_in, is_authorized } = useAuthContext();
  const { disableSendRequest } = useDisableSendRequest();
  const { full_response, is_loading, subscribe, unsubscribe, is_subscribed, error } =
    useSubscription<T>(name);
  const [response_state, setResponseState] = useState(false);
  const [toggle_modal, setToggleModal] = useState(false);
  const [is_not_valid, setIsNotValid] = useState(false);

  useEffect(() => {
    if (error && error.code === 'AuthorizationRequired') {
      setToggleModal(true);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      if (is_subscribed) unsubscribe();
    };
  }, [is_subscribed]);

  useEffect(() => {
    const has_active_subscription = full_response !== undefined && !is_authorized;
    if (has_active_subscription) unsubscribe();
  }, [full_response, is_authorized]);

  const parseRequestJSON = useCallback(() => {
    let request_data: TSocketRequestProps<T> extends never ? undefined : TSocketRequestProps<T>;

    try {
      request_data = JSON.parse(reqData);
    } catch (error) {
      setIsNotValid(true);
      setToggleModal(false);
    }

    return request_data;
  }, [reqData]);

  const handleClick = useCallback(() => {
    if (is_subscribed) unsubscribe();
    subscribe(parseRequestJSON());
    setResponseState(true);
  }, [parseRequestJSON, subscribe]);

  const handleClear = () => {
    unsubscribe();
    setResponseState(false);
  };

  return (
    <div>
      <div className={styles.btnWrapper}>
        <Button
          color='primary'
          disabled={disableSendRequest(auth) || reqData === ''}
          onClick={handleClick}
        >
          Send Request
        </Button>
        <Button color='secondary' disabled={reqData === ''} onClick={handleClear}>
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
        />
      )}
    </div>
  );
}

export default React.memo(SubscribeRenderer);
