import { Text } from '@deriv/ui';
import React, { useCallback, useEffect, useState } from 'react';
import { Dropdown } from './Dropdown/Dropdown';
import styles from './styles.module.scss';
import { playground_requests } from '@site/src/utils/playground_requests';
import SchemaWrapper from './Schema/SchemaWrapper';
import { useHistory, useLocation } from '@docusaurus/router';
import RequestJSONBox from './RequestJSONBox';
import { TInfo } from '@site/src/types';

export default function ApiExplorerFeatures() {
  const [text_data, setTextData] = useState({
    request: '',
    selected_value: 'Select API Call - Version 3',
    name: null,
  });
  const [selected, setSelected] = useState('Select API Call - Version 3');
  const [response_info, setResponseInfo] = useState({});
  const [request_info, setRequestInfo] = useState<TInfo>({});
  const history = useHistory();
  const { hash, pathname } = useLocation();

  const dynamicImportJSON = useCallback(
    (selected_value) => {
      import(`../../../config/v3/${selected_value}/send.json`)
        .then((data) => {
          setRequestInfo(data);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
      import(`../../../config/v3/${selected_value}/receive.json`)
        .then((data) => {
          setResponseInfo(data);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    [setRequestInfo, setResponseInfo],
  );
  useEffect(() => {
    const hash_value = hash.split('#')[1];
    const request_body = playground_requests.find((el) => el.name === hash_value);
    const is_not_placeholder = text_data.selected_value === request_body?.name;
    if (is_not_placeholder) dynamicImportJSON(text_data.selected_value);
  }, [dynamicImportJSON, hash, text_data.selected_value]);

  useEffect(() => {
    const hash_value = hash.split('#')[1];
    if (hash_value) {
      dynamicImportJSON(hash_value);
    }
  }, [dynamicImportJSON, hash]);

  useEffect(() => {
    if (hash) {
      const hash_value = hash.split('#')[1];
      const find_select_value = playground_requests.find((el) => el.name === hash_value);
      const hash_text_data = {
        ...text_data,
        request: JSON.stringify(find_select_value?.body, null, 2),
        selected_value: find_select_value?.title,
        name: hash_value,
      };
      setTextData(hash_text_data);
    }
  }, [hash]);

  const handleTextAreaInput = useCallback(
    (e) => setTextData({ ...text_data, request: e.target.value, name: hash.split('#')[1] }),
    [hash, text_data],
  );

  const json_box_props = {
    request_example: text_data.request,
    handleChange: handleTextAreaInput,
    name: text_data.name,
    auth_required: request_info.auth_required,
  };
  const handleSelectChange = useCallback(
    (event, name) => {
      event.preventDefault();
      history.push(`${pathname}#${name}`);
      const request_body = playground_requests.find((el) => el.name === event.currentTarget.value);
      const new_text_data = {
        ...text_data,
        selected_value: event.currentTarget.value,
        request: JSON.stringify(request_body?.body, null, 4),
      };
      setTextData({ ...new_text_data });
    },
    [history, pathname, text_data],
  );

  return (
    <div className={styles.playgroundContent}>
      <Text type='heading-1' as='h1' css={{ 'text-align': 'center' }}>
        API Explorer
      </Text>
      <div className={styles.pageWrapper}>
        <div className={styles.playground}>
          <div className={styles.playgroundPageWrapper}>
            <div className={styles.playgroundApiJson}>
              <Dropdown
                selected_value={text_data.selected_value}
                handleChange={handleSelectChange}
                selected={selected}
                setSelected={setSelected}
              ></Dropdown>
              <div>
                <RequestJSONBox {...json_box_props} />
              </div>
            </div>
            <div id='playground' data-testid='playgroundDocs' className={styles.playgroundApiDocs}>
              <div className={styles.playgroundReqSchema}>
                <SchemaWrapper info={request_info} />
              </div>
              <div className={styles.playgroundResSchema}>
                <SchemaWrapper info={response_info} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
