'use client'; 
import { useContext } from "react";
import clsx from "clsx";
import { ThemeContext } from "@/contexts/ThemeContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PokemonsPageLoading (){

    const theme = useContext(ThemeContext);

    return(
        <SkeletonTheme baseColor="#414141" highlightColor="#626262">
            <main className={clsx(
                "relative flex flex-1 flex-col items-center flex-start gap-1",
                "w-full h-full pt-[12px] pb-4 px-4",
                "sm:px-24 md:px-44 lg:px-60",
                theme === "dark" && "bg-zinc-950"
                )}
            >
                
                <section className={clsx(
                    "w-full grid grid-cols-auto-fill-100-fr gap-2",
                    "lg:grid-cols-auto-fill-150-fr"
                    )}
                >
                    {(new Array(36)).fill(36).map(result=>{
                        return (
                            <article className={clsx(
                                "h-20 min-w-[100px] z-30 rounded-sm drop-shadow-lg",
                                "lg:min-w-[150px]",
                                )}
                            >   
                                <Skeleton className="h-full"/>
                            </article>
                        )
                    })}
                </section>

                <div className="h-3 w-40 m-4">
                    <Skeleton className="h-full"/> 
                </div>

            </main>
        </SkeletonTheme>
    );

}