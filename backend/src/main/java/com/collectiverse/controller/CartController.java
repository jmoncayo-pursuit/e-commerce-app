package com.collectiverse.controller;

import com.collectiverse.dto.CartItemDTO;
import com.collectiverse.dto.CartResponseDTO;
import com.collectiverse.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartResponseDTO> getCart() {
        Long userId = getUserIdFromContext();
        return ResponseEntity.ok(cartService.getCart(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<CartResponseDTO> addItem(@RequestBody CartItemDTO item) {
        Long userId = getUserIdFromContext();
        return ResponseEntity.ok(cartService.addItem(userId, item));
    }

    @PutMapping("/update")
    public ResponseEntity<CartResponseDTO> updateItem(@RequestBody CartItemDTO item) {
        Long userId = getUserIdFromContext();
        return ResponseEntity.ok(cartService.updateItem(userId, item));
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<CartResponseDTO> removeItem(@PathVariable Long productId) {
        Long userId = getUserIdFromContext();
        return ResponseEntity.ok(cartService.removeItem(userId, productId));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart() {
        Long userId = getUserIdFromContext();
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }

    private Long getUserIdFromContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return Long.parseLong(authentication.getName());
    }
}