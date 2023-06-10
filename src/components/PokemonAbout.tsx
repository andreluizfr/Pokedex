import { useContext, useEffect } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import clsx from 'clsx';

import { motion, Variants } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { GetPokemon } from '@/queries/GetPokemon';

interface props {
	pokemonName: string | undefined,
	pokemonHeight: number | undefined,
	pokemonWeight: number | undefined,
}

export default function PokemonAbout({pokemonName, pokemonHeight, pokemonWeight}: props) {

	const theme = useContext(ThemeContext);

	const width = window.innerWidth;
	const height = window.innerHeight;

	const smallScreen = useMediaQuery({
		query: '(max-width: 768px)'
	});

	const {isLoading, data, isError, error} = GetPokemon(pokemonName);

	useEffect(()=>{
		if(data)
			console.log(data);
	}, [data]);

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
			className='h-full px-4'
		>	

			<div className='flex flex-col justify-start items-start'>
				<div className={clsx(
					"text-xs text-black font-semibold",
					theme==="dark" && "text-white"
					)}
				>
					<span className='text-gray-500 font-bold'>Generation: </span>
					{data?.generation.name}
				</div>

				<div className={clsx(
					"text-xs text-black font-semibold",
					theme==="dark" && "text-white"
					)}
				>
					<span className='text-gray-500 font-bold'>Height: </span>
					{(pokemonHeight!==undefined) && pokemonHeight/10}m
				</div>

				<div className={clsx(
					"text-xs text-black font-semibold",
					theme==="dark" && "text-white"
					)}
				>
					<span className='text-gray-500 font-bold'>Weight: </span>
					{pokemonWeight}lbs
				</div>

				<div className={clsx(
					"text-xs text-black font-semibold",
					theme==="dark" && "text-white"
					)}
				>
					<span className='text-gray-500 font-bold'>Shape: </span>
					{data?.shape.name}
				</div>

				<div className={clsx(
					"text-xs text-black font-semibold",
					theme==="dark" && "text-white"
					)}
				>
					<span className='text-gray-500 font-bold'>Baby: </span>
					{data?.is_baby?"yes":"no"}
				</div>

				<div className={clsx(
					"text-xs text-black font-semibold",
					theme==="dark" && "text-white"
					)}
				>
					<span className='text-gray-500 font-bold'>Legendary: </span>
					{data?.is_legendary?"yes":"no"}
				</div>

				<div className={clsx(
					"text-xs text-black font-semibold",
					theme==="dark" && "text-white"
					)}
				>
					<span className='text-gray-500 font-bold'>Mythical: </span>
					{data?.is_mythical?"yes":"no"}
				</div>
				
				<div className='flex flex-col justify-center items-center gap-4 mt-4'>
				{data?.flavor_text_entries.map((flavor_text, index)=>{
					if(flavor_text.language.name==="en")
						return(
							<div className={clsx(
								"text-xs text-black font-semibold",
								theme==="dark" && "text-white"
								)}
								key={"flavor_text_"+index}
							>
								<i>
									{'"'+flavor_text.flavor_text+'"'}
								</i>
								<span>
									{" ("+flavor_text.version.name+" edition)"}
								</span>
							</div>
						)
				})}
				</div>

			</div>
			
		</motion.article>
	);
}