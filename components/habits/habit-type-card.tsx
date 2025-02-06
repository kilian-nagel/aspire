
import * as React from "react"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface props {
    id: number,
    name: string,
    description: string,
    on_click_function: Function
}

export function HabitTypeCard({id, name, description, on_click_function}: props) {
    return (
        <Card onClick={() => on_click_function(id)} className="w-[350px] cursor-pointer transition-colors duration-300 hover:bg-blue-700 hover:border-blue-700 hover:text-white group">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription className="transition-colors duration-300 group-hover:text-white">{description}</CardDescription>
            </CardHeader>
        </Card>)
}
