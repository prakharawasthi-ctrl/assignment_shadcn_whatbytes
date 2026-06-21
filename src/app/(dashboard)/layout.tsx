"use client"

import * as React from "react"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { MobileSidebar } from "@/components/mobile-sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="hidden lg:flex">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </aside>

      <MobileSidebar open={mobileOpen} onOpenChange={setMobileOpen} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
