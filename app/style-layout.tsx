import HeaderAuth from "@/components/header-auth";
import {ThemeSwitcher} from "@/components/theme-switcher";
import Link from "next/link";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster"
import {ThemeProvider} from "next-themes";
import {SidebarProvider} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/sidebar"
import {SidebarInset} from "@/components/ui/sidebar"
import {createClient} from "@/utils/supabase/server"
import {getFullUser} from "@/models/users/users.service";
import {redirect} from "next/navigation";

export default async function Layout({children}: {children: React.ReactNode}) {
    const supabase = await createClient();
    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) redirect("/sign-in");
    const user_data = await getFullUser(user?.id);

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <main className="min-h-screen bg-[#09090b] flex flex-col items-center">
                <SidebarProvider>

                    <AppSidebar user={user_data} />
                    <SidebarInset>
                        <div className="flex-1 w-full flex flex-col gap-20 items-center">
                            <nav className="w-full flex justify-center h-16">
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
                            <footer className="w-full flex flex-col items-center justify-center border-t mx-auto text-center text-xs gap-4 py-16">
                                <ThemeSwitcher />
                                <div className="flex gap-3 justify-center">

                                    <Link href="/privacy-policy">privacy policy</Link>
                                    <Link href="/terms-and-conditions">terms and conditions</Link>
                                    <Link href="/cookies-policy">cookie policy</Link>
                                </div>
                            </footer>
                        </div>
                    </SidebarInset>
                </SidebarProvider>

            </main>
        </ThemeProvider>
    );
}
