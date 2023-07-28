import React, { Dispatch, SetStateAction } from 'react';
import { TSocketResponse } from '@site/src/configs/websocket/types';
import { TSocketEndpoints } from '@site/src/configs/websocket/api.calls.types';
import { TSocketResponseData } from '@site/src/configs/websocket/types';

// export interface IPlaygroundContext {
//   setPlaygroundHistory: React.Dispatch<React.SetStateAction<TSocketResponseData<T>>>
//   playground_history: TSocketResponseData<T>
// }

export const PlaygroundContext = React.createContext(null);
