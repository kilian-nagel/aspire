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

let habit: Tables<'habits'>;
export function HabitCard({id, name, description, category}: typeof habit) {
    const img_source = resolver(category.name);
    const set_habits = habitStore((store) => store.setHabits);
    const habits = habitStore((store) => store.habits);

    const handle_action = async (event: HabitEvent, data: typeof habit) => {

        try {
            dispatchHabitEvent(event, data);
            if (event === HabitEvent.delete) {
                let habits_filtered = habits.filter(h => h.id !== data.id);
                set_habits(habits_filtered);
            }
        } catch (e) {

        }
    }

    return (<Card className="cursor-pointer">
        <CardHeader>
            <div className="flex gap-2 justify-between">
                <div className="flex gap-5 items-center">
                    <Image
                        src={img_source}
                        width={40}
                        height={40}
                        alt="Picture of the author"
                    />
                    <div>
                        <CardTitle>{name}</CardTitle>
                        <CardDescription className="mt-1 transition-colors duration-300 group-hover:text-white">{category.name}</CardDescription>
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">...</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 flex flex-col">
                        <Button variant="ghost" onClick={() => handle_action(HabitEvent.update, {name, description, category})}>Edit</Button>
                        <Button variant="ghost" onClick={() => handle_action(HabitEvent.delete, {id})}>Delete</Button>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </CardHeader>
        <CardFooter>
            {description}
        </CardFooter>
    </Card>)
}
