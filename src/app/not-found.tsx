'use client';
import { useContext } from "react";
import clsx from "clsx";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function PageNotFound () {
    const theme = useContext(ThemeContext);

    return (
        <main className={clsx(
            "flex-1 flex flex-col items-center justify-center",
            theme==="dark" && "bg-zinc-950" 
            )}
        >
            <h2 className={clsx(
                "text-4xl text-black",
                theme==="dark" && "text-white"
                )}
             >
                Page Not Found 😢
            </h2>
            <h3 className={clsx(
                "my-4 text-sm text-black",
                theme==="dark" && "text-white"
                )}
             >
                Stop trying to break it pls
            </h3>
        </main>
    )
}