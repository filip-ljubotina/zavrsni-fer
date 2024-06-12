package com.medtrack.be.controllers;

import com.medtrack.be.dtos.DocumentDto;
import com.medtrack.be.service.DocumentServiceJpa;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@AllArgsConstructor
@RequestMapping("/documents")
@RestController
public class DocumentController {
    private DocumentServiceJpa documentServiceJpa;

    @GetMapping("/getAllDocumentsByDeviceId/{deviceId}")
    public ResponseEntity<List<DocumentDto>> getAllDevicesByFolderId(@PathVariable Long deviceId){
        List<DocumentDto> documentDtos = documentServiceJpa.getAllDocumentsByDeviceId(deviceId);
        return ResponseEntity.ok(documentDtos);
    }

    @PostMapping("/postNewDocument")
    public ResponseEntity<DocumentDto> postNewDevice(@RequestBody DocumentDto documentDto){
        DocumentDto documenDtoRet = documentServiceJpa.postNewDocument(documentDto);
        return ResponseEntity.ok(documenDtoRet);
    }
}
