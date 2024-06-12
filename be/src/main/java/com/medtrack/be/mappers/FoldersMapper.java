package com.medtrack.be.mappers;

import com.medtrack.be.dtos.FolderDto;
import com.medtrack.be.entities.Folder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FoldersMapper {

    public List<FolderDto> mapToFoldersDto(List<Folder> folders) {
        List<FolderDto> folderDtos = new ArrayList<>();
        for (Folder folder : folders) {
            folderDtos.add(mapToFolderDto(folder));
        }
        return folderDtos;
    }

    public FolderDto mapToFolderDto(Folder folder) {
        FolderDto folderDto = new FolderDto();
        folderDto.setFolderId(String.valueOf(folder.getFolderId()));
        folderDto.setParentFolderId(String.valueOf(folder.getParentFolderId()));
        folderDto.setTitle(folder.getTitle());
        return folderDto;
    }

    public Folder mapToFolder(FolderDto folderDto) {
        Folder folder = new Folder();
        if (folderDto.getFolderId() != null) {
            folder.setFolderId(Long.parseLong(folderDto.getFolderId()));
        }
        if (folderDto.getParentFolderId() != null) {
            folder.setParentFolderId(Long.parseLong(folderDto.getParentFolderId()));
        }
        folder.setTitle(folderDto.getTitle());
        return folder;
    }
}
