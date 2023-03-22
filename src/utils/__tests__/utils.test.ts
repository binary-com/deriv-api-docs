import * as utils from '@site/src/utils';
import { DEFAULT_WS_SERVER, LOCALHOST_APP_ID, VERCEL_DEPLOYMENT_APP_ID } from '../constants';
const {
  getAccountsFromSearchParams,
  getAppId,
  getIsBrowser,
  getIsLocalhost,
  getServerConfig,
  getCurrencyObject,
} = utils;

describe('Get an object with currency data', () => {
  jest.mock('@site/src/utils', () => ({
    CURRENCY_MAP: new Map([['UST', { icon: 'tether', name: 'Tether Omni' }]]),
  }));

  it('should return currency data', () => {
    const currency_data = getCurrencyObject('UST');
    expect(currency_data.icon).toBe('tether');
    expect(currency_data.name).toBe('Tether Omni');
  });

  it('should return placeholder information when currency does not exist', () => {
    const currency_data = getCurrencyObject('FAKECURRENCY');
    expect(currency_data.icon).toBe('placeholder_icon');
    expect(currency_data.name).toBe('Currency');
  });
});

describe('Get App ID', () => {
  it("Should return 35074 when it's called in localhost environment", () => {
    const appId = getAppId(true);
    expect(appId).toBe('35074');
  });
  it("Should return 35073 when it's called in vercel environment", () => {
    const appId = getAppId(false);
    expect(appId).toBe('35073');
  });
});

describe('Format Date', () => {
  it('Should return date value with YYYY-MM-DD format by default', () => {
    const result = utils.formatDate('2022-10-04 10:33:51');
    expect(result).toBe('2022-10-04');
  });

  it('Should return date value with YYYY-MM-DD HH format', () => {
    const result = utils.formatDate('2022-10-04 10:33:51', 'YYYY-MM-DD HH');
    expect(result).toBe('2022-10-04 10');
  });
});

describe('Format Token Scope', () => {
  it('Should return one word tokens correctly as Capitalized string', () => {
    const result = utils.formatTokenScope('trade');
    expect(result).toBe('Trade');
  });

  it('Should return Capitalized value with two words scopes with special characters', () => {
    const result = utils.formatTokenScope('trade_information');
    expect(result).toBe('Trade information');
  });
});

describe('Get Is Localhost', () => {
  it('Should return true when hostname is localhost.binary.sx', () => {
    window.location.hostname = 'localhost.binary.sx';
    const isLocalhost = getIsLocalhost();
    expect(isLocalhost).toBeTruthy();
  });

  it('Should return true when hostname contains localhost', () => {
    window.location.hostname = 'localhost:3000';
    const isLocalhost = getIsLocalhost();
    expect(isLocalhost).toBeTruthy();
  });

  it('Should return false when hostname is vercel deployment', () => {
    window.location.hostname = 'deriv-api-docs.binary.sx';
    const isLocalHost = getIsLocalhost();
    expect(isLocalHost).toBeFalsy();
  });
});

describe('Get Is Browser', () => {
  it('Should be truthy', () => {
    const isBrowser = getIsBrowser();
    expect(isBrowser).toBeTruthy();
  });
});

describe('Get Accounts from Search Params', () => {
  it('Should return user accounts', () => {
    const test_search_params =
      '?acct1=CR111111&token1=first_token&cur1=USD&acct2=CR2222222&token2=second_token&cur2=ETH';

    const accounts = getAccountsFromSearchParams(test_search_params);
    expect(accounts.length).toBe(2);
    expect(accounts).toStrictEqual([
      {
        currency: 'USD',
        name: 'CR111111',
        token: 'first_token',
      },
      {
        currency: 'ETH',
        name: 'CR2222222',
        token: 'second_token',
      },
    ]);
  });

  it('Should not create account object for malformed query params', () => {
    const test_search_params =
      '?acct1=CR111111&token1=first_token&cur1=USD&acct2=CR2222222&token2=second_token';
    const accounts = getAccountsFromSearchParams(test_search_params);
    expect(accounts.length).toBe(1);
    expect(accounts).not.toStrictEqual([
      {
        currency: 'USD',
        name: 'CR111111',
        token: 'first_token',
      },
      {
        currency: 'ETH',
        name: 'CR2222222',
        token: 'second_token',
      },
    ]);
    expect(accounts).toStrictEqual([
      {
        currency: 'USD',
        name: 'CR111111',
        token: 'first_token',
      },
    ]);
  });
});
describe('Get Server Config', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Given we are in SSR ( no browser object ) ', () => {
    it('Should return default ws server url and vercel deployment appId', () => {
      jest.spyOn(utils, 'getIsBrowser').mockReturnValueOnce(false);
      const serverConfig = getServerConfig();
      expect(serverConfig.appId).toEqual(VERCEL_DEPLOYMENT_APP_ID);
      expect(serverConfig.serverUrl).toEqual(DEFAULT_WS_SERVER);
    });
  });
  describe('Given we are in Browser', () => {
    jest.spyOn(utils, 'getIsBrowser').mockReturnValue(true);

    it('Should return default ws server url and vercel deployment appId in LOCALHOST ', () => {
      const serverConfig = getServerConfig();
      expect(serverConfig.appId).toEqual(LOCALHOST_APP_ID);
      expect(serverConfig.serverUrl).toEqual(DEFAULT_WS_SERVER);
    });
    it('Should return serverUrl and appId from localstorage in production', () => {
      jest.spyOn(localStorage, 'getItem').mockReturnValueOnce('test.binary.sx');
      jest.spyOn(localStorage, 'getItem').mockReturnValueOnce('1234');

      const serverConfig = getServerConfig();
      expect(serverConfig.appId).toBe('1234');
      expect(serverConfig.serverUrl).toBe('test.binary.sx');
      expect(localStorage.getItem).toHaveBeenCalledTimes(2);
    });
  });
});

describe('Generate Login Url', () => {
  it('Should generate correct url', () => {
    const result = utils.generateLoginUrl('es', 'test.server.ws', '5544');
    expect(result).toMatch(/l=es/);
    expect(result).toMatch(/https:\/\/test.server.ws/);
    expect(result).toMatch(/app_id=5544/);
  });
});
