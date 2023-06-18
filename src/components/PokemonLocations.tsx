import { useContext, useEffect } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import clsx from 'clsx';

import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

import { GetPokemon } from '@/queries/GetPokemon';

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
					"text-xs text-black font-semibold",
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