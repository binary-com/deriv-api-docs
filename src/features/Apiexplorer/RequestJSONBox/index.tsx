import { TSocketEndpointNames } from '@site/src/configs/websocket/types';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import RequestResponseRenderer from '../RequestResponseRenderer';
import style from './RequestJSONBox.module.scss';
import SubscribeRenderer from '../SubscribeRenderer';
import { TSocketSubscribableEndpointNames } from '@site/src/configs/websocket/types';

interface TRequestJSONBox<T extends TSocketEndpointNames> {
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  request_example: string;
  name: T;
  auth: number;
}

function RequestJSONBox<T extends TSocketEndpointNames>({
  handleChange,
  request_example,
  name,
  auth,
}: TRequestJSONBox<T>) {
  const is_subscribe = useMemo(() => {
    return request_example?.includes('subscribe');
  }, [request_example]);
  const [isdisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (name === undefined) {
      setIsDisabled(true);
    }
  }, [name]);

  return (
    <div className={style.playgroundBox}>
      <div className={style.formContent}>
        <label htmlFor='playground-request' className={style.inlineLabel}>
          Request JSON
        </label>
        <textarea
          id='playground-request'
          className={clsx(style.textareaRequest, style.playgroundRequest)}
          placeholder={'Request JSON'}
          onChange={handleChange}
          value={request_example}
          disabled={isdisabled}
        ></textarea>
        {is_subscribe ? (
          <SubscribeRenderer
            name={name as TSocketSubscribableEndpointNames}
            reqData={request_example}
            auth={auth}
          />
        ) : (
          <RequestResponseRenderer name={name} reqData={request_example} auth={auth} />
        )}
      </div>
    </div>
  );
}

export default RequestJSONBox;
