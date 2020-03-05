package me.kupchenko;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class NotesAppDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotesAppDemoApplication.class, args);
	}

}
