import React from 'react';
import { ThemeProvider } from '@deriv/ui';
import type { ReactNode } from 'react';
import AuthProvider from '../contexts/auth/auth.provider';
import ApiTokenProvider from '../contexts/api-token/api-token.provider';
import AppManagerContextProvider from '../contexts/app-manager/app-manager.provider';

type TRootProps = {
  children: ReactNode;
};

export default function Root({ children }: TRootProps) {
  return (
    <>
      <AuthProvider>
        <ApiTokenProvider>
          <AppManagerContextProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AppManagerContextProvider>
        </ApiTokenProvider>
      </AuthProvider>
    </>
  );
}
