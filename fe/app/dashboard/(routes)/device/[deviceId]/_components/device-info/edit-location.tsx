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
import { useFolderListContext } from "@/providers/folder-list-provider";

interface EditFieldsProps {
  setDevice: React.Dispatch<React.SetStateAction<any>>;
  device: Device;
}

export const EditLocation = ({ setDevice, device }: EditFieldsProps) => {
  const [newFolderName, setNewFolderName] = useState<string | undefined>(
    device.folderName
  );
  const [newFolderId, setNewFolderId] = useState<string | undefined>(
    device.folderId
  );
  const { folders } = useFolderListContext();

  const handlefileInputChange = (id: string, value: string) => {
    setNewFolderId(id);
    setNewFolderName(value);
  };

  const handleSave = async () => {
    setDevice((prevDevice: Device) => ({
      ...prevDevice,
      folderId: newFolderId,
    }));
    setDevice((prevDevice: Device) => ({
      ...prevDevice,
      folderName: newFolderName,
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
          <Select
            onValueChange={(value) => {
              const valueArr = value.split("||");
              handlefileInputChange(valueArr[0], valueArr[1]);
            }}
          >
            <SelectTrigger
              id="editLocation"
              aria-label="Edit Location"
              className="w-max"
            >
              <SelectValue placeholder="Edit Location" />
            </SelectTrigger>
            <SelectContent>
              {folders?.sort().map((folder) => (
                <SelectItem
                  key={folder.folderId}
                  value={folder.folderId + "||" + folder.title}
                >
                  {folder.title}
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

export default EditLocation;
