'use client'; 
import { gql, useQuery } from '@apollo/client';

export interface ICustomPokemonQueryData{
    pokemon: {
        message: string,
        id: number,
        name: string,
        weight: number, //dividir por 10
        height: number, //multiplicar por 10
        types: [{
            type: {
                name: string
            }     
        }],
        moves: [{
            move: {
                name: string
            }
        }],
        abilities: [{
            ability: {
                name: string
            }
        }],
        stats: [{
            stat: {        
                name: string
            }      
            base_stat: number   
        }]
    }
}

export function CustomGetPokemon(name: string | undefined) {

    const CUSTOM_GET_POKEMON = gql`
        query CUSTOM_GET_POKEMON($name: String!) {
            pokemon(name: $name) {
                message
                id
                name
                weight
                height
                sprites {
                    front_default
                }
                types {
                    type {
                        name
                    }     
                }
                moves {
                    move {
                        name
                    }
                }
                abilities {
                    ability {
                        name
                    }
                }
                stats {
                    stat {        
                        name
                    }      
                    base_stat      
                }
            }
        }
    `;

    const gqlVariables = {
        name: name,
    };

    const CustomGetPokemonQuery = useQuery(CUSTOM_GET_POKEMON, {
        variables: gqlVariables,
        fetchPolicy: 'cache-first',
        nextFetchPolicy: 'cache-only',
        //pollInterval: 500,
    });

    return CustomGetPokemonQuery;

}