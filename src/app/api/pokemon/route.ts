import { NextRequest, NextResponse } from "next/server";


export type Pokemon = {
    name: string;
    url: string;
};

type PokeApiResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
};

// intentionally stop all pokemon getting fetched (limits to 60) and stops recusive function call
const forceNonRecursive = true;

async function getAllPokemon(url: string, allResults: Pokemon[] = []): Promise<Pokemon[]> {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('Failed to fetch data from PokeAPI');
    }

    const data: PokeApiResponse = await res.json();
    allResults.push(...data.results);

    if (data.next && !forceNonRecursive) {
        return getAllPokemon(data.next, allResults);
    } else {
        return allResults;
    }
}

export async function GET() {
    try {
        const initialUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=60';
        const allPokemon = await getAllPokemon(initialUrl);

        const response = NextResponse.json(allPokemon, { status: 200 });
        response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=59');

        return response;

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}