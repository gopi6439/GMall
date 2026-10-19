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

import com.mkg.gmall.Entity.AddToCart;
import com.mkg.gmall.Exception.RetriveDataException;
import com.mkg.gmall.Service.Customer.AddCartService;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class CutomerController {
	
	private AddCartService addCartService;
	
	public CutomerController(AddCartService addCartService) {
		this.addCartService=addCartService;
	}
	
	
	@PostMapping("/addCart")
	public ResponseEntity<String> addCart(@RequestBody AddToCart addToCart){
		if(addCartService.findByUserIdAndProductId(addToCart.getUserId(), addToCart.getAllProducts().getProductId())) {
			return ResponseEntity.ok("Cart Already Added");
		}else {
			addCartService.setCartData(addToCart);
			return ResponseEntity.ok("Add Cart Successfully");
		}
		
	}
	
	@GetMapping("/myCart/{userId}")
	public ResponseEntity<?> getCartData(@PathVariable String userId){
		try {
			List<AddToCart> addCartData = addCartService.getCartData(userId);
			return ResponseEntity.ok(addCartData);
		}catch(RetriveDataException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
	}
	
	
	@DeleteMapping("/deleteProduct/{userId}/{product_id}")
	public ResponseEntity<?> deleteProduct(@PathVariable String userId,@PathVariable String product_id) {
		try {
			addCartService.deleteProduct(userId,product_id);
			return ResponseEntity.ok("Deleted Succesfully");
	
		}catch(RetriveDataException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
	}
	
	

}
