package com.my.bookshare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.bookshare.Repository.UserRepository;
import com.my.bookshare.dto.ResponseDTO;
import com.my.bookshare.dto.SignInDTO;
import com.my.bookshare.dto.SignInResponseDTO;
import com.my.bookshare.dto.SignUpDTO;
import com.my.bookshare.entity.UserEntity;
import com.my.bookshare.security.TokenProvider;


@Service
public class AuthService {
	
	@Autowired UserRepository userRepository;
	@Autowired TokenProvider tokenProvider;
	
	public ResponseDTO<?> signUp(SignUpDTO dto){
		String email = (dto).getEmail();
		String password = dto.getPassword();
		String passwordCheck = dto.getPasswordCheck();

		// email 중복확인
		try{
			if(userRepository.existsById(email)) {
				return ResponseDTO.setFailed("Existed Email.");
			}
		}catch(Exception error){
			return ResponseDTO.setFailed("DB Error");
		}
		
		// 비밀번호가 서로 다를 때 failed response 반환
		if(!password.equals(passwordCheck)) {
			return ResponseDTO.setFailed("Password does not matched");
		}
		
		//UserEntity 생성
		UserEntity userEntity = new UserEntity(dto);
		
		// UserRepository를 이용해서 데이터베이스에 Entity 저장
		try{
			userRepository.save(userEntity);
		}catch(Exception error) {
			return ResponseDTO.setFailed("DB Error");
		}
		
		// 성공시 success response 반환
		return ResponseDTO.setSuccess("Sign up Success", null);
		
	}
	
	public ResponseDTO<SignInResponseDTO> signIn(SignInDTO dto){
		String email = dto.getEmail();
		String password = dto.getPassword();
		
		try {
			boolean existed = userRepository.existsByEmailAndPassword(email, password);
			if(!existed) return ResponseDTO.setFailed("Sign In Information is not Matched");
		}catch(Exception error){
			return ResponseDTO.setFailed("Database Error");
		}
		
		UserEntity userEntity =  null;
		
		try {
			userEntity = userRepository.findById(email).get();
			userEntity.setPassword("");
		}catch(Exception error){
			return ResponseDTO.setFailed("Database Error");
		}
		
		
		String token = tokenProvider.create(email);
		int exprTime = 3600000;
		
		SignInResponseDTO signInResponseDTO = new SignInResponseDTO(token, exprTime, userEntity);
		return ResponseDTO.setSuccess("Sign in Success", signInResponseDTO);
		
		
	}
	
}
