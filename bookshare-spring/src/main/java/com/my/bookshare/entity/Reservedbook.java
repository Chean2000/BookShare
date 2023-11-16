package com.my.bookshare.entity;

import jakarta.persistence.Entity;
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
@Entity(name="Reserved")
@Table(name="reservedbook")
public class Reservedbook {
	
	@Id
	private String reserveddate; 
	private int bookid; 
	private int id;
}
