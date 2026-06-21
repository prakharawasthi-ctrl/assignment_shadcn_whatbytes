import { DollarSign, Users, ShoppingCart, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const metrics = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+180.1%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Sales",
    value: "12,234",
    change: "+19%",
    changeType: "positive" as const,
    icon: ShoppingCart,
  },
  {
    title: "Active Now",
    value: "573",
    change: "+201",
    changeType: "positive" as const,
    icon: Activity,
  },
]

export function MetricCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={metric.changeType === "positive" ? "text-emerald-500" : "text-red-500"}>
                  {metric.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
