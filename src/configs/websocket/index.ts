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

export type TDerivApi = {
  send: (...requestData: unknown[]) => Promise<unknown>;
  subscribe: (...requestData: unknown[]) => Observable<object>;
  authorize: (requestData: AuthorizeRequest) => Promise<AuthorizeResponse>;
};

export class ApiManager {
  private socket: WebSocket;
  private derivApi: TDerivApi;

  public static instance: ApiManager;
  public static getInstance() {
    if (!ApiManager.instance) {
      ApiManager.instance = new ApiManager();
    }
    return ApiManager.instance;
  }

  public init() {
    if (!this.socket) {
      const { serverUrl, appId } = getServerConfig();
      this.socket = new WebSocket(`wss://${serverUrl}/websockets/v3?app_id=${appId}`);
    }
    this.derivApi = new DerivAPIBasic({ connection: this.socket });
  }

  public augmentedSend<T extends TSocketEndpointNames>(
    name: T,
    request?: TSocketRequestProps<T> extends never ? undefined : TSocketRequestProps<T>,
  ): Promise<TSocketResponse<T>> {
    return this.derivApi.send({ [name]: 1, ...request }) as Promise<TSocketResponse<T>>;
  }

  public augmentedSubscribe<T extends TSocketSubscribableEndpointNames>(
    name: T,
    request?: TSocketRequestProps<T> extends never ? undefined : TSocketRequestProps<T>,
  ): Observable<TSocketResponse<T>> {
    return this.derivApi.subscribe({ [name]: 1, subscribe: 1, ...request }) as Observable<
      TSocketResponse<T>
    >;
  }

  public authorize(token: string) {
    return this.derivApi.authorize({ authorize: token });
  }

  public reset(appId: string, url: string) {
    this.socket = new WebSocket(`wss://${url}/websockets/v3?app_id=${appId}`);
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
