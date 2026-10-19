package com.mkg.gmall.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mkg.gmall.Entity.AddToCart;

import jakarta.transaction.Transactional;

@Repository
public interface AddCartRepository extends JpaRepository<AddToCart, Long>{
	
	public List<AddToCart> findByUserId(String userId);
	
    public AddToCart findByUserIdAndAllProducts_productId(String userId, String product_id);
    
    @Transactional 
    Long deleteByUserIdAndAllProducts_ProductId(String userId, String productId);
    


}
