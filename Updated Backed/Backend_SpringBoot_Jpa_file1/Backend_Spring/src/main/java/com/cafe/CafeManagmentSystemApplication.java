package com.cafe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootApplication
public class CafeManagmentSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(CafeManagmentSystemApplication.class, args);
		log.info("Project Started");
	}
}
