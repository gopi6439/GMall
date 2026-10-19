package com.mkg.gmall.Service.Customer;

import java.util.List;

import com.mkg.gmall.Entity.MyOrders;

public interface MyOrderInterface {
	public String saveOrder(MyOrders myOrders);
	public List<MyOrders> getMyOrders(String userId);
	
	public String deleteMyOrder(String orderId);
}
