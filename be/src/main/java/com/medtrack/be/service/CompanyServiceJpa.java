package com.medtrack.be.service;

import com.medtrack.be.dtos.CompanyDto;
import com.medtrack.be.entities.Company;
import com.medtrack.be.mappers.CompaniesMapper;
import com.medtrack.be.repositories.CompanyRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CompanyServiceJpa {
    private final CompanyRepository companyRepository;
    private final CompaniesMapper companiesMapper;

    public Company findCompanyById(Long companyId){
        return companyRepository.findById(companyId).get();
    }

    public List<CompanyDto> getAllCompaniesInfo() {
        return companiesMapper.mapToCompaniesDto(companyRepository.findAll());
    }

}
