'use client'

import Image from "next/image";
import { ThemeToggle } from "./ui/theme-toggle";
import { LanguageToggle } from "./ui/language-toggle";

export default function Header() {
    return (
        <div className='w-full py-10 px-2 md:px-0 gap-4 flex items-center'>
            <Image 
                src='/pokemonLogo.png'
                width={200}
                height={50}
                alt="Pokemon Logo"
            />

            <h1 className='hidden md:block font-bold text-2xl'>Iventis Assignment</h1>

            <div data-testid="toggle-div" className='ml-auto flex gap-2'>
                <ThemeToggle/>
                <LanguageToggle/>
            </div>
        </div>
    )
}