package com.medtrack.be.service;

import com.medtrack.be.dtos.DeviceDto;
import com.medtrack.be.entities.Company;
import com.medtrack.be.entities.Device;
import com.medtrack.be.entities.Folder;
import com.medtrack.be.mappers.DeviceMapper;
import com.medtrack.be.repositories.DeviceRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DeviceServiceJpa {
    private final DeviceRepository deviceRepository;
    private final FolderServiceJpa folderServiceJpa;
    private final CompanyServiceJpa companyServiceJpa;
    private final DeviceMapper deviceMapper;

    public Device findDeviceByDeviceId(Long deviceId){
        return deviceRepository.findById(deviceId).get();
    }

    public List<DeviceDto> getAllDevicesByFolderId(Long folderId){
        List<Folder> folders = folderServiceJpa.getAllSubFolders(folderId);
        List<Device> devices =  deviceRepository.findAllByFolderIn(folders);
        return deviceMapper.mapToDevicesDto(devices);
    }

    public DeviceDto saveDevice(DeviceDto deviceDto){
        Folder folder = folderServiceJpa.findFolderById(deviceDto.getFolderId());
        Company supplierCompany = deviceDto.getSupplierCompanyId() == null ? null : companyServiceJpa.findCompanyById(Long.parseLong(deviceDto.getSupplierCompanyId()));
        Company serviceCompany = deviceDto.getServiceCompanyId() == null ? null : companyServiceJpa.findCompanyById(Long.parseLong(deviceDto.getServiceCompanyId()));
        Device newDevice = deviceMapper.mapToDevice(deviceDto, folder, supplierCompany, serviceCompany);
        return deviceMapper.mapToDeviceDto(deviceRepository.save(newDevice));
    }

    public DeviceDto getDeviceByInvNumber(Long inventoryNumber) {
        DeviceDto deviceDto = new DeviceDto();
        Optional<Device> deviceOpt = deviceRepository.findByInventoryNumber(inventoryNumber);
        if(deviceOpt.isEmpty()){
            return deviceDto;
        }else {
            return deviceMapper.mapToDeviceDto(deviceOpt.get());
        }
    }

    public void deleteDeviceById(Long deviceId) {
        deviceRepository.deleteById(deviceId);
    }
}
