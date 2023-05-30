'use client';
import './globals.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import clsx from 'clsx';

import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import { useEffect, useState } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';


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

  useEffect(()=>{
      if(typeof window === 'undefined')
        console.warn(`Tried setting localStorage key “theme” even though environment is not a client`);
      try{
        const themeStoraged = window.localStorage.getItem("theme");
        if(themeStoraged) setTheme(themeStoraged);
      } 
      catch (error) {
        console.warn(`Error getting localStorage item with key “theme”:`, error);
      }
  }, []);

  useEffect(()=>{
    if(theme){
        if (typeof window === 'undefined')
          console.warn(`Tried setting localStorage key “theme” even though environment is not a client`);
        try{
          window.localStorage.setItem("theme", theme);
        } 
        catch (error) {
          console.warn(`Error setting localStorage key “theme”:`, error)
        }
    }
  }, [theme]);

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
