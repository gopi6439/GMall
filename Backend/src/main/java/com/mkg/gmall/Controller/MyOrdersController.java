package com.mkg.gmall.Controller;

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

import com.mkg.gmall.Entity.MyOrders;
import com.mkg.gmall.Exception.RetriveDataException;
import com.mkg.gmall.Service.Customer.MyOrderService;

@RestController
@RequestMapping("/api")
@CrossOrigin("https://g-mall-delta.vercel.app")
public class MyOrdersController {
	
	private MyOrderService myOrderService;
	
	public MyOrdersController(MyOrderService myOrderService) {
		this.myOrderService=myOrderService;
	}
	
	
	@PostMapping("/orderPlaced")
	public ResponseEntity<?> saveOrder(@RequestBody MyOrders myOrders){
		try {
			myOrderService.saveOrder(myOrders);
			return ResponseEntity.ok("Order Done...!");
		}catch(Exception e) {
			return ResponseEntity.ok(e.getMessage());
		}
	}
	
	@GetMapping("/myOrders/{userId}")
	public ResponseEntity<?> getMyOrders(@PathVariable String userId){
		try {
			return ResponseEntity.ok(myOrderService.getMyOrders(userId));
		}catch(RetriveDataException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	@DeleteMapping("cancelOrder/{orderId}")
	public ResponseEntity<String> deleteMyOrder(@PathVariable String orderId){
		myOrderService.deleteMyOrder(orderId);
		return ResponseEntity.ok("Cancelled");
	}

}
