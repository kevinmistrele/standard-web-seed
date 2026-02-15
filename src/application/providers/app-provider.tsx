import { Provider as ReduxProvider } from 'react-redux';
import { Toaster } from '@components/ui/sonner';
import { store } from '@application/store';
import type { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <QueryProvider>
        {children}
        <Toaster position="top-right" richColors />
      </QueryProvider>
    </ReduxProvider>
  );
}
