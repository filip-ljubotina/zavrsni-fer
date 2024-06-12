package com.medtrack.be.repositories;

import com.medtrack.be.entities.Device;
import com.medtrack.be.entities.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository <Device, Long> {
    List<Device> findAllByFolderIn(List<Folder> folders);

    Optional<Device> findByInventoryNumber(Long inventoryNumber);
}
