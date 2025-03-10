"use client"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {LayoutDashboard, FileCode, User, ChevronRight, MessageCircle} from "lucide-react"
import {useSidebar} from "@/components/ui/sidebar"
import {Tables} from "@/models/database.types";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

// Navigation items with icons
const navigationItems = [
    {
        title: "Habits",
        href: "/habits",
        icon: LayoutDashboard,
    },
    {
        title: "Stats",
        href: "/stats",
        icon: FileCode,
    },
    {
        title: "Community",
        href: "/community",
        icon: MessageCircle,
    },
]

export function AppSidebar({user}: {user: Omit<Tables<'users'>, 'created_at'>}) {
    const pathname = usePathname()
    const {toggleSidebar} = useSidebar()

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" onClick={toggleSidebar}>
                            <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-muted-foreground text-white">
                            </div>
                            <div className="flex flex-col gap-0.5 leading-none">
                                <span className="font-semibold">Aspire</span>
                                <span className="text-xs text-muted-foreground">Social Platform</span>
                            </div>
                            <ChevronRight className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigationItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                                        <Link href={item.href}>
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-gray-800 text-gray-400">
                                <User className="size-4" />
                            </div>
                            <div className="flex flex-col gap-0.5 leading-none">
                                <span className="font-medium">{user?.username ?? 'guest'}</span>
                                <span className="text-xs text-muted-foreground">{user?.email ?? ''}</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}


