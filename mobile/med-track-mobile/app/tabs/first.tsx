import React from "react";
import ScannedDevice from "../../components/scan-device";
import NewDevice from "@/components/new-device";
import { useDeviceContext } from "@/providers/device-provider";

export default function TabOneScreen() {
  const { device } = useDeviceContext();
  return device?.deviceId ? <ScannedDevice /> : <NewDevice />;
}
