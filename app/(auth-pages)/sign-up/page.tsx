import {Message} from "@/components/form-message";

import {GalleryVerticalEnd} from "lucide-react"
import {SignupForm} from "@/components/signup-form"

export default async function Page(props: {searchParams: Promise<Message>}) {
    const searchParams = await props.searchParams;
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        Aspire
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SignupForm searchParams={searchParams} />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src="/bg-snow.jpg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[.6]"
                />
            </div>
        </div>
    )
}
