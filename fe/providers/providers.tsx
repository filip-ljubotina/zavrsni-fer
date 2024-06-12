"use client";

import { FolderListProvider } from "@/providers/folder-list-provider";
import React from "react";
import { DeviceProvider } from "./device-provider";
import { CompaniesInfoProvider } from "./companies-provider";

interface ProviderProsp {
  children: React.ReactNode;
}

export function Providers({ children }: ProviderProsp) {
  return (
    <FolderListProvider>
      <DeviceProvider>
        <CompaniesInfoProvider>{children}</CompaniesInfoProvider>
      </DeviceProvider>
    </FolderListProvider>
  );
}

export default Providers;
