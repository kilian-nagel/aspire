import {Skeleton} from "@/components/ui/skeleton"

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div>
            <Skeleton className="h-12 w-[300px] md:w-[650px] rounded-md" />

            <div>
                <div className="flex flex-col gap-4 mt-6">
                    {Array.from({length: 4}).map((_, i) => (
                        <div className="flex gap-5">
                            <Skeleton className="rounded-full w-20 h-20" />
                            <div className="flex-1 flex flex-col gap-2">
                                <Skeleton className="w-full h-12 rounded-md" />
                                <Skeleton className="w-[50%] h-8 rounded-md" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
