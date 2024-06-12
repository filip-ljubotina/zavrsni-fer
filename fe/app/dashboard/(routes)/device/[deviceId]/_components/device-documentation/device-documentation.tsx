import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Device, Document } from "@/types/types";
import { FileIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import AddDocument from "./add-document";
import ApiService from "@/services/api-service";

interface DeviceDocumentationProps {
  device: Device;
}

export const DeviceDocumentation = ({ device }: DeviceDocumentationProps) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const fetchDocuments = useCallback(async () => {
    try {
      const response = await ApiService.get(
        `/documents/getAllDocumentsByDeviceId/${device.deviceId}`
      );
      setDocuments(response.data);
    } catch (error) {
      alert("Something went wrong with fetching documents.");
    }
  }, [device.deviceId]);

  const handleDownload = (fileDocument: Document) => {
    if (typeof fileDocument.unit8array === "string") {
      const byteCharacters = atob(fileDocument.unit8array);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileDocument.documentName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return (
    <Card className="w-full ">
      <CardHeader className="flex flex-row items-center gap-8">
        <CardTitle>Medical Device Documentation</CardTitle>
        <AddDocument device={device} setDocuments={setDocuments} />
      </CardHeader>
      <CardContent className="grid gap-6">
        {documents?.length === 0 ? (
          <div className="flex justify-center items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No documents available.
            </p>
          </div>
        ) : (
          documents?.map((document) => (
            <div
              key={document.documentId}
              className="flex items-start gap-4 hover:bg-gray-300 rounded-md cursor-pointer"
              onDoubleClick={() => handleDownload(document)}
            >
              <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-12 dark:bg-gray-800">
                <FileIcon className="w-6 h-6" />
              </div>
              <div className="grid gap-1">
                <h4 className="font-medium">{document.documentName}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {document.description}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
