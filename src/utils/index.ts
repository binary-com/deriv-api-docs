import { IUserAccount } from '../contexts/root/root.context';
import { LOCALHOST_APP_ID, VERCEL_DEPLOYMENT_APP_ID } from './constants';

/**
 *
 * @returns {boolean} return true if the window hostname contains `localhost`
 */
export const getIsLocalhost = () => {
  return window.location.hostname.includes('localhost') ? true : false;
};

/**
 * @description based on the environment which the project is running we must use different appIds, to get the proper redirect url
 * @param isLocalHost {boolean} pass `true` if the project is running on localhost
 * @returns {string} proper appId for the project
 */
export const getAppId = (isLocalHost: boolean) => {
  return isLocalHost ? LOCALHOST_APP_ID : VERCEL_DEPLOYMENT_APP_ID;
};

/**
 * @description based on the received query params after successful login, generates the array of user's accounts
 * @param searchParams the query params in the auth path when user does the login successfully
 * @returns {IUserAccount[]} array of user accounts
 */
export const getAccountsFromSearchParams = (searchParams: string) => {
  let accountCount = 0;
  const params = new URLSearchParams(searchParams);
  const accounts: IUserAccount[] = [];

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
