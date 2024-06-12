"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useFolderListContext } from "@/providers/folder-list-provider";
import ApiService from "@/services/api-service";
import { Folder } from "@/types/types";

interface FolderEditProps {
  params: {
    folder: Folder;
  };
}

export const FolderEdit = ({ params }: FolderEditProps) => {
  const [inputValue, setInputValue] = useState("");
  const { folders, setFolders } = useFolderListContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleTitlePut = async () => {
    try {
      await ApiService.put("/folders/putFolderTitle", {
        folderId: params.folder.folderId,
        title: inputValue,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveButtonClick = () => {
    setFolders((prevFolders) =>
      prevFolders.map((Folder) =>
        Folder.folderId === params.folder.folderId
          ? { ...Folder, title: inputValue }
          : Folder
      )
    );
    handleTitlePut();
    setInputValue("");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="px-2 py-1 mx-4 text-sm" variant="outline">
          <EditIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Change folder name</DropdownMenuLabel>
        <div className="p-2 flex flex-col gap-2">
          <Input
            placeholder={params.folder.title}
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button variant="outline" onClick={handleSaveButtonClick}>
            Save
          </Button>
        </div>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
