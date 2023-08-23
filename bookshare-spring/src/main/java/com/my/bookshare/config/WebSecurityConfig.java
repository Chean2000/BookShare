
package com.my.bookshare.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.my.bookshare.filter.JwtAuthenticationFilter;

// https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

	@Autowired JwtAuthenticationFilter jwtAuthenticationFilter;
	@Autowired CorsConfig corsConfig;

	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
		.csrf(csrf -> csrf.disable())
        .httpBasic((httpBasic) -> httpBasic.disable())
        .sessionManagement((sessionManagement) -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) 
        .authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests.requestMatchers("/", "/api/auth/**").permitAll().anyRequest().authenticated())
		.addFilter(corsConfig.corsFilter())
		.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
	
	    return http.build();
	}
	
	/*
	 http
		.csrf((csrf) -> csrf.disable())
        .httpBasic((httpBasic) -> httpBasic.disable())
        .sessionManagement((sessionManagement) -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) 
        .authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests.requestMatchers("/", "/api/auth/**").permitAll().anyRequest().authenticated())
		.addFilter(corsConfig.corsFilter())
		.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
	
	    return http.build();
	*/
	
	
	/*
	 httpSecurity
            .cors(Customizer.withDefaults())
            .csrf((csrf) -> csrf.disable())
            .httpBasic((httpBasic) -> httpBasic.disable())
            .sessionManagement((sessionManagement) -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) 
            .authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests.requestMatchers("/", "/api/auth/**").permitAll().anyRequest().authenticated());

        httpSecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
       
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    */ 


	
}

