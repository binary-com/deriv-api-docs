import React, { Suspense } from 'react';
import {
  TSocketEndpointNames,
  TSocketResponseData,
  TSocketSubscribableEndpointNames,
} from '@site/src/configs/websocket/types';
import Loader from '@site/src/components/Loader';
import styles from './PlaygroundSection.module.scss';

const ReactJson = React.lazy(() => import('react-json-view'));

type TPlaygroundSection<T extends TSocketEndpointNames> = {
  loader: boolean;
  response_state: boolean;
  full_response: TSocketResponseData<T>;
  error: unknown;
  name: string;
};

const PlaygroundSection = <T extends TSocketEndpointNames | TSocketSubscribableEndpointNames>({
  loader,
  response_state,
  full_response,
  error,
  name,
}: TPlaygroundSection<T>) => {
  if (loader) return <Loader />;

  const key = full_response['msg_type'] ?? name;
  const echo_req_json = {
    echo_req: full_response['echo_req'],
    msg_type: full_response['msg_type'],
    req_id: full_response['req_id'],
  };
  const main_object_json = { [key]: full_response[key] };

  return (
    <div
      id='playground-console'
      className={styles.playgroundConsole}
      data-testid='dt_playground_section'
    >
      {response_state && (
        <React.Fragment>
          <Suspense fallback={<Loader />}>
            <div data-testid='dt_json_view'>
              {full_response !== null ? (
                <div className={styles.reactJsonContainer}>
                  <ReactJson src={echo_req_json} theme='tube' />
                  <ReactJson src={main_object_json} theme='tube' />
                </div>
              ) : (
                <ReactJson src={{ error }} theme='tube' />
              )}
            </div>
          </Suspense>
        </React.Fragment>
      )}
    </div>
  );
};

export default PlaygroundSection;
