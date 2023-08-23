import { TSocketEndpointNames, TSocketResponseData } from '@site/src/configs/websocket/types';
import React, { Dispatch, SetStateAction } from 'react';

export interface IPlaygroundContext<T extends TSocketEndpointNames> {
  setPlaygroundHistory: Dispatch<SetStateAction<TSocketResponseData<T>[]>>;
  playground_history: TSocketResponseData<T>[];
}

export const PlaygroundContext =
  React.createContext<IPlaygroundContext<TSocketEndpointNames> | null>(null);
