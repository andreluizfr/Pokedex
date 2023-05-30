import { useContext } from "react";
import clsx from "clsx";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function AppFooter(){

    const theme = useContext(ThemeContext);
    
    return(
        <footer className={clsx(
            "flex justify-center items-center",
            "w-full border-t border-gray-300",
            theme==="light" && "bg-gray-200 border-opacity-100",
            theme==="dark" && " bg-black border-opacity-25",
            )}
        >
          <span className={clsx(
            "p-2 sm:p-2 md:p-4 lg:p-6",
            "text-xs font-normal align-middle",
            theme==="light" && "text-black",
            theme==="dark" && "text-white",
            )}
          >
            {"Made by "}
            <a 
              href="https://github.com/andreluizfr" 
              target="blank" 
              className={clsx(
                "text-sky-600 underline decoration-sky-600 cursor-pointer",
              )}
            >
              github.com/andreluizfr
            </a>
          </span>
        </footer>
    )
}