package com.my.bookshare.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.my.bookshare.security.TokenProvider;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	// Request가 들어왔을 때 Request Header의 authorization 필드의 Bearer Token을 가져 옴
	// 가져온 토큰을 검증하과 검증 결과를 ScurtiyContext에 추가. (해서 thread내에서 유지할 수 있게 만들 것임)

	@Autowired private TokenProvider tokenProvider;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		try {
			String token = parseBearerToken(request);
			
			if(token != null && !token.equalsIgnoreCase("null")) {
				// 토큰을 검증해서 payload의 email 가져옴
				String email = tokenProvider.validate(token);
				
				// SecurtiyContext에 추가할 객체
				AbstractAuthenticationToken authentication = 
						new UsernamePasswordAuthenticationToken(email, null, AuthorityUtils.NO_AUTHORITIES);
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
				// SecurityContext에 AbstractAuthenticationToeken 객체를 추가해서
				// 해당 Thread가 지속적으로 인증 정보를 가질 수 있도록 함
				SecurityContext securtiyContext = SecurityContextHolder.createEmptyContext();
				securtiyContext.setAuthentication(authentication);
				SecurityContextHolder.setContext(securtiyContext);
			}
			
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		
		filterChain.doFilter(request, response);
		
	}
	
	//Request Header의 authorization 필드의 Bearer Token을 가져오는 메서드
	private String parseBearerToken(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		
		if(StringUtils.hasText(bearerToken) &&  bearerToken.startsWith("Bearer "))
			return bearerToken.substring(7);
		
		return null;
	}

}
