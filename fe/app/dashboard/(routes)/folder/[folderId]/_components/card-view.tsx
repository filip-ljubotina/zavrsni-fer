import { Badge } from "@/components/ui/badge";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Device, Status } from "@/types/types";
import { CompanyHoverCard } from "./company-hover-card";
import { generateImageSrc } from "@/lib/image-utils";
import { useDeviceContext } from "@/providers/device-provider";

interface CardViewProps {
  devices: Device[];
}

export const CardView = ({ devices }: CardViewProps) => {
  const { setDevice } = useDeviceContext();
  const router = useRouter();

  const navigateToDevice = (deviceId: string) => {
    router.push(`/dashboard/device/${deviceId}`);
  };

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      {devices.map((device) => (
        <Grid key={device.deviceId}>
          <Card
            sx={{ width: 320 }}
            className="transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
            onDoubleClick={() => {
              setDevice(device);
              navigateToDevice(device.deviceId);
            }}
          >
            <div>
              <Typography level="title-lg">{device.deviceName}</Typography>
              <Typography level="body-sm">{device.inventoryNumber}</Typography>
              <Typography
                sx={{
                  position: "absolute",
                  top: "0.875rem",
                  right: "0.5rem",
                }}
                level="body-sm"
              >
                {device.folderName}
              </Typography>
            </div>
            <div className="flex-grow flex justify-center items-center h-60">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={
                    device.deviceImage
                      ? generateImageSrc(device.deviceImage, "image/jpeg")
                      : "/device-stock.jpg"
                  }
                  layout="fill"
                  objectFit="cover"
                  alt="Device Image"
                />
              </div>
            </div>
            <CardContent orientation="horizontal">
              <Badge
                className={
                  device.status === Status.Active
                    ? "bg-green-600"
                    : device.status === Status.In_Service
                    ? "bg-yellow-600"
                    : "bg-red-600"
                }
              >
                {device.status === Status.Active
                  ? "Active"
                  : device.status === Status.In_Service
                  ? "In Service"
                  : "Not Active"}
              </Badge>
            </CardContent>
            <CardContent
              orientation="horizontal"
              className="flex justify-between"
            >
              <div>
                <Typography level="body-xs">Service Company:</Typography>
                <Typography
                  fontSize="lg"
                  fontWeight="lg"
                  className="whitespace-nowrap"
                >
                  <CompanyHoverCard companyId={device.serviceCompanyId} />
                </Typography>
              </div>
              <div>
                <Typography level="body-xs">Supplier Company:</Typography>
                <Typography
                  fontSize="lg"
                  fontWeight="lg"
                  className="whitespace-nowrap"
                >
                  <CompanyHoverCard companyId={device.supplierCompanyId} />
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardView;
