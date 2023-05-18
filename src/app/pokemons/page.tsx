'use client'; 
import { GetPokemons, IPokemonsQueryData } from "@/queries/GetPokemons";
import { ReactEventHandler, SyntheticEvent, useContext, useEffect } from "react";
import clsx from "clsx";
import { ThemeContext } from "@/contexts/ThemeContext";

import Link from 'next/link';
import ImageWithFallback from "@/components/ImageWithFallback";

import ColorThief from 'colorthief';

export default function PokemonPage (){

    const theme = useContext(ThemeContext);
    
    const {loading, error, data} = GetPokemons(12, 0); //(limit, offset)

    useEffect(()=>{
        if(data) console.log(data);
    }, [data]);

    function catchPredominantColor(event: SyntheticEvent<HTMLImageElement, Event>){
        const pokemonImage = event.target as HTMLImageElement;
        const pokemonCard = pokemonImage.parentElement?.parentElement;

        let colorThief = new ColorThief();
        let color = colorThief.getColor(pokemonImage);

        if(pokemonCard){
            pokemonCard.style.cssText = "background-color: rgb("+color+")";
            console.log(pokemonImage.alt+"card color loaded");
        }
        else
            console.log(pokemonImage.alt+"card color failed");
    }

    if(loading) return (
        <main className={clsx(
            "relative flex flex-1 flex-col items-center flex-start gap-1",
            "w-full h-full",
            "md:px-20 md:py-2 lg:px-40 lg:py-4",
            theme === "dark" && "bg-zinc-950"
        )}>
            <div className="flex-1">
                Loading...
            </div>
        </main>
    );

    if(error) return (
        <main className={clsx(
            "relative flex flex-1 flex-col items-center flex-start gap-1",
            "w-full h-full",
            "md:px-20 md:py-2 lg:px-40 lg:py-4",
            theme === "dark" && "bg-zinc-950"
        )}>
            <div className="flex-1">
                Error:{JSON.stringify(error)}
            </div>
        </main>
    );

    return(
        <main className={clsx(
            "relative flex flex-1 flex-col items-center flex-start gap-1",
            "w-full h-full p-8",
            "md:px-20 md:py-2 lg:px-40 lg:py-4",
            theme === "dark" && "bg-zinc-950"
            )}
        >
            <section className={clsx(
                "w-full grid grid-cols-auto-fill-150 gap-2",
                "lg:grid-cols-auto-fill-200"
                )}
            >
                {data?
                    (data as IPokemonsQueryData).pokemons.results?.map(result=>{
                        return (
                            <article className={clsx(
                                "flex flex-col justify-start items-center relative z-30",
                                "px-4 py-1 h-40 rounded-md ",
                                )}
                                key={result.name}
                            >
                                <img
                                    src="/pokeball.svg"
                                    className={clsx(
                                        "absolute top-0 right-0 z-10 w-3/5 h-3/5",
                                        "invert opacity-20"
                                    )}
                                />
                            
                                <span className={clsx(
                                    "text-white text-sm font-semibold capitalize break-words",
                                    "z-30",
                                    )}
                                >
                                    {result.name}
                                </span>
                                <Link 
                                    href={"/pokemon/"+(
                                        (result.url.split('/')[result.url.split('/').length - 2])?
                                            (result.url.split('/')[result.url.split('/').length - 2])
                                            :
                                            "error"
                                        )}
                                    className="h-full w-auto z-30"
                                >
                                    <ImageWithFallback
                                        src={result.image}
                                        alt={result.name}
                                        width={256}
                                        height={256}
                                        style={{ height: '100%', width: '100%' }}       
                                        onLoad={(e)=>catchPredominantColor(e)}                 
                                    />
                                </Link>
                            </article>
                        )
                    })
                    :
                    <></>
                }
            </section>
        </main>
    );

}