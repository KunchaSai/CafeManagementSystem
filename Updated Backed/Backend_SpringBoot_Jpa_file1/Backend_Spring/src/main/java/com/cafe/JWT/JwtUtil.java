package com.cafe.JWT;
//
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.function.Function;
//
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Service;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import lombok.extern.slf4j.Slf4j;
//
///*Used to generate tokens*/
//@Service
//@Slf4j
//public class JwtUtil {
//
//	private String secret = "ankushraj";
//
//	public String extractUsername(String token) {
//		return extractClaims(token, Claims::getSubject);
//	}
//
//	public Date extractExpiration(String token) {
//		return extractClaims(token, Claims::getExpiration);
//	}
//
//	public <T> T extractClaims(String token, Function<Claims, T> claimResolver) {
//		final Claims claims = extractAllClaims(token);
//		return claimResolver.apply(claims);
//
//	}
//
//	public Claims extractAllClaims(String token) {
//		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
//	}
//
//	private boolean isTokenExpired(String token) {
//		return extractExpiration(token).before(new Date());
//	}
//
//	public boolean validateToken(String token, UserDetails userDetails) {
//		final String username = extractUsername(token);
//		log.info("Validate Token {}", username);
//		
//		log.info("Return {}",username.equals(userDetails.getUsername()) && !isTokenExpired(token));//false
//		log.info(userDetails.getUsername());//false
//		
//		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
//	}
//
//	public String generateToken(String username, String role) {
//		Map<String, Object> claims = new HashMap<>();
//		claims.put("role", role);
//		return createToken(claims, username);
//	}
//
//	private String createToken(Map<String, Object> claims, String subject) {
//		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
//				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
//				.signWith(SignatureAlgorithm.HS256, secret).compact();
//	}
//}

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.google.common.base.Function;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class JwtUtil {

	public String secret = "rasmi@123";

	public String generateToken(String username, String role) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("role", role);
		return createToken(claims, username);
	}

	private String createToken(Map<String, Object> claims, String subject) {

		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
				.signWith(SignatureAlgorithm.HS256, secret).compact();
	}

	public String extractUsername(String token) {
		return extractClaims(token, Claims::getSubject);
	}

	public Date extractExpiration(String token) {
		return extractClaims(token, Claims::getExpiration);
	}

	public <T> T extractClaims(String token, Function<Claims, T> claimResolvers) {

		final Claims claims = extractAllClaims(token);

		return claimResolvers.apply(claims);

	}

	public Claims extractAllClaims(String token) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
	}

	private boolean isTokenExpired(String token) {
		boolean isToenExpired=  extractExpiration(token).before(new Date());
		return isToenExpired;
	}

	public boolean validateToken(String token, UserDetails userDetails) {
		final String username = extractUsername(token);
		
		log.info("Validate Token {}", username);

		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
}
