import React, { Suspense } from 'react';
import {
  TSocketEndpointNames,
  TSocketResponseData,
  TSocketSubscribableEndpointNames,
} from '@site/src/configs/websocket/types';
import JsonData from './JsonData';
import Loader from '@site/src/components/Loader';
import styles from './PlaygroundSection.module.scss';

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
              <JsonData full_response={full_response} name={name} error={error} />
            </div>
          </Suspense>
        </React.Fragment>
      )}
    </div>
  );
};

export default PlaygroundSection;
