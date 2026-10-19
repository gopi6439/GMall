package com.mkg.gmall.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mkg.gmall.DTO.LoginRequest;
import com.mkg.gmall.DTO.ReturnUserData;
import com.mkg.gmall.Entity.AllUsers;
import com.mkg.gmall.Exception.AuthenticateException;
import com.mkg.gmall.Repository.AllUsersRepository;

@Service
public class AllUsersService implements AllUsersInterface{
	
	private AllUsersRepository allUsersRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public AllUsersService(AllUsersRepository allUsersRepository) {
		this.allUsersRepository=allUsersRepository;
	}

	@Override
	public ReturnUserData signIn(AllUsers allUsers) {
		if(allUsersRepository.existsByEmail(allUsers.getEmail())) {
			throw new AuthenticateException("Email Already Exits");
		}else {
			allUsers.setPassword(passwordEncoder.encode(allUsers.getPassword()));
			allUsersRepository.save(allUsers);
			return new ReturnUserData(allUsers.getUserId(), allUsers.getFullName(), allUsers.getEmail(), allUsers.getPhone(), allUsers.getRole(), allUsers.getProfileImage(),allUsers.getStatus(),allUsers.getJoinedDate());
		}
		
	}

	@Override
	public ReturnUserData logIn(LoginRequest loginRequest) {
		
			AllUsers allUsers = allUsersRepository.findByEmail(loginRequest.getEmail()).orElse(null);
			if(allUsers !=null) {
				if(passwordEncoder.matches(loginRequest.getPassword(), allUsers.getPassword()) && allUsers.getRole().equals(loginRequest.getRole())) {
					
					return new ReturnUserData(allUsers.getUserId(), allUsers.getFullName(), allUsers.getEmail(), allUsers.getPhone(), allUsers.getRole(), allUsers.getProfileImage(),allUsers.getStatus(),allUsers.getJoinedDate());
				}else {
					throw new AuthenticateException("Wrong email and Password");
				}
		}else {
			throw new AuthenticateException("No Users Found");
		}
		

}
}	
