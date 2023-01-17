const isBrowser = () => typeof window !== 'undefined';

const deriv_api_url = 'deriv.com';
const deriv_api_staging = 'staging-api.deriv.com';
const deriv_api_docs = 'deriv-api-docs.binary.sx';

const supported_domains = [deriv_api_url, deriv_api_staging, deriv_api_docs];
const domain_url_initial = isBrowser() && window.location.hostname.split('app.')[1];
const domain_url = supported_domains.includes(domain_url_initial)
  ? domain_url_initial
  : deriv_api_url;

export const deriv_urls = Object.freeze({
  DERIV_HOST_NAME: domain_url,
  DERIV_APP_PRODUCTION: 'https://deriv-api-docs.binary.sx/',
});
