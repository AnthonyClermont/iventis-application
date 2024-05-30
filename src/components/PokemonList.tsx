'use client'

import { Pokemon } from '@/app/api/pokemon/route';
import { useState, useEffect } from 'react';
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from './ui/data-table';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Heart, Ruler, Shield, Sword, Weight } from 'lucide-react';
import { PokemenAbilityDetails, PokemonDetails } from '@/app/api/pokemon-details/route';
import { LanguageToggle } from './ui/language-toggle';
import { useToast } from './ui/use-toast';
import Image from 'next/image';
  

const columns: ColumnDef<Pokemon>[] = [
    {
        accessorKey: "index",
        header: "#",
        cell: (cell) => cell.row.index + 1,
        size: 1 
    },
    {
      accessorKey: "name",
      header: "Pokemon Name",
    },
]

export default function PokemonList() {
    const { toast } = useToast();
        
    const [pokemonData, setPokemonData] = useState<Pokemon[] | null>(null);
    const [clickedPokemon, setClickedPokemon] = useState<Pokemon | null>(null);
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);

    const handleUrlClick = ({ url, name }: {url: string, name: string}) => {
        setClickedPokemon({ name: name, url: url });
    }

    const nullifySelected = () => {
        setTimeout(() => {
            setPokemonDetails(null);
        }, 200);
        setClickedPokemon(null);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/pokemon');
                if (!response.ok) {
                    toast({
                        variant: "destructive",
                        title: "Oops something went wrong!",
                        description: "Failed to fetch pokemon data",
                    });
                }

                const data: Pokemon[] = await response.json();
                setPokemonData(data);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Oops something went wrong!",
                    description: "Failed to fetch pokemon data",
                });
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await fetch(`/api/pokemon-details?id=${encodeURIComponent(clickedPokemon!.url)}`);

                if (!response.ok) {
                    toast({
                        variant: "destructive",
                        title: "Oops something went wrong!",
                        description: "Error fetching Pokemon details",
                    });
                }
                const data: PokemonDetails = await response.json();
                setPokemonDetails(data);

            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Oops something went wrong!",
                    description: "Error fetching Pokemon details",
                });
            }
        };

        if (clickedPokemon) {
            fetchPokemonDetails();
        }
    }, [clickedPokemon]);

    return (
        <>
            {pokemonData === null ? (
                <div className='flex flex-col gap-2 py-32 w-full justify-center items-center'>
                    <span className="loader"></span>
                    Loading...
                </div>
            ) : (
                <div className='w-full px-4 xl:px-0 xl:w-2/3 mx-auto'>
                    <DataTable columns={columns} data={pokemonData} onUrlClick={handleUrlClick} />
                </div>
            )}

            <Sheet open={!!clickedPokemon} onOpenChange={nullifySelected}>
                <SheetContent className="w-full md:w-1/2 lg:w-2/5 !max-w-screen-2xl max-h-screen h-screen overflow-auto">
                    {pokemonDetails == null ? (
                        <div className='flex h-screen gap-2 flex-col w-full justify-center items-center'>
                            <span className="loader"></span>
                            Loading...
                        </div>
                    ) : (
                        <>
                            <SheetHeader>
                                <SheetTitle className='flex items-baseline justify-center mt-6 gap-2'>
                                    <small>#{pokemonDetails.id}</small>
                                    <h2 className='text-2xl capitalize font-bold'>{pokemonDetails.name}</h2>
                                </SheetTitle>
                            </SheetHeader>

                            <Image 
                                className='mx-auto'
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.id}.png`}
                                width={125}
                                height={125}
                                alt='pokemon image'
                            />

                            <div className='flex my-10 gap-x-12 justify-center'>
                                <span className='flex items-center gap-1'>
                                    <Ruler />
                                    Height:
                                    <p className='font-bold pl-2'>{pokemonDetails.height}</p>
                                </span>

                                <span className='flex items-center gap-1'>
                                    <Weight />
                                    Weight:
                                    <p className='font-bold pl-2'>{pokemonDetails.weight}</p>
                                </span>
                            </div>

                            <div className='flex my-10 gap-x-12 justify-center'>
                                <span className='flex items-center gap-1'>
                                    <Heart />
                                    <p className='font-bold pl-2'>{pokemonDetails.stats.hp}</p>
                                </span>

                                <span className='flex items-center gap-1'>
                                    <Sword />
                                    <p className='font-bold pl-2'>{pokemonDetails.stats.attack}</p>
                                </span>

                                <span className='flex items-center gap-1'>
                                    <Shield />
                                    <p className='font-bold pl-2'>{pokemonDetails.stats.defense}</p>
                                </span>
                            </div>

                            <div className='flex flex-col gap-4 w-[80%] mx-auto mt-6 pb-20'>
                                <h3 className='font-bolder underline underline-offset-4 text-xl mx-auto'>Abilities</h3>
                                <ul className='flex gap-8 flex-col'>
                                    {pokemonDetails.abilities?.map((ability: PokemenAbilityDetails, index: number) => (
                                        <li key={index}>
                                            <li className='font-bold'>{ability.name}</li>
                                            <li>{ability.effects}</li>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className='fixed right-10 bottom-6 bg-neutral-100 dark:bg-neutral-800 py-2 px-4 rounded-md'>
                                <span className='flex gap-4 items-center'>
                                    <p className='text-sm'>Try out Yoda language?</p>
                                    <LanguageToggle />
                                </span>
                            </div>
                        </>
                    )}   
                </SheetContent>
            </Sheet>
        </>
    );
}