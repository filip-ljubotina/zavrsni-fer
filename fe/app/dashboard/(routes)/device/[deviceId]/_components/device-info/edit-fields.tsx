"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Device } from "@/types/types";
import { Edit } from "lucide-react";
import { useState } from "react";

interface EditFieldsProps {
  setDevice: React.Dispatch<React.SetStateAction<any>>;
  type: "number" | "date" | "text";
  field: "deviceName" | "inventoryNumber" | "installationDate";
  device: Device;
}

export const EditFields = ({
  setDevice,
  field,
  type,
  device,
}: EditFieldsProps) => {
  const [newValue, setNewValue] = useState<any>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewValue(value);
  };

  const handleSave = async () => {
    setDevice((prevDevice: Device) => ({
      ...prevDevice,
      [field]: newValue,
    }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Edit className="h-4 w-4 text-muted-foreground cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Edit Field</DropdownMenuLabel>
        <div className="p-2 flex flex-col gap-2">
          <Input
            id={field}
            placeholder={String(device[field])}
            defaultValue={type === "date" ? String(device[field]) : ""}
            type={type}
            onChange={handleInputChange}
          />
          <Button variant="outline" onClick={handleSave}>
            Save
          </Button>
        </div>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditFields;
