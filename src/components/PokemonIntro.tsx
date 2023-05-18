'use client';
import Image from 'next/image';
import clsx from 'clsx';
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import { motion, useScroll} from 'framer-motion';

export default function PokemonIntro() {

	const theme = useContext(ThemeContext);

	const ref = useRef<HTMLElement | null>(null);

	const { scrollYProgress } = useScroll({
			target: ref
	});

	const [scaleHooked, setScaleHooked] = useState(1);

	useEffect(()=>{
		scrollYProgress.onChange(value=>setScaleHooked(1+value));
	}, [scrollYProgress]);

	return (
		<motion.section 
			ref={ref} 
			initial={{ opacity: 0 }}
 			whileInView={{ opacity: 1 }}
			className={clsx(
				'flex flex-col justify-center items-center relative',
				'mt-8 p-4 z-10',
				"after:absolute after:block after:content-[''] after:left-[-1rem] after-top-0",
				"after:w-[19rem] after:h-[19rem] after:-z-10",
				"after:bg-[conic-gradient(#64731E,#006750,#267D39)] after:blur-2xl after:opacity-50",
				theme==="dark" && "after:opacity-100"
			)}  
		>
			<motion.div 
				style={{ scale: scaleHooked }}
			>
				<Image
					src="/001.png"
					alt="Bulbasaur"
					width={220}
					height={220}
					priority
					className='md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px]'
				/>
			</motion.div>

			<span className={clsx(
				'Description',
				'mt-8 mb-4',
				'text-black text-xl font-bold',
				"drop-shadow-[0_0_0.3rem_#00000070]",
				theme === "dark" && 'text-white drop-shadow-[0_0_0.3rem_#ffffff70]'
				)}
			>
				Bulbasaur
			</span>
			
			<div className={clsx(
				'Features',
				'flex justify-center items-center gap-1',
				theme === "dark" && 'text-white'
				)}
			>
				<div className={clsx(
					'flex flex-row justify-center items-center gap-[4px]',
					'py-[2px] px-3',
					'border border-solid border-green-600 border-opacity-50 rounded-2xl'
					)}
				>
					<Image
						src="/grass-type.svg"
						alt="grass type"
						width={10}
						height={10}
					/>
					<span className='text-[10px] text-green-600 font-bold'>
						Grass
					</span>
				</div>

				<div className={clsx(
					'flex flex-row justify-center items-center gap-[4px]',
					'py-[2px] px-3',
					'border border-solid border-purple-600 border-opacity-50 rounded-2xl',
					)}
				>
					<Image
						src="/poison-type2.svg"
						alt="grass type"
						width={10}
						height={10}
					/>
					<span className='text-[10px] text-purple-600 font-bold'>
						Poison
					</span>
				</div>
			</div>
		</motion.section>
  );
}