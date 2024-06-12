package com.medtrack.be.entities;

import com.medtrack.be.dtos.DeviceDto;
import jakarta.persistence.*;

@Entity
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long documentId;
    private String documentName;
    private String description;
    private byte[] unit8array;

    @ManyToOne
    private Device device;

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }

    public Long getDocumentId() {
        return documentId;
    }

    public void setDocumentId(Long documentId) {
        this.documentId = documentId;
    }

    public String getDocumentName() {
        return documentName;
    }

    public void setDocumentName(String documentName) {
        this.documentName = documentName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getUnit8array() {
        return unit8array;
    }

    public void setUnit8array(byte[] unit8array) {
        this.unit8array = unit8array;
    }
}
