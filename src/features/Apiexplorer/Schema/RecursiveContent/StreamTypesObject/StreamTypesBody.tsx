import React from 'react';
import styles from '../../Schema.module.scss';

type TStreamTypesBody = {
  type: string;
  _enum: Array<
    | 'balance'
    | 'candles'
    | 'cashier_payments'
    | 'p2p_advert'
    | 'p2p_advertiser'
    | 'p2p_order'
    | 'proposal'
    | 'proposal_open_contract'
    | 'ticks'
    | 'transaction'
    | 'trading_platform_asset_listing'
    | 'website_status'
    | 'p2p_settings'
    | 'crypto_estimations'
  >;
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
