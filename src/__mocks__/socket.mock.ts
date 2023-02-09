import WS from 'jest-websocket-mock';
import apiManager from '../configs/websocket';

const makeMockSocket = () => {
  const setup = async () => {
    const wsServer = new WS('wss://test.ws.com/websockets/v3?app_id=1010', {
      jsonProtocol: true,
    });
    apiManager.reset('1010', 'test.ws.com');
    await wsServer.connected;
    return wsServer;
  };

  const tearDown = () => {
    WS.clean();
  };

  return { setup, tearDown };
};

export default makeMockSocket;
