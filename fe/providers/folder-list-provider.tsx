// Folder-list-context.js
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Folder } from "@/types/types";

interface FolderListProviderProps {
  children: ReactNode;
}

interface FolderListContextType {
  activeId: string | null;
  setActiveId: Dispatch<SetStateAction<string | null>>;
  folders: Folder[] | null;
  setFolders: Dispatch<SetStateAction<Folder[] /* | null */>>;
}

const FolderListContext = createContext<FolderListContextType | null>(null);

export const FolderListProvider = ({ children }: FolderListProviderProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);

  return (
    <FolderListContext.Provider
      value={{ activeId, setActiveId, folders, setFolders }}
    >
      {children}
    </FolderListContext.Provider>
  );
};

export const useFolderListContext = () => {
  const context = useContext(FolderListContext);
  if (context === null) {
    throw new Error(
      "useFolderListContext must be used within a FolderListProvider"
    );
  }
  return context;
};
