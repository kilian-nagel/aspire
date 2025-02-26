import {Message} from "@/components/form-message";
import {SubmitButton} from "@/components/submit-button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Link from "next/link";
import {FormMessage} from "@/components/form-message";
import {signUpAction} from "@/app/actions";

export async function SignupForm(props: {searchParams: Message}) {
    return (
        <form className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create a new account</h1>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" name="username" type="text" placeholder="John doe" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required />
                </div>
                <SubmitButton formAction={signUpAction} pendingText="Signing up...">
                    Sign up
                </SubmitButton>
            </div>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/sign-in" className="underline underline-offset-4">
                    Sign in
                </Link>
            </div>
            <FormMessage message={props.searchParams} />
        </form>
    )
}

