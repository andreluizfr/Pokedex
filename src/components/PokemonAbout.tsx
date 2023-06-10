import { useContext, useEffect } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import clsx from 'clsx';

import { motion, Variants } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { GetPokemon } from '@/queries/GetPokemon';

interface props {
	name: string | undefined,
	pokemonHeight: number | undefined,
	pokemonWeight: number | undefined,
}

export default function PokemonAbout({name, pokemonHeight, pokemonWeight}: props) {

	const theme = useContext(ThemeContext);

	const width = window.innerWidth;
	const height = window.innerHeight;

	const smallScreen = useMediaQuery({
		query: '(max-width: 768px)'
	});

	const {isLoading, data, isError, error} = GetPokemon(name);

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
					"text-xs text-black",
					theme==="dark" && "text-white"
					)}
				>
					<span className='text-gray-500 font-bold'>Height: </span>
					{(pokemonHeight!==undefined) && pokemonHeight/10}m
				</div>
				<div className={clsx(
					"text-xs text-white",
					theme==="dark" && "text-white"
					)}
				>
					<span className='text-gray-500 font-bold'>Weight: </span>
					{pokemonWeight}lbs
				</div>
			</div>
			
		</motion.article>
	);
}