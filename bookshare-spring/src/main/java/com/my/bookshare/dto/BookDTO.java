package com.my.bookshare.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDTO {
	private int bookid; 
	private String title;
	private String author;
	private String publisher;
	private String location;
	private String types;
	private String bookimg;
	private int id;

	
}
