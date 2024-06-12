"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Device } from "@/types/types";
import { Edit } from "lucide-react";
import { useState } from "react";
import { useCompaniesInfoContext } from "@/providers/companies-provider";

interface EditFieldsProps {
  setDevice: React.Dispatch<React.SetStateAction<any>>;
  device: Device;
  field: "supplierCompanyId" | "serviceCompanyId";
}

export const EditCompany = ({ setDevice, device, field }: EditFieldsProps) => {
  const [newValue, setNewValue] = useState<any>();
  const { companiesInfo } = useCompaniesInfoContext();

  const handleValueChange = (value: string) => {
    setNewValue(value);
  };

  const handleSave = () => {
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
        <DropdownMenuLabel>Edit Company</DropdownMenuLabel>
        <div className="p-2 flex flex-col gap-2">
          <Select onValueChange={(value) => handleValueChange(value)}>
            <SelectTrigger
              id="editLocation"
              aria-label="Edit Company"
              className="w-max"
            >
              <SelectValue placeholder="Edit Company" />
            </SelectTrigger>
            <SelectContent>
              {companiesInfo?.sort().map((company) => (
                <SelectItem key={company.companyId} value={company.companyId}>
                  {company.companyName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleSave}>
            Save
          </Button>
        </div>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditCompany;
