import {Skeleton} from "@/components/ui/skeleton"

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div>
            <div>
                <Skeleton className="h-12 w-[300px] md:w-[650px] rounded-md" />
                <div className="flex items-center mt-8 space-x-4">
                    {Array.from({length: 6}).map((_, i) => (
                        <Skeleton key={i} className="h-20 flex-1 rounded-md" />
                    ))}
                </div>
            </div>

            <div>
                <Skeleton className="h-12 mt-12 w-[300px] md:w-[650px] rounded-md" />
                <div className="flex flex-col gap-4 mt-4">
                    {Array.from({length: 2}).map((_, i) => (
                        <Skeleton key={i} className="w-full h-12 rounded-md" />
                    ))}
                </div>
            </div>
        </div>
    );
}
