package com.mkg.gmall.Service.Seller;

import com.mkg.gmall.Repository.MyOrderRepository;
import java.util.List;

import org.springframework.stereotype.Service;

import com.mkg.gmall.DTO.Seller.MyProducts;
import com.mkg.gmall.Entity.AllProducts;
import com.mkg.gmall.Entity.MyOrders;
import com.mkg.gmall.Exception.RetriveDataException;
import com.mkg.gmall.Repository.AllProductsRepository;

@Service
public class SellerService implements SellerInterface{
	
	private final MyOrderRepository myOrderRepository;
	private AllProductsRepository allProductsRepository;
	
	public SellerService(AllProductsRepository allProductsRepository, MyOrderRepository myOrderRepository) {
		this.allProductsRepository=allProductsRepository;
		this.myOrderRepository = myOrderRepository;
	}

	@Override
	public List<MyProducts> getMyProducts(String userId) {
			List<AllProducts> myProducts = allProductsRepository.findByUserId(userId);
			if(myProducts == null) {
				throw new RetriveDataException("No Products");
			}else {
				return myProducts.stream().map((data) -> new MyProducts(userId, data.getProductName(), 
						data.getProductImage(), data.getCategory(), data.getStock(),data.getCurrentPrice(), 
						data.getMrp(), data.getDiscount(), data.getDescription(),data.getStatus())).toList();
				
			}
			
		
		
		
	}

	@Override
	public List<MyOrders> getOrders(String userId) {
		return myOrderRepository.findByAllProducts_userId(userId);
		
	}

}
