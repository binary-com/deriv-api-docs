import { Text } from '@deriv/ui';
import React from 'react';
import { Dropdown } from './Dropdown/Dropdown';
import styles from './styles.module.scss';
import SchemaWrapper from './Schema/SchemaWrapper';
import RequestJSONBox from './RequestJSONBox';
import useDynamicImportJSON from '@site/src/hooks/useDynamicImportJSON';

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

  const has_info = Object.keys(request_info).length === 0;
  return (
    <div className={styles.playgroundContent}>
      <Text type='heading-2' as='h1' className={styles.heading}>
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
                  auth={request_info.auth_required}
                />
              </div>
            </div>
            {!has_info && (
              <div
                id='playground'
                data-testid='playgroundDocs'
                className={styles.playgroundApiDocs}
              >
                <div className={styles.schemaContainer}>
                  <SchemaWrapper info={request_info} />
                </div>
                <div className={styles.schemaContainer}>
                  <SchemaWrapper info={response_info} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
