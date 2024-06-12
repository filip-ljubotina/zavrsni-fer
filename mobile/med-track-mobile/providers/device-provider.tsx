import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Device } from "@/types/types";

interface DeviceProviderProps {
  children: ReactNode;
}

interface DeviceContextType {
  device: Device | null;
  setDevice: Dispatch<SetStateAction<Device | null>>;
}

const DeviceContext = createContext<DeviceContextType | null>(null);

export const DeviceProvider = ({ children }: DeviceProviderProps) => {
  const [device, setDevice] = useState<Device | null>(null);

  return (
    <DeviceContext.Provider value={{ device, setDevice }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => {
  const context = useContext(DeviceContext);
  if (context === null) {
    throw new Error(
      "useDeviceContext must be used within a DocumentListProvider"
    );
  }
  return context;
};
