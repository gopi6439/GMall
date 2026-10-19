package com.mkg.gmall.Service.Admin;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mkg.gmall.Entity.AllProducts;
import com.mkg.gmall.Entity.AllUsers;
import com.mkg.gmall.Exception.RetriveDataException;
import com.mkg.gmall.Repository.AllProductsRepository;
import com.mkg.gmall.Repository.AllUsersRepository;

@Service
public class AdminService implements AdminInterface{
	
	private AllUsersRepository allUsersRepository;
	private AllProductsRepository allProductsRepository;
	
	public AdminService(AllUsersRepository allUsersRepository,AllProductsRepository allProductsRepository) {
		this.allUsersRepository = allUsersRepository;
		this.allProductsRepository=allProductsRepository;
	}

	@Override
	public List<AllUsers> getAllUsers() {
		List<AllUsers> allUsers = allUsersRepository.findAll();
		if(allUsers.isEmpty()) {
			throw new RetriveDataException("No Users Found");
		}else {
			return allUsers;
		}
		
	}

	@Override
	public String updateUserStatus(String userId) {
		AllUsers existUser = allUsersRepository.findById(userId).orElse(null);
		if(existUser != null) {
			existUser.setStatus("Active");
			allUsersRepository.save(existUser);
			return "Updated";
		}else {
			throw new RetriveDataException("No user Found");
		}
		
	}
	
	@Override
	public String updateProductStatus(String productId) {
		AllProducts existUser = allProductsRepository.findById(productId).orElse(null);
		if(existUser != null) {
			existUser.setStatus("Active");
			allProductsRepository.save(existUser);
			return "Updated";
		}else {
			throw new RetriveDataException("No user Found");
		}
		
	}

	@Override
	public String deleteUser(String userId) {
		allUsersRepository.deleteById(userId);
		return "Deleted";
	}

	
	@Override
	public List<AllProducts> getAllProducts() {
		List<AllProducts> allProducts = allProductsRepository.findAll();
		if(allProducts.isEmpty()) {
			throw new RetriveDataException("No Products");
		}else {
			return allProducts;
		}
		
	}

	@Override
	public List<AllUsers> getAllCustomers(String role) {
		List<AllUsers> allCustomers = allUsersRepository.findByRole(role);
		if(allCustomers.isEmpty()) {
			throw new RetriveDataException("No Customers");
		}else {
			return allCustomers;
		}
		
	}

	@Override
	public List<AllUsers> getAllSellers(String role) {
		List<AllUsers> allSellers = allUsersRepository.findByRole(role);
		if(allSellers.isEmpty()) {
			throw new RetriveDataException("No Customers");
		}else {
			return allSellers;
		}
	}

}
