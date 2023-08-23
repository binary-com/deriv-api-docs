import React from 'react';
import styles from './JsonData.module.scss';
import {
  TSocketEndpointNames,
  TSocketSubscribableEndpointNames,
  TSocketResponse,
} from '@site/src/configs/websocket/types';

const ReactJson = React.lazy(() => import('react-json-view'));

type TJsonData<T extends TSocketEndpointNames> = {
  history_reponse: TSocketResponse<T>;
  error: unknown;
};

const JsonData = <T extends TSocketEndpointNames | TSocketSubscribableEndpointNames>({
  history_reponse,
  error,
}: TJsonData<T>) => {
  return (
    <React.Fragment>
      {history_reponse !== null && history_reponse?.echo_req ? (
        <div
          className={styles.reactJsonContainer}
          data-testid={`dt_json_container-${history_reponse.req_id}`}
        >
          <ReactJson src={history_reponse.echo_req} theme='tube' />
          <ReactJson src={history_reponse} theme='tube' />
        </div>
      ) : (
        <ReactJson src={{ error }} theme='tube' />
      )}
    </React.Fragment>
  );
};

export default JsonData;
