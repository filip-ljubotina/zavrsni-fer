"use client";

import { Device, Folder } from "@/types/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Status } from "@/types/types";
import { ChangeEvent, useState } from "react";
import { fileToByteArray } from "@/lib/image-utils";
import { useCompaniesInfoContext } from "@/providers/companies-provider";
import { getCurrentDateFormatted } from "@/services/date-service";
import ApiService from "@/services/api-service";

interface StatusBadgeProps {
  folder: Folder;
  setDevices: React.Dispatch<React.SetStateAction<any>>;
}

interface NewDevice {
  deviceName: string;
  deviceImage: Array<any>;
  folderId: string;
  inventoryNumber: number;
  status: Status;
  serviceCompanyId: string;
  supplierCompanyId: string;
}

export const AddNewDevice = ({ folder, setDevices }: StatusBadgeProps) => {
  const [newDevice, setNewDevice] = useState<NewDevice>({
    deviceName: "",
    deviceImage: [],
    folderId: folder.folderId,
    inventoryNumber: 0,
    status: Status.Active,
    serviceCompanyId: "",
    supplierCompanyId: "",
  });
  const { companiesInfo } = useCompaniesInfoContext();

  const handleFileInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const byteArray = await fileToByteArray(file);
      setNewDevice((prevNewDevice) => ({
        ...prevNewDevice!,
        deviceImage: byteArray!,
      }));
    } catch (error) {
      console.error("Error converting file to byte array:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewDevice((prevNewDevice) => ({
      ...prevNewDevice!,
      [id]: value!,
    }));
  };

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
    setNewDevice((prevNewDevice) => ({
      ...prevNewDevice!,
      status: newStatus!,
    }));
  };

  const handleCompanyInputChange = (id: string, value: string) => {
    setNewDevice((prevNewDevice) => ({
      ...prevNewDevice!,
      [id]: value!,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await ApiService.post(
        "/devices/postNewDevice",
        newDevice
      );

      setDevices((prevDevices: Device[]) => [...prevDevices, response.data]);
    } catch (error) {
      alert("Not able to add device.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Device</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Device</DialogTitle>
          <DialogDescription>
            Enter information about the device.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deviceName" className="text-right">
              Device Name
            </Label>
            <Input
              id="deviceName"
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="inventoryNumber" className="text-right">
              Inventory Number
            </Label>
            <Input
              id="inventoryNumber"
              onChange={handleInputChange}
              type="number"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input
              id="location"
              defaultValue={folder.title}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="installationDate" className="text-right">
              Installation Date
            </Label>
            <Input
              id="installationDate"
              type="date"
              defaultValue={getCurrentDateFormatted()}
              className="col-span-3"
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deviceImage" className="text-right">
              Device Image
            </Label>
            <Input
              id="deviceImage"
              onChange={handleFileInputChange}
              type="file"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select onValueChange={handleStatusChange}>
              <SelectTrigger
                id="status"
                aria-label="Select status"
                className="w-max"
              >
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="not_active">Not Active</SelectItem>
                <SelectItem value="in_service">In Service</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="supplierCompany" className="text-right">
              Supplier Company
            </Label>
            <Select
              onValueChange={(value) =>
                handleCompanyInputChange("supplierCompanyId", value)
              }
            >
              <SelectTrigger
                id="supplierCompany"
                aria-label="Select Supplier Company"
                className="w-max"
              >
                <SelectValue placeholder="Select Supplier Company" />
              </SelectTrigger>
              <SelectContent>
                {companiesInfo?.map((company) => (
                  <SelectItem key={company.companyId} value={company.companyId}>
                    {company.companyName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceCompany" className="text-right">
              Service Company
            </Label>
            <Select
              onValueChange={(value) =>
                handleCompanyInputChange("serviceCompanyId", value)
              }
            >
              <SelectTrigger
                id="serviceCompany"
                aria-label="Select Service Company"
                className="w-max"
              >
                <SelectValue placeholder="Select Service Company" />
              </SelectTrigger>
              <SelectContent>
                {companiesInfo?.map((company) => (
                  <SelectItem key={company.companyId} value={company.companyId}>
                    {company.companyName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewDevice;
