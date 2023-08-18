package com.my.bookshare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.bookshare.Repository.UserRepository;
import com.my.bookshare.dto.ResponseDTO;
import com.my.bookshare.dto.SignUpDTO;
import com.my.bookshare.entity.UserEntity;


@Service
public class AuthService {
	
	@Autowired UserRepository userRepository;
	
	public ResponseDTO<?> signUp(SignUpDTO dto){
		String email = (dto).getEmail();
		String password = dto.getPassword();
		String passwordCheck = dto.getPasswordCheck();

		// email 중복확인
		try{
			if(userRepository.existsById(email)) {
				return ResponseDTO.setFailed("Existed Email.");
			}
		}catch(Exception e){
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
		}catch(Exception e) {
			return ResponseDTO.setFailed("DB Error");
		}
		
		// 성공시 success response 반환
		return ResponseDTO.setSuccess("Sign up Success", null);
		
	}
	
}
