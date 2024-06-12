package com.medtrack.be.controllers;

import com.medtrack.be.dtos.CompanyDto;
import com.medtrack.be.service.CompanyServiceJpa;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@AllArgsConstructor
@RequestMapping("/companies")
@RestController
public class CompaniesController {
    private final CompanyServiceJpa companyServiceJpa;

    @GetMapping("/getAllCompaniesInfo")
    public ResponseEntity<List<CompanyDto>> getAllCompaniesInfo(){
        List<CompanyDto> companyDtos = companyServiceJpa.getAllCompaniesInfo();
        return ResponseEntity.ok(companyDtos);
    }
}
