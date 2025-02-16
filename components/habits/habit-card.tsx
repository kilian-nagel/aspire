"use client";
import {Tables} from "@/models/database.types"
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


let habit: Tables<'habits'>;
export function HabitCard({id, name, description, category, edit_habit_function, completed}: typeof habit) {
    const img_source = resolver(category.name);
    const set_habits = habitStore((store) => store.setHabits);
    const load_habits = habitStore((store) => store.loadData);
    const habits = habitStore((store) => store.habits);

    const handle_action = async (event: HabitEvent, data: typeof habit) => {
        try {
            await dispatchHabitEvent(event, data);
            if (event === HabitEvent.delete) {
                let habits_filtered = habits.filter(h => h.id !== data.id);
                set_habits(habits_filtered);
            }
            load_habits();
        } catch (e) {

        }
    }

    return (
        <div className="relative group">
            <Card className="h-full cursor-pointer transition-all duration-300 hover:bg-white/5 relative overflow-hidden">
                {completed && (
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
                                    {category.name}
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
                                <Button variant="ghost" onClick={() => handle_action(HabitEvent.delete, {id})}>
                                    Delete
                                </Button>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardFooter>
                    {description}

                    {!completed ? (
                        <Button
                            onClick={(e) => {
                                handle_action(HabitEvent.complete, {id});
                            }}
                            className="bg-blue-700 hover:bg-blue-700 text-3xl text-white group-hover:block hidden absolute right-2 bottom-2"
                        >
                            <Check />
                        </Button>
                    ) : (
                        <Button
                            onClick={(e) => {
                                handle_action(HabitEvent.uncomplete, {id});
                            }}
                            className="bg-red-700 hover:bg-red-700 text-3xl text-white group-hover:block hidden absolute right-2 bottom-2"
                        >
                            <X size={24} color="white" />
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>

    );
}
