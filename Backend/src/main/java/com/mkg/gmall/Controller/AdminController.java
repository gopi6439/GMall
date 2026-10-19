package com.mkg.gmall.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mkg.gmall.Exception.RetriveDataException;
import com.mkg.gmall.Service.AllProductsService;
import com.mkg.gmall.Service.AllUsersService;
import com.mkg.gmall.Service.Admin.AdminService;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class AdminController {
	private AdminService adminService;
	private AllProductsService allProductsService;
	private AllUsersService allUsersService;
	
	public AdminController(AdminService adminService,AllProductsService allProductsService,AllUsersService allUsersService) {
		this.adminService = adminService;
		this.allProductsService = allProductsService;
		this.allUsersService=allUsersService;
	}
	
	
	@GetMapping("/allUsers")
	public ResponseEntity<?> getAllUsers(){
		try {
			return ResponseEntity.ok(adminService.getAllUsers());
			
		}catch(RetriveDataException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	
	@PutMapping("/manageUsers/{userId}")
	public ResponseEntity<?> updateUser(@PathVariable String userId) {
		try {
			adminService.updateUserStatus(userId);
			return ResponseEntity.ok("Updated Successfully");
		}catch(RetriveDataException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	@DeleteMapping("/deleteUser/{userId}")
	public ResponseEntity<?> deleteUser(@PathVariable String userId){
		adminService.deleteUser(userId);
		return ResponseEntity.ok("Deleted Succesfully");
	}
	
	@GetMapping("/allProducts")
	public ResponseEntity<?> getAllProducts(){
		try {
			return ResponseEntity.ok(adminService.getAllProducts());
		}catch(RetriveDataException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	
	@DeleteMapping("/rejectProduct/{productId}")
	public ResponseEntity<?> deleteProduct(@PathVariable String productId){
		allProductsService.deleteProduct(productId);
		return ResponseEntity.ok("Deleted");
	}
	
	@PutMapping("/manageProducts/{productId}")
	public ResponseEntity<?> updateProductStatus(@PathVariable String productId) {
		try {
			adminService.updateProductStatus(productId);
			return ResponseEntity.ok("Updated Successfully");
		}catch(RetriveDataException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	
	@GetMapping("/allCustomers/{role}")
	public ResponseEntity<?> getAllCustomers(@PathVariable String role){
		try {
			return ResponseEntity.ok(adminService.getAllCustomers(role));
		}catch(RetriveDataException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	@GetMapping("/allSellers/{role}")
	public ResponseEntity<?> getAllSellers(@PathVariable String role){
		try {
			return ResponseEntity.ok(adminService.getAllSellers(role));
		}catch(RetriveDataException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	
}
