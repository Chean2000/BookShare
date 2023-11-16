package com.my.bookshare.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.my.bookshare.dto.BookDTO;
import com.my.bookshare.service.BookService;

@RestController
@RequestMapping("/api/mypage")
public class MypageController {
	
	@Autowired BookService bookService;

	@GetMapping("/addbook")
	public void addBook(@RequestBody BookDTO requestBody) {
		 bookService.addBook(requestBody);		
	}

	
}
