package com.collectiverse.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class OrderItemDTO {
    private Long id;
    private Long productId;
    private String productTitle;
    private Integer quantity;
    private BigDecimal priceAtPurchase;
    private BigDecimal subtotal;
}