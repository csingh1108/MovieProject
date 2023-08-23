package com.booking.moviecj.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginResponseDTO {

    private String email;      // Email of the logged-in user
    private Integer uid;       // User ID of the logged-in user
    private JobType role;      // Role of the logged-in user (e.g., USER, ADMIN, etc.)
    private Boolean status;    // Status indicating whether the user is active or not
}
