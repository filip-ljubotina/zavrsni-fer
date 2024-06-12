
export enum Status {
    Active,
    Not_Active,
    In_Service,
}

export type Device = {
    folderId: string;
    deviceId: string;
    deviceImage?: Uint8Array | string | number[]; //ispraviti
    folderName: string;
    deviceName: string;
    inventoryNumber: number;
    installationDate: string;
    status: Status;
    serviceCompanyId: string;
    supplierCompanyId: string;
}

export type Folder = {
    folderId: string;
    title: string;
    icon: string;
    parentFolderId?: string;
}