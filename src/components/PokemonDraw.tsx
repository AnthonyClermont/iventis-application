import { PokemenAbilityDetails, PokemonDetails } from "@/app/api/pokemon-details/route";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import Image from 'next/image'
import { Heart, Ruler, Shield, Sword, Weight } from "lucide-react";

interface PokemonDetailsSheetProps {
    pokemonDetails: PokemonDetails | null;
    isOpen: boolean;
    onOpenChange: () => void;
}

const PokemonDetailsDraw = ({ pokemonDetails, isOpen, onOpenChange }: PokemonDetailsSheetProps) => (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
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
                            <p className='text-2xl capitalize font-bold'>{pokemonDetails.name}</p>
                        </SheetTitle>
                    </SheetHeader>

                    <Image 
                        className='mx-auto'
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.id}.png`}
                        width={125}
                        height={125}
                        alt='pokemon image'
                    />

                    <div className='flex max-w-full flex-wrap gap-y-4 my-10 gap-x-12 justify-center'>
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

                    <div className='flex max-w-full flex-wrap gap-y-4 my-10 gap-x-12 justify-center'>
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

                    <div className='flex flex-col gap-4 sm:w-[80%] w-full mx-auto mt-6 pb-6'>
                        <h3 className='font-bolder underline underline-offset-4 text-xl mx-auto'>Abilities</h3>
                        <ul className='flex gap-8 flex-col'>
                            {pokemonDetails.abilities?.map((ability: PokemenAbilityDetails, index: number) => (
                                <li key={index}>
                                    <p className='font-bold'>{ability.name}</p>
                                    <p>{ability.effect}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}   
        </SheetContent>
    </Sheet>
);

export default PokemonDetailsDraw