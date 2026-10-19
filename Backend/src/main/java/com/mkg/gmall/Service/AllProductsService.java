package com.mkg.gmall.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mkg.gmall.Entity.AllProducts;
import com.mkg.gmall.Repository.AllProductsRepository;

@Service
public class AllProductsService implements AllProductsInterface{
	
	private AllProductsRepository allProductsRepository;
	
	public AllProductsService(AllProductsRepository allProductsRepository) {
		this.allProductsRepository=allProductsRepository;
	}

	@Override
	public String addProduct(AllProducts allProducts) {
		allProductsRepository.save(allProducts);
		return "Product Added Successfully";
	}

	@Override
	public List<AllProducts> getAllProducts() {
		
		return allProductsRepository.findAll();
	}

	@Override
	public String deleteProduct(String productId) {
		allProductsRepository.deleteById(productId);
		return "Delete Succesfully";
	}

}
