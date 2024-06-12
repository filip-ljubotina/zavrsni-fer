package com.medtrack.be.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeviceDto {
    private Long deviceId;
    private String deviceName;
    private byte[] deviceImage;
    private Long folderId;
    private String folderName;
    private Long inventoryNumber;
    private String installationDate;
    private Integer status;
    private String serviceCompanyId;
    private String supplierCompanyId;
}
