package com.collectiverse.controller;

import com.collectiverse.dto.*;
import com.collectiverse.service.CheckoutService;
import com.collectiverse.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/checkout")
@RequiredArgsConstructor
public class CheckoutController {

    private final CheckoutService checkoutService;
    private final UserService userService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<OrderResponseDTO> processCheckout(@RequestBody CheckoutRequestDTO request) {
        Long userId = userService.getCurrentUser().getId();
        return ResponseEntity.ok(checkoutService.processCheckout(userId, request));
    }

    @GetMapping("/orders")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<OrderResponseDTO>> getUserOrders() {
        Long userId = userService.getCurrentUser().getId();
        return ResponseEntity.ok(checkoutService.getUserOrders(userId));
    }

    @GetMapping("/orders/{orderId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<OrderResponseDTO> getOrderById(@PathVariable Long orderId) {
        return ResponseEntity.ok(checkoutService.getOrderById(orderId));
    }

    @PostMapping("/addresses")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AddressDTO> addAddress(@RequestBody AddressDTO addressDTO) {
        Long userId = userService.getCurrentUser().getId();
        return ResponseEntity.ok(checkoutService.addAddress(userId, addressDTO));
    }

    @GetMapping("/addresses")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<AddressDTO>> getUserAddresses(@RequestParam String type) {
        Long userId = userService.getCurrentUser().getId();
        return ResponseEntity.ok(checkoutService.getUserAddresses(userId, type));
    }

    @PutMapping("/addresses/{addressId}/default")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> setDefaultAddress(@PathVariable Long addressId) {
        Long userId = userService.getCurrentUser().getId();
        checkoutService.setDefaultAddress(userId, addressId);
        return ResponseEntity.ok().build();
    }
}