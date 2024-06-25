'use client'
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuOutlined } from '@ant-design/icons';
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from 'react';

const Navbar = () => {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <nav className="p-4 bg-black">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link href="/">
                        <p>Cash Tracker</p>
                    </Link>
                </div>
                <div className="space-x-4 flex">
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant={'secondary'}>
                                <MenuOutlined />
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="mx-auto w-full max-w-sm">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, non tempora iusto sunt quidem esse? Eos culpa quasi ratione placeat molestias sapiente velit quas provident ex enim magni, laudantium in.
                                Dolore rerum porro earum assumenda, neque pariatur tenetur ducim abo architecto maxime, accusamus similique illo nihil pariatur aspernatur possimus sunt! Soluta odio officia ducimus natus autem! Rem dolores saepe reprehenderit doloribus placeat.
                                Provident necessitatibus est magni ipsa error harum sunt dolorum asperiores ipsam modi, ea eum, perferendis dolores maxime. Nostrum, perspiciatis odit! Quod assumenda consequatur ducimus tempora sint modi, consectetur iure ipsa.
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
            <div className='container mx-auto flex flex-col justify-center items-center'>
                <h3>Overall balance</h3>
                <h1 className='text-4xl'>$ 9</h1>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"default"}
                            className={cn(
                                "w-[240px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus />
                    </PopoverContent>
                </Popover>

            </div>
        </nav>
    );
}

export default Navbar;
