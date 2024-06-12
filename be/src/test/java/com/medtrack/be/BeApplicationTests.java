package com.medtrack.be;

import com.medtrack.be.entities.User;
import com.medtrack.be.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.event.EventListener;

import java.util.Date;

@SpringBootTest
class BeApplicationTests {


	@Test
	void contextLoads() {
	}
}
