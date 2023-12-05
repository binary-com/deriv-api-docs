import React from 'react';
import SchemaTitle from '../../SchemaTitle';
import styles from '../../Schema.module.scss';

type TStreamTypesHeader = {
  description: string;
};

const StreamTypesHeader = ({ description }: TStreamTypesHeader) => {
  return (
    <div className={styles.streamTypesHeader}>
      <SchemaTitle className={styles.streamTypesTitle}>{'stream_types'}</SchemaTitle>
      <div className={styles.streamTypesDescription}>
        <div>{description}</div>
      </div>
    </div>
  );
};

export default StreamTypesHeader;
