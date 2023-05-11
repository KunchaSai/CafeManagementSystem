package com.cafe.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.cafe.model.Category;

@EnableJpaRepositories
public interface CategoryDao extends JpaRepository<Category, Integer> {

	List<Category> getAllCategory();
}
