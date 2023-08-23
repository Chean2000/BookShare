package com.my.bookshare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
	
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
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
		
		//비밀번호 암호화
		String encodedPassword = passwordEncoder.encode(password);
		userEntity.setPassword(encodedPassword);
		
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
		UserEntity userEntity =  null;
		
		try {
			userEntity = userRepository.findByEmail(email);
			// 잘못된 이메일
			if(userEntity == null) return ResponseDTO.setFailed("Sign In Failed");
			// 잘못된 패스워드
			if(passwordEncoder.matches(password, userEntity.getEmail()))
				return ResponseDTO.setFailed("Sign In Failed");
		}catch(Exception error){
			return ResponseDTO.setFailed("Database Error");
		}
		
		userEntity.setPassword("");
		
		String token = tokenProvider.create(email);
		int exprTime = 3600000;
		
		SignInResponseDTO signInResponseDTO = new SignInResponseDTO(token, exprTime, userEntity);
		return ResponseDTO.setSuccess("Sign in Success", signInResponseDTO);
		
		
	}
	
}
