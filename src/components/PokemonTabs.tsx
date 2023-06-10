'use client';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import clsx from 'clsx';

import * as Tabs from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';

import { ICustomPokemonQueryData } from '@/queries/CustomGetPokemon';

import PokemonAbout from './PokemonAbout';
import PokemonStats from './PokemonStats';
import PokemonMoves from './PokemonMoves';
import PokemonEvolutions from './PokemonEvolutions';
import PokemonLocations from './PokemonLocations';

export default function PokemonTabs({data}: {data: ICustomPokemonQueryData}) {

	const theme = useContext(ThemeContext);

	const TabsTriggerStyles = clsx(
		"text-black text-sm cursor-pointer active:font-bold",
		"after:content-[''] after:block after:relative after:top-[.2rem] after:left-0 after:h-[3px] after:w-0",
		"after:bg-black after:rounded-full",
		"after:transition-all after:duration-500 after:invisible ",
		"active:after:visible active:after:w-full active:after:px-0",
		theme === "dark" && "text-white active:after:bg-white"
	);

	return (
		<motion.section 
			className={clsx(
				"flex-1 w-full pt-10 rounded-tl-3xl rounded-tr-3xl",
				theme==="light" && "bg-zinc-300",
				theme==="dark" && "bg-zinc-900",
			)}
		>
			<Tabs.Root className="w-full h-full" defaultValue="About">

				<Tabs.List className="flex flex-row justify-around gap-2 w-full px-4 relative z-40">
					<Tabs.Trigger className={TabsTriggerStyles} value="About">
						About
					</Tabs.Trigger>
					<Tabs.Trigger className={TabsTriggerStyles} value="Stats">
						Stats
					</Tabs.Trigger>
					<Tabs.Trigger className={TabsTriggerStyles} value="Moves">
						Moves
					</Tabs.Trigger>
					<Tabs.Trigger className={TabsTriggerStyles} value="Evolutions">
						Evolutions
					</Tabs.Trigger>
					<Tabs.Trigger className={TabsTriggerStyles} value="Locations">
						Locations
					</Tabs.Trigger>
				</Tabs.List>

				<Tabs.Content className="p-6 w-full h-full" value="About">
					<PokemonAbout 
						pokemonName={data?.pokemon.name} 
						pokemonHeight={data?.pokemon.height} 
						pokemonWeight={data?.pokemon.weight}
					/>
				</Tabs.Content>

				<Tabs.Content className="p-6 w-full h-full" value="Stats">
					<PokemonStats pokemonStats={data?.pokemon.stats}/>
				</Tabs.Content>

				<Tabs.Content className="p-6 w-full h-full" value="Moves">
					<PokemonMoves pokemonMoves={data?.pokemon.moves}/>
				</Tabs.Content>
						
				<Tabs.Content className="p-6 w-full h-full" value="Evolutions">
					<PokemonEvolutions pokemonId={data?.pokemon.id}/>
				</Tabs.Content>

				<Tabs.Content className="p-6 w-full h-full" value="Locations">
					<PokemonLocations pokemonName={data?.pokemon.name}/>
				</Tabs.Content>

			</Tabs.Root>
		</motion.section>
	);
}