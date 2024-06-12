package com.medtrack.be.mappers;

import com.medtrack.be.dtos.DeviceDto;
import com.medtrack.be.entities.Company;
import com.medtrack.be.entities.Device;
import com.medtrack.be.entities.Folder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DeviceMapper {

    public List<DeviceDto> mapToDevicesDto(List<Device> devices){
        List<DeviceDto> deviceDtos = new ArrayList<>();
        for (Device device : devices) {
            deviceDtos.add(mapToDeviceDto(device));
        }
        return deviceDtos;
    }

    public DeviceDto mapToDeviceDto(Device device) {
        DeviceDto deviceDto = new DeviceDto();
        deviceDto.setDeviceId(device.getDeviceId());
        deviceDto.setDeviceName(device.getDeviceName());
        deviceDto.setDeviceImage(device.getDeviceImage());
        deviceDto.setFolderId(device.getFolder().getFolderId());
        deviceDto.setFolderName(device.getFolder().getTitle());
        deviceDto.setStatus(device.getStatus());
        deviceDto.setInstallationDate(device.getInstallationDate());
        deviceDto.setInventoryNumber(device.getInventoryNumber());
        deviceDto.setSupplierCompanyId(device.getSupplierCompany() != null ? device.getSupplierCompany().getCompanyId().toString() : null);
        deviceDto.setServiceCompanyId(device.getServiceCompany() != null ? device.getServiceCompany().getCompanyId().toString() : null);
        return deviceDto;
    }

//    public List<Device> mapToDevices(List<DeviceDto> deviceDtos) {
//        List<Device> devices = new ArrayList<>();
//        for (DeviceDto deviceDto : deviceDtos) {
//            devices.add(mapToDevice(deviceDto));
//        }
//        return devices;
//    }

    public Device mapToDevice(DeviceDto deviceDto, Folder folder, Company supplierCompany, Company serviceCompany) {
        Device device = new Device();
        device.setDeviceId(deviceDto.getDeviceId());
        device.setDeviceName(deviceDto.getDeviceName());
        device.setDeviceImage(deviceDto.getDeviceImage());

        device.setFolder(folder);

        device.setStatus(deviceDto.getStatus());
        device.setInstallationDate(deviceDto.getInstallationDate());
        device.setInventoryNumber(deviceDto.getInventoryNumber());

        device.setSupplierCompany(supplierCompany);

        device.setServiceCompany(serviceCompany);

        return device;
    }
}
