import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';

const app_id = 32486; // Replace with your app_id  for testing.
const connection = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const api = new DerivAPIBasic({ connection });
// WARNING: Be careful to not leak your token here in the sandbox.
let token = '';

const openContractResponse = async (res) => {
  const data = JSON.parse(res.data);

  if (data.error !== undefined) {
    console.log('Error : ', data.error.message);
    connection.removeEventListener('message', openContractResponse, false);
    await api.disconnect();
  }

  if (data.msg_type === 'proposal_open_contract') {
    const proposal_contract_empty = Object.keys(data.proposal_open_contract).length === 0;
    if (proposal_contract_empty) {
      console.log('no contracts available');
    } else {
      console.log(data.proposal_open_contract);
    }
  }

  connection.removeEventListener('message', openContractResponse, false);
};

const getOpenContracts = async () => {
  token = localStorage.getItem('login_token');
  await api.authorize(token);
  connection.addEventListener('message', openContractResponse);
  await api.proposalOpenContract();
};

const symbol_button = document.querySelector('#contracts');
symbol_button.addEventListener('click', getOpenContracts);
