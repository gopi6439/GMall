package com.mkg.gmall.Service;

import java.util.List;

import com.mkg.gmall.Entity.AllProducts;

public interface AllProductsInterface {
	
	public String addProduct(AllProducts allProducts);
	
	public List<AllProducts> getAllProducts();
	
	public String deleteProduct(String productId);

}
