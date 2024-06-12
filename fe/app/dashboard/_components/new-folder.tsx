"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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

interface FolderEditProps {
  parentFolderId?: string;
}

interface NewFolder {
  title: string;
  parentFolderId?: string | null;
}

export const NewFolder = ({ parentFolderId }: FolderEditProps) => {
  const [newFolder, setNewFolder] = useState<NewFolder>({
    title: "",
    parentFolderId: parentFolderId ? parentFolderId : null,
  });
  const { folders, setFolders } = useFolderListContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewFolder((prevUserData) => ({
      ...prevUserData,
      [id]: value,
    }));
  };

  const handleNewFolder = async () => {
    try {
      const response = await ApiService.post(
        "/folders/postNewFolder",
        newFolder
      );
      setFolders((prevFolders) => [...prevFolders, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {parentFolderId === undefined ? (
          <div
            className={
              "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium"
            }
          >
            <Plus />
            <span id="new-folder" className="cursor-pointer">
              Add Folder
            </span>
          </div>
        ) : (
          <Plus className="h-4 w-4 text-muted-foreground" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Add new folder</DropdownMenuLabel>
        <div className="p-2 flex flex-col gap-2">
          <Input
            id="title"
            placeholder={"Folder name"}
            onChange={handleInputChange}
          />
          <Button variant="outline" onClick={handleNewFolder}>
            Save
          </Button>
        </div>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
