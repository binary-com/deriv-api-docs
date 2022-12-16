import { ThemeProvider } from '@deriv/ui';
import React from 'react';
import type { ReactNode } from 'react';
import { RootContext } from '../components/contexts/root-context/RootContext';

type TRootProps = {
  children: ReactNode;
};

export default function Root({ children }: TRootProps) {
  return (
    <>
      <RootContext>
        <ThemeProvider>{children}</ThemeProvider>
      </RootContext>
    </>
  );
}
