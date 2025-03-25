"use client";
import * as React from "react"
import {useState} from "react";
import {clsx} from "clsx";
import {HabitCreate, HabitFrequencyCreate} from "@/models/habits/habits.types";
import {HabitTypeCard} from "@/components/habits/habit-type-card";
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {motion} from "framer-motion";
import {Button} from "@/components/ui/button";
import {create} from "zustand";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {addHabit} from "@/models/habits/habits.service";
import {userStore} from "@/store/userStore";
import {useToast} from "@/hooks/use-toast"
import {DialogClose} from "@/components/ui/dialog";
import {habitStore} from "@/store/habitsStore";
import {Tables} from "@/models/database.types"
import {Habit} from "@/models/habits/habits.types";

let HabitFrequency: Tables<'habitFrequency'>;
interface props {
    habits_type: Tables<'habitCategory'>[],
    habit: Habit | null
}

// Data store.
const useStepStore = create<{step: number; next: () => void; prev: () => void; reset: () => void}>((set) => ({
    step: 0,
    next: () => set((state) => ({step: state.step + 1})),
    prev: () => set((state) => ({step: Math.max(state.step - 1, 0)})),
    reset: () => set({step: 0}),
}));

const steps_length = 3;

// Jours de l'année
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function get_days_from_index(frequency: typeof HabitFrequency[]): string[] {
    // On récupère les index des jours ou doit être répétée l'habitude.
    const days_index: number[] = frequency.reduce<number[]>((data, freq) => {
        data.push(freq.day); return data;
    }, [])

    // On récupère les jours sous forme de tableau de string à partir des index.
    return days_index.reduce<string[]>((data, index) => {
        data.push(days[index]); return data;
    }, []);
}

export function HabitForm({habits_type, habit}: props) {
    console.log(habit);
    const {step, next, prev, reset} = useStepStore();
    const [badges_selected, set_badges_selected] = useState<string[]>(habit && habit?.frequency ? get_days_from_index(habit?.frequency) : []);
    const [category_id, set_category_id] = useState<number>(habit ? habit.category : 0);
    const [habit_name, set_habit_name] = useState(habit ? habit.name : "");
    const [habit_description, set_habit_description] = useState(habit ? habit.description : "");
    const user_store = userStore();
    const {toast} = useToast();


    const load_data = habitStore((store) => store.loadData);

    // Lorsqu'on clique sur un jour on le rajoute dans le tableau des jours sélectionnés, sinon si le jour est déjà sélectionné on le supprime des jours sélectionnés.
    const handle_days_click = (id: string) => {
        set_badges_selected((prev) =>
            prev.includes(id) ? prev.filter(badge => badge !== id) : [...prev, id]
        );
    };

    // On ajoute l'habitude lorsque le formulaire est validé
    const handle_form_validation = async () => {
        let user_id = user_store?.user?.id;
        let habit_id = habit ? habit.id : undefined;

        // On récupère les données nécessaires pour l'habitude
        const habit_data: HabitCreate = {id: -1, description: habit_description, name: habit_name, user_id: user_id ?? "", category: category_id};


        if (habit_id) habit_data.id = habit_id;

        // On récupère les fréquences des habitudes.  
        let frequencies: HabitFrequencyCreate[] = badges_selected.reduce<HabitFrequencyCreate[]>((data, day) => {
            // Pour chaque jour sélectionnée on récupère son index, et on met une période de 1 (car se répète toutes les semaine).
            data.push({day: days.indexOf(day), period: 1, id: -1});
            return data
        }, []);

        habit_data.frequency = frequencies;

        try {
            // On ajoute l'habitude dans la bd
            await addHabit(habit_data);
            load_data();
            let description = habit ? "Habit modified successfully" : "Habit created successfully";
            toast({title: "Success", description: description})
        } catch (err) {
            let description = habit ? "Failed to modify habit" : "Failed to create habit";
            toast({title: "Failure", description: description})
        }

        reset();
    }

    return (
        <div className="w-full mx-auto p-6 rounded-lg shadow-md">
            <motion.div
                key={step}
                initial={{opacity: 0, x: 100}}
                animate={{opacity: 1, x: 0}}
                exit={{opacity: 0, x: -100}}
                transition={{duration: 0.7}}
                className="text-lg text-center w-full"
            >

                {/* TYPE D'HABITUDE (catégorie) */}
                {step === 0 ? <>
                    <h1 className="mb-10 text-3xl font-semibold">What type of habit do you want to build?</h1>
                    <div className="flex gap-3 flex-wrap">
                        {habits_type.map((habit, i) => (<HabitTypeCard selected={category_id === habit.id} on_click_function={(id: number) => set_category_id(id)} key={i} {...habit} />))}
                    </div></> : (<></>)
                }

                {/* FREQUENCE DE L'HABITUDE */}
                {step === 1 ? <>
                    <h1 className="mb-10 text-3xl font-semibold">How often do you want to track this habit?</h1>

                    <div className="flex gap-2 justify-center">
                        {days.map((day, i) => <Badge onClick={() => handle_days_click(day)} key={i} className={clsx("cursor-pointer hover:bg-blur-700 text-lg px-3 py-1 font-normal", {"bg-blue-700": badges_selected.includes(day)})} variant="secondary">{day}</Badge>)}
                    </div>
                </> : <></>
                }

                {/* DESCRIPTION DE L'HABITUDE (nom, description, difficulté) */}
                {step === 2 ? <>
                    <h1 className="text-3xl font-semibold">Give your habit a name and a short description.</h1>
                    <p className="mb-10 text-muted-foreground">Give a clear and descriptive name</p>

                    <div className="mx-auto grid grid-cols-2 gap-10 max-w-3xl">

                        {/* NOM DE L'HABITUDE */}
                        <div className="flex flex-col items-start gap-1">
                            <Label className="text-lg" htmlFor="name">Name</Label>
                            <Input id="name" onChange={(e) => set_habit_name(e.target.value)} value={habit_name} placeholder="Enter a name" className="mt-1" />
                        </div>

                        {/* DIFFICULTE */}
                        <div className="flex flex-col items-start gap-1">
                            <Label className="text-lg" htmlFor="name">Difficulty level</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a difficulty" />
                                </SelectTrigger>
                                <SelectContent className="w-full">
                                    <SelectGroup>
                                        <SelectItem value="easy">Easy</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="hard">Hard</SelectItem>
                                        <SelectItem value="impossible">Impossible</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* DESCRIPTION */}
                        <div className="flex flex-col items-start gap-1 cols-span-2">
                            <Label className="text-lg" htmlFor="description">Description</Label>

                            <Textarea id="description" value={habit_description ?? undefined} onChange={(e) => {set_habit_description(e.target.value)}} placeholder="Enter a description" className="mt-1" />
                        </div>
                    </div>
                </> : <></>
                }
            </motion.div>

            <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={prev} disabled={step === 0}>
                    Previous
                </Button>

                {/* ON AFFICHE */}
                {step < steps_length - 1 ? (
                    <Button onClick={next}>Next</Button>
                ) : (
                    <DialogClose asChild>
                        <Button onClick={handle_form_validation}>Submit</Button>
                    </DialogClose>
                )}
            </div>
        </div>
    );
}



