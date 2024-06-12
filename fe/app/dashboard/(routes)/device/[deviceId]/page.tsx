"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DeviceStatus } from "./_components/device-status";
import { useDeviceContext } from "@/providers/device-provider";
import StatusBadge from "./_components/status-bage";
import DeviceInfo from "./_components/device-info/device-info";
import DeviceComments from "./_components/device-comments/device-comments";
import { DeviceDocumentation } from "./_components/device-documentation/device-documentation";
import CompaniesInfo from "./_components/companies-info/companies-info";
import DeviceImages from "./_components/device-images";
import { useEffect, useState } from "react";
import ApiService from "@/services/api-service";

interface DashboardProps {
  params: {
    deviceId: string;
  };
}

const Dashboard = ({ params }: DashboardProps) => {
  const router = useRouter();
  const { device, setDevice } = useDeviceContext();
  const [isEdited, setIsEdited] = useState<boolean | null>(null);

  useEffect(() => {
    if (isEdited !== null) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }
  }, [isEdited, device]);

  if (!device) {
    return <div>Loading...</div>;
  }

  const handleGoBack = () => {
    router.back();
  };

  const handleDelete = async () => {
    try {
      const response = await ApiService.delete(
        `/devices/deleteDeviceById/${device.deviceId}`
      );
      router.back();
    } catch (error) {
      alert("Not able to delete device.");
    }
  };

  const handleSave = async () => {
    try {
      const response = await ApiService.put("/devices/putDevice", device);
    } catch (error) {
      alert("Not able to save device.");
    }
  };

  return (
    <main className="flex flex-1 overflow-y-auto flex-col gap-4 p-4 lg:gap-6 lg:p-6 ">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={handleGoBack}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {device.deviceName}
          </h1>
          <StatusBadge />

          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              Delet Device
            </Button>
            {isEdited && (
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            )}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <DeviceComments device={device} />
            <DeviceDocumentation device={device} />
            <CompaniesInfo setDevice={setDevice} device={device} />
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <DeviceInfo setDevice={setDevice} device={device} />
            <DeviceImages setDevice={setDevice} device={device} />
            <DeviceStatus setDevice={setDevice} />
          </div>
        </div>
        {isEdited && (
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              Delet Device
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
