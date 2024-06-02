'use client'

import Image from "next/image";
import { ThemeToggle } from "./ui/theme-toggle";
import { LanguageToggle } from "./ui/language-toggle";
import { useEffect, useState } from "react";

export default function Header() {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const logoWidth = windowWidth <= 400 ? 125 : 175;
    const logoHeight = windowWidth <= 768 ? 20 : 50;

    return (
        <div className='w-full py-10 px-2 md:px-0 gap-4 flex items-center'>
            <Image 
                src='/pokemonLogo.png'
                width={logoWidth}
                height={logoHeight}
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