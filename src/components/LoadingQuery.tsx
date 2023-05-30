import clsx from 'clsx';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import { BarLoader } from 'react-spinners';

export default function LoadingQuery () {

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
            <BarLoader height={4} width={100} color={"#36d7b7"} speedMultiplier={1}/>
        </div>
      </main>
    )
}