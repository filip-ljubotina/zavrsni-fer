package com.medtrack.be.controllers;

import com.medtrack.be.dtos.authentication.LoginResponseDto;
import com.medtrack.be.dtos.authentication.LoginUserDto;
import com.medtrack.be.dtos.authentication.RegisterUserDto;
import com.medtrack.be.entities.User;
import com.medtrack.be.security.JwtService;
import com.medtrack.be.service.AuthenticationServiceJpa;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationServiceJpa authenticationServiceJpa;

    public AuthenticationController(JwtService jwtService, AuthenticationServiceJpa authenticationServiceJpa) {
        this.jwtService = jwtService;
        this.authenticationServiceJpa = authenticationServiceJpa;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationServiceJpa.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationServiceJpa.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponseDto loginResponse = new LoginResponseDto();
        loginResponse.setUserId(authenticatedUser.getId());
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }

    
}
