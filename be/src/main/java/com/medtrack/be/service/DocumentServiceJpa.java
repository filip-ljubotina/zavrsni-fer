package com.medtrack.be.service;

import com.medtrack.be.dtos.DeviceDto;
import com.medtrack.be.dtos.DocumentDto;
import com.medtrack.be.entities.Device;
import com.medtrack.be.entities.Document;
import com.medtrack.be.mappers.DocumentMapper;
import com.medtrack.be.repositories.DocumentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DocumentServiceJpa {
    private DocumentRepository documentRepository;
    private DocumentMapper documentMapper;
    private DeviceServiceJpa deviceServiceJpa;

    public DocumentDto postNewDocument(DocumentDto documentDto){
        Device device = deviceServiceJpa.findDeviceByDeviceId(Long.parseLong(documentDto.getDeviceId()));
        Document document = documentMapper.mapToDocument(documentDto, device);
        document = documentRepository.save(document);
        return documentMapper.mapToDocumentDto(document);
    }

    public List<DocumentDto> getAllDocumentsByDeviceId(Long deviceId){
        Device device = deviceServiceJpa.findDeviceByDeviceId(deviceId);
        List<Document> documents = documentRepository.findAllByDevice(device);
        return documentMapper.mapToDocumentDtos(documents);
    }
}
