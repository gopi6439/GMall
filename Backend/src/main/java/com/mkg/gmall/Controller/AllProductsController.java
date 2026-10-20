package com.mkg.gmall.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mkg.gmall.Entity.AllProducts;
import com.mkg.gmall.Service.AllProductsService;

@RestController
@RequestMapping("/api")
@CrossOrigin("https://g-mall-delta.vercel.app")
public class AllProductsController {
	
	private AllProductsService allProductsService;
	
	public AllProductsController(AllProductsService allProductsService) {
		this.allProductsService=allProductsService;
	}
	
	
	@PostMapping("/addProduct")
	public ResponseEntity<?> addProduct(@RequestBody AllProducts allProducts){
		allProductsService.addProduct(allProducts);
		return ResponseEntity.status(HttpStatus.CREATED).body("Product Added Successfully..!");
	}
	
	@GetMapping("/getAllProducts")
	public List<AllProducts> getAllProducts(){
		return allProductsService.getAllProducts();
	}
	
	@DeleteMapping("/deleteProduct/{productId}")
	public ResponseEntity<String> deleteProduct(@PathVariable String productId){
		allProductsService.deleteProduct(productId);
		return ResponseEntity.ok("Product Delete Successfully");
	}

}
