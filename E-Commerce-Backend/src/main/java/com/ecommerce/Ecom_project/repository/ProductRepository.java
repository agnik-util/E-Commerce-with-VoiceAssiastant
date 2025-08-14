package com.ecommerce.Ecom_project.repository;

// To easily perform database operations (like save, find, delete) on the Product entity without writing SQL or boilerplate code.
// Spring Data JPA auto-generates the implementation at runtime, so we just define the interface and it gives us all the methods we need.

import com.ecommerce.Ecom_project.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {


}
