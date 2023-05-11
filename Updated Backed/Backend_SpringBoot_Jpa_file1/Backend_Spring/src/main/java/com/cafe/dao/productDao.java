package com.cafe.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import com.cafe.Wrapper.ProductWrapper;
import com.cafe.model.Product;

/**
 * 
 * @author rasmi
 *
 */
@EnableJpaRepositories
public interface productDao extends JpaRepository<Product, Integer>{
	
	List<ProductWrapper> getAllProduct();
	
	@Modifying
	@Transactional 
	
	Integer updateProductStatus(@RequestParam("status")String status, @RequestParam("id")Integer id);

	List<ProductWrapper> getProductByCategory(@Param("id")Integer id);
	
	ProductWrapper getProductById(@Param("id")Integer id);
	
}