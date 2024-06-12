package com.medtrack.be.service;

import com.medtrack.be.entities.User;
import com.medtrack.be.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceJpa {
    private final UserRepository userRepository;

    public User findUserByEmail(String email){
        return userRepository.findByEmail(email).get();
    }
}
