package com.mkg.gmall.Service;

import java.util.Optional;

import com.mkg.gmall.DTO.LoginRequest;
import com.mkg.gmall.DTO.ReturnUserData;
import com.mkg.gmall.Entity.AllUsers;

public interface AllUsersInterface {
	
	public ReturnUserData signIn(AllUsers allUsers);
	
	public ReturnUserData logIn(LoginRequest loginRequest);
}
