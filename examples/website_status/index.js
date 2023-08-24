import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api';
const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
const connection = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const api = new DerivAPIBasic({ connection });

const websiteStatusResponse = async (res) => {
  const data = JSON.parse(res.data);

  if (data.error !== undefined) {
    console.log('Error : ', data.error?.message);
    connection.removeEventListener('message', websiteStatusResponse, false);
    await api.disconnect();
  }

  if (data.msg_type === 'website_status') {
    console.log(data.website_status);
  }

  connection.removeEventListener('message', websiteStatusResponse, false);
};

const getWebsiteStatus = async () => {
  connection.addEventListener('message', websiteStatusResponse);
  await api.websiteStatus();
};

const website_status_button = document.querySelector('#websiteStatus');
website_status_button.addEventListener('click', getWebsiteStatus);
