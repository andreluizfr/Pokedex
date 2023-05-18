import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import clsx from 'clsx';
import { MotionValue, animate, motion, useMotionValue, useTransform } from 'framer-motion';


interface IPokemonEachStatus{
    name: string;
    value: number;
}
export default function PokemonEachStatus ({name, value}: IPokemonEachStatus){

    const theme = useContext(ThemeContext);

    const count = useMotionValue(0);
	const rounded = useTransform(count, (latest: number) => Math.round(latest));
    const [roundedHooked, setRoundedHooked] = useState(0);

    useEffect(()=>{
        animate(count, value, { duration: 1 });
    }, []);

    useEffect(()=>{
        rounded.onChange(value=>setRoundedHooked(value));
    }, [rounded]);

    return (
        <div className="flex items-center justify-center w-full gap-2">

            <span className={clsx(
                "w-20",
                "text-sm",
                theme==="light" && "text-gray-500",
                theme==="dark" && "text-gray-600"
                )}
            >
                {name}
            </span>
        
            <motion.div className='relative flex-1 items-center justify-center'>
                <div
                    className={clsx(
                        "absolute top-[-4px]",
                        "w-full h-2 rounded-md",
                        "bg-slate-500",
                        theme==="dark" && "bg-slate-600",
                    )}
                />
                <div
                    style={{width:`${roundedHooked}%`}}
                    className={clsx(
                        "absolute top-[-4px]",
                        "h-2 rounded-md",
                        roundedHooked<=50 && theme==="light" && "bg-slate-900",
                        roundedHooked<=50 && theme==="dark" && "bg-slate-300",
                        roundedHooked>50 && theme==="light" && "bg-emerald-500",
                        roundedHooked>50 && theme==="dark" && "bg-emerald-400",
                    )}
                />
            </motion.div>

            <motion.span
                className={clsx(
                    "text-sm text-black",
                    theme==="dark" && "text-white",
                )}
            >
                {rounded}
            </motion.span>

        </div>
    );
}