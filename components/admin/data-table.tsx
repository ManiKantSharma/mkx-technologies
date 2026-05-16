"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LucideIcon, Search } from "lucide-react"

export type Column<T> = {
  header: string
  accessorKey?: keyof T
  cell?: (item: T) => React.ReactNode
  className?: string
}

type PaginationData = {
  page: number
  totalPages: number
  limit: number
  total: number
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  pagination?: PaginationData
  onPageChange?: (page: number) => void
  emptyMessage?: string
  emptyIcon?: LucideIcon
  searchPlaceholder?: string
  onSearchChange?: (value: string) => void
}

export function DataTable<T>({
  columns,
  data,
  loading = false,
  pagination,
  onPageChange,
  emptyMessage = "No data found",
  emptyIcon: EmptyIcon = Search,
  searchPlaceholder,
  onSearchChange
}: DataTableProps<T>) {
  return (
    <div className="space-y-4">
      {searchPlaceholder && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-sm"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>
      )}

      <div className="rounded-md border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns.map((column, i) => (
                <TableHead key={i} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {columns.map((_, j) => (
                    <TableCell key={j}>
                      <div className="h-6 w-full animate-pulse rounded bg-muted/50" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <EmptyIcon className="h-10 w-10 text-muted-foreground/30" />
                    <p className="text-muted-foreground">{emptyMessage}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, i) => (
                <TableRow key={i} className="hover:bg-accent/5 transition-colors group">
                  {columns.map((column, j) => (
                    <TableCell key={j} className={column.className}>
                      {column.cell
                        ? column.cell(item)
                        : column.accessorKey
                          ? (item[column.accessorKey] as React.ReactNode)
                          : null
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
          </div>
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (pagination.page > 1) onPageChange?.(pagination.page - 1)
                  }}
                />
              </PaginationItem>
              {(() => {
                const totalPages = pagination.totalPages
                const currentPage = pagination.page
                const delta = 2 // Number of pages to show on each side of current page
                const range = []
                
                for (let i = 1; i <= totalPages; i++) {
                  if (
                    i === 1 || 
                    i === totalPages || 
                    (i >= currentPage - delta && i <= currentPage + delta)
                  ) {
                    range.push(i)
                  } else if (range[range.length - 1] !== '...') {
                    range.push('...')
                  }
                }

                return range.map((p, i) => (
                  <PaginationItem key={i}>
                    {p === '...' ? (
                      <span className="px-3 py-2 text-muted-foreground text-sm">...</span>
                    ) : (
                      <PaginationLink
                        href="#"
                        isActive={currentPage === p}
                        onClick={(e) => {
                          e.preventDefault()
                          onPageChange?.(p as number)
                        }}
                      >
                        {p}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))
              })()}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (pagination.page < pagination.totalPages) onPageChange?.(pagination.page + 1)
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

        </div>
      )}
    </div>
  )
}
