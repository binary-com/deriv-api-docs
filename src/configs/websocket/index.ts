import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';
import type { AuthorizeRequest, AuthorizeResponse } from '@deriv/api-types';
import {
  TSocketEndpointNames,
  TSocketRequestProps,
  TSocketResponse,
  TSocketSubscribableEndpointNames,
} from './types';
import { Observable } from 'rxjs';
import { getIsBrowser, getServerConfig } from '@site/src/utils';
import useAuthContext from '@site/src/hooks/useAuthContext';

export type TDerivApi = {
  send: (...requestData: unknown[]) => Promise<unknown>;
  subscribe: (...requestData: unknown[]) => Observable<object>;
  authorize: (requestData: AuthorizeRequest) => Promise<AuthorizeResponse>;
};

let attempts = 10;
const RECONNECT_INTERVAL = attempts * 1000;
const PING_INTERVAL = 12000;
const is_connected_before = false;
// const { updateAuthorize } = useAuthContext();

export class ApiManager {
  private socket: WebSocket;
  private derivApi: TDerivApi;
  private pingInterval: NodeJS.Timer;
  private reconnectInterval: NodeJS.Timer;

  public static instance: ApiManager;
  public static getInstance() {
    if (!ApiManager.instance) {
      ApiManager.instance = new ApiManager();
    }
    return ApiManager.instance;
  }

  public init() {
    console.log('init called');
    if (!this.socket) {
      const { serverUrl, appId } = getServerConfig();
      this.socket = new WebSocket(`wss://${serverUrl}/websockets/v3?app_id=${appId}`);
    }
    this.derivApi = new DerivAPIBasic({ connection: this.socket });
    this.registerKeepAlive();
  }

  public augmentedSend<T extends TSocketEndpointNames>(
    request: TSocketRequestProps<T> extends never ? undefined : TSocketRequestProps<T>,
  ): Promise<TSocketResponse<T>> {
    return this.derivApi.send(request) as Promise<TSocketResponse<T>>;
  }

  public augmentedSubscribe<T extends TSocketSubscribableEndpointNames>(
    request?: TSocketRequestProps<T> extends never ? undefined : TSocketRequestProps<T>,
  ): Observable<TSocketResponse<T>> {
    return this.derivApi.subscribe(request) as Observable<TSocketResponse<T>>;
  }

  public authorize(token: string) {
    return this.derivApi.authorize({ authorize: token });
  }
  public logout() {
    this.derivApi.send({ logout: 1 });
  }

  private registerKeepAlive() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }
    if (this.reconnectInterval) {
      clearInterval(this.reconnectInterval);
    }
    this.socket.addEventListener('open', () => {
      this.pingInterval = setInterval(() => {
        this.socket.send(JSON.stringify({ ping: 1 }));
      }, PING_INTERVAL);
      // if(is_connected_before) updateAuthorize();
    });

    this.socket.onclose = () => {
      //   if (!is_connected_before) {
      //   is_connected_before = true;
      // }
      clearInterval(this.pingInterval);
      this.socket = null;
      if (attempts > 0) {
        this.reconnectInterval = setTimeout(this.init.bind(this), RECONNECT_INTERVAL);
        attempts -= 1;
      } else {
        window.alert('server down!!!');
        clearInterval(this.reconnectInterval);
      }
    };
  }

  public reset(appId: string, url: string, registerKeepAlive = false) {
    this.socket = new WebSocket(`wss://${url}/websockets/v3?app_id=${appId}`);
    this.derivApi = new DerivAPIBasic({ connection: this.socket });
    if (registerKeepAlive) {
      this.registerKeepAlive();
    }
  }

  // connection is made and all of a sudden server is down, two things happen -> we send ping to server repeatedly and check fo response -> if response received for that no. of attempts meaning server got up if not meaning server down show msg
  // fe side, we send pings to keep ws alive, but when server goes down ping gives no response which causes ws to close
  // In this case, we need to check the cause of closure
  // To check if reason is server down, we need to make new ws, send pings if no response recieved ws may close on its own so we send again for x amount times
  // once all attempts get exhausted, we conclude that server is down and show message
  // but if in one of the attempts, server send back a request - we try to reconnect (how to reconnect?)
  // handles reconnection if server goes down
  // 1. triggers on connection closed -> 1. reattempt to connect first check if server is up -> ping 4-5 times, 2. if server down for long time show msg, 3. if server back up re-establish websocket connection

  // trigger this function when socket is closed -> to check if server is down
  public checkServerStatus() {
    console.log('checkServerStatus');

    // open new socket
    this.createNewWebsocket();

    // if WS is open, ping server for sometime, arbitary tries
    if (this.socket.readyState == WebSocket.OPEN) {
      console.log('ws is open');

      while (attempts < 10) {
        console.log('inside while');

        this.reconnectInterval = setInterval(() => {
          this.socket.send(JSON.stringify({ ping: 1 }));
          attempts += 1;
        }, 12000);

        // listen for pongs
        this.socket.addEventListener('pong', () => {
          console.log('server is up');
          clearInterval(this.reconnectInterval);
          // break -> attempts = 4
          attempts = 4;
        });
      }
    }

    if (attempts < 3) {
      attempts = 0;
      console.log('attempts < 3');
      window.alert('server is down');
    } else {
      console.log('attempts > 3');
      this.init();
    }
  }

  public createNewWebsocket() {
    const { serverUrl, appId } = getServerConfig();
    this.socket = new WebSocket(`wss://${serverUrl}/websockets/v3?app_id=${appId}`);
    this.derivApi = new DerivAPIBasic({ connection: this.socket });
  }

  set connection(newConnection: WebSocket) {
    this.socket = newConnection;
  }

  get connection() {
    return this.socket;
  }

  set api(value: TDerivApi) {
    this.derivApi = value;
  }

  get api() {
    return this.derivApi;
  }
}
let apiManager: ApiManager;
if (getIsBrowser()) {
  apiManager = ApiManager.getInstance();
}

export default apiManager;
