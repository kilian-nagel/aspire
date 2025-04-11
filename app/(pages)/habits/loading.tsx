import {Skeleton} from "@/components/ui/skeleton"

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div>
            <Skeleton className="h-12 w-[300px] md:w-[650px] rounded-md" />
            <div className="flex items-center mt-8 space-x-4">
                <Skeleton className="h-36 flex-1 rounded-md" />
                <Skeleton className="h-36 flex-1 rounded-md" />
                <Skeleton className="h-36 flex-1 rounded-md" />
            </div>
        </div>
    );
}
