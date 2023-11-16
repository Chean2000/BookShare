package com.my.bookshare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.bookshare.Repository.BookRepository;
import com.my.bookshare.dto.BookDTO;
import com.my.bookshare.entity.BookEntity;

@Service
public class BookService {
	
	@Autowired BookRepository bookRepository;
	
	public void addBook(BookDTO dto) {
		BookEntity bookEntity = new BookEntity();
		bookEntity.setTitle(dto.getTitle());
		System.out.println(dto.getTitle());
		bookEntity.setAuthor(dto.getAuthor());
		bookEntity.setPublisher(dto.getPublisher());
		bookEntity.setTypes(dto.getTypes());
		bookEntity.setLocation(dto.getLocation());
		
		try {
			bookRepository.save(bookEntity);
		}catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	

}
