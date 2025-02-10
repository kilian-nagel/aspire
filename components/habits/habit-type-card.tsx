
import * as React from "react"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import clsx from 'clsx';

interface props {
    id: number,
    name: string,
    description: string,
    on_click_function: Function,
    selected: boolean
}

export function HabitTypeCard({id, name, description, on_click_function, selected}: props) {
    return (
        <Card onClick={() => on_click_function(id)} className={clsx("w-[350px] cursor-pointer transition-colors duration-300 hover:bg-blue-700 hover:border-blue-700 hover:text-white group", {"bg-blue-700 border-blue-700": selected})}>

            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription className={clsx("transition-colors duration-300 group-hover:text-white", {"text-white": selected})}>{description}</CardDescription>
            </CardHeader>
        </Card>)
}
