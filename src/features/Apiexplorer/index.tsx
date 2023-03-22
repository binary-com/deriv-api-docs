import { Text } from '@deriv/ui';
import React from 'react';
import { Dropdown } from './Dropdown/Dropdown';
import styles from './styles.module.scss';
import SchemaWrapper from './Schema/SchemaWrapper';
import RequestJSONBox from './RequestJSONBox';
import useDynamicImportJSON from '@site/src/hooks/dynamicImport';

export default function ApiExplorerFeatures() {
  const {
    text_data,
    selected,
    setSelected,
    handleSelectChange,
    request_info,
    response_info,
    handleTextAreaInput,
  } = useDynamicImportJSON();
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
                <RequestJSONBox
                  request_example={text_data.request}
                  handleChange={handleTextAreaInput}
                  name={text_data.name}
                  auth_required={request_info.auth_required}
                />
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
