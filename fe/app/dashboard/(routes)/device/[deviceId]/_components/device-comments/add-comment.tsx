"use client";

import { Comment, Device } from "@/types/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import ApiService from "@/services/api-service";
import { Textarea } from "@/components/ui/textarea";
import { getCurrentDateFormatted } from "@/services/date-service";

interface AddCommentProps {
  device: Device;
  setComments: React.Dispatch<React.SetStateAction<any>>;
}

interface NewComment {
  comment: string;
  commentDate: string;
  type: string;
  deviceId: string;
}

export const AddComment = ({ device, setComments }: AddCommentProps) => {
  const [newComment, setNewComment] = useState<NewComment>({
    comment: "",
    commentDate: getCurrentDateFormatted(),
    type: "",
    deviceId: device.deviceId,
  });

  const handleTypeChange = (value: string) => {
    setNewComment((prevNewComment) => ({
      ...prevNewComment!,
      type: value!,
    }));
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewComment((prevNewComment) => ({
      ...prevNewComment!,
      comment: event.target.value!,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await ApiService.post(
        "/comments/postNewComment",
        newComment
      );
      setComments((prevComment: Comment[]) => [...prevComment, response.data]);
    } catch (error) {
      alert("Not able to add new comment.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Comment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Comment</DialogTitle>
          <DialogDescription>
            Enter the comment and its information.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Comment Type
            </Label>
            <Select onValueChange={handleTypeChange}>
              <SelectTrigger
                id="type"
                aria-label="Select type"
                className="w-max"
              >
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alert">Alert</SelectItem>
                <SelectItem value="note">Note</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceCompany" className="text-right">
              Comment
            </Label>
            <Textarea
              className="col-span-3"
              onChange={handleTextareaChange}
            ></Textarea>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;
