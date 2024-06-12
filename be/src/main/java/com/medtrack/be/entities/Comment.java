package com.medtrack.be.entities;

import jakarta.persistence.*;

@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long commentId;
    private String comment;
    private String commentDate;
    private String type;
    @ManyToOne
    private Device device;
    @ManyToOne
    private User user;

    public Comment() {
    }

    public Comment(String comment, String commentDate, String type, Device device, User user) {
        this.comment = comment;
        this.commentDate = commentDate;
        this.type = type;
        this.device = device;
        this.user = user;
    }

    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(String commentDate) {
        this.commentDate = commentDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
