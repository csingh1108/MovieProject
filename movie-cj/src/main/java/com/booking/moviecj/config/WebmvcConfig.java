package com.booking.moviecj.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebmvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        // Configure CORS (Cross-Origin Resource Sharing) settings
        corsRegistry.addMapping("/**")
                .allowedOrigins("*") // Allow requests from any origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS") // Allow these HTTP methods
                .allowedHeaders("*") // Allow any headers in the request
                .maxAge(3600); // Set the maximum age of CORS-related information in seconds
    }
}
