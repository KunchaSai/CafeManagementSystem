package com.cafe.JWT;

import java.util.ArrayList;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cafe.dao.UserDao;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CustomerUserDetailsService implements UserDetailsService {

	@Autowired
	UserDao userDao;

	private com.cafe.model.User userDetail;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		log.info("Inside Load UserByName {}", email);// email
		userDetail = userDao.findByEmailId(email);
		log.info("Data loadUserByUsername {}", userDetail);// email
		if (!Objects.isNull(userDetail)) {
			log.info("Status Of !Objects {}", userDetail.getStatus());// email
			//problem
			return new User(userDetail.getEmail(), userDetail.getPassword(), new ArrayList<>());
		} else {
			throw new UsernameNotFoundException("User not Found");
		}
	}
	
	public com.cafe.model.User getUserDetail() {
		return userDetail;
	}
	
}
