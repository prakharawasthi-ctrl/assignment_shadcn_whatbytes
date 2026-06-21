"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, LayoutDashboard, BarChart3, FileText, Bell, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const navItems = [
  { href: "/overview", label: "Overview", icon: LayoutDashboard, active: true },
  { href: "/analytics", label: "Analytics", icon: BarChart3, active: true },
  { href: "/reports", label: "Reports", icon: FileText, active: true },
  { href: "/notifications", label: "Notifications", icon: Bell, active: false },
  { href: "/settings", label: "Settings", icon: Settings, active: false },
]

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "flex flex-col border-r bg-sidebar-background text-sidebar-foreground transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className={cn("flex h-14 items-center border-b px-4", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed && (
            <div className="flex items-center gap-2 font-semibold">
              <LayoutDashboard className="h-5 w-5" />
              <span>AcmeCo</span>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={onToggle}>
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
            const Icon = item.icon

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.active ? item.href : "#"}
                      className={cn(
                        "flex h-10 w-full items-center justify-center rounded-md text-sm transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        !item.active && "pointer-events-none opacity-50"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.active ? item.href : "#"}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  !item.active && "pointer-events-none opacity-50"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <Separator />

        <div className={cn("p-3", collapsed && "flex justify-center")}>
          <div className={cn("flex items-center gap-3", collapsed && "flex-col")}>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">john@example.com</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  )
}
