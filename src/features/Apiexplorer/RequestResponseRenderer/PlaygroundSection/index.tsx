import React, { Suspense } from 'react';
import {
  TSocketEndpointNames,
  TSocketResponseData,
  TSocketSubscribableEndpointNames,
} from '@site/src/configs/websocket/types';
import { Circles } from 'react-loader-spinner';
import styles from './PlaygroundSection.module.scss';

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
  const ReactJson = React.lazy(() => import('react-json-view'));
  const Loader = () => (
    <Circles
      height='100'
      width='100'
      color='#d44c0d'
      ariaLabel='circles-loading'
      wrapperClass='loading'
    />
  );
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
