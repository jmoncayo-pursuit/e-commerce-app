package com.collectiverse.controller;

import com.collectiverse.dto.CartItemDTO;
import com.collectiverse.dto.CartResponseDTO;
import com.collectiverse.service.CartService;
import com.collectiverse.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final UserService userService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CartResponseDTO> getCart() {
        Long userId = userService.getCurrentUser().getId();
        return ResponseEntity.ok(cartService.getCart(userId));
    }

    @PostMapping("/add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CartResponseDTO> addItem(@RequestBody CartItemDTO item) {
        Long userId = userService.getCurrentUser().getId();
        return ResponseEntity.ok(cartService.addItem(userId, item));
    }

    @PutMapping("/update")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CartResponseDTO> updateItem(@RequestBody CartItemDTO item) {
        Long userId = userService.getCurrentUser().getId();
        return ResponseEntity.ok(cartService.updateItem(userId, item));
    }

    @DeleteMapping("/remove/{productId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CartResponseDTO> removeItem(@PathVariable Long productId) {
        Long userId = userService.getCurrentUser().getId();
        return ResponseEntity.ok(cartService.removeItem(userId, productId));
    }

    @DeleteMapping("/clear")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> clearCart() {
        Long userId = userService.getCurrentUser().getId();
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}