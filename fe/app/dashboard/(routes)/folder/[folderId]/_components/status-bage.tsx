import { Badge } from "@/components/ui/badge";

enum Status {
  Active,
  Not_Active,
  In_Service,
}

interface StatusBadgeProps {
  status: Status;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <Badge
      className={
        status === Status.Active
          ? "bg-green-600"
          : status === Status.In_Service
          ? "bg-yellow-600"
          : "bg-red-600"
      }
    >
      {status === Status.Active
        ? "Active"
        : status === Status.In_Service
        ? "In Service"
        : "Not Active"}
    </Badge>
  );
};

export default StatusBadge;
