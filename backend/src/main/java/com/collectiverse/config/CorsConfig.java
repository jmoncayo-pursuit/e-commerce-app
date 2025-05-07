package com.collectiverse.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Value("${spring.web.cors.allowed-origins}")
    private String[] allowedOrigins;

    @Value("${spring.web.cors.allowed-methods}")
    private String[] allowedMethods;

    @Value("${spring.web.cors.allowed-headers}")
    private String[] allowedHeaders;

    @Value("${spring.web.cors.allow-credentials}")
    private boolean allowCredentials;

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        for (String origin : allowedOrigins) {
            config.addAllowedOrigin(origin);
        }

        for (String method : allowedMethods) {
            config.addAllowedMethod(method);
        }

        for (String header : allowedHeaders) {
            config.addAllowedHeader(header);
        }

        config.setAllowCredentials(allowCredentials);
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}