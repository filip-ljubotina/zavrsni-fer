"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Comment } from "@/types/types";

export const columns: ColumnDef<Comment>[] = [
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => {
      const comment: string = row.getValue("comment");
      return <div className="break-words max-w-60">{comment}</div>;
    },
  },
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "commentDate",
    header: "Date",
    cell: ({ row }) => {
      const date: string = row.getValue("commentDate");
      return <div className="w-auto whitespace-nowrap">{date}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type: string = row.getValue("type");
      return <Badge variant="default">{type}</Badge>;
    },
  },
];
