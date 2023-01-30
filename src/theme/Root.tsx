import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@deriv/ui';
import type { ReactNode } from 'react';
import RootContextProvider from '../contexts/root.context';

type TRootProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export default function Root({ children }: TRootProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RootContextProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </RootContextProvider>
      </QueryClientProvider>
    </>
  );
}
