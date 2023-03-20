import React, { useState } from 'react';
import { TTokenType } from '@site/src/types';
import { CellProps } from 'react-table';
import styles from './token-cell.module.scss';
import CopyButton from './CopyButton';

const ApiTokenCell = ({ cell }: React.PropsWithChildren<CellProps<TTokenType, string>>) => {
  const [is_hiding_token, setIsHidingToken] = useState(true);

  const HiddenToken = () => {
    const TOKEN_LENGTH = 14;
    const element_array = [];
    for (let i = 0; i <= TOKEN_LENGTH; i++) {
      element_array.push(<div key={i} className={styles.hidden_character} />);
    }
    return <div className={styles.hidden_container}>{element_array}</div>;
  };

  return (
    <div data-testid={'token-cell'} className={styles.token_cell}>
      <div>{is_hiding_token ? <HiddenToken /> : cell.value}</div>
      <CopyButton cell={cell} />
      <button
        onClick={() => setIsHidingToken(!is_hiding_token)}
        className={styles.eye_button}
        data-testid='eye-button'
        style={{
          backgroundImage: is_hiding_token ? 'url(/img/eye_closed.svg)' : 'url(/img/eye_open.svg)',
        }}
      />
    </div>
  );
};

export default ApiTokenCell;
