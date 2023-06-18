import { motion } from 'framer-motion';
import PokemonEachStat from './PokemonEachStat';

import { useMediaQuery } from 'react-responsive';

interface props {
	pokemonStats: [{
		base_stat: number,
		stat: {
			name: string
		}
	}],
}

export default function PokemonStats({pokemonStats}: props) {

	const height = window.innerHeight;
	const width = window.innerWidth;

	const smallScreen = useMediaQuery({
		query: '(max-width: 768px)'
	});

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
			className='flex flex-col justify-center items-center gap-2 px-4'
		>
			<PokemonEachStat name="HP" value={pokemonStats.find(stat=>stat.stat.name==="hp")?.base_stat}/>
			<PokemonEachStat name="Attack" value={pokemonStats.find(stat=>stat.stat.name==="attack")?.base_stat}/>
			<PokemonEachStat name="Defense" value={pokemonStats.find(stat=>stat.stat.name==="defense")?.base_stat}/>
			<PokemonEachStat name="SpAttack" value={pokemonStats.find(stat=>stat.stat.name==="special-attack")?.base_stat}/>
			<PokemonEachStat name="SpDefense" value={pokemonStats.find(stat=>stat.stat.name==="special-defense")?.base_stat}/>
			<PokemonEachStat name="Speed" value={pokemonStats.find(stat=>stat.stat.name==="speed")?.base_stat}/>
		</motion.article>
	);
}