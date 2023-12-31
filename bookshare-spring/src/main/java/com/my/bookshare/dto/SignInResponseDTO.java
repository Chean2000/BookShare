package com.my.bookshare.dto;

import com.my.bookshare.entity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInResponseDTO {
	private String token;
	private int exprTime;
	private UserEntity user;
}
