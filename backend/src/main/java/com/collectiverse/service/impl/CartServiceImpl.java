package com.collectiverse.service.impl;

import com.collectiverse.dto.CartItemDTO;
import com.collectiverse.dto.CartItemResponseDTO;
import com.collectiverse.dto.CartResponseDTO;
import com.collectiverse.exception.ResourceNotFoundException;
import com.collectiverse.model.Cart;
import com.collectiverse.model.CartItem;
import com.collectiverse.model.Product;
import com.collectiverse.model.User;
import com.collectiverse.repository.CartItemRepository;
import com.collectiverse.repository.CartRepository;
import com.collectiverse.repository.ProductRepository;
import com.collectiverse.repository.UserRepository;
import com.collectiverse.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public CartResponseDTO getCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> createNewCart(userId));
        return mapToCartResponseDTO(cart);
    }

    @Transactional
    protected Cart createNewCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Override
    @Transactional
    public CartResponseDTO addItem(Long userId, CartItemDTO itemDTO) {
        Cart cart = getOrCreateCart(userId);
        Product product = productRepository.findById(itemDTO.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        CartItem existingItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), product.getId())
                .orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + itemDTO.getQuantity());
            cartItemRepository.save(existingItem);
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(itemDTO.getQuantity());
            cartItemRepository.save(newItem);
        }

        return mapToCartResponseDTO(cart);
    }

    @Override
    @Transactional
    public CartResponseDTO updateItem(Long userId, CartItemDTO itemDTO) {
        Cart cart = getOrCreateCart(userId);
        CartItem item = cartItemRepository.findByCartIdAndProductId(cart.getId(), itemDTO.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Item not found in cart"));

        item.setQuantity(itemDTO.getQuantity());
        cartItemRepository.save(item);

        return mapToCartResponseDTO(cart);
    }

    @Override
    @Transactional
    public CartResponseDTO removeItem(Long userId, Long productId) {
        Cart cart = getOrCreateCart(userId);
        cartItemRepository.deleteByCartIdAndProductId(cart.getId(), productId);
        // Force refresh from DB
        cart = cartRepository.findById(cart.getId()).orElseThrow();
        return mapToCartResponseDTO(cart);
    }

    @Override
    @Transactional
    public void clearCart(Long userId) {
        Cart cart = getOrCreateCart(userId);
        cartItemRepository.deleteAll(cart.getItems());
    }

    private Cart getOrCreateCart(Long userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> createNewCart(userId));
    }

    private CartResponseDTO mapToCartResponseDTO(Cart cart) {
        CartResponseDTO response = new CartResponseDTO();
        response.setId(cart.getId());

        List<CartItemResponseDTO> items = cart.getItems().stream()
                .map(this::mapToCartItemResponseDTO)
                .collect(Collectors.toList());
        response.setItems(items);

        double totalPrice = items.stream()
                .mapToDouble(CartItemResponseDTO::getSubtotal)
                .sum();
        response.setTotalPrice(totalPrice);

        int totalItems = items.stream()
                .mapToInt(CartItemResponseDTO::getQuantity)
                .sum();
        response.setTotalItems(totalItems);

        return response;
    }

    private CartItemResponseDTO mapToCartItemResponseDTO(CartItem item) {
        CartItemResponseDTO dto = new CartItemResponseDTO();
        dto.setId(item.getId());
        dto.setProductId(item.getProduct().getId());
        dto.setProductName(item.getProduct().getName());
        dto.setProductImage(item.getProduct().getImageUrl());
        dto.setPrice(item.getProduct().getPrice().doubleValue());
        dto.setQuantity(item.getQuantity());
        dto.setSubtotal(item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())).doubleValue());
        return dto;
    }
}