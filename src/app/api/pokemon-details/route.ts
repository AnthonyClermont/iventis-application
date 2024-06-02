import { NextRequest, NextResponse } from "next/server";

enum Language {
    English = "English",
    Yoda = "Yoda"
}

export interface PokemenAbilityDetails {
    name: string;
    effect: string;
    rateLimited: boolean;
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

async function yodaTranslate(text: string) {
    const response = await fetch(`https://api.funtranslations.com/translate/yoda.json?text=${text}`);

    if (response.status == 429) {
        throw NextResponse.json({ message: 'Too many requests' }, { status: 429 });
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch yoda translation`);
    }

    const data = await response.json();
    return data.contents.translated;
}

async function fetchAbilityDetails(abilityUrl: string, language: Language): Promise<PokemenAbilityDetails> {
    const response = await fetch(abilityUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch ability details from URL: ${abilityUrl}`);
    }
    
    const data = await response.json();

    const englishEffectEntries = data.effect_entries.filter((effect: any) => effect.language.name === "en");
    const effects = englishEffectEntries.map((effect: any) => effect.effect);

    if (language == Language.Yoda) {
        try {
            const translatedEffect = await yodaTranslate(effects[0]);
            return {
                name: data.name,
                effect: translatedEffect,
                rateLimited: false
            };
        } catch (error) {
            if (error instanceof NextResponse) {
                console.error('Too many requests to Yoda translation API. Falling back to English effect.');
                return {
                    name: data.name,
                    effect: effects[0],
                    rateLimited: true
                };
            }
            throw error;
        }
    }

    return {
        name: data.name,
        effect: effects[0],
        rateLimited: false
    };
}

async function mapJsonToPokemonDetails(data: any, language: Language): Promise<PokemonDetails> {
    const abilityDetails: PokemenAbilityDetails[] = [];

    for (const ability of data.abilities) {
        const abilityData = await fetchAbilityDetails(ability.ability.url, language);
        abilityDetails.push(abilityData);
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
        const reqUrl = new URL(request.url);
        const params = new URLSearchParams(reqUrl.searchParams);
        
        const url = params.get('url');

        if(!url) {
            throw NextResponse.json({ message: 'URL search param not found'}, { status: 422 });
        }

        const res = await fetch(`${url}`);

        const language = params.get('language') as Language ?? Language.English;

        if (!res.ok) {
            return new Error('Failed to fetch data from PokeAPI');
        }
    
        const data = await res.json();
        const mappedData: PokemonDetails = await mapJsonToPokemonDetails(data, language);

        const response = NextResponse.json(mappedData, { status: 200 });
        response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=59');

        return response;

    } catch (error) {
        if (error instanceof NextResponse && error.status === 249) {
            return NextResponse.json({ message: 'Too many requests'}, { status: 429 });
        }
        
        return NextResponse.json({ message: error }, { status: 500 });
    }
}