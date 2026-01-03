import type { Metadata } from 'next';

import { Provider } from './_chakra/provider';
import { MainLayout } from './_layout/components/MainLayout';

export const metadata: Metadata = {
  title: 'CBTM Site - Revamped',
  description: 'Uma versão customizada dos sistemas públicos da CBTM',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <MainLayout>{children}</MainLayout>
        </Provider>
      </body>
    </html>
  );
}
