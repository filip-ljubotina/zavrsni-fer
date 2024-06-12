"use client";

import { Device } from "@/types/types";
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
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { fileToByteArray } from "@/lib/image-utils";
import ApiService from "@/services/api-service";

interface AddDocumentProps {
  device: Device;
  setDocuments: React.Dispatch<React.SetStateAction<any>>;
}

interface NewDocument {
  documentName: string;
  description: string;
  unit8array: number[];
  deviceId: string;
}

export const AddDocument = ({ device, setDocuments }: AddDocumentProps) => {
  const [newDocument, setNewDocument] = useState<NewDocument>({
    documentName: "",
    description: "",
    unit8array: [],
    deviceId: device.deviceId,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setNewDocument((prevNewDocument) => ({
      ...prevNewDocument!,
      [id]: value!,
    }));
  };

  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const byteArray = await fileToByteArray(file);
      setNewDocument((prevNewDevice) => ({
        ...prevNewDevice!,
        unit8array: byteArray!,
      }));
    } catch (error) {
      console.error("Error converting file to byte array:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await ApiService.post(
        "/documents/postNewDocument",
        newDocument
      );
      setDocuments((prevDocument: Document[]) => [
        ...prevDocument,
        response.data,
      ]);
    } catch (error) {
      alert("Not able to add new comment.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Document</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Document</DialogTitle>
          <DialogDescription>
            Upload the document and its information.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="documentName" className="text-right">
              Document Name
            </Label>
            <Input
              id="documentName"
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              onChange={handleInputChange}
            ></Textarea>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deviceImage" className="text-right">
              Device Image
            </Label>
            <Input
              id="deviceImage"
              onChange={handleFileInputChange}
              type="file"
              className="col-span-3"
            />
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

export default AddDocument;
