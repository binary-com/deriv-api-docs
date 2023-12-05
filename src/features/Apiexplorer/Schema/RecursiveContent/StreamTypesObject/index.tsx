import React from 'react';
import StreamTypesHeader from './StreamTypesHeader';
import StreamTypesBody from './StreamTypesBody';
import styles from '../../Schema.module.scss';

type TStreamTypesObject = {
  definitions: {
    stream_types: {
      description: string;
      type: string;
      enum: Array<
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
  };
};

const StreamTypesObject = ({ definitions }: TStreamTypesObject) => {
  return (
    <div className={styles.streamTypesContainer}>
      <StreamTypesHeader description={definitions.stream_types.description} />
      <StreamTypesBody type={definitions.stream_types.type} _enum={definitions.stream_types.enum} />
    </div>
  );
};

export default StreamTypesObject;
