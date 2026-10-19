package com.mkg.gmall.Service.Customer;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mkg.gmall.Entity.AddToCart;
import com.mkg.gmall.Exception.RetriveDataException;
import com.mkg.gmall.Repository.AddCartRepository;

import jakarta.transaction.Transactional;


@Service
public class AddCartService implements AddCartInterface{
	
	private AddCartRepository addCartRepository;
	
	public AddCartService(AddCartRepository addCartRepository) {
		this.addCartRepository=addCartRepository;
	}

	@Override
	public List<AddToCart> getCartData(String userId) {
		List<AddToCart> addCartData = addCartRepository.findByUserId(userId);
		if(addCartData.isEmpty()) {
			throw new RetriveDataException("No Cart Found");
		}else {
			return addCartData;
		}
	}

	@Override
	public String setCartData(AddToCart addToCart) {
		addCartRepository.save(addToCart);
		return "Succesfully Added Cart";
	}

	@Override
	public Boolean findByUserIdAndProductId(String userId, String productId) {
		AddToCart addCartData = addCartRepository.findByUserIdAndAllProducts_productId(userId, productId);
		if(addCartData == null) {
			return false;
		}else{
//			addCartData.setQuantity(addCartData.getQuantity()+1);
			return true;
		}
	}

	@Transactional
	@Override
	public String deleteProduct(String userId,String product_id) {
//		System.out.println("userId :"+userId + ":product id:"+product_id);
			Long count = addCartRepository.deleteByUserIdAndAllProducts_ProductId(userId, product_id);
			if(count == 0) {
				throw new RetriveDataException("Product not found");
			}
			return "Successfully Deleted";
	}

}
