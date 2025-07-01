package com.collectiverse.config;

import com.collectiverse.model.Product;
import com.collectiverse.model.User;
import com.collectiverse.repository.ProductRepository;
import com.collectiverse.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        // Always ensure users exist first, especially the seller user
        if (userRepository.count() == 0 || !userRepository.findByUsername("seller").isPresent()) {
            loadUsers();
        }

        // Only load products if there are none and seller exists
        if (productRepository.count() == 0) {
            loadProducts();
        }
    }

    @Transactional
    private void loadUsers() {
        User adminUser = new User();
        adminUser.setUsername("admin");
        adminUser.setEmail("admin@example.com");
        adminUser.setPasswordHash(passwordEncoder.encode("admin123"));
        adminUser.setFirstName("Admin");
        adminUser.setLastName("User");
        Set<String> adminRoles = new HashSet<>();
        adminRoles.add("ROLE_ADMIN");
        adminRoles.add("ROLE_USER");
        adminUser.setRoles(adminRoles);
        userRepository.save(adminUser);

        User sellerUser = new User();
        sellerUser.setUsername("seller");
        sellerUser.setEmail("seller@example.com");
        sellerUser.setPasswordHash(passwordEncoder.encode("seller123"));
        sellerUser.setFirstName("Seller");
        sellerUser.setLastName("User");
        Set<String> sellerRoles = new HashSet<>();
        sellerRoles.add("ROLE_USER");
        sellerUser.setRoles(sellerRoles);
        userRepository.save(sellerUser);
    }

    @Transactional
    private void loadProducts() {
        // Get seller user, which should exist by now
        User seller = userRepository.findByUsername("seller")
                .orElseGet(() -> {
                    // As fallback, create seller if somehow it doesn't exist
                    User newSeller = new User();
                    newSeller.setUsername("seller");
                    newSeller.setEmail("seller@example.com");
                    newSeller.setPasswordHash(passwordEncoder.encode("seller123"));
                    newSeller.setFirstName("Seller");
                    newSeller.setLastName("User");
                    Set<String> sellerRoles = new HashSet<>();
                    sellerRoles.add("ROLE_USER");
                    newSeller.setRoles(sellerRoles);
                    return userRepository.save(newSeller);
                });

        // Comic Books
        Product spiderman = new Product();
        spiderman.setName("Amazing Spider-Man #1 Replica");
        spiderman.setDescription("A replica of the iconic first appearance of Spider-Man. Perfect for collectors.");
        spiderman.setPrice(new BigDecimal("129.99"));
        spiderman.setImageUrl("https://via.placeholder.com/300x400?text=Spider-Man+Comic");
        spiderman.setCategory("Comics");
        spiderman.setStockQuantity(15);
        spiderman.setSeller(seller);
        productRepository.save(spiderman);

        Product batman = new Product();
        batman.setName("Batman: The Killing Joke");
        batman.setDescription("Alan Moore's classic Batman story exploring the Joker's origin.");
        batman.setPrice(new BigDecimal("49.99"));
        batman.setImageUrl("https://via.placeholder.com/300x400?text=Batman+Comic");
        batman.setCategory("Comics");
        batman.setStockQuantity(20);
        batman.setSeller(seller);
        productRepository.save(batman);

        // Action Figures
        Product ironman = new Product();
        ironman.setName("Iron Man Mark 42 Figure");
        ironman.setDescription("Highly detailed Iron Man action figure from the Marvel Cinematic Universe.");
        ironman.setPrice(new BigDecimal("89.99"));
        ironman.setImageUrl("https://via.placeholder.com/300x400?text=Iron+Man+Figure");
        ironman.setCategory("Action Figures");
        ironman.setStockQuantity(10);
        ironman.setSeller(seller);
        productRepository.save(ironman);

        Product superman = new Product();
        superman.setName("Superman Classic Figure");
        superman.setDescription("Classic Superman figure with cloth cape and multiple articulation points.");
        superman.setPrice(new BigDecimal("59.99"));
        superman.setImageUrl("https://via.placeholder.com/300x400?text=Superman+Figure");
        superman.setCategory("Action Figures");
        superman.setStockQuantity(12);
        superman.setSeller(seller);
        productRepository.save(superman);

        // Retro Games
        Product zelda = new Product();
        zelda.setName("The Legend of Zelda (NES)");
        zelda.setDescription("Original Nintendo Entertainment System cartridge of the classic adventure game.");
        zelda.setPrice(new BigDecimal("199.99"));
        zelda.setImageUrl("https://via.placeholder.com/300x400?text=Zelda+Game");
        zelda.setCategory("Retro Games");
        zelda.setStockQuantity(5);
        zelda.setSeller(seller);
        productRepository.save(zelda);

        Product mario = new Product();
        mario.setName("Super Mario Bros 3 (NES)");
        mario.setDescription("One of the most beloved Mario games of all time for the Nintendo Entertainment System.");
        mario.setPrice(new BigDecimal("99.99"));
        mario.setImageUrl("https://via.placeholder.com/300x400?text=Mario+Game");
        mario.setCategory("Retro Games");
        mario.setStockQuantity(8);
        mario.setSeller(seller);
        productRepository.save(mario);
    }
}