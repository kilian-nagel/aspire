import type React from "react"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"

interface ChartContainerProps {
    children: React.ReactNode
    config: any
}

export const ChartContainer: React.FC<ChartContainerProps> = ({children, config}) => {
    return <div className="w-full">{children}</div>
}

interface ChartTooltipProps {
    content: React.ReactNode
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({content}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div></div>
                </TooltipTrigger>
                <TooltipContent>{content}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

interface ChartTooltipContentProps {
    labelFormatter: (value: any) => string
    valueFormatter: (value: any) => string
}

export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({labelFormatter, valueFormatter}) => {
    return (
        <div className="px-2 py-1">
            <div>{labelFormatter ? labelFormatter("label") : "Label"}</div>
            <div>{valueFormatter ? valueFormatter("value") : "Value"}</div>
        </div>
    )
}



