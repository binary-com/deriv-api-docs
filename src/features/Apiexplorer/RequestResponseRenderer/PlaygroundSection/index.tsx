import React from 'react';
import {
  TSocketEndpointNames,
  TSocketResponseData,
  TSocketSubscribableEndpointNames,
} from '@site/src/configs/websocket/types';
import { Circles } from 'react-loader-spinner';
import { getIsBrowser } from '@site/src/utils';
import ReactJson from 'react-json-view';
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
  if (loader) {
    return (
      <div>
        <Circles
          height='100'
          width='100'
          color='#d44c0d'
          ariaLabel='circles-loading'
          wrapperClass='loading'
        />
      </div>
    );
  }
  return (
    <div
      id='playground-console'
      className={styles.playgroundConsole}
      data-testid='dt_playground_section'
    >
      {getIsBrowser() ? (
        <React.Fragment>
          {response_state && (
            <React.Fragment>
              {() => (
                <div data-testid='dt_json_view'>
                  {data !== null ? (
                    <ReactJson src={{ data }} theme='tube' />
                  ) : (
                    <ReactJson src={{ error }} theme='tube' />
                  )}
                </div>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <Circles
          height='100'
          width='100'
          color='#d44c0d'
          ariaLabel='circles-loading'
          wrapperClass='loading'
        />
      )}
    </div>
  );
};

export default PlaygroundSection;
