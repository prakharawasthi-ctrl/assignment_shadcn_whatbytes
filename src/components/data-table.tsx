"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, ChevronsUpDown, Download, Filter, RefreshCw } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Sale {
  id: string
  customer: string
  email: string
  product: string
  amount: number
  status: "completed" | "pending" | "failed"
  date: string
}

const salesData: Sale[] = [
  { id: "INV-001", customer: "Alice Johnson", email: "alice@example.com", product: "Pro Plan", amount: 299.00, status: "completed", date: "2026-06-20" },
  { id: "INV-002", customer: "Bob Smith", email: "bob@example.com", product: "Basic Plan", amount: 99.00, status: "pending", date: "2026-06-19" },
  { id: "INV-003", customer: "Carol White", email: "carol@example.com", product: "Enterprise", amount: 999.00, status: "completed", date: "2026-06-19" },
  { id: "INV-004", customer: "David Brown", email: "david@example.com", product: "Pro Plan", amount: 299.00, status: "failed", date: "2026-06-18" },
  { id: "INV-005", customer: "Eve Davis", email: "eve@example.com", product: "Basic Plan", amount: 99.00, status: "completed", date: "2026-06-18" },
  { id: "INV-006", customer: "Frank Wilson", email: "frank@example.com", product: "Enterprise", amount: 999.00, status: "pending", date: "2026-06-17" },
  { id: "INV-007", customer: "Grace Lee", email: "grace@example.com", product: "Pro Plan", amount: 299.00, status: "completed", date: "2026-06-17" },
  { id: "INV-008", customer: "Henry Taylor", email: "henry@example.com", product: "Basic Plan", amount: 99.00, status: "completed", date: "2026-06-16" },
  { id: "INV-009", customer: "Ivy Martinez", email: "ivy@example.com", product: "Enterprise", amount: 999.00, status: "failed", date: "2026-06-16" },
  { id: "INV-010", customer: "Jack Anderson", email: "jack@example.com", product: "Pro Plan", amount: 299.00, status: "pending", date: "2026-06-15" },
]

type SortKey = keyof Sale
type SortDir = "asc" | "desc" | null

export function DataTable() {
  const [sortKey, setSortKey] = React.useState<SortKey | null>(null)
  const [sortDir, setSortDir] = React.useState<SortDir>(null)
  const [currentPage, setCurrentPage] = React.useState(1)
  const pageSize = 5

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortDir === "asc") {
        setSortDir("desc")
      } else if (sortDir === "desc") {
        setSortKey(null)
        setSortDir(null)
      }
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const sorted = React.useMemo(() => {
    if (!sortKey || !sortDir) return salesData
    return [...salesData].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1
      return 0
    })
  }, [sortKey, sortDir])

  const totalPages = Math.ceil(sorted.length / pageSize)
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <ChevronsUpDown className="ml-1 h-3 w-3" />
    return sortDir === "asc" ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Recent Sales</h2>
          <p className="text-sm text-muted-foreground">A list of recent transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-1 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-1 h-4 w-4" /> Download
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-1 h-4 w-4" /> Refresh
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
                <div className="flex items-center">Invoice <SortIcon column="id" /></div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("customer")}>
                <div className="flex items-center">Customer <SortIcon column="customer" /></div>
              </TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("amount")}>
                <div className="flex items-center">Amount <SortIcon column="amount" /></div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                <div className="flex items-center">Status <SortIcon column="status" /></div>
              </TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">{sale.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{sale.customer}</div>
                    <div className="text-xs text-muted-foreground">{sale.email}</div>
                  </div>
                </TableCell>
                <TableCell>{sale.product}</TableCell>
                <TableCell>${sale.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      sale.status === "completed" ? "default" :
                      sale.status === "pending" ? "secondary" : "destructive"
                    }
                  >
                    {sale.status}
                  </Badge>
                </TableCell>
                <TableCell>{sale.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, sorted.length)} of {sorted.length} entries
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
