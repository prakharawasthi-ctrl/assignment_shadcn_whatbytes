"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DateRangePicker() {
  const [date, setDate] = React.useState<Date>(new Date())
  const [preset, setPreset] = React.useState("7d")

  const presets = [
    { label: "Last 7 days", value: "7d" },
    { label: "Last 30 days", value: "30d" },
    { label: "Last 90 days", value: "90d" },
  ]

  return (
    <div className="flex items-center gap-2">
      <Select value={preset} onValueChange={setPreset}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {presets.map((p) => (
            <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className={cn("w-[240px] justify-start text-left font-normal")}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(date, "PPP")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  )
}
