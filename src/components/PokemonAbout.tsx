import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import clsx from 'clsx';

import { motion, Variants } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

export default function PokemonAbout() {

	const theme = useContext(ThemeContext);

	const width = window.innerWidth;
	const height = window.innerHeight;

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
			className='h-full'
		>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
			<div>Teste</div>
		</motion.article>
	);
}