import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { TSocketResponse } from '@site/src/configs/websocket/types';
import { Circles } from 'react-loader-spinner';
import { TSocketEndpointNames } from '@site/src/configs/websocket/types';
import styles from './PlaygroundSection.module.scss';

type TPlaygroundSection<T extends TSocketEndpointNames> = {
  loader: boolean;
  responseState: boolean;
  full_response: TSocketResponse<T>;
  error: unknown;
  name: string;
};

const PlaygroundSection = <T extends TSocketEndpointNames>({
  loader,
  responseState,
  full_response,
  error,
  name,
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
      data-testid='playground-section'
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
            const key = full_response['msg_type'] ?? name;
            const ReactJson = require('react-json-view').default;
            const echo_req_json = {
              echo_req: full_response['echo_req'],
              msg_type: full_response['msg_type'],
              req_id: full_response['req_id'],
            };
            const main_object_json = { [key]: full_response[key] };

            return (
              <div>
                {full_response !== null ? (
                  <div className={styles.reactJsonContainer}>
                    <ReactJson src={echo_req_json} theme='tube' />
                    <ReactJson src={main_object_json} theme='tube' />
                  </div>
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
