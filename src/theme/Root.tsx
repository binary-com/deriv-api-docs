import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@deriv/ui';
import type { ReactNode } from 'react';
import AuthProvider from '../contexts/auth/auth.provider';

type TRootProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export default function Root({ children }: TRootProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
