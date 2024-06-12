"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { FilterIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Device } from "@/types/types";
import { useDeviceContext } from "@/providers/device-provider";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData extends Device, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends Device, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const { setDevice } = useDeviceContext();
  const [selectedValue, setSelectedValue] = useState("all");
  const [searchColumnId, setSearchColumnId] = useState("deviceName");
  const [searchColumnName, setSearchColumnName] = useState("Device Name");
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const handleSelectChange = (event: string) => {
    const value = event;
    setSelectedValue(value);
    if (event === "all") {
      table.getColumn("status")?.setFilterValue(undefined);
    } else {
      table.getColumn("status")?.setFilterValue(event);
    }
  };

  const handleSearchSelectChange = (value: string) => {
    var words = value.split(/(?=[A-Z])/);
    var title = words
      ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setSearchColumnName(title!);
    setSearchColumnId(value);
  };

  return (
    <React.Fragment>
      <div className="flex items-center gap-3 py-4 sticky top-0 bg-white z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <SearchIcon className="mr-2 h-4 w-4" />
              Search {searchColumnName}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuRadioGroup
              value={searchColumnId}
              onValueChange={handleSearchSelectChange}
            >
              <DropdownMenuRadioItem value="deviceName">
                Device Name
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="inventoryNumber">
                Inventory Number
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="folderName">
                Folder Name
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          placeholder={"Search " + searchColumnName}
          value={
            (table.getColumn(searchColumnId)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchColumnId)?.setFilterValue(event.target.value)
          }
          className="max-w-64"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <FilterIcon className="mr-2 h-4 w-4" />
              Filter by Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuRadioGroup
              value={selectedValue}
              onValueChange={handleSelectChange}
            >
              <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="0">Active</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="1">
                Not Active
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="2">
                In Service
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onDoubleClick={() => {
                  setDevice(row.original);
                  router.push(`/dashboard/device/${row.original.deviceId}`);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center  space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </React.Fragment>
  );
}
