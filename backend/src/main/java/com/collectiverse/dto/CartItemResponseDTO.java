package com.collectiverse.dto;

import lombok.Data;

@Data
public class CartItemResponseDTO {
    private Long id;
    private Long productId;
    private String productName;
    private String productImage;
    private Integer quantity;
    private Double price;
    private Double subtotal;
}