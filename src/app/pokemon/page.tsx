'use client';
import clsx from 'clsx';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

import PokemonTabs from '@/components/PokemonTabs';
import PokemonIntro from '@/components/PokemonIntro';

export default function PokemonPage() {

  const theme = useContext(ThemeContext);

  return (
    <main 
      className={clsx(
        "relative flex flex-1 flex-col items-center flex-start gap-1",
        "w-full h-full",
        "md:px-20 md:py-2 lg:px-40 lg:py-4",
        theme === "dark" && "bg-zinc-950"
      )}
    >
       
      <PokemonIntro/>

      <PokemonTabs/>

    </main>
  );
}