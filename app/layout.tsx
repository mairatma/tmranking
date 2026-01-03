import type { Metadata } from 'next';

import { Provider } from './_chakra/provider';

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
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
