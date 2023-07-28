import React, { Suspense, useEffect, useRef } from 'react';
import {
  TSocketEndpointNames,
  TSocketSubscribableEndpointNames,
  TSocketResponse,
} from '@site/src/configs/websocket/types';
import JsonData from './JsonData';
import Loader from '@site/src/components/Loader';
import styles from './PlaygroundSection.module.scss';
import usePlaygroundContext from '@site/src/hooks/usePlaygroundContext';

type TPlaygroundSection<T extends TSocketEndpointNames> = {
  loader: boolean;
  response_state: boolean;
  full_response: TSocketResponse<T>;
  error: unknown;
};

const PlaygroundSection = <T extends TSocketEndpointNames | TSocketSubscribableEndpointNames>({
  loader,
  response_state,
  full_response,
  error,
}: TPlaygroundSection<T>) => {
  const json_data_ref = useRef<HTMLDivElement>(null);
  const { setPlaygroundHistory, playground_history } = usePlaygroundContext();

  useEffect(() => {
    updateHistory();
  }, [full_response]);

  useEffect(() => {
    scrollToBottom();
  }, [playground_history]);

  if (loader && playground_history.length === 0) return <Loader />;

  const updateHistory = () => {
    if (full_response) {
      setPlaygroundHistory((prev: TSocketResponse<T>[]) => [...prev, full_response]);
    }
  };

  const scrollToBottom = () => {
    const ref_is_loaded = json_data_ref?.current !== null;
    if (ref_is_loaded) {
      const console_height = json_data_ref.current.scrollHeight;
      json_data_ref.current.scrollTo({ behavior: 'smooth', top: console_height });
    }
  };

  return (
    <div
      id='playground-console'
      className={styles.playgroundConsole}
      data-testid='dt_playground_section'
      ref={json_data_ref}
    >
      {response_state && (
        <React.Fragment>
          <Suspense fallback={<Loader />}>
            <div data-testid='dt_json_view'>
              {playground_history.map((response: TSocketResponse<T>) => (
                <React.Fragment key={response.req_id}>
                  <JsonData full_response={response} error={error} />
                </React.Fragment>
              ))}
            </div>
          </Suspense>
        </React.Fragment>
      )}
    </div>
  );
};

export default PlaygroundSection;
