package com.medtrack.be.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDto {
    private String commentId;
    private String comment;
    private String commentDate;
    private String user; //firstName + lastName
    private String type;
    private String deviceId;
}
