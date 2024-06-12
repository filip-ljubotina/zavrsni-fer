"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Device } from "@/types/types";
import { BarcodeIcon } from "lucide-react";
import EditFields from "./edit-fields";
import EditLocation from "./edit-location";

interface DeviceInfoProps {
  device: Device;
  setDevice: React.Dispatch<React.SetStateAction<any>>;
}

export const DeviceInfo = ({ setDevice, device }: DeviceInfoProps) => {
  return (
    <Card className="w-full gap max-w-md">
      <CardHeader className="grid p-6">
        <div className="flex flex-row items-center justify-center gap-3">
          <h3 className="text-2xl font-bold">{device?.deviceName}</h3>
          <EditFields
            setDevice={setDevice}
            device={device}
            field={"deviceName"}
            type={"text"}
          />
        </div>
        <div className="pt-2">
          <div className="flex items-center gap-2">
            <BarcodeIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            <span className="font-normal">{device.inventoryNumber}</span>
            <EditFields
              setDevice={setDevice}
              device={device}
              field={"inventoryNumber"}
              type={"number"}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className=" space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 dark:text-gray-400">Location:</p>
          <div className="flex flex-row items-center justify-center gap-2">
            <p className="font-medium">{device.folderName}</p>
            <EditLocation device={device} setDevice={setDevice} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-500 dark:text-gray-400">Installation Date:</p>
          <div className="flex flex-row items-center justify-center gap-2">
            <p className="font-medium text-nowrap">{device.installationDate}</p>
            <EditFields
              setDevice={setDevice}
              device={device}
              field={"installationDate"}
              type={"date"}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceInfo;
