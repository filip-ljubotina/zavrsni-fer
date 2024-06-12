package com.medtrack.be.mappers;

import com.medtrack.be.dtos.CompanyDto;
import com.medtrack.be.entities.Company;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CompaniesMapper {

    public List<CompanyDto> mapToCompaniesDto(List<Company> companies) {
        List<CompanyDto> companiesDto = new ArrayList<>();
        for (Company company : companies) {
            companiesDto.add(mapToCompanyDto(company));
        }
        return companiesDto;
    }

    public CompanyDto mapToCompanyDto(Company company) {
        CompanyDto companyDto = new CompanyDto();
        companyDto.setCompanyId(company.getCompanyId().toString());
        companyDto.setCompanyName(company.getCompanyName());
        companyDto.setEmail(company.getEmail());
        companyDto.setPhoneNumber(company.getPhoneNumber());
        return companyDto;
    }
}
