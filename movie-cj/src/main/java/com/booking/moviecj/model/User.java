package com.booking.moviecj.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer uid;                 // User ID generated automatically

    private String username;            // Username of the user
    private String email;               // Email address of the user

    @JsonIgnore
    private String password;            // Password of the user (ignored during JSON serialization)

    @Enumerated(EnumType.STRING)
    private JobType role;               // Role of the user (e.g., USER, ADMIN, etc.)

    private Boolean isLoggedIn;         // Status indicating whether the user is currently logged in
}
