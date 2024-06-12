"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight, FolderIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { FolderItem } from "./folder";
import { useFolderListContext } from "@/providers/folder-list-provider";
import { NewFolder } from "./new-folder";

interface Folder {
  folderId: string;
  title: string;
  icon: string;
  parentFolderId?: string;
}

interface FolderListProps {
  parentfolderId?: string;
  level?: number;
}

export const FolderList = ({ parentfolderId, level = 0 }: FolderListProps) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const { activeId, setActiveId, folders, setFolders } = useFolderListContext();

  const filteredFolders = folders?.filter((folder) => {
    if (parentfolderId === undefined) {
      return folder.parentFolderId === "null";
    } else {
      return folder.parentFolderId === parentfolderId;
    }
  });

  const toggleExpand = (folderId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [folderId]: !prevExpanded[folderId],
    }));
  };

  const navigateToFolder = (folderId: string) => {
    setActiveId(folderId);
    router.push(`/dashboard/folder/${folderId}`);
  };

  const onCreate = () => {};

  return (
    <div>
      {filteredFolders?.map((Folder) => (
        <div key={Folder.folderId}>
          <div
            style={{ paddingLeft: `${level * 20}px` }}
            className={cn(
              "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
              activeId === Folder.folderId ? "bg-primary/5 text-primary" : ""
            )}
          >
            {expanded[Folder.folderId] ? (
              <ChevronDown onClick={() => toggleExpand(Folder.folderId)} />
            ) : (
              <ChevronRight onClick={() => toggleExpand(Folder.folderId)} />
            )}
            <FolderIcon />
            <FolderItem
              folderId={Folder.folderId}
              folderTitle={Folder.title}
              onClick={navigateToFolder}
            />
            <div
              role="button"
              onClick={onCreate}
              className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
            >
              <NewFolder parentFolderId={Folder.folderId} />
            </div>
          </div>
          {expanded[Folder.folderId] && (
            <FolderList
              parentfolderId={Folder.folderId.toString()}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
};
