"use client"

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const revenueData = [
  { name: "Jan", revenue: 4000, profit: 2400 },
  { name: "Feb", revenue: 3000, profit: 1398 },
  { name: "Mar", revenue: 2000, profit: 9800 },
  { name: "Apr", revenue: 2780, profit: 3908 },
  { name: "May", revenue: 1890, profit: 4800 },
  { name: "Jun", revenue: 2390, profit: 3800 },
  { name: "Jul", revenue: 3490, profit: 4300 },
]

const userActivityData = [
  { name: "Mon", users: 400 },
  { name: "Tue", users: 300 },
  { name: "Wed", users: 550 },
  { name: "Thu", users: 480 },
  { name: "Fri", users: 600 },
  { name: "Sat", users: 200 },
  { name: "Sun", users: 150 },
]

const trafficSourceData = [
  { name: "Direct", value: 35, color: "var(--color-chart-1)" },
  { name: "Organic", value: 25, color: "var(--color-chart-2)" },
  { name: "Social", value: 20, color: "var(--color-chart-3)" },
  { name: "Referral", value: 15, color: "var(--color-chart-4)" },
  { name: "Email", value: 5, color: "var(--color-chart-5)" },
]

export function OverviewCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="md:col-span-4">
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bar">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="bar">Bar</TabsTrigger>
                <TabsTrigger value="line">Line</TabsTrigger>
              </TabsList>
            </div>
            <div className="mt-4">
              <Tabs value="bar" />
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="var(--color-chart-1)" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="profit" stroke="var(--color-chart-2)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trafficSourceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {trafficSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-7 lg:col-span-4">
        <CardHeader>
          <CardTitle>Weekly User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userActivityData}>
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="users" fill="var(--color-chart-3)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-7 lg:col-span-3">
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userActivityData}>
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="var(--color-chart-1)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
