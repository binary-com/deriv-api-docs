import { ThemeProvider } from '@deriv/ui';
import React from 'react';
import type { ReactNode } from 'react';
import AuthProvider from '../contexts/auth/auth.provider';

type TRootProps = {
  children: ReactNode;
};

export default function Root({ children }: TRootProps) {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </>
  );
}
