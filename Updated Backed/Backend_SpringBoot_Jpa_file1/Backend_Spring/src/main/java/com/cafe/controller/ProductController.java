package com.cafe.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cafe.Wrapper.ProductWrapper;

@RequestMapping(path = "/product")
public interface ProductController {

	@PostMapping(path = "/add")
	ResponseEntity<String>addNewProduct(@RequestBody Map<String,String> requestMap);

	@GetMapping(path = "/get")
	ResponseEntity<List<ProductWrapper>> getAllProduct();

	@PostMapping(path = "/update")
	ResponseEntity<String> updateProduct(@RequestBody Map<String, String> requestMap);
	
	@PostMapping(path = "/delete/{id}")//delete product()-> accepts one value that is id in path variable
	ResponseEntity<String> deleteProduct(@PathVariable Integer id);
	
	@PostMapping(path = "/updatestat")
	ResponseEntity<String>updateStatus(@RequestBody Map<String, String> requestMap);

	@GetMapping(path="/getByCategory/{id}")
	ResponseEntity<List<ProductWrapper>>getByCategory(@PathVariable Integer id);

	@GetMapping(path = "/getById/{id}")
	ResponseEntity<ProductWrapper> getProductById(@PathVariable Integer id);



}


