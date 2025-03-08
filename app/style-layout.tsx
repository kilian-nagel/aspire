import HeaderAuth from "@/components/header-auth";
import {ThemeSwitcher} from "@/components/theme-switcher";
import Link from "next/link";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster"
import {ThemeProvider} from "next-themes";

export default function StyleLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <main className="min-h-screen flex flex-col items-center">
                <div className="flex-1 w-full flex flex-col gap-20 items-center">
                    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                            <div className="flex gap-5 items-center font-semibold">
                                <Link href={"/"}>Aspire</Link>
                            </div>

                            <HeaderAuth />
                        </div>
                    </nav>
                    <div className="flex flex-col gap-20 w-full max-w-5xl p-5">
                        {children}
                        <Toaster />
                    </div>

                    <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                        <ThemeSwitcher />
                    </footer>
                </div>
            </main>
        </ThemeProvider>
    )
}
