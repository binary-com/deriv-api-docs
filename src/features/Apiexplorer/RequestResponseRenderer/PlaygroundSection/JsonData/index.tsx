import React, { useCallback } from 'react';
import styles from './JsonData.module.scss';
import {
  TSocketResponseData,
  TSocketEndpointNames,
  TSocketSubscribableEndpointNames,
} from '@site/src/configs/websocket/types';

const ReactJson = React.lazy(() => import('react-json-view'));

type TJsonData<T extends TSocketEndpointNames> = {
  full_response: TSocketResponseData<T>;
  error: unknown;
  name: string;
};

const JsonData = <T extends TSocketEndpointNames | TSocketSubscribableEndpointNames>({
  full_response,
  name,
  error,
}: TJsonData<T>) => {
  const getResponse = useCallback((key: string) => full_response[key], [full_response]);
  const key = getResponse('msg_type') ?? name;
  const echo_req_json = {
    echo_req: getResponse('echo_req'),
    msg_type: getResponse('msg_type'),
    req_id: getResponse('req_id'),
  };
  const main_object_json = { [key]: getResponse(key) };

  return (
    <React.Fragment>
      {full_response !== null ? (
        <div className={styles.reactJsonContainer}>
          <ReactJson src={echo_req_json} theme='tube' />
          <ReactJson src={main_object_json} theme='tube' />
        </div>
      ) : (
        <ReactJson src={{ error }} theme='tube' />
      )}
    </React.Fragment>
  );
};

export default JsonData;
