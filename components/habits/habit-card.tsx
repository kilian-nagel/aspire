"use client";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card"
import Image from 'next/image'
import {resolver} from "@/lib/image-resolver";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {HabitEvent, dispatchHabitEvent} from "@/handlers/habits-reducer";
import {habitStore} from "@/store/habitsStore";
import {Check} from 'lucide-react';
import {X} from "lucide-react";
import {Habit, HabitCategory} from "@/models/habits/habits.types";

interface props extends Habit {
    completed?: boolean;
    no_complete_action?: boolean
    edit_habit_function: Function;
    categoryObject: HabitCategory;
}

export function HabitCard({id, name, description, categoryObject, edit_habit_function, completed, no_complete_action}: props) {
    const img_source = resolver(categoryObject.name);
    const load_habits = habitStore((store) => store.loadData);

    const handle_action = async (event: HabitEvent.delete | HabitEvent.uncomplete | HabitEvent.complete, habit_id: number) => {
        try {
            await dispatchHabitEvent({event: event, data: {id: habit_id}});
            load_habits();
        } catch (e) {

        }
    }

    return (
        <div className="relative group">
            <Card className="h-full cursor-pointer transition-all duration-300 hover:bg-white/5 relative overflow-hidden">
                {completed && !no_complete_action && (
                    <div className="absolute w-full h-full bg-black/50 flex items-center justify-center text-white text-lg font-bold">
                    </div>
                )}

                <CardHeader>
                    <div className="flex gap-2 justify-between">
                        <div className="flex gap-5 items-center">
                            <Image src={img_source} width={40} height={40} alt="Picture of the author" />
                            <div>
                                <CardTitle>{name}</CardTitle>
                                <CardDescription className="mt-1 transition-colors duration-300">
                                    {categoryObject.name}
                                </CardDescription>
                            </div>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost">...</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 flex flex-col">
                                <Button variant="ghost" onClick={() => edit_habit_function()}>
                                    Edit
                                </Button>
                                <Button variant="ghost" onClick={() => handle_action(HabitEvent.delete, id)}>
                                    Delete
                                </Button>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardFooter>
                    {description}

                    {!no_complete_action ? <div>
                        {!completed ? (
                            <Button
                                onClick={() => handle_action(HabitEvent.complete, id)}
                                className="bg-blue-700 hover:bg-blue-700 text-3xl text-white group-hover:block hidden absolute right-2 bottom-2"
                            >
                                <Check />
                            </Button>
                        ) : (
                            <Button
                                onClick={() => handle_action(HabitEvent.uncomplete, id)}
                                className="bg-red-700 hover:bg-red-700 text-3xl text-white group-hover:block hidden absolute right-2 bottom-2"
                            >
                                <X size={24} color="white" />
                            </Button>
                        )}
                    </div> : <div></div>}
                </CardFooter>
            </Card>
        </div>

    );
}
