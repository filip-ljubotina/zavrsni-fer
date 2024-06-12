package com.medtrack.be.controllers;

import com.medtrack.be.dtos.DeviceDto;
import com.medtrack.be.service.DeviceServiceJpa;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@AllArgsConstructor
@RequestMapping("/devices")
@RestController
public class DevicesController {
    private final DeviceServiceJpa deviceServiceJpa;

    @GetMapping("/getAllDevicesByFolderId/{folderId}")
    public ResponseEntity<List<DeviceDto>> getAllDevicesByFolderId(@PathVariable Long folderId){
        List<DeviceDto> devices = deviceServiceJpa.getAllDevicesByFolderId(folderId);
        return ResponseEntity.ok(devices);
    }

    @PostMapping("/postNewDevice")
    public ResponseEntity<DeviceDto> postNewDevice(@RequestBody DeviceDto deviceDto){
        DeviceDto newDevice = deviceServiceJpa.saveDevice(deviceDto);
        return ResponseEntity.ok(newDevice);
    }

    @PutMapping("/putDevice")
    public ResponseEntity<DeviceDto> putDevice(@RequestBody DeviceDto deviceDto){
        DeviceDto newDevice = deviceServiceJpa.saveDevice(deviceDto);
        return ResponseEntity.ok(newDevice);
    }

    @GetMapping("/getDeviceByInvNumber/{inventoryNumber}")
    public ResponseEntity<DeviceDto> getDeviceByInvNumber(@PathVariable Long inventoryNumber){
        DeviceDto deviceDto = deviceServiceJpa.getDeviceByInvNumber(inventoryNumber);
        return ResponseEntity.ok(deviceDto);
    }

    @DeleteMapping("/deleteDeviceById/{deviceId}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Long deviceId){
        deviceServiceJpa.deleteDeviceById(deviceId);
        return ResponseEntity.ok().build();
    }
}
