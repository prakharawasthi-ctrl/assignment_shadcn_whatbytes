"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BarChart3, FileText, Bell, Settings, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface MobileSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const navItems = [
  { href: "/overview", label: "Overview", icon: LayoutDashboard, active: true },
  { href: "/analytics", label: "Analytics", icon: BarChart3, active: true },
  { href: "/reports", label: "Reports", icon: FileText, active: true },
  { href: "/notifications", label: "Notifications", icon: Bell, active: false },
  { href: "/settings", label: "Settings", icon: Settings, active: false },
]

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="flex h-14 flex-row items-center justify-between border-b px-4">
          <SheetTitle className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5" />
            <span>AcmeCo</span>
          </SheetTitle>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.active ? item.href : "#"}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
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
        <div className="p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">john@example.com</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
