'use client';
import clsx from 'clsx';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import { DotLoader } from 'react-spinners';

//usar em outro momento
export default function LoadingPage () {

    const theme = useContext(ThemeContext);
    
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
            <DotLoader size={60} color={theme==="dark"?"#FFFFFF":"#000000"} speedMultiplier={1}/>
        </div>
      </main>
    )
}