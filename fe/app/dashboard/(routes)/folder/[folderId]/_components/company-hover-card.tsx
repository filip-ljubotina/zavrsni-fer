"use client";

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { useCompaniesInfoContext } from "@/providers/companies-provider";

interface CompanyHoverCardProps {
  companyId: string | undefined;
}

export const CompanyHoverCard = ({ companyId }: CompanyHoverCardProps) => {
  const { companiesInfo } = useCompaniesInfoContext();
  const foundCompany = companiesInfo.find(
    (company) => company.companyId === companyId
  );
  return (
    <HoverCard>
      <HoverCardTrigger>{foundCompany?.companyName}</HoverCardTrigger>
      <HoverCardContent>
        <div className="flex items-center justify-between py-2">
          <p className="text-gray-500 dark:text-gray-400">Email:</p>
          <p className="font-medium">{foundCompany?.email}</p>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-gray-500 dark:text-gray-400 text-wrap">
            Phone Number:
          </p>
          <p className="font-medium px-2 text-nowrap">
            {foundCompany?.phoneNumber}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
