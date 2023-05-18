'use client'; 
import { gql, useQuery } from '@apollo/client';

export interface IPokemonsQueryData{
    pokemons: {
        count: number;
        next: string;
        previous: string;
        status: string;
        message: string;
        results: [{
            url: string;
            name: string;
            image: string;
        }];
    }
}

export function GetPokemons(limit: number ,offset: number) {

    const GET_POKEMONS = gql`
        query pokemons($limit: Int, $offset: Int) {
            pokemons(limit: $limit, offset: $offset) {
                count
                next
                previous
                status
                message
                results {
                    url
                    name
                    image
                }
            }
        }
    `;

    const gqlVariables = {
        limit: limit,
        offset: offset,
    };

    const GetPokemonsQuery = useQuery(GET_POKEMONS, {
        variables: gqlVariables,
        fetchPolicy: 'cache-first',
        nextFetchPolicy: 'cache-only',
        //pollInterval: 500,
    });

    return GetPokemonsQuery;

}