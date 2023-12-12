import React from 'react';
import clsx from 'clsx';
import { useHistory, useLocation } from '@docusaurus/router';
import { playground_requests } from '@site/src/utils/playground_requests';
import { SchemaDescriptionTypes } from '../RecursiveContent/SchemaDescription';
import styles from './HighlightCode.module.scss';

export const HighlightCode = ({ description }: SchemaDescriptionTypes) => {
  const { pathname } = useLocation();
  const history = useHistory();

  if (!description) return null;

  const [first, code, ...rest] = description.split('`');

  const has_api_call = playground_requests.some((el) => el.name === code);
  const link_api_call = (api_call_name) => {
    window.scrollTo(0, 0);
    history.push(`${pathname}#${api_call_name}`);
  };

  return (
    <React.Fragment>
      {first}
      {code && (
        <span className={clsx(styles.schemaRole, styles.schemaCode)}>
          {has_api_call ? (
            <button onClick={() => link_api_call(code)} className={styles.schemaLink}>
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
