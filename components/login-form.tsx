import {Button} from "@/components/ui/button"
import {signInAction} from "@/app/actions";
import {Message} from "@/components/form-message";
import {SubmitButton} from "@/components/submit-button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Link from "next/link";
import {FormMessage} from "@/components/form-message";

export async function LoginForm(props: {searchParams: Message}) {
    return (
        <form className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link

                            className="ml-auto text-sm underline-offset-4 hover:underline"
                            href="/forgot-password"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <Input id="password" name="password" type="password" required />
                </div>
                <SubmitButton className="w-full" pendingText="Signing In..." formAction={signInAction}>
                    Sign in
                </SubmitButton>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
                <Button variant="outline" className="w-full">
                    Login with GitHub
                </Button>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="underline underline-offset-4">
                    Sign up
                </Link>
            </div>
            <FormMessage message={props.searchParams} />
        </form>
    )
}
