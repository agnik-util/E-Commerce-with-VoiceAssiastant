package com.ecommerce.Ecom_project.entity;

//Entities represent your DB tables. JPA maps them automatically.

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity // This annotation tells JPA that this class represents a table in the database
@Data // Lombok annotation: Automatically generates getters, setters, toString, equals, and hashCode methods
@NoArgsConstructor // Lombok annotation: Creates a no-argument constructor (i.e., Product p = new Product();)
@AllArgsConstructor // Lombok annotation: Creates a constructor with all the fields (i.e., Product p = new Product(id, name, description, price, stockQuantity);)
public class Product {

    @Id // Marks this field as the primary key (every product will have a unique ID)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Tells the database to automatically generate the ID value (like auto-increment)
    private Long id; // The unique ID for each product

    private String name;
    private String description;
    private double price;
    private int stockQuantity;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
    }
}

