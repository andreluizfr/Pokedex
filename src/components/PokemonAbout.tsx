import clsx from 'clsx';
import { ThemeContext } from '@/contexts/ThemeContext';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

import { useContext, useEffect } from 'react';
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

	if(isError)
		return <div className='w-full px-4 text-center text-lg text-red-600'>An error occurred in the application.</div>

	if(isLoading)
		return (
			<SkeletonTheme baseColor="#414141" highlightColor="#626262">
				<article className='h-full px-4'>	
	
					<div className='flex flex-col justify-start items-start gap-2'>
						<div className="h-[12px] min-w-[100px]">
							<Skeleton className="h-full"/>
						</div>
		
						<div className="h-[12px] min-w-[100px]">
							<Skeleton className="h-full"/>
						</div>
						<div className="h-[12px] min-w-[100px]">
							<Skeleton className="h-full"/>
						</div>
		
						<div className="h-[12px] min-w-[100px]">
							<Skeleton className="h-full"/>
						</div>
		
						<div className="h-[12px] min-w-[100px]">
							<Skeleton className="h-full"/>
						</div>
		
						<div className="h-[12px] min-w-[100px]">
							<Skeleton className="h-full"/>
						</div>
		
						<div className="h-[12px] min-w-[100px]">
							<Skeleton className="h-full"/>
						</div>
						
						<div className='flex flex-col justify-center items-center gap-4 mt-4 w-full'>
						{(new Array(10)).fill(0).map((value, index)=>{
								return(
									<div className="h-[16px] min-w-full" key={"flavor-text-"+index}>
										<Skeleton className="h-full"/>
									</div>
								)
						})}
						</div>
		
					</div>
				
				</article>
			</SkeletonTheme>
		);
						
	return (
		<article
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
			
		</article>
	);
	
}