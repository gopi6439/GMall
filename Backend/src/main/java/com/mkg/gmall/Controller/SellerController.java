package com.mkg.gmall.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mkg.gmall.DTO.Seller.MyProducts;
import com.mkg.gmall.Exception.RetriveDataException;
import com.mkg.gmall.Service.AllProductsService;
import com.mkg.gmall.Service.Seller.SellerService;

@RestController
@RequestMapping("/api")
@CrossOrigin("https://g-mall-delta.vercel.app")
public class SellerController {
	
	private SellerService sellerService;
	private AllProductsService allProductsService;
	
	public SellerController(SellerService sellerService,AllProductsService allProductsService) {
		this.sellerService=sellerService;
		this.allProductsService=allProductsService;
	}
	
	@GetMapping("/myProducts/{userId}")
	public ResponseEntity<?> getMyProducts(@PathVariable String userId){
		try {
			List<MyProducts> myProducts = sellerService.getMyProducts(userId);
			return ResponseEntity.ok(myProducts);
		}catch(RetriveDataException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
	}
	
	
	@DeleteMapping("/deleteMyProduct/{productId}")
	public ResponseEntity<?> deleteMyProduct(@PathVariable String StringId){
		allProductsService.deleteProduct(StringId);
		return ResponseEntity.ok("Deleted");
	}
	
	@GetMapping("/totalOrder/{userId}")
	public ResponseEntity<?> getOrders(@PathVariable String userId){
		try {
			List<MyProducts> myProducts = sellerService.getMyProducts(userId);
			return ResponseEntity.ok(myProducts);
		}catch(RetriveDataException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
	}
	
	
}
