package com.my.bookshare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.my.bookshare.dto.ResponseDTO;
import com.my.bookshare.dto.SignInDTO;
import com.my.bookshare.dto.SignInResponseDTO;
import com.my.bookshare.dto.SignUpDTO;
import com.my.bookshare.service.AuthService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired AuthService authService;

	@PostMapping("/signUp")
	public ResponseDTO<?> signUp(@RequestBody SignUpDTO requestBody){
		//System.out.println("Controller "+requestBody.toString());
		ResponseDTO<?> result = authService.signUp(requestBody);  
		return result;
	}
	
	@PostMapping("/signIn")
	public ResponseDTO<SignInResponseDTO> signIn(@RequestBody SignInDTO requestBody){
		ResponseDTO<SignInResponseDTO> result = authService.signIn(requestBody);
		return result;
		
	}
	
}
