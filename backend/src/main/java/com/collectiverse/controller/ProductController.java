package com.collectiverse.controller;

import com.collectiverse.model.Product;
import com.collectiverse.model.User;
import com.collectiverse.service.ProductService;
import com.collectiverse.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174", "http://localhost:5175",
        "http://localhost:5176" })
public class ProductController {
    private final ProductService productService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(productService.getProductsByCategory(category));
    }

    @GetMapping("/seller")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Product>> getProductsByCurrentSeller() {
        User currentUser = userService.getCurrentUser();
        return ResponseEntity.ok(productService.getProductsBySeller(currentUser.getId()));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        User currentUser = userService.getCurrentUser();
        return ResponseEntity.ok(productService.createProduct(product, currentUser));
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        return ResponseEntity.ok(productService.updateProduct(id, productDetails));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}