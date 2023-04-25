import React from 'react';
import { TSocketEndpointNames, TSocketResponseData } from '@site/src/configs/websocket/types';
import { Circles } from 'react-loader-spinner';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './PlaygroundSection.module.scss';

type TPlaygroundSection<T extends TSocketEndpointNames> = {
  loader: boolean;
  responseState: boolean;
  data: TSocketResponseData<T>;
  error: unknown;
};

const PlaygroundSection = <T extends TSocketEndpointNames>({
  loader,
  responseState,
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
      {responseState && (
        <BrowserOnly
          fallback={
            <Circles
              height='100'
              width='100'
              color='#d44c0d'
              ariaLabel='circles-loading'
              wrapperClass='loading'
            />
          }
        >
          {() => {
            const ReactJson = require('react-json-view').default;
            return (
              <div data-testid='dt_json_view'>
                {data !== null ? (
                  <ReactJson src={data} theme='tube' />
                ) : (
                  <ReactJson src={error} theme='tube' />
                )}
              </div>
            );
          }}
        </BrowserOnly>
      )}
    </div>
  );
};

export default PlaygroundSection;
