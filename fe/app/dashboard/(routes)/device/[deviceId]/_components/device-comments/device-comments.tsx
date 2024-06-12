"use client";

import { useCallback, useEffect, useState } from "react";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Device } from "@/types/types";
import ApiService from "@/services/api-service";
import AddComment from "./add-comment";

interface DeviceCommentsProps {
  device: Device;
}

export const DeviceComments = ({ device }: DeviceCommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await ApiService.get(
        `/comments/getAllComentsByDeviceId/${device.deviceId}`
      );
      setComments(response.data);
    } catch (error) {
      alert("Something went wrong with fetchin folders.");
    }
  }, [device.deviceId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex flex-row items-center gap-8">
          <CardTitle>Comment&apos;s for {device?.deviceName}</CardTitle>
          <AddComment device={device} setComments={setComments} />
        </div>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-auto">
        <DataTable columns={columns} data={comments} />
      </CardContent>
    </Card>
  );
};

export default DeviceComments;
