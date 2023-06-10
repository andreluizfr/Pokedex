'use client'; 
import axios from 'axios';
import { useQuery } from 'react-query';
  
interface IPokemonQueryData{
    "base_happiness": number,
    "capture_rate": number,
    "flavor_text_entries": [{
        "flavor_text": string;
        "language": {
            "name": string,
            "url": string
        }
        "version": {
            "name": string,
            "url": string
        }
    }],
    "id": number,
    "name": string,
    "is_baby": boolean,
    "is_legendary": boolean,
    "is_mythical": false,
    "generation": {
        "name": string,
        "url": string,
    }
    "growth_rate": {
        "name": string,
        "url": string
    },
    "habitat": {
        "name": string,
        "url": string
    }
    "shape": {
        "name": string,
        "url": string
    }
}
  
export function GetPokemon(name: string | string[] | undefined) {

    const GetPokemonQuery = useQuery('GET_POKEMON', async ()=>{
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon-species/"+name);

        return response.data as IPokemonQueryData;
    })

    return GetPokemonQuery;

}