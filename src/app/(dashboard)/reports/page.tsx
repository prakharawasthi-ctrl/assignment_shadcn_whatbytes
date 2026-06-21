"use client"

import { DataTable } from "@/components/data-table"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">View and export reports</p>
      </div>
      <DataTable />
    </div>
  )
}
