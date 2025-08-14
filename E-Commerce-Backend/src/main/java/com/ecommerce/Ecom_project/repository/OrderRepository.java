package com.ecommerce.Ecom_project.repository;


import com.ecommerce.Ecom_project.entity.Order;
import com.ecommerce.Ecom_project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}

