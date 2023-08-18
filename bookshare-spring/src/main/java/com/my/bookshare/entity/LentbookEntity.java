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
@Entity(name="Lent")
@Table(name="lentbook")
public class LentbookEntity {

	@Id
	private String lentdate; 
	private String returndate; 
	private String extenddate; 
	private String email; 
	private String bookid; 
	private String id;
}
