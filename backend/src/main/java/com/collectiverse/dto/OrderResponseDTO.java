package com.collectiverse.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponseDTO {
    private Long id;
    private List<OrderItemDTO> orderItems;
    private AddressDTO shippingAddress;
    private AddressDTO billingAddress;
    private BigDecimal totalAmount;
    private String status;
    private String paymentStatus;
    private LocalDateTime createdAt;
}