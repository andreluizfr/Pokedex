import clsx from 'clsx';
import { motion, MotionValue} from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

interface props extends React.HTMLAttributes<HTMLElement>{
    type: string | undefined,
    scale: MotionValue<number>,
    top: MotionValue<number>
}

export default function PokemonAnimatedImage ({type, scale, top, children}: props) {

	const theme = useContext(ThemeContext);

    return (
        <motion.div 
            className={clsx(
                "ImageBackground relative",
                "after:absolute after:block after:content-[''] after:left-[-1rem] after:top-0",
                "after:w-[16rem] after:h-[13rem] after:-z-10",
                type==="normal" && "",
                type==="fighting" && "",
                type==="flying" && "",
                type==="poison" && "",
                type==="ground" && "",
                type==="rock" && "",
                type==="bug" && "",
                type==="ghost" && "",
                type==="steel" && "",
                type==="fire" && "",
                type==="water" && "after:bg-[conic-gradient(#1B98E0,#3065AC,#3B82F6)]",
                type==="grass" && "after:bg-[conic-gradient(#64731E,#006750,#267D39)]",
                type==="eletric" && "",
                type==="psychic" && "",
                type==="ice" && "",
                type==="dragon" && "",
                type==="dark" && "",
                type==="fairy" && "",
                type==="unknown" && "",
                type==="shadow" && "",
                "after:blur-2xl after:opacity-50",
                theme==="dark" && "after:opacity-100"
            )}
            style={{ scale: scale, top: top}}
        >
            {children}
        </motion.div>
    )
}