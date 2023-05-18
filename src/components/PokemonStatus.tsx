import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import clsx from 'clsx';

import { animate, motion, useMotionValue, useTransform, Variants } from 'framer-motion';
import PokemonEachStatus from './PokemonEachStatus';

import { useMediaQuery } from 'react-responsive';

export default function PokemonStatus() {

	const theme = useContext(ThemeContext);
	const height = window.innerHeight;
	const width = window.innerWidth;

	const smallScreen = useMediaQuery({
		query: '(max-width: 768px)'
	});

	const [bulbasaurStatus, setBulbasaurStatus] = useState({
		HP: 45,
		Attack: 49,
		Defense: 49,
		SpAttack: 65,
		SpDefense: 65,
		Speed: 45
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
			className='flex flex-col justify-center items-center gap-4 px-4'
		>
			<PokemonEachStatus name="HP" value={bulbasaurStatus.HP}/>
			<PokemonEachStatus name="Attack" value={bulbasaurStatus.Attack}/>
			<PokemonEachStatus name="Defense" value={bulbasaurStatus.Defense}/>
			<PokemonEachStatus name="SpAttack" value={bulbasaurStatus.SpAttack}/>
			<PokemonEachStatus name="SpDefense" value={bulbasaurStatus.SpDefense}/>
			<PokemonEachStatus name="Speed" value={bulbasaurStatus.Speed}/>
		</motion.article>
	);
}