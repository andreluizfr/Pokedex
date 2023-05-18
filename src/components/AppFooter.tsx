import { useContext } from "react";
import clsx from "clsx";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function AppFooter(){

    const theme = useContext(ThemeContext);
    
    return(
        <footer className={clsx(
            "flex justify-center items-center",
            "w-full border-t border-gray-300 border-opacity-50",
            theme==="white" && "bg-white",
            theme==="dark" && "bg-black border-opacity-0"
            )}
        >
            <div className={clsx(
              "relative place-items-center",
              "p-2 sm:p-4 md:p-6 lg:p-8"
              )}    
            >
              <span className={clsx(
                "inline",
                "text-xs text-black font-normal",
                theme==="dark" && "text-white"
                )}
              >
                Made by{" "}
                <a 
                  href="https://github.com/andreluizfr" 
                  target="blank" 
                  className={clsx(
                    "text-sky-800 underline decoration-sky-800 cursor-pointer",
                    theme=="dark" && "text-sky-600 decoration-sky-600"
                  )}
                >
                  github.com/andreluizfr
                </a>
              </span>
            </div>
            
        </footer>
    )
}