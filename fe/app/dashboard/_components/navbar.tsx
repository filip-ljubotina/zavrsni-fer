"use client";

import { FolderList } from "./folder-list";
import { Separator } from "@/components/ui/separator";
import { useFolderListContext } from "@/providers/folder-list-provider";
import ApiService from "@/services/api-service";
import { useCallback, useEffect } from "react";
import { NewFolder } from "./new-folder";

export const Navbar = () => {
  const { folders, setFolders } = useFolderListContext();

  const fetchFolders = useCallback(async () => {
    try {
      const response = await ApiService.get("/folders/getAllFolders");
      setFolders(response.data);
    } catch (error) {
      alert("Something went wrong with fetchin folders.");
    }
  }, [setFolders]);

  useEffect(() => {
    if (folders?.length === 0) {
      fetchFolders();
    }
  }, [fetchFolders, folders?.length]);

  if (folders?.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <NewFolder />
      <Separator className="m-3 py-0.1" />
      <FolderList />
    </nav>
  );
};
