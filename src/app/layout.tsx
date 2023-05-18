'use client';
import './globals.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { useState } from 'react';
import clsx from 'clsx';

import { ThemeContext } from '@/contexts/ThemeContext';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
  cache: new InMemoryCache(),
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState("light");

  return (
    <html lang="en">
      <body className={clsx(
        'flex flex-col min-h-screen m-0 min-w-[320px]',
        'scroll-smooth',
        theme==="dark" && "bg-zinc-950"
        )}
      >
        <ApolloProvider client={client}>
          <ThemeContext.Provider value={theme}>
            <AppHeader setTheme={setTheme}/>
            {children}
            <AppFooter/>
          </ThemeContext.Provider>
        </ApolloProvider>
      </body>
    </html>
  )
}
