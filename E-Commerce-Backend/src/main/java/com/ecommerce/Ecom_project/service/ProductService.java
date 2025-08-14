package com.ecommerce.Ecom_project.service;

//Service layer contains business logic — keeps controller clean.

import com.ecommerce.Ecom_project.entity.Product;
import com.ecommerce.Ecom_project.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    // More methods...
}

