"use client"

import { OverviewCharts } from "@/components/charts"
import { MetricCards } from "@/components/metric-cards"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">Detailed analytics and insights</p>
      </div>
      <MetricCards />
      <OverviewCharts />
    </div>
  )
}
