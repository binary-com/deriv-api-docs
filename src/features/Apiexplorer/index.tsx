import { Text } from '@deriv/ui';
import React, { useCallback, useEffect, useState } from 'react';
import { Dropdown } from './Dropdown/Dropdown';
import styles from './styles.module.scss';
import { createBrowserHistory } from 'history';
import { playground_requests } from '@site/src/utils/playground_requests';

export default function ApiExplorerFeatures() {
  const [text_data, setTextData] = useState({
    request: '',
    selected_value: 'Select API Call - Version 3',
    token: '',
  });
  const [selected, setSelected] = useState('Select API Call - Version 3');
  const history = createBrowserHistory();

  useEffect(() => {
    if (window.location.hash) {
      const hash_value = window.location.hash.split('#')[1];
      const find_select_value = playground_requests.find((el) => el.name === hash_value);
      const hash_text_data = {
        ...text_data,
        request: JSON.stringify(find_select_value?.body, null, 2),
        selected_value: find_select_value?.title,
      };
      setTextData(hash_text_data);
    }
  }, [window.location.hash, playground_requests]);

  const handleSelectChange = useCallback(
    (event, name) => {
      event.preventDefault();
      history.push(`${location.pathname}#${name}`);
      const request_body = playground_requests.find((el) => el.name === event.currentTarget.value);
      const new_text_data = {
        ...text_data,
        selected_value: event.currentTarget.value,
        request: JSON.stringify(request_body?.body, null, 4),
      };
      setTextData({ ...new_text_data });
    },
    [history, text_data],
  );

  return (
    <section className={styles.features}>
      <div className={styles.playgroundPageWrapper}>
        <div className={styles.playgroundApiJson}>
          <Text type='heading-1' as='h1' css={{ 'text-align': 'center' }}>
            API Explorer
          </Text>
          <Dropdown
            selected_value={text_data.selected_value}
            handleChange={handleSelectChange}
            selected={selected}
            setSelected={setSelected}
          ></Dropdown>
        </div>
      </div>
    </section>
  );
}
