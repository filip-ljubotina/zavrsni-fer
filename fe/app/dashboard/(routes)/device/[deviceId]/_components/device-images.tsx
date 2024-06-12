"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fileToByteArray, generateImageSrc } from "@/lib/image-utils";
import { Device } from "@/types/types";
import { Upload } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";

interface DeviceImageProps {
  device: Device;
  setDevice: React.Dispatch<React.SetStateAction<any>>;
}

export const DeviceImages = ({ device, setDevice }: DeviceImageProps) => {
  const [imageSrc, setImageSrc] = useState<any>(
    device.deviceImage
      ? generateImageSrc(device.deviceImage, "image/jpeg")
      : "/device-stock.jpg"
  );
  const handleFileInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const byteArray = await fileToByteArray(file);
      const imageSrc = generateImageSrc(byteArray, "image/jpeg");
      setDevice((prevDevice: Device) => ({
        ...prevDevice!,
        deviceImage: byteArray!,
      }));
      setImageSrc(imageSrc);
    } catch (error) {
      console.error("Error converting file to byte array:", error);
    }
  };

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
      <CardHeader>
        <CardTitle>Device Image</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Image
            alt="Product image"
            className="aspect-square w-full rounded-md object-cover"
            height="300"
            src={imageSrc}
            width="300"
          />
          <div className="grid grid-cols-3 gap-2">
            {/* <button>
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src="/ZOLL-R-SERIES.jpg"
                width="84"
              />
            </button>
            <button>
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src="/ZOLL-R-SERIES.jpg"
                width="84"
              />
            </button> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Upload</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60">
                <DropdownMenuLabel>Add new folder</DropdownMenuLabel>
                <div className="p-2 flex flex-col gap-2">
                  <Input
                    id="deviceImage"
                    onChange={handleFileInputChange}
                    type="file"
                    className="col-span-3"
                  />
                </div>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceImages;
