import clsx from "clsx";

export default function AppFooter(){
    
    return(
        <footer className={clsx(
            "flex justify-center items-center",
            "w-full border-t border-gray-300 bg-black border-opacity-25",
            )}
        >
          <span className={clsx(
            "p-2 sm:p-2 md:p-3 lg:p-4",
            "text-white first-line:text-xs font-normal align-middle",
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