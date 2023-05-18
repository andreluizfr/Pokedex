'use client';
import Image from 'next/image';
import clsx from 'clsx';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import Link from 'next/link';

export default function Home() {

  const theme = useContext(ThemeContext);

  return (
    <main className={clsx(
      "flex flex-1 flex-col items-center flex-start gap-1",
      "w-full h-full px-10 py-2",
      theme==="dark" && "bg-zinc-950"
      )}
    >

      <section className='w-full h-auto p-2'>

        <nav className='grid grid-flow-row-dense grid-cols-2 grid-rows-2 gap-4'>
            <Link 
              href="/pokemons"
              className={clsx(
                'col-span-2',
                'p-4 rounded-lg',
                'text-white text-center md:text-left',
                'bg-green-400',
                'cursor-pointer'
              )}
            >
              Pokemons
            </Link>

            <Link 
              href="/items" 
              className={clsx(
                'md:col-span-2',
                'p-4 rounded-lg',
                'text-white text-center md:text-left',
                'bg-red-400',
                'cursor-pointer'
              )}
            >
              Items
            </Link>
            <Link
              href="/moves"
              className={clsx(
                'md:col-span-2',
                'p-4 rounded-lg',
                'text-white text-center md:text-left',
                'bg-blue-500',
                'cursor-pointer'
              )}
            >
              Moves
            </Link>

            <Link 
              href="/types"
              className={clsx(
                'md:col-span-2',
                'p-4 rounded-lg',
                'text-white text-center md:text-left',
                'bg-yellow-400',
                'cursor-pointer'
              )}
            >
              Types
            </Link>
            <Link 
              href="favorites"
              className={clsx(
                'md:col-span-2',
                'p-4 rounded-lg',
                'text-white text-center md:text-left',
                'bg-purple-500',
                'cursor-pointer'
              )}
            >
              Favorites
            </Link>
        </nav>

      </section>

    </main>
  )
}
