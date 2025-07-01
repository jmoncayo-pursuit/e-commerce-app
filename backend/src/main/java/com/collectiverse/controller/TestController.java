package com.collectiverse.controller;

import com.collectiverse.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/public")
    public ResponseEntity<?> publicEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "This is a public endpoint");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/private")
    public ResponseEntity<?> privateEndpoint() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        Map<String, String> response = new HashMap<>();
        response.put("message", "This is a private endpoint - you must be authenticated to see this");
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());
        response.put("status", "success");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin")
    public ResponseEntity<?> adminEndpoint() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (!auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Access denied");
            error.put("message", "You must have admin role to access this endpoint");
            return ResponseEntity.status(403).body(error);
        }

        Map<String, String> response = new HashMap<>();
        response.put("message", "This is an admin endpoint - you must have admin role to see this");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }
}