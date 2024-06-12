"use client";

interface DocumentListProps {
  folderId: string;
  folderTitle: string;
  onClick: (folderId: string) => void;
}

export const FolderItem = ({
  folderId,
  folderTitle,
  onClick,
}: DocumentListProps) => {
  return (
    <span
      id={folderId}
      className="cursor-pointer"
      onClick={() => onClick(folderId)}
    >
      {folderTitle}
    </span>
  );
};
