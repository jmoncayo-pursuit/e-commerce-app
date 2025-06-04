package com.collectiverse.service;

import com.collectiverse.dto.CartItemDTO;
import com.collectiverse.dto.CartResponseDTO;

public interface CartService {
    CartResponseDTO getCart(Long userId);

    CartResponseDTO addItem(Long userId, CartItemDTO item);

    CartResponseDTO updateItem(Long userId, CartItemDTO item);

    CartResponseDTO removeItem(Long userId, Long productId);

    void clearCart(Long userId);
}