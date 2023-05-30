import * as Switch from '@radix-ui/react-switch';
import clsx from 'clsx';
import { ThemeContext } from '@/contexts/ThemeContext';
import { Dispatch, SetStateAction, useContext } from 'react';

export default function ThemeSwitch({ setTheme }: { setTheme: Dispatch<SetStateAction<string>> }) {

  const theme = useContext(ThemeContext);

  function switchTheme(checked: boolean) {
    console.log(checked);
    if (checked) setTheme('dark');
    else setTheme('light');
  }

  return (
    <div className={clsx(
      'flex items-center justify-between'
    )}>
      <label className={clsx(
        "pr-3",
        "text-sm text-black",
        theme==="dark" && "text-white"
      )}
        htmlFor="theme-mode"
      >
        Theme mode
      </label>
      
      <Switch.Root className={clsx(
        "relative inline-flex items-center w-[44px] h-[24px] rounded-full",
        "bg-slate-500 checked:bg-slate-200",
        "shadow",
        "transition-colors duration-200 ease-in-out",
        "cursor-pointer"
      )}
        id="theme-mode"
        onCheckedChange={switchTheme}
        checked={(theme==="dark")?true:false}
      >
        <Switch.Thumb className={clsx(
          "inline-block w-5 h-5 rounded-full",
          "bg-white checked:bg-black",
          "shadow",
          "transform translate-x-[1px] checked:translate-x-[22px]",
          "transition duration-200 ease-in-out"
          )}
        />
      </Switch.Root>
    </div>
  );
}