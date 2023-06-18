'use client';
import clsx from 'clsx';
import { useContext, useRef } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import formatId from '@/utils/formatId';

import { motion, useScroll, useSpring, useTransform} from 'framer-motion';

import { ICustomPokemonQueryData } from '@/queries/CustomGetPokemon';

import Image from 'next/image';
import PokemonTypeBadge from './PokemonTypeBadge';
import PokemonAnimatedImage from './PokemonAnimatedImage';

export default function PokemonIntro({data}: {data: ICustomPokemonQueryData}) {

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
	});

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
					'text-black text-[20px] font-bold capitalize',
					'lg:text-[24px]',
					theme === "dark" && 'text-white'
					)}
				>
					{data?.pokemon?.name}
				</span>

				<span className={clsx(
					'text-black text-[16px] font-bold',
					'lg:text-[20px]',
					theme === "dark" && 'text-white'
					)}
				>
					{formatId(String(data?.pokemon?.id), true)}
				</span>
			</header>
			
			<div className='flex justify-start items-center w-full m-4'>
				<div className={clsx(
					'Features',
					'flex justify-center items-center gap-1',
					theme === "dark" && 'text-white'
					)}
				>
					{
						data?.pokemon?.types?.map((type, index)=>{
							return (
								<PokemonTypeBadge key={index} type={type.type.name}/>
							)
						})
					}
				</div>
			</div>

			<PokemonAnimatedImage type={data?.pokemon?.types?.length>0?data.pokemon.types[0].type.name:undefined} scale={scaleTransformed} top={top}>
				<Image
					src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatId(String(data.pokemon.id), false)}.png`}
					alt={data?.pokemon?.name?data.pokemon.name:"pokemon"}
					width={220}
					height={220}
					priority
					className={clsx(
						"relative md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px]",
					)}
				/>
			</PokemonAnimatedImage>
			
		</motion.section>
  );
}