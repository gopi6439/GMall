package com.mkg.gmall.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mkg.gmall.DTO.LoginRequest;
import com.mkg.gmall.DTO.ReturnUserData;
import com.mkg.gmall.Entity.AllUsers;
import com.mkg.gmall.Exception.AuthenticateException;
import com.mkg.gmall.Service.AllUsersService;

@RestController
@RequestMapping("/api")
@CrossOrigin("https://g-mall-delta.vercel.app")
public class AllUsersController {
	
	private AllUsersService allUserService;
	
	public AllUsersController(AllUsersService allUsersService) {
		this.allUserService = allUsersService;
	}

	
	@PostMapping("/signin")
	public ResponseEntity<?> signIn(@RequestBody AllUsers allUsers) {
		try {
			ReturnUserData newUser = allUserService.signIn(allUsers);
			return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
		}catch(AuthenticateException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> logIn(@RequestBody LoginRequest loginRequest){
		try {
			ReturnUserData allUsers = allUserService.logIn(loginRequest);
			return ResponseEntity.ok(allUsers);
		}catch(AuthenticateException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}
			
	}
	
}
