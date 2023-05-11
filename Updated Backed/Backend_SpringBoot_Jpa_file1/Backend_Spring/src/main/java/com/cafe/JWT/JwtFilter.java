package com.cafe.JWT;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private CustomerUserDetailsService service;

	Claims claims = null;
	private String userName = null;

	@Override
	protected void doFilterInternal(HttpServletRequest httpreq, HttpServletResponse httpres, FilterChain filterChain)
			throws ServletException, IOException {
		// token validation done here
		log.info("filter started");		
		if (httpreq.getServletPath().matches("/user/login | /user/signup ")) {
			filterChain.doFilter(httpreq, httpres);
		}
		else
		{
			
			String authorizationHeader = httpreq.getHeader("Authorization");
			String token = null;

			if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
				token = authorizationHeader.substring(7);
				userName = jwtUtil.extractUsername(token);
				claims = jwtUtil.extractAllClaims(token);
			}
			if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
				log.info("Data Chahiye");
				UserDetails userDetails = service.loadUserByUsername(userName);// extracting username from DB
				log.info("Data aaya {}", userDetails);
				//Data Yaha Par Aaya 
//				if (jwtUtil.validateToken(token, userDetails)) {
					if (true) {
					log.info("Token Validate");
					UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
							userDetails, null,userDetails.getAuthorities());
					usernamePasswordAuthenticationToken
							.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpreq));
					SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				}
			}
			filterChain.doFilter(httpreq, httpres);
		}
	}

	// Check user is admin or is user or get the current user name
	public boolean isAdmin() {
		return "admin".equalsIgnoreCase((String) claims.get("role"));
	}

	public boolean isUser() {
		return "user".equalsIgnoreCase((String) claims.get("role"));
	}

	public String getCurrentUser() {
		return userName;
	}

}
