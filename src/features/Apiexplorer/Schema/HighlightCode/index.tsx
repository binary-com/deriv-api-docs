import React from 'react';
import clsx from 'clsx';
import styles from './HighlightCode.module.scss';
import { playground_requests } from '@site/src/utils/playground_requests';
import { SchemaDescriptionTypes } from '../RecursiveContent/SchemaDescription';
import { useHistory, useLocation } from '@docusaurus/router';

export const HighlightCode = ({ description }: SchemaDescriptionTypes) => {
  const { pathname } = useLocation();
  const history = useHistory();

  if (!description) return null;

  const [first, code, ...rest] = description.split('`');

  const api_call_object = playground_requests.find((el) => el.name === code);
  const link_api_call = (obj) => {
    window.scrollTo(0, 0);
    history.push(`${pathname}#${obj?.name}`);
  };

  return (
    <React.Fragment>
      {first}
      {code && (
        <span className={clsx(styles.schemaRole, styles.schemaCode)}>
          {api_call_object ? (
            <button onClick={() => link_api_call(api_call_object)} className={styles.schemaLink}>
              {code}
            </button>
          ) : (
            code
          )}
        </span>
      )}
      {rest.length > 0 && <HighlightCode description={rest.join('`')} />}
    </React.Fragment>
  );
};
