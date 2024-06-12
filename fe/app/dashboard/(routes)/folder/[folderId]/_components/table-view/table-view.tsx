"use client";

import { CardContent, Card } from "@/components/ui/card";
import { columns } from "./columns";
import { Device } from "@/types/types";

import { DataTable } from "./data-table";

interface TableViewProps {
  devices: Device[];
}

export const TableView = ({ devices }: TableViewProps) => {
  return (
    <Card className="w-full max-w-full">
      {/* <CardHeader>
        <CardTitle>Acme Medical Device</CardTitle>
      </CardHeader> */}
      <CardContent className="max-h-[400px] overflow-auto">
        <DataTable columns={columns} data={devices} />
      </CardContent>
    </Card>
  );
};

export default TableView;
