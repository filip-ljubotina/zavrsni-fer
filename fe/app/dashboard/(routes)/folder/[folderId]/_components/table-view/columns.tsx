"use client";

import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "../status-bage";
import { Status, Device } from "@/types/types";
import { CompanyHoverCard } from "../company-hover-card";

export const columns: ColumnDef<Device>[] = [
  {
    accessorKey: "deviceName",
    header: "Device Name",
  },
  {
    accessorKey: "inventoryNumber",
    header: "Inventory Number",
    filterFn: (row, columnId, filterValue: string) => {
      const search = filterValue.toLowerCase();
      let value = row.getValue(columnId) as string;
      if (typeof value === "number") value = String(value);
      return value?.toLowerCase().includes(search);
    },
  },
  {
    accessorKey: "folderName",
    header: "Folder Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: Status = row.getValue("status");

      return <StatusBadge status={status} />;
    },
    filterFn: (row, columnId, filterValue: string) => {
      const search = filterValue.toLowerCase();
      let value = row.getValue(columnId) as string;
      if (typeof value === "number") value = String(value);
      return value?.toLowerCase().includes(search);
    },
  },
  {
    accessorKey: "serviceCompanyId",
    header: "Service Company",
    cell: ({ row }) => {
      const companyId: string = row.getValue("serviceCompanyId");

      return (
        <div className="w-auto ">
          <CompanyHoverCard companyId={companyId} />
        </div>
      );
    },
  },
  {
    accessorKey: "supplierCompanyId",
    header: "Supplier Company",
    cell: ({ row }) => {
      const companyId: string = row.getValue("supplierCompanyId");

      return (
        <div className="w-auto ">
          <CompanyHoverCard companyId={companyId} />
        </div>
      );
    },
  },
];
