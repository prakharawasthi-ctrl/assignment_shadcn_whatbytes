"use client"

import * as React from "react"
import { MetricCards } from "@/components/metric-cards"
import { OverviewCharts } from "@/components/charts"
import { DataTable } from "@/components/data-table"
import { DateRangePicker } from "@/components/date-range-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Your dashboard overview and key metrics</p>
        </div>
        <DateRangePicker />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <MetricCards />
          <OverviewCharts />
          <DataTable />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-6">
          <MetricCards />
          <OverviewCharts />
        </TabsContent>
        <TabsContent value="reports" className="space-y-6">
          <DataTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
