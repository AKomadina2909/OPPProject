package hr.fer.UporneNjuske;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import hr.fer.UporneNjuske.domain.User;
import hr.fer.UporneNjuske.impl.UserService;
import hr.fer.UporneNjuske.rest.UserController;

@SpringBootApplication

public class UporneNjuskeApplication {

	
	@Bean
	public PasswordEncoder pswdEncoder() {
		return new BCryptPasswordEncoder();
	}

	public static void main(String[] args) {
		SpringApplication.run(UporneNjuskeApplication.class, args);
		
	}
}
