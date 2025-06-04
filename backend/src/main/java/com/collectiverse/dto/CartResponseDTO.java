package com.collectiverse.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class CartResponseDTO {
    private Long id;
    private List<CartItemResponseDTO> items;
    private Double totalPrice;
    private Integer totalItems;
    private BigDecimal total;
}