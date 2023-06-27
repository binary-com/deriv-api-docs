import React, { Dispatch, SetStateAction } from 'react';

export interface IOfficialContents {
  is_official_domain: boolean;
}

export const OfficialContentsContext = React.createContext<IOfficialContents | null>(null);
