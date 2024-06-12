package com.medtrack.be.service;

import com.medtrack.be.dtos.CommentDto;
import com.medtrack.be.entities.Comment;
import com.medtrack.be.entities.Device;
import com.medtrack.be.entities.User;
import com.medtrack.be.mappers.CommentsMapper;
import com.medtrack.be.repositories.CommentRepository;
import com.medtrack.be.security.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CommentServiceJpa {
    private CommentRepository commentRepository;
    private DeviceServiceJpa deviceServiceJpa;
    private CommentsMapper commentsMapper;
    private JwtService jwtService;
    private UserServiceJpa userService;
    public List<CommentDto> getAllComentsByDeviceId(Long deviceId) {
        Device device = deviceServiceJpa.findDeviceByDeviceId(deviceId);
        List<Comment> comments = commentRepository.findAllByDevice(device);
        return commentsMapper.mapToCommentDtos(comments);
    }

    public CommentDto postNewComment(String authHeader, CommentDto commentDto) {
        String email = jwtService.extractUsername(authHeader.substring(7));
        User user = userService.findUserByEmail(email);
        Device device = deviceServiceJpa.findDeviceByDeviceId(Long.parseLong(commentDto.getDeviceId()));
        Comment newComment = commentsMapper.mapToComment(commentDto, user, device);
        newComment = commentRepository.save(newComment);
        return commentsMapper.mapToCommentDto(newComment);
    }
}
