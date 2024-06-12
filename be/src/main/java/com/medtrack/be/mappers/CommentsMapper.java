package com.medtrack.be.mappers;

import com.medtrack.be.dtos.CommentDto;
import com.medtrack.be.entities.Comment;
import com.medtrack.be.entities.Device;
import com.medtrack.be.entities.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CommentsMapper {
    public List<CommentDto> mapToCommentDtos(List<Comment> comments){
        List<CommentDto> commentDtos = new ArrayList<>();
        for (Comment comment : comments) {
            commentDtos.add(mapToCommentDto(comment));
        }
        return commentDtos;
    }

    public CommentDto mapToCommentDto(Comment comment){
        CommentDto commentDto = new CommentDto();
        commentDto.setCommentId(comment.getCommentId().toString());
        commentDto.setComment(comment.getComment());
        commentDto.setCommentDate(comment.getCommentDate());
        commentDto.setUser(comment.getUser().getFirstName() + " " + comment.getUser().getLastName());
        commentDto.setType(comment.getType());
        commentDto.setDeviceId(comment.getDevice().getDeviceId().toString());
        return commentDto;
    }

    public Comment mapToComment(CommentDto commentDto, User user, Device device){
        Comment comment = new Comment();
        comment.setComment(commentDto.getComment());
        comment.setCommentDate(commentDto.getCommentDate());
        comment.setType(commentDto.getType());
        comment.setDevice(device);
        comment.setUser(user);
        return comment;
    }
}
