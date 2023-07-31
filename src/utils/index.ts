import moment from 'moment';
import { IUserLoginAccount } from '../contexts/auth/auth.context';
import { TScopes } from '../types';
import {
  LOCALHOST_APP_ID,
  PRODUCTION_APP_ID,
  STAGING_APP_ID,
  VERCEL_DEPLOYMENT_APP_ID,
  OAUTH_URL,
  DEFAULT_WS_SERVER,
} from './constants';

const CURRENCY_MAP = new Map([
  ['Demo', { icon: 'demo', name: 'Demo' }],
  ['UST', { icon: 'tether', name: 'Tether Omni' }],
  ['eUSDT', { icon: 'tether', name: 'Tether ERC20' }],
  ['BTC', { icon: 'bitcoin', name: 'Bitcoin' }],
  ['ETH', { icon: 'ethereum', name: 'Ethereum' }],
  ['LTC', { icon: 'litecoin', name: 'Litecoin' }],
  ['USDC', { icon: 'usdcoin', name: 'USD Coin' }],
  ['USD', { icon: 'usdollar', name: 'US Dollar' }],
  ['EUR', { icon: 'euro', name: 'Euro' }],
  ['GBP', { icon: 'gbp', name: 'British Pound' }],
  ['AUD', { icon: 'aud', name: 'Australian Dollar' }],
]);

export const getCurrencyObject = (currency: string) => {
  const currencyObject = CURRENCY_MAP.get(currency);
  if (!currencyObject) {
    return {
      icon: 'placeholder_icon',
      name: 'Currency',
    };
  }

  return currencyObject;
};

type TIsNotDemoCurrency = {
  name: string;
  currency: string;
};

export const isNotDemoCurrency = (account: TIsNotDemoCurrency) => {
  const currency = account?.name?.includes('VRTC') ? 'Demo' : account?.currency;
  return currency;
};

/**
 *
 * @returns {boolean} return true if the window hostname contains `localhost`
 */
export const isHost = (hostname: string) => {
  return window.location.hostname.includes(hostname) ? true : false;
};

/**
 * @description based on the environment which the project is running we must use different appIds, to get the proper redirect url
 * @returns {string} proper appId for the project
 */
export const getAppId = () => {
  if (isHost('localhost')) return LOCALHOST_APP_ID;
  if (isHost('staging-api.deriv.com')) return STAGING_APP_ID;
  if (isHost('deriv-api-docs.binary.sx')) return VERCEL_DEPLOYMENT_APP_ID;
  if (isHost('api.deriv.com')) return PRODUCTION_APP_ID;

  return VERCEL_DEPLOYMENT_APP_ID;
};

/**
 * @description use this when you wanna check if the application is running on browser (not ssr)
 * @returns {boolean} true if the application is running in the browser ( not ssr )
 */
export const getIsBrowser = () => {
  return typeof window !== 'undefined';
};

/**
 * @description based on the received query params after successful login, generates the array of user's accounts
 * @param searchParams the query params in the auth path when user does the login successfully
 * @returns {IUserLoginAccount[]} array of user accounts
 */
export const getAccountsFromSearchParams = (searchParams: string) => {
  let accountCount = 0;
  const params = new URLSearchParams(searchParams);
  const accounts: IUserLoginAccount[] = [];

  for (const key of params.keys()) {
    if (key.includes('acct')) {
      accountCount += 1;
    }
  }

  for (let index = 0; index < accountCount; index++) {
    const queryIndex = index + 1;

    // we should check each account in the search params, this is some kind of validation for the URL search params
    if (
      params.has(`acct${queryIndex}`) &&
      params.has(`token${queryIndex}`) &&
      params.has(`cur${queryIndex}`)
    ) {
      accounts.push({
        name: params.get(`acct${queryIndex}`),
        token: params.get(`token${queryIndex}`),
        currency: params.get(`cur${queryIndex}`),
      });
    }
  }
  return accounts;
};

export const formatDate = (date?: moment.MomentInput, date_format = 'YYYY-MM-DD') => {
  return moment(date).format(date_format);
};

export const formatTokenScope = (tokenScope: string) => {
  const cleanedTokenScope = tokenScope.replace(/-|_/g, ' ');
  return cleanedTokenScope[0].toUpperCase() + cleanedTokenScope.slice(1).toLowerCase();
};

export const getServerConfig = () => {
  const isBrowser = getIsBrowser();
  if (isBrowser) {
    const config_server_url = localStorage.getItem('config.server_url');
    const config_app_id = localStorage.getItem('config.app_id');

    return {
      serverUrl: config_server_url ?? DEFAULT_WS_SERVER,
      appId: config_app_id ?? getAppId(),
      oauth: config_server_url ?? OAUTH_URL,
    };
  } else {
    return {
      serverUrl: DEFAULT_WS_SERVER,
      appId: getAppId(),
      oauth: OAUTH_URL,
    };
  }
};

export const generateLoginUrl = (
  language: string,
  oauthUrl: string,
  appId: string,
  route: string,
) => {
  return `https://${oauthUrl}/oauth2/authorize?app_id=${appId}&l=${language}&route=${route}`;
};

interface IScopesLike {
  admin: boolean;
  read: boolean;
  trade: boolean;
  trading_information: boolean;
  payments: boolean;
}

export const scopesObjectToArray = (scopesObject: IScopesLike) => {
  const keys = Object.keys(scopesObject) as Array<TScopes>;
  const scopes = keys.filter((key) => scopesObject[key]);
  return scopes;
};

export const scopesArrayToObject = (scopes: string[]) => {
  const scopesObject: IScopesLike = {
    admin: false,
    read: false,
    trade: false,
    trading_information: false,
    payments: false,
  };
  scopes.forEach((scope) => {
    scopesObject[scope] = true;
  });
  return scopesObject;
};

export const findVirtualAccount = (accounts: IUserLoginAccount[]) => {
  return accounts.find((item) => item.name.includes('VRTC'));
};
