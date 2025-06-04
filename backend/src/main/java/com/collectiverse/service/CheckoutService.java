package com.collectiverse.service;

import com.collectiverse.dto.CheckoutRequestDTO;
import com.collectiverse.dto.OrderResponseDTO;
import com.collectiverse.dto.AddressDTO;
import java.util.List;

public interface CheckoutService {
    OrderResponseDTO processCheckout(Long userId, CheckoutRequestDTO request);

    List<OrderResponseDTO> getUserOrders(Long userId);

    OrderResponseDTO getOrderById(Long orderId);

    AddressDTO addAddress(Long userId, AddressDTO addressDTO);

    List<AddressDTO> getUserAddresses(Long userId, String addressType);

    void setDefaultAddress(Long userId, Long addressId);
}