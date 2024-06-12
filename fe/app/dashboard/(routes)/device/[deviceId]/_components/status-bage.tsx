import { Badge } from "@/components/ui/badge";
import { useDeviceContext } from "@/providers/device-provider";

enum Status {
  Active,
  Not_Active,
  In_Service,
}

export const StatusBadge = () => {
  const { device, setDevice } = useDeviceContext();

  return (
    <Badge
      className={
        device?.status === Status.Active
          ? "bg-green-600"
          : device?.status === Status.In_Service
          ? "bg-yellow-600"
          : "bg-red-600"
      }
    >
      {device?.status === Status.Active
        ? "Active"
        : device?.status === Status.In_Service
        ? "In Service"
        : "Not Active"}
    </Badge>
  );
};

export default StatusBadge;
