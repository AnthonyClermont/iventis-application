import { NextRequest, NextResponse } from "next/server";

export interface PokemenAbilityDetails {
    name: string;
    effects: string[];
}

export interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    stats: {
        hp: number;
        attack: number;
        defense: number;
    };
    abilities: PokemenAbilityDetails[];
}

async function fetchAbilityDetails(abilityUrl: string): Promise<PokemenAbilityDetails> {
    try {
        const response = await fetch(abilityUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch ability details from URL: ${abilityUrl}`);
        }
        
        const data = await response.json();

        const englishEffectEntries = data.effect_entries.filter((effect: any) => effect.language.name === "en");
        const effects = englishEffectEntries.map((effect: any) => effect.effect);

        return {
            name: data.name,
            effects: effects[0]
        };
    
    } catch (error) {
        throw new Error(`Error fetching ability details: ${error}`);
    }
}

async function mapJsonToPokemonDetails(data: any): Promise<PokemonDetails> {
    const abilityDetails: PokemenAbilityDetails[] = [];

    for (const ability of data.abilities) {
        try {
            const abilityData = await fetchAbilityDetails(ability.ability.url);
            abilityDetails.push(abilityData);
        }
        
        catch (error) {
            console.error(`Error fetching ability details: ${error}`);
        }
    }

    const details: PokemonDetails = {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        stats: {
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
          },
        abilities: abilityDetails
    };

    return details;
}

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const params = new URLSearchParams(url.searchParams);
        
        const id = params.get('id');
        const res = await fetch(`${id}`);

        if (!res.ok) {
            throw new Error('Failed to fetch data from PokeAPI');
        }
    
        const data = await res.json();
        const mappedData: PokemonDetails = await mapJsonToPokemonDetails(data);

        const response = NextResponse.json(mappedData, { status: 200 });
        response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=59');

        return response;

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}