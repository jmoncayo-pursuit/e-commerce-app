package com.collectiverse.dto;

import lombok.Data;

@Data
public class ProductImageDTO {
    private Long id;
    private String imageUrl;
    private String altText;
    private Integer displayOrder;
}