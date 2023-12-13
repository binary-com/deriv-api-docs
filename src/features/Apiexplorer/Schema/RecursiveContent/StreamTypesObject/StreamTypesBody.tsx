import React from 'react';
import { TEnumStreamType } from '@site/src/types';
import styles from '../../Schema.module.scss';

type TStreamTypesBody = {
  type: string;
  _enum: TEnumStreamType;
};

const StreamTypesBody = ({ type, _enum }: TStreamTypesBody) => {
  return (
    <div className={styles.streamTypesBody}>
      <div className={styles.streamTypesObject}>
        <span className={styles.enumLabel}>enum</span>
        <span className={`${styles.enumType} ${styles.string}`}>{type}</span>
        {_enum.map((enum_name: string, i: number) => (
          <div className={`${styles.schemaCode} ${styles.schemaEnums}`} key={i}>
            {enum_name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreamTypesBody;
