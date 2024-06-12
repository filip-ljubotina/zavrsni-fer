import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusBadge from "./status-bage";
import { Device, Status } from "@/types/types";

interface DeviceStatusProps {
  setDevice: React.Dispatch<React.SetStateAction<any>>;
}

export const DeviceStatus = ({ setDevice }: DeviceStatusProps) => {
  function stringToStatus(str: string): Status | undefined {
    switch (str.toLowerCase()) {
      case "active":
        return Status.Active;
      case "not_active":
        return Status.Not_Active;
      case "in_service":
        return Status.In_Service;
      default:
        return undefined;
    }
  }

  const handleStatusChange = (value: string) => {
    const newStatus = stringToStatus(value);
    setDevice((prevDevice: Device | null) => {
      if (!prevDevice) return null;
      return {
        ...prevDevice,
        status: newStatus!,
      };
    });
  };

  return (
    <Card x-chunk="dashboard-07-chunk-3">
      <CardHeader className="items-start pb-3">
        <CardTitle>Device Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3 ">
            <div>
              <StatusBadge />
            </div>
            <Select onValueChange={handleStatusChange}>
              <SelectTrigger id="status" aria-label="Select status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="not_active">Not Active</SelectItem>
                <SelectItem value="in_service">In Service</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceStatus;
