package com.my.bookshare.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mypage")
public class MypageController {
	@GetMapping("/")
	public String getMypage(@AuthenticationPrincipal String email) {
		return "로그인된 사용자는 "+ email + "입니다";
	}
}
