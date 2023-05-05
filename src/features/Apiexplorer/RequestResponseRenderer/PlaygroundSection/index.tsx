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
  data: TSocketResponseData<T>;
  error: unknown;
};

const PlaygroundSection = <T extends TSocketEndpointNames | TSocketSubscribableEndpointNames>({
  loader,
  response_state,
  data,
  error,
}: TPlaygroundSection<T>) => {
  if (loader) return <Loader />;

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
              {data !== null ? (
                <ReactJson src={{ data }} theme='tube' />
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
