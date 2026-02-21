'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setDefaultOptions } from 'date-fns';
import { pt } from 'date-fns/locale';

import { Provider } from './_chakra/provider';
import { MainLayout } from './_layout/components/MainLayout';

setDefaultOptions({ locale: pt });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <QueryClientProvider client={queryClient}>
            <MainLayout>{children}</MainLayout>
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
