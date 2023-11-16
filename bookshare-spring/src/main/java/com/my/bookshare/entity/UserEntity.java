package com.my.bookshare.entity;

import com.my.bookshare.dto.SignUpDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="User")
@Table(name="user")
public class UserEntity {
	@Id
	private String email;  
	private String password; 
	private String name;  
	private String phone; 
	private String img;
	private int id;
	
	public UserEntity(SignUpDTO dto) {
		this.email = dto.getEmail();
		this.password = dto.getPassword();
		this.name = dto.getName();
		this.phone = dto.getPhone();			
	}
	
}
