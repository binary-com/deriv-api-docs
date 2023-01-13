// TODO: Need to reverify the URL RegExp when Devops deploys
const default_endpoint = {
  app_id: '',
  server_url: '',
};

export const domain_app_ids = {
  'app.deriv.com': 16929,
  'staging-app.deriv.com': 16303,
};

export const getCurrentProductionDomain = () =>
  !/^staging\./.test(window.location.hostname) &&
  Object.keys(domain_app_ids).find((domain) => window.location.hostname === domain);

export const isStaging = () => /^staging-app\.deriv\.(com|me|be)$/i.test(window.location.hostname);

export const isProduction = () => {
  const all_domains = Object.keys(domain_app_ids).map(
    (domain) => `(www\\.)?${domain.replace('.', '\\.')}`,
  );
  return new RegExp(`^(${all_domains.join('|')})$`, 'i').test(window.location.hostname);
};

export const isTestLink = () => /^((.*)\.binary\.sx)$/i.test(window.location.hostname);

export const isLocal = () => /localhost/i.test(window.location.hostname);

export const setPlatform = () => {
  const search = window.location.search;
  if (search) {
    const url_params = new URLSearchParams(search);
    const platform = url_params.get('platform') || '';
    localStorage.setItem('config.platform', platform);
  }
};

export const getSocketUrl = () => {
  const local_storage_server_url = localStorage.getItem('config.server_url');
  if (local_storage_server_url) return local_storage_server_url;
  let active_loginid_from_url;
  const search = window.location.search;
  if (search) {
    const params = new URLSearchParams(document.location.search.substring(1));
    active_loginid_from_url = params.get('acct1');
  }

  const loginid = localStorage.getItem('active_loginid') || active_loginid_from_url;
  const is_real = loginid && !/^VRT/.test(loginid);

  const server = is_real ? 'green' : 'blue';
  const server_url = `${server}.binaryws.com`;
  return server_url;
};

export const getAppId = () => {
  const config_app_id = localStorage.getItem('config.app_id');
  const current_domain = getCurrentProductionDomain() || '';
  if (config_app_id) {
    return config_app_id;
  } else if (isStaging()) {
    return domain_app_ids[current_domain] || 16303;
  } else if (isLocal()) {
    return 17044;
  } else {
    return domain_app_ids[current_domain] || 16929;
  }
};

export const configureEndpoint = () => {
  localStorage.setItem('config.app_id', default_endpoint.app_id);
  localStorage.setItem('config.server_url', default_endpoint.server_url);
};
