package com.mkg.gmall.DTO.Seller;

import java.util.UUID;

import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;

public class MyProducts {
	
	private String productId;
	private String productName;
	private String productImage;
	private String category;
	private Integer stock;
	private Long currentPrice;
	private Long mrp;
	private Integer discount;
	private String description;
	private String status;
	
	
	
	
	
	public MyProducts(String productId, String productName, String productImage, String category, Integer stock,
			Long currentPrice, Long mrp, Integer discount, String description, String status) {
		super();
		this.productId = productId;
		this.productName = productName;
		this.productImage = productImage;
		this.category = category;
		this.stock = stock;
		this.currentPrice = currentPrice;
		this.mrp = mrp;
		this.discount = discount;
		this.description = description;
		this.status = status;
	}
	public String getProductId() {
		return productId;
	}
	public String getProductName() {
		return productName;
	}
	public String getProductImage() {
		return productImage;
	}
	public String getCategory() {
		return category;
	}
	public Integer getStock() {
		return stock;
	}
	public Long getCurrentPrice() {
		return currentPrice;
	}
	public Long getMrp() {
		return mrp;
	}
	public Integer getDiscount() {
		return discount;
	}
	public String getDescription() {
		return description;
	}
	public String getStatus() {
		return status;
	}
	
	
	
	
	
}
