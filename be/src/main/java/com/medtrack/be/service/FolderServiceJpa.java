package com.medtrack.be.service;

import com.medtrack.be.dtos.FolderDto;
import com.medtrack.be.entities.Folder;
import com.medtrack.be.mappers.FoldersMapper;
import com.medtrack.be.repositories.FolderRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class FolderServiceJpa {

    private final FolderRepository folderRepository;
    private final FoldersMapper foldersMapper;

    public Folder findFolderById(Long folderId){
        return folderRepository.findById(folderId).get();
    }

    public List<FolderDto> getAllFolders(){
        List<Folder> folders = folderRepository.findAll();
        return foldersMapper.mapToFoldersDto(folders);
    }

    public List<Folder> getAllSubFolders(Long folderId){
        List<Folder> folders = folderRepository.findAllSubfolders(folderId);
        folders.add(folderRepository.findById(folderId).get());
        return folders;
    }

    public FolderDto postNewFolder(FolderDto folderDto) {
        Folder folder = foldersMapper.mapToFolder(folderDto);
        folder = folderRepository.save(folder);
        return foldersMapper.mapToFolderDto(folder);
    }

    public void putFolderTitle(FolderDto folderDto) {
        Folder newFolder = foldersMapper.mapToFolder(folderDto);
        Folder prevFolder = folderRepository.findById(newFolder.getFolderId()).get();
        prevFolder.setTitle(newFolder.getTitle());
        folderRepository.save(prevFolder);
    }
}
