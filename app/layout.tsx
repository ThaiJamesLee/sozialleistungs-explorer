import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sozialleistungen Explorer',
  description: 'Sozialleistungen nach Gesetz, Lebenslage und Themenfeld durchsuchen.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}