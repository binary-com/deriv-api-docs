import React, { Suspense } from 'react';
import usePlaygroundContext from '@site/src/hooks/usePlaygroundContext';
import JsonData from './JsonData';
import {
  TSocketEndpointNames,
  TSocketResponse,
  TSocketSubscribableEndpointNames,
} from '@site/src/configs/websocket/types';
import styles from './JsonView.module.scss';
import Spinner from '@site/src/components/Spinner';

type TJsonView = {
  error: unknown;
};

const JsonView = <T extends TSocketEndpointNames | TSocketSubscribableEndpointNames>({
  error,
}: TJsonView) => {
  const { playground_history } = usePlaygroundContext();
  return (
    <Suspense fallback={<Spinner />}>
      <div data-testid='dt_json_view' className={styles.dtJsonView}>
        {playground_history.map((response: TSocketResponse<T>) => {
          const key = response.subscription ? JSON.stringify(response) : response.req_id;
          return (
            <React.Fragment key={key}>
              <JsonData history_reponse={response} error={error} />
            </React.Fragment>
          );
        })}
      </div>
    </Suspense>
  );
};

export default JsonView;
