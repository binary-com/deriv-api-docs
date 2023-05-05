import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';

const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
const connection = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`);

const api = new DerivAPIBasic({ connection });

const keepAlive = () => {
  api.subscribe({
    proposal: 1,
    subscribe: 1,
    amount: 10,
    basis: 'payout',
    contract_type: 'CALL',
    currency: 'USD',
    duration: 1,
    duration_unit: 'm',
    symbol: 'R_100',
    barrier: '+0.1',
  });
  /*
   * Send a ping ever 30 seconds to keep the connection alive, needs to use the same
   * websocket connection as the one you want to maintain.
   */
};

const keepAliveRes = async (res) => {
  const data = JSON.parse(res.data);
  if (data.error !== undefined) {
    console.log('Error: %s ', data.error.message);
    connection.removeEventListener('message', keepAliveRes, false);
    await api.disconnect();
  } else if (data.msg_type === 'proposal') {
    console.log('Details: %s', data.proposal.longcode);
    console.log('Ask Price: %s', data.proposal.display_value);
    console.log('Payout: %f', data.proposal.payout);
    console.log('Spot: %f', data.proposal.spot);
  } else if (data.msg_type === 'ping') {
    console.log('ping');
  }
};

const checkSignal = async () => {
  await keepAlive();
  connection.addEventListener('message', keepAliveRes);
};

const endCall = () => {
  connection.removeEventListener('message', keepAliveRes, false);
  keepAlive().unsubscribe();
};

const keep_alive_button = document.querySelector('#keep_alive');
keep_alive_button.addEventListener('click', checkSignal);

const end_call_button = document.querySelector('#end_call');
end_call_button.addEventListener('click', endCall);
