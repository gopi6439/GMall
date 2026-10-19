package com.mkg.gmall.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mkg.gmall.DTO.Seller.MyProducts;
import com.mkg.gmall.Entity.AllProducts;

@Repository
public interface AllProductsRepository extends JpaRepository<AllProducts, String>{
	
	public List<AllProducts> findByUserId(String userId);

}
