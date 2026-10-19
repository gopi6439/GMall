package com.mkg.gmall.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mkg.gmall.Entity.AllUsers;
import java.util.List;


@Repository
public interface AllUsersRepository extends JpaRepository<AllUsers, String>{

	public Optional<AllUsers> findByEmail(String email);
	
	public boolean existsByEmail(String email);
	
	public List<AllUsers> findByRole(String role);
	
	
	
}
