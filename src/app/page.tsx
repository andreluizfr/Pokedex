'use client'; 
import Link from 'next/link';
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { ThemeContext } from "@/contexts/ThemeContext";

import { GetPokemons, IPokemonsQueryData } from "@/queries/GetPokemons";

import ImageWithFallback from "../components/ImageWithFallback";
import LoadingQuery from '@/components/LoadingQuery';
import PokemonsPageLoading from '@/components/PokemonsPageLoading';

import ColorThief from 'colorthief';

const MAX_IMAGES_LOADED = 36;

export default function PokemonsPage (){

    const theme = useContext(ThemeContext);

    const [imagesLoaded, setImagesLoaded] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const paginationIndexStyle = clsx(
      "text-[10px] text-black font-semibold",
      "hover:opacity-70 cursor-pointer",
      theme==="dark" && "text-white"
    );

    const paginationPointsStyle = clsx(
      "text-[10px] text-black font-semibold",
      theme==="dark" && "text-white"
    );
    
    const [page, setPage] = useState(1);

    const [pokemons, setPokemons] = useState<[{
      url: string,
      name: string,
      image: string
    }]>();

    const GetPokemonsQuery = GetPokemons(36, (page-1)*36); //(limit, offset)

    useEffect(()=>{
      setIsLoading(true);
      if(isLoading)
        GetPokemonsQuery.refetch();
    }, [page, isLoading]);

    useEffect(()=>{
        if(GetPokemonsQuery.data){
          console.log(GetPokemonsQuery.data);
          const data = GetPokemonsQuery.data as IPokemonsQueryData;
          setPokemons(data.pokemons.results);
        } 
    }, [GetPokemonsQuery.data]);

    useEffect(() => {
      const loadImage = (imageSrc: string) => {
        const image = new Image();
        image.onload = () => {
          setImagesLoaded(current=>current+1);
        };
        image.src = imageSrc;
      };
      
      if (pokemons) {
        pokemons.forEach((pokemon) => {
          loadImage(pokemon.image);
        });
      }
    }, [pokemons]);

    useEffect(() => {
      console.log("imagens carregadas...", imagesLoaded);
      if (page<36 && imagesLoaded === MAX_IMAGES_LOADED) {
        setIsLoading(false);
        setImagesLoaded(0);
      }
      else {
        setIsLoading(false);
        setImagesLoaded(0);
      }
    }, [imagesLoaded]);

    function catchPredominantColor(event: SyntheticEvent<HTMLImageElement, Event>){
        const pokemonImage = event.target as HTMLImageElement;
        const pokemonCard = pokemonImage.parentElement;

        let colorThief = new ColorThief();
        let color = colorThief.getColor(pokemonImage);

        if(pokemonCard){
            pokemonCard.style.cssText = "background-color: rgb("+color+")";
            console.log(pokemonImage.alt+"card color loaded");
        }
        else
            console.log(pokemonImage.alt+"card color failed");
    }

    if(GetPokemonsQuery.loading) return <LoadingQuery/>

    if(GetPokemonsQuery.error) return (
        <main className={clsx(
            "relative flex flex-1 flex-col items-center flex-start gap-1",
            "w-full h-full",
            "md:px-20 md:py-2 lg:px-40 lg:py-4",
            theme === "dark" && "bg-zinc-950"
        )}>
            <div className="flex-1 flex items-center justify-center">
                Error:{JSON.stringify(GetPokemonsQuery.error)}
            </div>
        </main>
    );

    if(isLoading) return <PokemonsPageLoading/>

    return(
        <main className={clsx(
            "relative flex flex-1 flex-col items-center flex-start gap-1",
            "w-full h-full p-4",
            "sm:px-24 md:px-44 lg:px-60",
            theme === "dark" && "bg-zinc-950"
            )}
        >
          <section className={clsx(
              "w-full grid grid-cols-auto-fill-100-fr gap-2",
              "lg:grid-cols-auto-fill-150-fr"
              )}
          >
            {pokemons?
                pokemons.map(result=>{
                    return (
                      <Link 
                        href={"/pokemon/"+result.name}
                        key={result.name}
                      >
                        <article className={clsx(
                            "flex flex-col justify-start items-center gap-1 relative z-30",
                            "px-2 py-1 h-[90px] rounded-sm drop-shadow-lg",
                            "hover:scale-[1.05] transition-transform"
                            )}
                        >
                            <img
                                src="/pokeball.svg"
                                className={clsx(
                                    "absolute top-0 right-0 z-10 w-3/5 h-3/5",
                                    "invert opacity-20"
                                )}
                            />

                            <span className={clsx(
                                "text-white text-[12px] font-extrabold capitalize text-center align-middle float-top",
                                "max-w-[90px] w-full overflow-hidden text-ellipsis whitespace-nowrap px-1 z-50",
                                )}
                                style={{WebkitTextStroke:"0.8px #000"}}
                            >
                                {result.name}
                            </span>
                            
                            <ImageWithFallback
                                src={result.image}
                                alt={result.name}
                                className="h-[60px] w-auto z-30"     
                                crossOrigin = "anonymous"
                                onLoad={(e)=>catchPredominantColor(e)}                 
                            />
                        </article>
                      </Link>
                    )
                })
                :
                <></>
            }
          </section>

          <div className="flex justify-center items-center gap-2 p-4">
            <span className={paginationIndexStyle} onClick={()=>setPage(actualPage=>actualPage-1)}>{"<<"}</span>
            {page>2 &&
            <span className={paginationIndexStyle} onClick={()=>setPage(1)}>1</span>
            }
            {page>3 &&
            <span className={paginationPointsStyle}>...</span>
            }

            {page>1 &&
            <span className={paginationIndexStyle} onClick={()=>setPage(page-1)}>{page-1}</span>
            }
            <span className="cursor-pointer text-sky-600 text-[10px] font-bold hover:opacity-70">{page}</span>
            {page<36 &&
            <span className={paginationIndexStyle} onClick={()=>setPage(page+1)}>{page+1}</span>
            }

            {page<34 &&
            <span className={paginationPointsStyle}>...</span>
            }
            {page<35 &&
            <span className={paginationIndexStyle} onClick={()=>setPage(36)}>36</span>
            }
            <span className={paginationIndexStyle} onClick={()=>setPage(actualPage=>actualPage+1)}>{">>"}</span>
          </div>

        </main>
    );

}