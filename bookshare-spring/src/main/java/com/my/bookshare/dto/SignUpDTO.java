package com.my.bookshare.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDTO {
	private String email; 
	private String password; 
	private String passwordCheck;
	private String name; 
	private String phone;
	private String id; 
	private String img;
	
}
