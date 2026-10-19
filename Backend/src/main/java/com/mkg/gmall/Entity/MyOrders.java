package com.mkg.gmall.Entity;

import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name="my_orders")
public class MyOrders {
	
	@Id
	private String orderId;
	
	@PrePersist
	public void generateOrderId() {
		if(orderId == null) {
			orderId = UUID.randomUUID().toString().replace("-", "").substring(0,7);
		}
	}
	
	@ManyToOne
	@JoinColumn(name="product_id")
	private AllProducts allProducts;
	private String userId;
	private String orderDate;
	private String payMode;

	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public AllProducts getAllProducts() {
		return allProducts;
	}
	public void setAllProducts(AllProducts allProducts) {
		this.allProducts = allProducts;
	}
	public String getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}
	public String getPayMode() {
		return payMode;
	}
	public void setPayMode(String payMode) {
		this.payMode = payMode;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	

	

}
