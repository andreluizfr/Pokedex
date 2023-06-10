import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import clsx from 'clsx';

import { motion, Variants } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

interface props {
	pokemonMoves: [{
		move: {
			name: string
		}
	}]
}

export default function PokemonMoves({pokemonMoves}: props) {

	const theme = useContext(ThemeContext);

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
			className='h-full px-4'
		>

			<div className='flex flex-col justify-start items-start'>
				{pokemonMoves?.map(move=>
					<div className={clsx(
						"text-xs text-black",
						theme==="dark" && "text-white"
						)}
					>
						{move.move.name}
					</div>
				)}
			</div>

		</motion.article>
	);
}