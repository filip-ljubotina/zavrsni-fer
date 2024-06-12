import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { CompanyInfo } from "@/types/types";

interface DeviceProviderProps {
  children: ReactNode;
}

interface CompaniesInfoContextType {
  companiesInfo: CompanyInfo[] | [];
  setCompniesInfo: Dispatch<SetStateAction<CompanyInfo[] | []>>;
}

const CompaniesInfoContext = createContext<CompaniesInfoContextType | null>(
  null
);

export const CompaniesInfoProvider = ({ children }: DeviceProviderProps) => {
  const [companiesInfo, setCompniesInfo] = useState<CompanyInfo[] | []>([]);

  return (
    <CompaniesInfoContext.Provider value={{ companiesInfo, setCompniesInfo }}>
      {children}
    </CompaniesInfoContext.Provider>
  );
};

export const useCompaniesInfoContext = () => {
  const context = useContext(CompaniesInfoContext);
  if (context === null) {
    throw new Error(
      "useDeviceContext must be used within a DocumentListProvider"
    );
  }
  return context;
};
