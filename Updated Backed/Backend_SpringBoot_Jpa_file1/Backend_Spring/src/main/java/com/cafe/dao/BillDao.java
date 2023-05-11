package com.cafe.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import com.cafe.model.Bill;

@EnableJpaRepositories
public interface BillDao extends JpaRepository<Bill, Integer> {
	
	List<Bill> getAllBills();
	
	List<Bill> getBillByUserName(@Param("username") String username);
//
//	Optional findById(Integer id);
//
//	void deleteById(Integer id);



}
