import { useContext, useEffect } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import clsx from 'clsx';

import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

import { GetPokemon } from '@/queries/GetPokemon';

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PokemonLocations({pokemonName}: {pokemonName: string}) {

	const theme = useContext(ThemeContext);

	const height = window.innerHeight;
	const width = window.innerWidth;

	const smallScreen = useMediaQuery({
		query: '(max-width: 768px)'
	});

	const {isLoading, data, isError, error} = GetPokemon(pokemonName);

	useEffect(()=>{
		if(data)
			console.log(data);
	}, [data]);

	if(isError)
		return <div className='w-full px-4 text-center text-[18px] lg:text-[24px] text-red-600'>
			An error occurred while fetching this info in the application.
		</div>

	if(isLoading)
		return (
			<SkeletonTheme baseColor="#414141" highlightColor="#626262">
				<article className='h-full px-4'>	
					<div className='flex flex-col justify-start items-start gap-2'>
						<div className="h-[14px] lg:h-[16px] min-w-[80px] lg-min-w-[120px]">
							<Skeleton className="h-full"/>
						</div>
					</div>
				</article>
			</SkeletonTheme>
		)

	return (
		<motion.article
			initial={smallScreen?
				{ x: -width, opacity: 0}
				:
				{y: height, opacity: 0}
			}
			animate={smallScreen?
				{x: 0, opacity: 1, transition:{type: "spring", bounce: 0.2, duration: 0.8}}
				:
				{y: 0, opacity: 1, transition:{type: "spring", bounce: 0.2, duration: 0.8}}
			}
			viewport={{ once: true, amount: 0.8 }}
			className='h-full px-4'
		>
			<div className='flex flex-col justify-start items-start'>
				<div className={clsx(
					"text-[14px] lg:text-[16px] text-black font-semibold",
					theme==="dark" && "text-white"
					)}
				>
					<span className='text-gray-500 font-bold'>Habitat: </span>
					{data?.habitat.name}
				</div>
			</div>
		</motion.article>
	);
}