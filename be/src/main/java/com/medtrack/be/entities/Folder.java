package com.medtrack.be.entities;

import jakarta.persistence.*;

@Entity
public class Folder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long folderId;
    private Long parentFolderId;
    private String title;

    public Folder() {
    }

    public Folder(Long parentFolderId, String title) {
        this.parentFolderId = parentFolderId;
        this.title = title;
    }

    public Long getFolderId() {
        return folderId;
    }

    public void setFolderId(Long folderId) {
        this.folderId = folderId;
    }

    public Long getParentFolderId() {
        return parentFolderId;
    }

    public void setParentFolderId(Long parentFolderId) {
        this.parentFolderId = parentFolderId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}

