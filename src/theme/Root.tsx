import { ThemeProvider } from '@deriv/ui';
import React from 'react';
import type { ReactNode } from 'react';
import RootContextProvider from '@site/src/contexts/root/root.context.provider';

type TRootProps = {
  children: ReactNode;
};

export default function Root({ children }: TRootProps) {
  return (
    <>
      <RootContextProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </RootContextProvider>
    </>
  );
}
