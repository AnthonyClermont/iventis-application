"use client"

import * as React from "react"
import { Languages, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
                <Languages className='h-[1rem] w-[1rem]'/>
            </Button>
        </DropdownMenuTrigger>
      
        <DropdownMenuContent align="end">
            <DropdownMenuItem>
                English
            </DropdownMenuItem>
        
            <DropdownMenuItem>
                Yoda 👽
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
