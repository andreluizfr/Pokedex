import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import clsx from 'clsx';

import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

import axios from 'axios';

interface chain {
	species: {
		name: string,
		url: string
	},
	evolves_to: chain[],
	evolution_details: {
		"item": null | string,
		"location": null | string,
		"min_affection": null | number,
		"min_beauty": null | number,
		"min_happiness": null | number,
		"min_level": number,
		"needs_overworld_rain": boolean,
		"trigger": {
			"name": string, //level-up
			"url": string
		}
	}[],
}

export default function PokemonEvolutions({pokemonId}: {pokemonId: number}) {

	const height = window.innerHeight;
	const width = window.innerWidth;

	const smallScreen = useMediaQuery({
		query: '(max-width: 768px)'
	});

	const theme = useContext(ThemeContext);

	const [chain, setChain] = useState<undefined | chain>(undefined);

	const [evolutionsList, setEvolutionsList] = useState<{
		min_level: number | string,
		name: string
	}[]>([] as unknown as {
		min_level: number | string,
		name: string
	}[]);

	useEffect(()=>{
		axios.get("https://pokeapi.co/api/v2/evolution-chain/"+pokemonId+"/").then(response=>{
			setChain(response.data.chain);
		});
	}, []);

	useEffect(()=>{
		function generateEvolutionsList(actualChain: chain | undefined){
			while(actualChain){
				let evolution = {} as { min_level: number | string; name: string };

				if (
					actualChain &&
					actualChain.evolution_details &&
					actualChain.evolution_details.length > 0 &&
					actualChain.evolution_details[0].min_level &&
					actualChain.species &&
					actualChain.species.name
				) {
					const { min_level } = actualChain.evolution_details[0];
					const { name } = actualChain.species;
					evolution = { min_level, name };
					setEvolutionsList(currentList=>[...currentList, evolution]);
				} 
				else if(
					actualChain &&
					actualChain.species &&
					actualChain.species.name
				) {
					const { name } = actualChain.species;
					evolution = { min_level: "none", name };
					setEvolutionsList(currentList=>[...currentList, evolution]);
				}

				actualChain = actualChain.evolves_to[0];
			}
		}

		if(chain){
			setEvolutionsList([]);
			generateEvolutionsList(chain);
		}
	}, [chain]);

	useEffect(()=>{
		console.log(evolutionsList);
	}, [evolutionsList]);

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
		>	

			<div className='flex flex-col justify-start items-center mt-4'>
				{evolutionsList.length>0 && evolutionsList.map((evolution, index)=>{
					return (
						<div className='flex flex-col justify-start items-center' key={"evolution-"+index}>
							<div className='flex flex-col justify-start items-center'>
								<span className={clsx(
									'text-black text-xs font-semibold',
									theme === "dark" && "text-white"
									)}
								>
									<span className='text-gray-500'>Name: </span>{evolution.name}
								</span>
								<span className={clsx(
									'text-black text-xs font-semibold',
									theme === "dark" && "text-white"
									)}
								>
									<span className='text-gray-500'>Minimum level: </span>{evolution.min_level}
								</span>
							</div>
							<img 
								className={theme==="dark"?"invert my-2":"my-2"}
								src="/arrow-down.png" 
								alt="arrow down icon" 
								width={20} 
								height={20}
							/>
						</div>
					)
				})}
				
			</div>
			
		</motion.article>
	);
}