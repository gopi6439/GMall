package com.mkg.gmall.Service.Admin;

import java.util.List;

import com.mkg.gmall.Entity.AllProducts;
import com.mkg.gmall.Entity.AllUsers;

public interface AdminInterface {
	
	public List<AllUsers> getAllUsers();
	
	public String updateUserStatus(String userId);
	
	public String updateProductStatus(String productId);
	
	public String deleteUser(String userId);
	
	public List<AllProducts> getAllProducts();
	
	public List<AllUsers> getAllCustomers(String role);
	
	public List<AllUsers> getAllSellers(String role);

}
