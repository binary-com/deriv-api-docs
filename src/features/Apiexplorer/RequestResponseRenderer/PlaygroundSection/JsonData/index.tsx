import React from 'react';
import styles from './JsonData.module.scss';
import {
  TSocketEndpointNames,
  TSocketSubscribableEndpointNames,
  TSocketResponse,
} from '@site/src/configs/websocket/types';

const ReactJson = React.lazy(() => import('react-json-view'));

type TJsonData<T extends TSocketEndpointNames> = {
  full_response: TSocketResponse<T>;
  error: unknown;
};

const JsonData = <T extends TSocketEndpointNames | TSocketSubscribableEndpointNames>({
  full_response,
  error,
}: TJsonData<T>) => {
  return (
    <React.Fragment>
      {full_response !== null && full_response?.echo_req ? (
        <div className={styles.reactJsonContainer}>
          <ReactJson src={full_response.echo_req} theme='tube' />
          <ReactJson src={full_response} theme='tube' />
        </div>
      ) : (
        <ReactJson src={{ error }} theme='tube' />
      )}
    </React.Fragment>
  );
};

export default JsonData;
