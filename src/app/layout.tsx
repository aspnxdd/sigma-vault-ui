import type { Metadata } from 'next';
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Sigma Vault - DeFi Yield Strategies',
  description: 'Sigma Vault - Advanced DeFi yield farming and vault management platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
