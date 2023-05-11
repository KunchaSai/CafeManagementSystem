package com.cafe.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cafe.Wrapper.UserWrapper;



@RequestMapping(path = "/user")
public interface UserController {
	
	@PostMapping(path = "/signup")
	public ResponseEntity<String> signUp(@RequestBody(required = true) Map<String, String> requestMap); //name : value
	
	@PostMapping(path = "/login")
	public ResponseEntity<String> login(@RequestBody(required = true) Map<String, String> requestMap);
	
	@GetMapping(path = "/get")
	public ResponseEntity<java.util.List<UserWrapper>> getAllUser();

	@PostMapping(path = "/update")
	public ResponseEntity<String> update(@RequestBody(required = true) Map<String, String> requestMap);
	
	@GetMapping(path="/checkToken")
	ResponseEntity<String> checkToken();
	
	@PostMapping(path = "/changePassword")
	public ResponseEntity<String> changePassword(@RequestBody(required = true) Map<String, String> requestMap);
	
	
}
