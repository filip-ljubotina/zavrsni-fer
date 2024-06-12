package com.medtrack.be.mappers;

import com.medtrack.be.dtos.DocumentDto;
import com.medtrack.be.entities.Device;
import com.medtrack.be.entities.Document;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DocumentMapper {
    public List<DocumentDto> mapToDocumentDtos(List<Document> documents) {
        List<DocumentDto> documentDtos = new ArrayList<>();
        for (Document document : documents) {
            documentDtos.add(mapToDocumentDto(document));
        }
        return documentDtos;
    }

    public DocumentDto mapToDocumentDto(Document document) {
        DocumentDto documentDto = new DocumentDto();
        documentDto.setDocumentId(document.getDocumentId().toString());
        documentDto.setDocumentName(document.getDocumentName());
        documentDto.setDescription(document.getDescription());
        documentDto.setUnit8array(document.getUnit8array());
        return documentDto;
    }

    public Document mapToDocument(DocumentDto documentDto, Device device) {
        Document document = new Document();
        document.setDocumentId(documentDto.getDocumentId() != null ? Long.parseLong(documentDto.getDocumentId()): null);
        document.setDocumentName(documentDto.getDocumentName());
        document.setDescription(documentDto.getDescription());
        document.setUnit8array(documentDto.getUnit8array());
        document.setDevice(device);
        return document;
    }
}
