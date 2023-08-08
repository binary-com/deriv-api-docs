import React, { RefObject, Suspense, useEffect, useRef, useState } from 'react';
import {
  TSocketEndpointNames,
  TSocketSubscribableEndpointNames,
  TSocketResponse,
} from '@site/src/configs/websocket/types';
import JsonData from './JsonData';
import Spinner from '@site/src/components/Spinner';
import styles from './PlaygroundSection.module.scss';
import usePlaygroundContext from '@site/src/hooks/usePlaygroundContext';
import useScrollTo from '@site/src/hooks/useScrollTo';

type TPlaygroundSection<T extends TSocketEndpointNames> = {
  loader: boolean;
  response_state: boolean;
  full_response: TSocketResponse<T>;
  error: unknown;
  test_ref?: any;
};

const PlaygroundSection = <T extends TSocketEndpointNames | TSocketSubscribableEndpointNames>({
  loader,
  response_state,
  full_response,
  error,
}: TPlaygroundSection<T>) => {
  const { setPlaygroundHistory, playground_history } = usePlaygroundContext();
  const [is_scrolling, setIsScrolling] = useState(true);
  const ref: RefObject<HTMLDivElement> = useRef(null);

  const updateHistory = () => {
    if (full_response) {
      setPlaygroundHistory((prev: TSocketResponse<T>[]) => [...prev, full_response]);
    }
  };

  const toggleScrolling = () => {
    const SCROLL_MARGIN = 150;
    const scroll_height = ref.current.scrollHeight;
    const scroll_top = ref.current.scrollTop;
    const scroll_position = scroll_height - scroll_top;
    const window_height = ref.current.clientHeight;

    if (window_height + SCROLL_MARGIN < scroll_position) {
      setIsScrolling(false);
    } else {
      setIsScrolling(true);
    }
  };

  useScrollTo(ref, playground_history, is_scrolling);

  useEffect(() => {
    updateHistory();
  }, [full_response]);

  if (loader && playground_history.length === 0) return <Spinner />;

  return (
    <div
      id='playground-console'
      className={styles.playgroundConsole}
      data-testid='dt_playground_section'
      ref={ref}
      onScroll={toggleScrolling}
    >
      {response_state && (
        <React.Fragment>
          <Suspense fallback={<Spinner />}>
            <div data-testid='dt_json_view' className={styles.dtJsonView}>
              {playground_history.map((response: TSocketResponse<T>) => {
                // API does not give an unique ID across subscription API calls as of now.
                // I used stringify here to make it work properly and to not have duplicate keys.
                const key = response.subscription ? JSON.stringify(response) : response.req_id;
                return (
                  <React.Fragment key={key}>
                    <JsonData full_response={response} error={error} />
                  </React.Fragment>
                );
              })}
            </div>
          </Suspense>
        </React.Fragment>
      )}
    </div>
  );
};

export default PlaygroundSection;
