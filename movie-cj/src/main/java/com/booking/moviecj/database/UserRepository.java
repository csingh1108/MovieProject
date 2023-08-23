package com.booking.moviecj.database;

import com.booking.moviecj.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

    // Method to find a user by username
    User findByUsername(String username);

    // Method to find users by role
    List<User> findByRole(String role);

    // You can also write custom queries using @Query
    // For example, to find users with a specific role using a custom query:
    @Query("SELECT u FROM User u WHERE u.role = ?1")
    List<User> findUsersByRole(String role);
}
