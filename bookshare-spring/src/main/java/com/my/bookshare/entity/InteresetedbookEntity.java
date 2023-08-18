package com.my.bookshare.entity;

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
@Entity(name="Interested")
@Table(name="interestedbook")
public class InteresetedbookEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String interestedid;
	private String id; 
	private String bookid;	
}
