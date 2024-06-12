package com.medtrack.be.controllers;

import com.medtrack.be.dtos.FolderDto;
import com.medtrack.be.service.FolderServiceJpa;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@AllArgsConstructor
@RequestMapping("/folders")
@RestController
public class FoldersController {
    private final FolderServiceJpa folderServiceJpa;

    @GetMapping("/getAllFolders")
    public ResponseEntity<List<FolderDto>> getAllFolders (){
        List<FolderDto> foldersDto = folderServiceJpa.getAllFolders();
        return ResponseEntity.ok(foldersDto);
    }

    @PostMapping("/postNewFolder")
    public ResponseEntity<FolderDto> postNewFolder(@RequestBody FolderDto folderDto){
        FolderDto folder = folderServiceJpa.postNewFolder(folderDto);
        return ResponseEntity.ok(folder);
    }

    @PutMapping("/putFolderTitle")
    public ResponseEntity<Void>  putFolderTitle(@RequestBody FolderDto folderDto){
        folderServiceJpa.putFolderTitle(folderDto);
        return ResponseEntity.ok().build();
    }
}
