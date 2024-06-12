package com.medtrack.be.controllers;

import com.medtrack.be.dtos.CommentDto;
import com.medtrack.be.service.CommentServiceJpa;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequestMapping("/comments")
@RestController
@AllArgsConstructor
public class CommentsController {
    private CommentServiceJpa commentServiceJpa;

    @GetMapping("/getAllComentsByDeviceId/{deviceId}")
    public ResponseEntity<List<CommentDto>> getAllComentsByDeviceId(@PathVariable Long deviceId){
        List<CommentDto> commentDtos = commentServiceJpa.getAllComentsByDeviceId(deviceId);
        return ResponseEntity.ok(commentDtos);
    }

    @PostMapping("/postNewComment")
    public ResponseEntity<CommentDto> postNewComment(@RequestHeader("Authorization") String authHeader, @RequestBody CommentDto commentDto){
        CommentDto newCommentDto = commentServiceJpa.postNewComment(authHeader, commentDto);
        return ResponseEntity.ok(newCommentDto);
    }
}
