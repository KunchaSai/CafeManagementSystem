package com.cafe.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import com.cafe.model.Category;


public interface CategoryService {

	ResponseEntity<String> addNewCategory(Map<String, String> reqestMap);

	ResponseEntity<List<Category>> getAllCategory(String filterValue);

	ResponseEntity<String> updateCategory(Map<String, String> requsetMap);
}
