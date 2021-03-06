package com.cookie.rentall.product;

import com.cookie.rentall.entity.Booking;
import com.cookie.rentall.entity.Image;
import com.cookie.rentall.entity.Product;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class ProductUpdateRequest {

    public Long id;

    public String category;

    public List<Booking> booking;

    public String name;

    public String firstName;

    public String phoneNumber;

    public String description;

    public BigDecimal unitPrice;

    public String imageUrl;

    public boolean active;

    public Date dateCreated;

    public Date lastUpdated;

    public String city;

    public Boolean deleted;

    public Long userId;

    public String userDescription;

    public String condition;

    public List<Long> imageIds;

    public ProductUpdateRequest() {}

    public ProductUpdateRequest(Product product) {
        this.active = product.isActive();
        this.category = product.getCategory() != null ? product.getCategory().getCategoryName() : null;
        this.city = product.getCity();
        this.dateCreated = product.getDateCreated();
        this.description = product.getDescription();
        this.id = product.getId();
        this.firstName = product.getFirstName();
        this.imageUrl = product.getImageUrl();
        this.name = product.getName();
        this.lastUpdated = product.getLastUpdated();
        this.phoneNumber = product.getPhoneNumber();
        this.unitPrice = product.getUnitPrice();
        this.deleted = product.getDeleted();
        this.userId = product.getUserId();
        this.userDescription = product.getUserDescription();
        this.condition = product.getCondition();
        this.imageIds = product.getImages().stream().map(Image::getId).collect(Collectors.toList());
    }
}
