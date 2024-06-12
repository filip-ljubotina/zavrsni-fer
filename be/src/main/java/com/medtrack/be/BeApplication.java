package com.medtrack.be;

import com.medtrack.be.entities.User;
import com.medtrack.be.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import java.util.Date;
@SpringBootApplication
public class BeApplication {
	public static void main(String[] args) {
		SpringApplication.run(BeApplication.class, args);
	}
}
