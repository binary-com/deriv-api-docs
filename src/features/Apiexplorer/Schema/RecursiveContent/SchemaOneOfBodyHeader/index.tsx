import React from 'react';
import styles from '../../Schema.module.scss';

type TSchemaOneOfBodyHeader = {
  key_title: string;
  oneOf: Record<string, any>[];
  updateIndexArray;
};

const SchemaOneOfBodyHeader = ({ key_title, oneOf, updateIndexArray }: TSchemaOneOfBodyHeader) => {
  let previous_pattern = '';
  const generateClassName = (type) => {
    let typeClass;
    switch (type) {
      case 'number':
        typeClass = styles.number;
        break;
      case 'array':
        typeClass = styles.array;
        break;
      case 'integer':
        typeClass = styles.integer;
        break;
      case 'null':
        typeClass = styles.null;
        break;
      default:
        typeClass = styles.string;
        break;
    }
    return typeClass;
  };
  return (
    <div className={styles.schemaBodyHeader}>
      <div className={styles.schemaBodyType}>
        <div className={styles.enumFlex}>
          <p style={{ fontSize: '2.6rem' }}>
            <strong>{key_title}</strong>
          </p>
          <div className={styles.enumContainer}>
            <span className={styles.enumLabel}>one of</span>
            {oneOf &&
              Array.isArray(oneOf) &&
              oneOf.map((object, index) => {
                const show_btn = object?.description || object?.properties;
                const typeClassName = generateClassName(object?.type);
                if (
                  index !== 0 &&
                  (object?.pattern || object?.item?.pattern) !== previous_pattern
                ) {
                  previous_pattern = object.pattern;
                }

                return (
                  <React.Fragment key={index}>
                    <div className={styles.schemaObjectContent}>
                      {show_btn ? (
                        <button
                          onClick={() => {
                            updateIndexArray(index);
                          }}
                        >
                          {object.title ? object.title : object.type}
                        </button>
                      ) : (
                        <span className={`${styles.enumType} ${typeClassName}`}>{object.type}</span>
                      )}
                      {'pattern' in object && (
                        <div className={styles.schemaRegexContainer}>
                          {previous_pattern !== object.pattern && (
                            <span className={styles.schemaBodyPattern}>{object.pattern}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemaOneOfBodyHeader;
