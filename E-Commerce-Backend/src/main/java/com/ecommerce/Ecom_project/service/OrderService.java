package com.ecommerce.Ecom_project.service;


import com.ecommerce.Ecom_project.entity.Order;
import com.ecommerce.Ecom_project.entity.User;
import com.ecommerce.Ecom_project.repository.OrderRepository;
import com.ecommerce.Ecom_project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    public Order placeOrder(Long userId, Double amount) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return null;

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setTotalAmount(amount);
        order.setStatus("PENDING");

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByUserId(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return user == null ? List.of() : orderRepository.findByUser(user);
    }
}

