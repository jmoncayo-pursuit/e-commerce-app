package com.collectiverse.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;

@RestController
@RequestMapping("/api/unsplash")
@CrossOrigin(origins = "http://localhost:5173")
public class UnsplashController {

    @Value("${unsplash.access.key}")
    private String unsplashAccessKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String UNSPLASH_API_URL = "https://api.unsplash.com";

    @GetMapping("/search")
    public ResponseEntity<?> searchPhotos(
            @RequestParam String query,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int per_page) {

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Client-ID " + unsplashAccessKey);

        String url = UNSPLASH_API_URL + "/search/photos?query=" + query + "&page=" + page + "&per_page=" + per_page;
        HttpEntity<?> entity = new HttpEntity<>(headers);

        return restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
    }

    @GetMapping("/random")
    public ResponseEntity<?> getRandomPhotos(@RequestParam(defaultValue = "10") int count) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Client-ID " + unsplashAccessKey);

        String url = UNSPLASH_API_URL + "/photos/random?count=" + count;
        HttpEntity<?> entity = new HttpEntity<>(headers);

        return restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
    }

    @GetMapping("/photos/{id}")
    public ResponseEntity<?> getPhotoById(@PathVariable String id) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Client-ID " + unsplashAccessKey);

        String url = UNSPLASH_API_URL + "/photos/" + id;
        HttpEntity<?> entity = new HttpEntity<>(headers);

        return restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
    }
}