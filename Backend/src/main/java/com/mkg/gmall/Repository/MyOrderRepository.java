package com.mkg.gmall.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mkg.gmall.Entity.MyOrders;

@Repository
public interface MyOrderRepository extends JpaRepository<MyOrders, String>{

	public List<MyOrders> findByUserId(String userId);
	
	public List<MyOrders> findByAllProducts_userId(String userId);
}
