package com.cookie.rentall.dao;

import com.cookie.rentall.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {

    // equals to SELECT * FROM product where category_id=?

    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);

    // equals to Select * FROM Product p WHERE p.name LIKE CONCAT('%', :name , '$')
    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);

    Page<Product> findByCityContaining(@RequestParam("city") String city, Pageable pageable);
}