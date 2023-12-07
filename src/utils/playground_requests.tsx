export const playground_requests = [
  {
    name: 'active_symbols',
    title: 'Active Symbols',
    body: {
      active_symbols: 'brief',
      product_type: 'basic',
    },
  },
  {
    name: 'api_token',
    title: 'API Token',
    body: {
      api_token: 1,
      new_token: 'Token example',
      new_token_scopes: ['admin', 'read', 'trade'],
    },
  },
  {
    name: 'app_delete',
    title: 'Application: Delete',
    body: {
      app_delete: 1234,
    },
  },
  {
    name: 'app_get',
    title: 'Application: Get Details',
    body: {
      app_get: 1234,
    },
  },
  {
    name: 'app_list',
    title: 'Application: List',
    body: {
      app_list: 1,
    },
  },
  {
    name: 'app_markup_details',
    title: 'Application: Markup Details',
    body: {
      app_markup_details: 1,
      description: 1,
      app_id: 1234,
      client_loginid: 'CR12345',
      date_from: '2017-08-01 00:00:00',
      date_to: '2017-08-31 23:59:59',
      limit: 100,
      offset: 0,
      sort: 'ASC',
      sort_fields: ['app_id', 'client_loginid', 'transaction_time'],
      passthrough: {},
      req_id: 3,
    },
  },
  {
    name: 'app_markup_statistics',
    title: 'Application: Markup Statistics',
    body: {
      app_markup_statistics: 1,
      date_from: '2022-01-01 00:00:00',
      date_to: '2022-01-31 23:59:59',
      passthrough: {},
      req_id: 4,
    },
  },
  {
    name: 'app_register',
    title: 'Application: Register',
    body: {
      app_register: 1,
      appstore: 'https://itunes.apple.com/test_app',
      github: 'https://github.com/test_org/app',
      googleplay: 'https://play.google.com/store/apps/details?id=test.app',
      homepage: 'https://test.example.com/',
      name: 'Test Application',
      redirect_uri: 'https://test.example.com/redirect',
      scopes: ['read', 'trade'],
      verification_uri: 'https://test.example.com/verify',
    },
  },
  {
    name: 'app_update',
    title: 'Application: Update',
    body: {
      app_update: 999,
      appstore: 'https://itunes.apple.com/test_app',
      github: 'https://github.com/test_org/app',
      googleplay: 'https://play.google.com/store/apps/details?id=test.app',
      homepage: 'https://test.example.com/',
      name: 'Test Application',
      redirect_uri: 'https://test.example.com/redirect',
      scopes: ['read', 'trade'],
      verification_uri: 'https://test.example.com/verify',
    },
  },
  {
    name: 'asset_index',
    title: 'Asset Index',
    body: {
      asset_index: 1,
    },
  },
  {
    name: 'authorize',
    title: 'Authorize',
    body: {
      authorize: 'uw2mk7no3oktoRVVsB4Dz7TQncfABuFDgO95dlxfMxRuPUDz',
    },
  },
  {
    name: 'balance',
    title: 'Balance',
    body: {
      balance: 1,
      subscribe: 1,
    },
  },
  {
    name: 'buy',
    title: 'Buy Contract',
    body: {
      buy: 'uw2mk7no3oktoRVVsB4Dz7TQnFfABuFDgO95dlxfMxRuPUsz',
      price: 100,
    },
  },
  {
    name: 'buy_contract_for_multiple_accounts',
    title: 'Buy Contract for Multiple Accounts',
    body: {
      buy_contract_for_multiple_accounts: 'AE79667A-3561-11E6-880B-19CE0BCBE464',
      price: 2.57,
      tokens: [
        'EWHdv7feGJRmMf1kqv79lgfPiGjLLGV9GHTZFQ345FzJSfNE',
        'ONqj76yAnVKnPtc',
        'oSpp7ohpGf50tP6',
        'uz6OSIcFIcPKK5T',
      ],
    },
  },
  {
    name: 'cancel',
    title: 'Cancel a Contract',
    body: {
      cancel: 11542203588,
    },
  },
  {
    name: 'cashier',
    title: 'Cashier Information',
    body: {
      cashier: 'deposit',
      provider: 'doughflow',
      verification_code: 'my_verification_code',
    },
  },
  {
    name: 'contract_update',
    title: 'Update Contract',
    body: {
      contract_update: 1,
      contract_id: 123,
      limit_order: {
        take_profit: 1,
      },
    },
  },
  {
    name: 'contract_update_history',
    title: 'Update Contract History',
    body: {
      contract_update_history: 1,
      contract_id: 123,
    },
  },
  {
    name: 'contracts_for',
    title: 'Contracts For Symbol',
    body: {
      contracts_for: 'R_50',
      currency: 'USD',
      landing_company: 'svg',
      product_type: 'basic',
    },
  },
  {
    name: 'copy_start',
    title: 'Copy Trading: Start',
    body: {
      copy_start: 'uw2mk7no3oktoRVVsB4Dz7TQnFgrthg',
    },
  },
  {
    name: 'copy_stop',
    title: 'Copy Trading: Stop',
    body: {
      copy_stop: 'uw2mk7no3oktoRVVsB4Dz7TQnFgrthg',
    },
  },
  {
    name: 'copytrading_list',
    title: 'Copy Trading: List',
    body: {
      copytrading_list: 1,
    },
  },
  {
    name: 'copytrading_statistics',
    title: 'Copy Trading: Statistics',
    body: {
      copytrading_statistics: 1,
      trader_id: 'CR1234',
    },
  },
  {
    name: 'crypto_config',
    title: 'Cryptocurrency configuration',
    body: {
      crypto_config: 1,
    },
  },
  {
    name: 'document_upload',
    title: 'Document Upload',
    body: {
      document_upload: 1,
      document_format: 'JPG',
      document_type: 'bankstatement',
      expected_checksum: '1a79a4d60de6718e8e5b326e338ae533',
      file_size: 12345,
    },
  },
  {
    name: 'economic_calendar',
    title: 'Economic Calendar',
    body: {
      economic_calendar: 1,
      currency: 'USD',
      end_date: 1561196696,
      start_date: 1561096696,
    },
  },
  {
    name: 'exchange_rates',
    title: 'Exchange Rates',
    body: {
      exchange_rates: 1,
      base_currency: 'USD',
    },
  },
  {
    name: 'forget',
    title: 'Forget',
    body: {
      forget: 'd1ee7d0d-3ca9-fbb4-720b-5312d487185b',
    },
  },
  {
    name: 'forget_all',
    title: 'Forget All',
    body: {
      forget_all: 'ticks',
    },
  },
  {
    name: 'get_account_status',
    title: 'Account Status',
    body: {
      get_account_status: 1,
    },
  },
  {
    name: 'get_financial_assessment',
    title: 'Get Financial Assessment',
    body: {
      get_financial_assessment: 1,
    },
  },
  {
    name: 'get_limits',
    title: 'Account Limits',
    body: {
      get_limits: 1,
    },
  },
  {
    name: 'get_self_exclusion',
    title: 'Get Self-Exclusion',
    body: {
      get_self_exclusion: 1,
    },
  },
  {
    name: 'get_settings',
    title: 'Get Account Settings',
    body: {
      get_settings: 1,
    },
  },
  {
    name: 'identity_verification_document_add',
    title: 'Identity Verification Add Document',
    body: {
      identity_verification_document_add: 1,
      document_number: '12345678912',
      document_type: 'nin_slip',
      issuing_country: 'ng',
    },
  },
  {
    name: 'landing_company',
    title: 'Landing Company',
    body: {
      landing_company: 'id',
    },
  },
  {
    name: 'landing_company_details',
    title: 'Landing Company Details',
    body: {
      landing_company_details: 'svg',
    },
  },
  {
    name: 'login_history',
    title: 'Login History',
    body: {
      login_history: 1,
      limit: 25,
    },
  },
  {
    name: 'logout',
    title: 'Log Out',
    body: {
      logout: 1,
    },
  },
  {
    name: 'mt5_deposit',
    title: 'MT5: Deposit',
    body: {
      mt5_deposit: 1,
      amount: 1000,
      from_binary: 'CR100001',
      to_mt5: 'MTR1000',
    },
  },
  {
    name: 'mt5_get_settings',
    title: 'MT5: Get Setting',
    body: {
      mt5_get_settings: 1,
      login: 'MTR1000',
    },
  },
  {
    name: 'mt5_login_list',
    title: 'MT5: Accounts List',
    body: {
      mt5_login_list: 1,
    },
  },
  {
    name: 'mt5_new_account',
    title: 'MT5: New Account',
    body: {
      mt5_new_account: 1,
      account_type: 'demo',
      address: 'Dummy address',
      city: 'Valletta',
      company: 'Deriv Limited',
      country: 'mt',
      email: 'test@mailinator.com',
      investPassword: 'Anoth3r_p4ssword',
      leverage: 100,
      mainPassword: 'C0rrect_p4ssword',
      mt5_account_category: 'swap_free',
      mt5_account_type: 'financial',
      name: 'Peter Pan',
      phone: '+6123456789',
      phonePassword: 'AbcDv1234',
      state: 'Valleta',
      zipCode: 'VLT 1117',
    },
  },
  {
    name: 'mt5_password_change',
    title: 'MT5: Password Change',
    body: {
      mt5_password_change: 1,
      login: 'MTR1000',
      new_password: 'C0rrect_p4ssword',
      old_password: 'Abc1234',
      password_type: 'main',
    },
  },
  {
    name: 'mt5_password_check',
    title: 'MT5: Password Check',
    body: {
      mt5_password_check: 1,
      login: 'MTR1000',
      password: 'abc1234',
      password_type: 'main',
    },
  },
  {
    name: 'mt5_password_reset',
    title: 'MT5: Password Reset',
    body: {
      mt5_password_reset: 1,
      login: 'MTD1000',
      new_password: 'C0rrect_p4ssword',
      password_type: 'main',
      verification_code: 'O8eZ2xMq',
    },
  },
  {
    name: 'mt5_withdrawal',
    title: 'MT5: Withdrawal',
    body: {
      mt5_withdrawal: 1,
      amount: 1000,
      from_mt5: 'MTR1000',
      to_binary: 'CR100001',
    },
  },
  {
    name: 'new_account_maltainvest',
    title: 'New Real-Money Account: Deriv Investment (Europe) Ltd',
    body: {
      new_account_maltainvest: 1,
      accept_risk: 1,
      account_opening_reason: 'Speculative',
      account_turnover: 'Less than $25,000',
      address_city: 'Melbourne',
      address_line_1: '20 Broadway Av',
      address_line_2: 'East Melbourne VIC',
      address_postcode: '3002',
      address_state: 'Victoria',
      binary_options_trading_experience: '1-2 years',
      binary_options_trading_frequency: '40 transactions or more in the past 12 months',
      cfd_trading_experience: '1-2 years',
      cfd_trading_frequency: '0-5 transactions in the past 12 months',
      citizen: 'de',
      date_of_birth: '1980-01-31',
      education_level: 'Secondary',
      employment_industry: 'Finance',
      employment_status: 'Self-Employed',
      estimated_worth: '$100,000 - $250,000',
      first_name: 'Peter',
      forex_trading_experience: 'Over 3 years',
      forex_trading_frequency: '0-5 transactions in the past 12 months',
      income_source: 'Self-Employed',
      last_name: 'Pan',
      net_income: '$25,000 - $50,000',
      non_pep_declaration: 1,
      occupation: 'Managers',
      other_instruments_trading_experience: 'Over 3 years',
      other_instruments_trading_frequency: '6-10 transactions in the past 12 months',
      phone: '+6123456789',
      place_of_birth: 'nl',
      residence: 'de',
      salutation: 'Mr',
      secret_answer: 'Jones',
      secret_question: "Mother's maiden name",
      source_of_wealth: 'Company Ownership',
      tax_identification_number: '111-222-333',
      tax_residence: 'de,nl',
    },
  },
  {
    name: 'new_account_real',
    title: 'New Real-Money Account: Default Landing Company',
    body: {
      new_account_real: 1,
      account_opening_reason: 'Speculative',
      account_turnover: 'Less than $25,000',
      address_city: 'Melbourne',
      address_line_1: '20 Broadway Av',
      address_line_2: 'East Melbourne VIC',
      address_postcode: '3002',
      address_state: 'Victoria',
      date_of_birth: '1980-01-31',
      first_name: 'Peter',
      last_name: 'Pan',
      non_pep_declaration: 1,
      phone: '+6123456789',
      place_of_birth: 'id',
      residence: 'au',
      salutation: 'Mr',
      secret_answer: 'Jones',
      secret_question: "Mother's maiden name",
      tax_identification_number: '012142545',
      tax_residence: 'ar,sg',
    },
  },
  {
    name: 'new_account_virtual',
    title: 'New Virtual-Money Account',
    body: {
      new_account_virtual: 1,
      type: 'trading',
      client_password: 'C0rrect_p4ssword',
      residence: 'id',
      verification_code: 'uoJvVuQ6',
    },
  },
  {
    name: 'oauth_apps',
    title: 'OAuth Applications',
    body: {
      oauth_apps: 1,
    },
  },
  {
    name: 'p2p_advert_create',
    title: 'P2P Advert Create',
    body: {
      p2p_advert_create: 1,
      description: 'Please transfer to account number 1234',
      type: 'buy',
      amount: 100,
      max_order_amount: 50,
      min_order_amount: 20,
      payment_method: 'bank_transfer',
      rate: 4.25,
    },
  },
  {
    name: 'p2p_advert_info',
    title: 'P2P Advert Information',
    body: {
      p2p_advert_info: 1,
      id: '1234',
    },
  },
  {
    name: 'p2p_advert_list',
    title: 'P2P Advert List',
    body: {
      p2p_advert_list: 1,
      counterparty_type: 'buy',
    },
  },
  {
    name: 'p2p_advert_update',
    title: 'P2P Advert Update',
    body: {
      p2p_advert_update: 1,
      id: 1234,
      is_active: 0,
    },
  },
  {
    name: 'p2p_advertiser_adverts',
    title: 'P2P Advertiser Adverts',
    body: {
      p2p_advertiser_adverts: 1,
    },
  },
  {
    name: 'p2p_advertiser_create',
    title: 'P2P Advertiser Create',
    body: {
      p2p_advertiser_create: 1,
      name: 'your_name',
    },
  },
  {
    name: 'p2p_advertiser_info',
    title: 'P2P Advertiser Information',
    body: {
      p2p_advertiser_info: 1,
    },
  },
  {
    name: 'p2p_advertiser_payment_methods',
    title: 'P2P Advertiser Payment Methods',
    body: {
      p2p_advertiser_payment_methods: 1,
      create: [
        {
          account: '1234',
          bank_name: 'some_bank',
          method: 'bank_transfer',
        },
      ],
      delete: [101, 102],
      update: {
        103: {
          instructions: 'phone first',
        },
      },
    },
  },
  {
    name: 'p2p_advertiser_relations',
    title: 'P2P Advertiser Relations',
    body: {
      p2p_advertiser_relations: 1,
    },
  },
  {
    name: 'p2p_advertiser_update',
    title: 'P2P Advertiser Update',
    body: {
      p2p_advertiser_update: 1,
      is_listed: 0,
    },
  },
  {
    name: 'p2p_chat_create',
    title: 'P2P Chat Create',
    body: {
      p2p_chat_create: 1,
      order_id: '1234',
    },
  },
  {
    name: 'p2p_order_cancel',
    title: 'P2P Order Cancel',
    body: {
      p2p_order_cancel: 1,
      id: '1234',
    },
  },
  {
    name: 'p2p_order_confirm',
    title: 'P2P Order Confirm',
    body: {
      p2p_order_confirm: 1,
      id: '1234',
    },
  },
  {
    name: 'p2p_order_create',
    title: 'P2P Order Create',
    body: {
      p2p_order_create: 1,
      advert_id: '1234',
      amount: 100,
    },
  },
  {
    name: 'p2p_order_dispute',
    title: 'P2P Order Dispute',
    body: {
      p2p_order_dispute: 1,
      dispute_reason: 'seller_not_released',
      id: '1234',
    },
  },
  {
    name: 'p2p_order_info',
    title: 'P2P Order Information',
    body: {
      p2p_order_info: 1,
      id: '1234',
    },
  },
  {
    name: 'p2p_order_list',
    title: 'P2P Order List',
    body: {
      p2p_order_list: 1,
      advert_id: '1234',
    },
  },
  {
    name: 'p2p_order_review',
    title: 'P2P Order Review',
    body: {
      p2p_order_review: 1,
      order_id: '1234',
      rating: 4,
      recommended: 1,
    },
  },
  {
    name: 'p2p_payment_methods',
    title: 'P2P Payments Methods',
    body: {
      p2p_payment_methods: 1,
    },
  },
  {
    name: 'payment_methods',
    title: 'Payment Methods',
    body: {
      payment_methods: 1,
      country: 'id',
    },
  },
  {
    name: 'paymentagent_create',
    title: 'Payment agent create',
    body: {
      paymentagent_create: 1,
      affiliate_id: '1231234',
      code_of_conduct_approval: 1,
      commission_deposit: 2,
      commission_withdrawal: 3,
      email: 'joe@joy.com',
      information: 'The best person you can find',
      payment_agent_name: 'Joe Joy',
      phone: '+923-22-23-13',
      supported_payment_methods: ['MasterCard', 'Visa'],
      url: 'https://abc.com',
    },
  },
  {
    name: 'paymentagent_details',
    title: 'Payment agent details',
    body: {
      paymentagent_details: 1,
    },
  },
  {
    name: 'paymentagent_list',
    title: 'Payment Agent: List',
    body: {
      paymentagent_list: 'id',
    },
  },
  {
    name: 'paymentagent_transfer',
    title: 'Payment Agent: Transfer',
    body: {
      paymentagent_transfer: 1,
      amount: 1000,
      currency: 'USD',
      transfer_to: 'CR100001',
    },
  },
  {
    name: 'paymentagent_withdraw',
    title: 'Payment Agent: Withdraw',
    body: {
      paymentagent_withdraw: 1,
      amount: 1000,
      currency: 'USD',
      paymentagent_loginid: 'CR100001',
      verification_code: 'my_verification_code',
    },
  },
  {
    name: 'payout_currencies',
    title: 'Payout Currencies',
    body: {
      payout_currencies: 1,
    },
  },
  {
    name: 'ping',
    title: 'Ping',
    body: {
      ping: 1,
    },
  },
  {
    name: 'portfolio',
    title: 'Portfolio',
    body: {
      portfolio: 1,
    },
  },
  {
    name: 'profit_table',
    title: 'Profit Table',
    body: {
      profit_table: 1,
      description: 1,
      limit: 25,
      offset: 25,
      sort: 'ASC',
    },
  },
  {
    name: 'proposal',
    title: 'Price Proposal',
    body: {
      proposal: 1,
      amount: 100,
      barrier: '+0.1',
      basis: 'payout',
      contract_type: 'CALL',
      currency: 'USD',
      duration: 60,
      duration_unit: 's',
      symbol: 'R_100',
    },
  },
  {
    name: 'proposal_open_contract',
    title: 'Price Proposal: Open Contracts',
    body: {
      proposal_open_contract: 1,
      contract_id: 11111111,
      subscribe: 1,
    },
  },
  {
    name: 'reality_check',
    title: 'Reality Check',
    body: {
      reality_check: 1,
    },
  },
  {
    name: 'residence_list',
    title: 'Countries List',
    body: {
      residence_list: 1,
    },
  },
  {
    name: 'revoke_oauth_app',
    title: 'Revoke Oauth Application',
    body: {
      revoke_oauth_app: 1234,
    },
  },
  {
    name: 'sell',
    title: 'Sell Contract',
    body: {
      sell: 11542203588,
      price: 500,
    },
  },
  {
    name: 'sell_contract_for_multiple_accounts',
    title: 'Sell Contracts: Multiple Accounts',
    body: {
      sell_contract_for_multiple_accounts: 1,
      price: 500,
      shortcode: 'CALL_R_50_5_1488181433_1488181553_S0P_0',
      tokens: ['FrvservuIFEf1', 'JUBibibkebiuwbeCNEc'],
    },
  },
  {
    name: 'sell_expired',
    title: 'Sell Expired Contracts',
    body: {
      sell_expired: 1,
    },
  },
  {
    name: 'set_account_currency',
    title: 'Set Account Currency',
    body: {
      set_account_currency: 'USD',
    },
  },
  {
    name: 'set_financial_assessment',
    title: 'Set Financial Assessment',
    body: {
      set_financial_assessment: 1,
      account_turnover: 'Less than $25,000',
      binary_options_trading_experience: '1-2 years',
      binary_options_trading_frequency: '40 transactions or more in the past 12 months',
      cfd_trading_experience: 'Over 3 years',
      cfd_trading_frequency: '6-10 transactions in the past 12 months',
      education_level: 'Secondary',
      employment_industry: 'Finance',
      employment_status: 'Self-Employed',
      estimated_worth: '$100,000 - $250,000',
      forex_trading_experience: 'Over 3 years',
      forex_trading_frequency: '0-5 transactions in the past 12 months',
      income_source: 'Self-Employed',
      net_income: '$25,000 - $50,000',
      occupation: 'Managers',
      other_instruments_trading_experience: 'Over 3 years',
      other_instruments_trading_frequency: '6-10 transactions in the past 12 months',
      source_of_wealth: 'Company Ownership',
    },
  },
  {
    name: 'set_self_exclusion',
    title: 'Set Self-Exclusion',
    body: {
      set_self_exclusion: 1,
      exclude_until: '2020-01-01',
      max_30day_deposit: 1000,
      max_30day_losses: 100000,
      max_30day_turnover: 1000,
      max_7day_deposit: 100,
      max_7day_losses: 100000,
      max_7day_turnover: 1000,
      max_deposit: 10,
      max_losses: 100000,
      max_turnover: 1000,
      session_duration_limit: 3600,
      timeout_until: 1497357184,
    },
  },
  {
    name: 'set_settings',
    title: 'Set Account Settings',
    body: {
      set_settings: 1,
      account_opening_reason: 'Speculative',
      address_city: 'Test City',
      address_line_1: 'Test Address Line 1',
      address_line_2: 'Test Address Line 2',
      address_postcode: '123456',
      address_state: 'Test State',
      allow_copiers: 1,
      email_consent: 0,
      phone: '+15417543010',
      place_of_birth: 'ar',
      preferred_language: 'EN',
      request_professional_status: 1,
      tax_identification_number: '987654321',
      tax_residence: 'hk',
    },
  },
  {
    name: 'statement',
    title: 'Statement',
    body: {
      statement: 1,
      description: 1,
      limit: 100,
      offset: 25,
    },
  },
  {
    name: 'states_list',
    title: 'States List',
    body: {
      states_list: 'id',
    },
  },
  {
    name: 'ticks',
    title: 'Ticks Stream',
    body: {
      ticks: 'R_50',
      subscribe: 1,
    },
  },
  {
    name: 'ticks_history',
    title: 'Ticks History',
    body: {
      ticks_history: 'R_50',
      adjust_start_time: 1,
      count: 10,
      end: 'latest',
      start: 1,
      style: 'ticks',
    },
  },
  {
    name: 'time',
    title: 'Server Time',
    body: {
      time: 1,
    },
  },
  {
    name: 'tnc_approval',
    title: 'Terms and Conditions Approval',
    body: {
      tnc_approval: 1,
    },
  },
  {
    name: 'topup_virtual',
    title: 'Top Up Virtual-Money Account',
    body: {
      topup_virtual: 1,
    },
  },
  {
    name: 'trading_durations',
    title: 'Trading Durations',
    body: {
      trading_durations: 1,
    },
  },
  {
    name: 'trading_platform_investor_password_reset',
    title: 'Trading Platform: Investor Password Reset',
    body: {
      trading_platform_investor_password_reset: 1,
      account_id: 'MTR1000',
      new_password: 'InvestPwd123@!',
      platform: 'mt5',
      verification_code: 'abCD0199',
    },
  },
  {
    name: 'trading_platform_password_reset',
    title: 'Trading Platform: Password Reset',
    body: {
      trading_platform_password_reset: 1,
      new_password: 'C0rrect_p4ssword',
      platform: 'dxtrade',
      verification_code: 'abCD0199',
    },
  },
  {
    name: 'trading_servers',
    title: 'Server list',
    body: {
      trading_servers: 1,
      platform: 'mt5',
    },
  },
  {
    name: 'trading_times',
    title: 'Trading Times',
    body: {
      trading_times: '2015-09-14',
    },
  },
  {
    name: 'transaction',
    title: 'Transactions Stream',
    body: {
      transaction: 1,
      subscribe: 1,
    },
  },
  {
    name: 'transfer_between_accounts',
    title: 'Transfer Between Accounts',
    body: {
      transfer_between_accounts: 1,
      account_from: 'MLT100',
      account_to: 'MF100',
      amount: 1000,
      currency: 'EUR',
    },
  },
  {
    name: 'verify_email',
    title: 'Verify Email',
    body: {
      verify_email: 'test@mailinator.com',
      type: 'account_opening',
    },
  },
  {
    name: 'website_status',
    title: 'Server Status',
    body: {
      website_status: 1,
    },
  },
];
