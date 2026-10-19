package com.mkg.gmall.Service.Customer;

import java.util.List;
import java.util.Optional;

import com.mkg.gmall.Entity.AddToCart;

public interface AddCartInterface {
	
	public String setCartData(AddToCart addToCart);
	public List<AddToCart> getCartData(String userId);
	
	public Boolean findByUserIdAndProductId(String userId,String produvtId);
	
	public String deleteProduct(String userId,String product_id);
   

}
