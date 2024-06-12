package com.medtrack.be.repositories;

import com.medtrack.be.entities.Device;
import com.medtrack.be.entities.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findAllByDevice(Device device);
}
