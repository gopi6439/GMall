package com.mkg.gmall.Service.Seller;

import java.util.List;

import com.mkg.gmall.DTO.Seller.MyProducts;
import com.mkg.gmall.Entity.MyOrders;

public interface SellerInterface {
	
	public List<MyProducts> getMyProducts(String userId);
	
	public List<MyOrders> getOrders(String userId);

}
