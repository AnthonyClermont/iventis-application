"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import Image from "next/image"

export enum Language {
    English = "English",
    Yoda = "Yoda"
}

export function LanguageToggle() {
    const [language, setLanguage] = useState<Language>(Language.English );

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language") as Language;
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }
    }, []);

    const handleLanguageChange = async (language: Language | string) => {
        setLanguage(language as Language);
        localStorage.setItem("language", language);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {language == Language.Yoda ? 
                        <Image 
                            src='/yodaEmoji.png'
                            width={25} 
                            height={25}
                            alt="Yoda"   
                        />
                    : 
                        <Image 
                            src='/engLang.png'
                            width={25} 
                            height={25}
                            alt="Yoda"   
                        />
                    }
                </Button>
            </DropdownMenuTrigger>
      
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => handleLanguageChange(Language.English)}>
                        English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLanguageChange(Language.Yoda)}>
                        Yoda 👽
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
