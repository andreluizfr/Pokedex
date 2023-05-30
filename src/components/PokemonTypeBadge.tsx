import clsx from "clsx";
import Image from 'next/image';

export default function PokemonTypeBadge({type}: {type: string}){

    return (
        <div className={clsx(
            'flex flex-row justify-center items-center gap-[4px]',
            'py-[2px] px-3',
            'border border-solid border-opacity-50 rounded-2xl',
            type==="normal" && "border-orange-300",
            type==="fighting" && "border-red-600",
            type==="flying" && "border-violet-500",
            type==="poison" && "border-purple-600",
            type==="ground" && "border-yellow-600",
            type==="rock" && "border-yellow-700",
            type==="bug" && "border-lime-600",
            type==="ghost" && "border-indigo-900",
            type==="steel" && "border-slate-500",
            type==="fire" && "border-amber-600",
            type==="water" && "border-blue-500",
            type==="grass" && "border-green-600",
            type==="eletric" && "border-yellow-500",
            type==="psychic" && "border-pink-600",
            type==="ice" && "border-cyan-200",
            type==="dragon" && "border-violet-800",
            type==="dark" && "border-stone-800",
            type==="fairy" && "border-rose-400",
            type==="unknown" && "border-white",
            type==="shadow" && "border-gray-900",
            )}
        >
            <Image
                src={`/${type}-type.svg`}
                alt={`${type} type`}
                width={12}
                height={12}
            />
            <span className={clsx(
                'text-[11px] font-bold capitalize',
                type==="normal" && "text-orange-300",
                type==="fighting" && "text-red-600",
                type==="flying" && "text-violet-500",
                type==="poison" && "text-purple-600",
                type==="ground" && "text-yellow-600",
                type==="rock" && "text-yellow-700",
                type==="bug" && "text-lime-600",
                type==="ghost" && "text-indigo-900",
                type==="steel" && "text-slate-500",
                type==="fire" && "text-amber-600",
                type==="water" && "text-blue-500",
                type==="grass" && "text-green-600",
                type==="eletric" && "text-yellow-500",
                type==="psychic" && "text-pink-600",
                type==="ice" && "text-cyan-200",
                type==="dragon" && "text-violet-800",
                type==="dark" && "text-stone-800",
                type==="fairy" && "text-rose-400",
                type==="unknown" && "text-white",
                type==="shadow" && "text-gray-900",
                )}
            >
                {type}
            </span>
        </div>
    )
}