package com.collectiverse.dto;

import lombok.Data;

@Data
public class CheckoutRequestDTO {
    private Long shippingAddressId;
    private Long billingAddressId;
    private String paymentMethod;
}