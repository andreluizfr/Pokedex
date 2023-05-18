import { Dispatch, SetStateAction, useContext } from "react";
import clsx from "clsx";
import ThemeSwitch from "./ThemeSwitch";
import { ThemeContext } from "@/contexts/ThemeContext";
import Link from "next/link";

export default function AppHeader({setTheme}: {setTheme: Dispatch<SetStateAction<string>>}){

    const theme = useContext(ThemeContext);
    
    return(
        <header className={clsx(
            'sticky top-0 flex justify-between items-center z-50',
            'w-full px-5 py-2 border-b border-gray-300',
            'bg-opacity-50 bg backdrop-blur-md',
            'lg:static lg:w-auto',
            theme==="dark" && 'bg-black border-opacity-20',
            )}
          >
            <Link 
              href="/" 
              className={clsx(
                'mx-5',
                'font-mono font-bold text-lg text-black',
                theme==="dark" && 'text-white'
              )}
            >
              Pokedex
            </Link>

            <ThemeSwitch setTheme={setTheme}/>
        </header>
    )
}