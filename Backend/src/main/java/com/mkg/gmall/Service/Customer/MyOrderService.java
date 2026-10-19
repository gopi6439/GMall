package com.mkg.gmall.Service.Customer;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mkg.gmall.Entity.MyOrders;
import com.mkg.gmall.Exception.RetriveDataException;
import com.mkg.gmall.Repository.MyOrderRepository;

@Service
public class MyOrderService implements MyOrderInterface{
	
	private MyOrderRepository myOrderRepository;
	
	public MyOrderService(MyOrderRepository myOrderRepository) {
		this.myOrderRepository=myOrderRepository;
	}

	@Override
	public String saveOrder(MyOrders myOrders) {
		myOrderRepository.save(myOrders);
		return "Order Succesfully";
	}

	@Override
	public List<MyOrders> getMyOrders(String userId) {
		List<MyOrders> myOrders = myOrderRepository.findByUserId(userId);
		if(myOrders.isEmpty()) {
			throw new RetriveDataException("No Orders");
		}else {
			return myOrders;
		}
		
	}

	@Override
	public String deleteMyOrder(String orderId) {
		myOrderRepository.deleteById(orderId);
		return "order Cancelled";
	}

}
