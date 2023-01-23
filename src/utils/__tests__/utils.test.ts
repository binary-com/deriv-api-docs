import { getAccountsFromSearchParams, getAppId, getIsLocalhost } from '..';

describe('Utils', () => {
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
});
