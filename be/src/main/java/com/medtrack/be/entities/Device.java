package com.medtrack.be.entities;

import jakarta.persistence.*;

@Entity
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long deviceId;
    private String deviceName;
    private byte[] deviceImage;
    private Long inventoryNumber;
    private Integer status;
    private String installationDate;
    @ManyToOne
    private Company serviceCompany;
    @ManyToOne
    private Company supplierCompany;
    @ManyToOne
    private Folder folder;

    public Device() {
    }

    public Device(String deviceName, Long inventoryNumber, Integer status, String installationDate, Company serviceCompany, Company supplierCompany, Folder folder) {
        this.deviceName = deviceName;
        this.inventoryNumber = inventoryNumber;
        this.status = status;
        this.installationDate = installationDate;
        this.serviceCompany = serviceCompany;
        this.supplierCompany = supplierCompany;
        this.folder = folder;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public byte[] getDeviceImage() {
        return deviceImage;
    }

    public void setDeviceImage(byte[] deviceImage) {
        this.deviceImage = deviceImage;
    }

    public Long getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
    }

    public Long getInventoryNumber() {
        return inventoryNumber;
    }

    public void setInventoryNumber(Long inventoryNumber) {
        this.inventoryNumber = inventoryNumber;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getInstallationDate() {
        return installationDate;
    }

    public void setInstallationDate(String installationDate) {
        this.installationDate = installationDate;
    }

    public Company getServiceCompany() {
        return serviceCompany;
    }

    public void setServiceCompany(Company serviceCompany) {
        this.serviceCompany = serviceCompany;
    }

    public Company getSupplierCompany() {
        return supplierCompany;
    }

    public void setSupplierCompany(Company supplierCompany) {
        this.supplierCompany = supplierCompany;
    }

    public Folder getFolder() {
        return folder;
    }

    public void setFolder(Folder folder) {
        this.folder = folder;
    }
}
