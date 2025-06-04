package com.collectiverse.dto;

import lombok.Data;

@Data
public class CartItemResponseDTO {
    private Long id;
    private Long productId;
    private String productName;
    private String productImage;
    private Double price;
    private Integer quantity;
    private Double subtotal;
}