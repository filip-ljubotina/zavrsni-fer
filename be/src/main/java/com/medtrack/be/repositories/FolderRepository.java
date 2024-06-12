package com.medtrack.be.repositories;

import com.medtrack.be.entities.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {

    @Query(value = "WITH RECURSIVE Subfolders AS (" +
            "SELECT * FROM folder WHERE parent_folder_id = :parentFolderId " +
            "UNION ALL " +
            "SELECT f.* FROM folder f JOIN Subfolders s ON f.parent_folder_id = s.folder_id) " +
            "SELECT * FROM Subfolders", nativeQuery = true)
    List<Folder> findAllSubfolders(Long parentFolderId);
}
