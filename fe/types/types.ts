export type Folder = {
    folderId: string;
    title: string;
    icon: string;
    parentFolderId?: string;
}

export enum Status {
    Active,
    Not_Active,
    In_Service,
}

export type Device = {
    folderId?: string;
    deviceId: string;
    deviceImage?: Uint8Array | string | number[]; //ispraviti
    folderName?: string;
    deviceName: string;
    inventoryNumber: number;
    installationDate: string;
    status?: Status;
    serviceCompanyId?: string;
    supplierCompanyId?: string;
}

export type CompanyInfo = {
    companyId: string;
    companyName: string;
    email: string;
    phoneNumber: string;
}

export type Comment = {
    commentId: number;
    comment: string;
    commentDate: string;
    user: string;
    type: "note" | "alert";
    deviceId: string;
};

export type Document = {
    documentId: number;
    documentName: string;
    description: string;
    unit8array: [] | string;
    deviceId: string;
};
