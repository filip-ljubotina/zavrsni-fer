package com.medtrack.be;

import com.medtrack.be.entities.Company;
import com.medtrack.be.entities.Device;
import com.medtrack.be.entities.Folder;
import com.medtrack.be.repositories.CompanyRepository;
import com.medtrack.be.repositories.DeviceRepository;
import com.medtrack.be.repositories.FolderRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class DataInitializer {
    private final FolderRepository folderRepository;
    private final DeviceRepository deviceRepository;
    private final CompanyRepository companyRepository;

    @EventListener
    public void appReady(ApplicationReadyEvent event) {
        if  (folderRepository.count() == 0){
            Folder prevFolder;
            Folder folder;
            folder = new Folder(null, "West Wing");
            prevFolder = folderRepository.save(folder);
            folder = new Folder(null, "East Wing");
            folderRepository.save(folder);
            folder = new Folder(prevFolder.getFolderId(), "Cardiology");
            folderRepository.save(folder);
            folder = new Folder(prevFolder.getFolderId(), "Intensive Care");
            prevFolder = folderRepository.save(folder);
            folder = new Folder(prevFolder.getFolderId(), "Room 1");
            folderRepository.save(folder);
            folder = new Folder(prevFolder.getFolderId(), "Room 2");
            folderRepository.save(folder);
        }

        if (deviceRepository.count() == 0){
            Folder room1 = folderRepository.findById(5L).get();
            Folder room3 = folderRepository.findById(6L).get();
            Folder intensiveCare = folderRepository.findById(4L).get();
            Folder cariology = folderRepository.findById(3L).get();
            Folder westWing = folderRepository.findById(1L).get();

            Company company = new Company("Kardian d.o.o.", "info@kardian.com", "+381 91 1234 567");
            companyRepository.save(company);

            Device device = new Device("ZOLL-R series", 1564987L, 0, "2024-05-10", company, company,room3);
            deviceRepository.save(device);
            device = new Device("ZOLL-AED", 1564987L, 0, "2024-05-10", company, company,room1);
            deviceRepository.save(device);
            device = new Device("Mindray Monitor", 1564987L, 0, "2024-05-10", company, company,intensiveCare);
            deviceRepository.save(device);
            device = new Device("BeneHeart D3", 1564987L, 0, "2024-05-10", company, company,cariology);
            deviceRepository.save(device);
            device = new Device("BeneHeart D60", 1564987L, 0, "2024-05-10", company, company, westWing);
            deviceRepository.save(device);
        }
    }

}
