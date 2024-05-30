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
import PokemonDetailsDraw from './PokemonDraw';
  

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
            <PokemonDetailsDraw pokemonDetails={pokemonDetails} isOpen={!!clickedPokemon} onOpenChange={nullifySelected} />
        </>
    );
}