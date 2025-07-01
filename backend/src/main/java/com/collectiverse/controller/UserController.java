package com.collectiverse.controller;

import com.collectiverse.model.User;
import com.collectiverse.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> profileData) {
        try {
            User currentUser = userService.getCurrentUser();

            // Update user fields if provided
            if (profileData.containsKey("username")) {
                String newUsername = profileData.get("username");
                if (!newUsername.equals(currentUser.getUsername()) &&
                        userService.existsByUsername(newUsername)) {
                    return ResponseEntity.badRequest()
                            .body(Map.of("error", "Username already exists"));
                }
                currentUser.setUsername(newUsername);
            }

            if (profileData.containsKey("firstName")) {
                currentUser.setFirstName(profileData.get("firstName"));
            }

            if (profileData.containsKey("lastName")) {
                currentUser.setLastName(profileData.get("lastName"));
            }

            if (profileData.containsKey("bio")) {
                currentUser.setBio(profileData.get("bio"));
            }

            User updatedUser = userService.updateUser(currentUser);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }
}