'use client';
import Image from 'next/image';
import clsx from 'clsx';
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import { motion, useScroll, useSpring, useTransform} from 'framer-motion';

export default function PokemonIntro() {

	const theme = useContext(ThemeContext);

	const ref = useRef<HTMLElement | null>(null);

	const { scrollYProgress } = useScroll({
		target: ref
	});

	const scaleTransformed = useTransform(scrollYProgress, value=>(1+value));

	const topTransformed = useTransform(scrollYProgress, value=>{
		const offset = -660;
		const shift = (1-value)*720;
		return offset + shift;
	})

	const top = useSpring(topTransformed);

	return (
		<motion.section 
			ref={ref} 
			initial={{ opacity: 0 }}
 			whileInView={{ opacity: 1 }}
			className={clsx(
				'relative flex flex-col justify-center items-center',
				'w-full p-4 z-10',
			)}  
		>
			<header className={clsx(
				'flex justify-between items-end',
				'w-full m-4 z-30',
				theme === "dark" && 'text-white'
				)}
			>	
				<span className={clsx(
					'Description',
					'text-black text-xl font-bold',
					"drop-shadow-[0_0_0.3rem_#00000070]",
					theme === "dark" && 'text-white drop-shadow-[0_0_0.3rem_#ffffff70]'
					)}
				>
					Bulbasaur
				</span>

				<span className={clsx(
					'text-black text-base font-bold',
					theme === "dark" && 'text-white'
					)}
				>
					#001
				</span>
			</header>
			
			<div className='flex justify-start items-center w-full m-4'>
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
							width={12}
							height={12}
						/>
						<span className='text-[11px] text-green-600 font-bold'>
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
							width={12}
							height={12}
						/>
						<span className='text-[11px] text-purple-600 font-bold'>
							Poison
						</span>
					</div>
				</div>
			</div>

			<motion.div 
				className={clsx(
					"relative",
					"after:absolute after:block after:content-[''] after:left-[-1rem] after:top-0",
					"after:w-[16rem] after:h-[13rem] after:-z-10",
					"after:bg-[conic-gradient(#64731E,#006750,#267D39)] after:blur-2xl after:opacity-50",
					theme==="dark" && "after:opacity-100"
				)}
				style={{ scale: scaleTransformed, top}}
			>
				<Image
					src="/001.png"
					alt="Bulbasaur"
					width={220}
					height={220}
					priority
					className={clsx(
						"relative md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px]",
					)}
				/>
			</motion.div>
			
		</motion.section>
  );
}