package com.collectiverse.controller;

import com.collectiverse.dto.ProductResponseDTO;
import com.collectiverse.dto.ProductImageDTO;
import com.collectiverse.model.Product;
import com.collectiverse.model.User;
import com.collectiverse.service.ProductService;
import com.collectiverse.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174", "http://localhost:5175",
        "http://localhost:5176" })
public class ProductController {
    private final ProductService productService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        List<ProductResponseDTO> products = productService.getAllProducts().stream()
                .map(this::mapToProductResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(mapToProductResponseDTO(product));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByCategory(@PathVariable String category) {
        List<ProductResponseDTO> products = productService.getProductsByCategory(category).stream()
                .map(this::mapToProductResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(products);
    }

    @GetMapping("/seller")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByCurrentSeller() {
        User currentUser = userService.getCurrentUser();
        List<ProductResponseDTO> products = productService.getProductsBySeller(currentUser.getId()).stream()
                .map(this::mapToProductResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(products);
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ProductResponseDTO> createProduct(@RequestBody Product product) {
        User currentUser = userService.getCurrentUser();
        Product createdProduct = productService.createProduct(product, currentUser);
        return ResponseEntity.ok(mapToProductResponseDTO(createdProduct));
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable Long id,
            @RequestBody Product productDetails) {
        Product updatedProduct = productService.updateProduct(id, productDetails);
        return ResponseEntity.ok(mapToProductResponseDTO(updatedProduct));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }

    private ProductResponseDTO mapToProductResponseDTO(Product product) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setImageUrl(product.getImageUrl());
        dto.setCategory(product.getCategory());
        dto.setStockQuantity(product.getStockQuantity());
        if (product.getSeller() != null) {
            dto.setSellerId(product.getSeller().getId());
            dto.setSellerName(product.getSeller().getUsername());
        }

        // Map the main image as the first image in the images list
        if (product.getImageUrl() != null) {
            ProductImageDTO mainImage = new ProductImageDTO();
            mainImage.setImageUrl(product.getImageUrl());
            mainImage.setAltText(product.getName());
            mainImage.setDisplayOrder(0);
            dto.setImages(List.of(mainImage));
        }

        return dto;
    }
}