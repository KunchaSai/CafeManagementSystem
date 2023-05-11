package com.cafe.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import com.cafe.Wrapper.UserWrapper;
import com.cafe.model.User;

@EnableJpaRepositories
public interface UserDao extends JpaRepository<User, Integer> {

	User findByEmailId(@Param("email") String email);

	List<UserWrapper> getAllUser();

	@Transactional
	@Modifying
	Integer updateStatus(@Param("status") String status, @Param("id") Integer id);

	User findByEmail(String currentUser);
}
