"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCompaniesInfoContext } from "@/providers/companies-provider";
import { Device, CompanyInfo } from "@/types/types";
import { useEffect, useState } from "react";
import EditCompany from "./edit-company";

interface CompaniesInfo {
  setDevice: React.Dispatch<React.SetStateAction<any>>;
  device: Device;
}

export const CompaniesInfo = ({ setDevice, device }: CompaniesInfo) => {
  const { companiesInfo } = useCompaniesInfoContext();
  const [supplierCompany, setSupplierCompany] = useState<
    CompanyInfo | undefined
  >(
    companiesInfo.find(
      (company) => company.companyId === device.supplierCompanyId
    )
  );
  const [serviceCompany, setServiceCompany] = useState<CompanyInfo | undefined>(
    companiesInfo.find(
      (company) => company.companyId === device.serviceCompanyId
    )
  );

  useEffect(() => {
    setServiceCompany(
      companiesInfo.find(
        (company) => company.companyId === device.serviceCompanyId
      )
    );
    setSupplierCompany(
      companiesInfo.find(
        (company) => company.companyId === device.supplierCompanyId
      )
    );
  }, [companiesInfo, device]);

  return (
    <Card className="w-full gap max-w-md">
      <CardHeader className="grid p-6">
        <div className="flex flex-row items-center justify-center gap-2">
          <h3 className="text-2xl font-bold text-nowrap">
            Authorized Service Company Info
          </h3>
          <EditCompany
            field="serviceCompanyId"
            device={device}
            setDevice={setDevice}
          />
        </div>
      </CardHeader>
      <CardContent className=" space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 dark:text-gray-400">Company Name:</p>
          <p className="font-medium">{serviceCompany?.companyName}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-500 dark:text-gray-400">Email:</p>
          <p className="font-medium">{serviceCompany?.email}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-500 dark:text-gray-400">Phone Number:</p>
          <p className="font-medium">{serviceCompany?.phoneNumber}</p>
        </div>
      </CardContent>
      <Separator />
      <CardHeader className="grid ">
        <div className="flex flex-row items-center justify-center gap-2">
          <h3 className="text-2xl font-bold">Supplier Of Consumables Info</h3>
          <EditCompany
            field="supplierCompanyId"
            device={device}
            setDevice={setDevice}
          />
        </div>
      </CardHeader>
      <CardContent className=" space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 dark:text-gray-400">Company Name:</p>
          <p className="font-medium">{supplierCompany?.companyName}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-500 dark:text-gray-400">Email:</p>
          <p className="font-medium">{supplierCompany?.email}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-500 dark:text-gray-400">Phone Number:</p>
          <p className="font-medium">{supplierCompany?.phoneNumber}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompaniesInfo;
