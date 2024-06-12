package com.medtrack.be.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompanyDto {
    private String companyId;
    private String companyName;
    private String email;
    private String phoneNumber;
}
