package com.medtrack.be.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DocumentDto {
    private String documentId;
    private String documentName;
    private String description;
    private byte[] unit8array;
    private String deviceId;
}
