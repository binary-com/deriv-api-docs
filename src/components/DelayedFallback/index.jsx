import React from 'react';
import Spinner from '@site/src/components/Spinner';
import styles from './DelayedFallback.module.scss';

export default function DelayedFallback() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    let timeout = setTimeout(() => setShow(true), 300);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <React.Fragment>
      {show && (
        <div className={styles.centralSpinner}>
          <Spinner />
        </div>
      )}
    </React.Fragment>
  );
}
