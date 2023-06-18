'use client';
import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

import LoadingQuery from '@/components/LoadingQuery';
import PokemonTabs from '@/components/PokemonTabs';
import PokemonIntro from '@/components/PokemonIntro';

import { CustomGetPokemon } from '@/queries/CustomGetPokemon';

export default function PokemonPage() {

  const [name, setName] = useState<string | undefined>("");

  const theme = useContext(ThemeContext);

  const {loading, error, data} = CustomGetPokemon(name);

  useEffect(()=>{

    setName(window.location.pathname.split("/").pop());

    if(data) console.log(data);

  }, [data]);

  if(loading) return <LoadingQuery/>
  
  if(error)
    return (
      <main 
        className={clsx(
          "relative flex flex-1 flex-col items-center flex-start gap-1",
          "w-full h-full",
          "md:px-20 md:pt-2 lg:px-40 lg:pt-4",
          theme === "dark" && "bg-zinc-950"
        )}
      >
        <div className="flex-1 flex items-center justify-center">
          <div className='w-full px-4 text-center text-[18px] lg:text-[24px] text-red-600'>An error occurred in the application.</div>
          {JSON.stringify(error)}
        </div>
      </main>
    );

  return (
    <main 
      className={clsx(
        "relative flex flex-1 flex-col items-center flex-start gap-1",
        "w-full h-full",
        "md:px-20 md:pt-2 lg:px-40 lg:pt-4",
        theme === "dark" && "bg-zinc-950"
      )}
    >
      
      {data?
        <>
          <PokemonIntro data={data}/>
          <PokemonTabs data={data}/>
        </>
        :
        null
      }

    </main>
  );
}