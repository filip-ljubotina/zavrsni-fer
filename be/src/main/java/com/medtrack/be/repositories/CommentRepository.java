package com.medtrack.be.repositories;

import com.medtrack.be.entities.Comment;
import com.medtrack.be.entities.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByDevice(Device device);
}
