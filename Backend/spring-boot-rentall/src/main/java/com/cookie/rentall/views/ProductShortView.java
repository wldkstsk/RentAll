package com.cookie.rentall.views;

import com.cookie.rentall.entity.Image;
import com.cookie.rentall.entity.Product;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

public class ProductShortView {
    public Long id;
    public String imageUrl;
    public String name;
    public String firstName;
    public String description;
    public BigDecimal unitPrice;
    public String city;
    public List<Long> imageIds;

    public ProductShortView(Product product) {
        this.id = product.getId();
        this.imageUrl = product.getImageUrl();
        this.name = product.getName();
        this.description = product.getDescription();
        this.firstName = product.getFirstName();
        this.unitPrice = product.getUnitPrice();
        this.city = product.getCity();
        this.imageIds = product.getImages().stream().map(Image::getId).collect(Collectors.toList());
    }
}
