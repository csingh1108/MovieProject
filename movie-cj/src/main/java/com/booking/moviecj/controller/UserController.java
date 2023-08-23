package com.booking.moviecj.controller;

import com.booking.moviecj.model.JobType;
import com.booking.moviecj.model.LoginResponseDTO;
import com.booking.moviecj.model.User;
import com.booking.moviecj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Create a user
    @PostMapping("/register")
    public ResponseEntity<Boolean> createUser(
            @RequestParam String username,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam(required = false) String role) {

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role != null ? JobType.valueOf(role) : JobType.USER);

        User createdUser = userService.createUser(user);
        return createdUser != null
                ? new ResponseEntity<>(true, HttpStatus.CREATED)
                : new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Get all users
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Get user by username
    @GetMapping("/by-username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Update user by username
    @PutMapping("/by-username/{username}")
    public ResponseEntity<User> updateUserByUsername(@PathVariable String username, @RequestBody User user) {
        User updatedUser = userService.updateUserByUsername(username, user);
        return updatedUser != null
                ? new ResponseEntity<>(updatedUser, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Update user email
    @PutMapping("/{userId}/update-email")
    public ResponseEntity<User> updateEmail(@PathVariable int userId, @RequestParam String email) {
        User updatedUser = userService.updateUserEmail(userId, email);
        return updatedUser != null
                ? new ResponseEntity<>(updatedUser, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Update user password
    @PutMapping("/{userId}/update-password")
    public ResponseEntity<User> updatePassword(@PathVariable int userId, @RequestParam String password) {
        User updatedUser = userService.updateUserPassword(userId, password);
        return updatedUser != null
                ? new ResponseEntity<>(updatedUser, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete user by ID
    @DeleteMapping("/deleteUser")
    public ResponseEntity<Map<String, String>> deleteUserByUsername(@RequestParam Integer uid) {
        String deletedName = userService.findUsernameById(uid);
        Boolean userDeleted = userService.deleteUserByUserID(uid);

        Map<String, String> response = new HashMap<>();
        response.put("message", userDeleted ? "User deleted successfully" : "No User Found");
        response.put("name", deletedName);

        return userDeleted
                ? new ResponseEntity<>(response, HttpStatus.OK)
                : new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    // Login user
    @PostMapping ("/login")
    public ResponseEntity<LoginResponseDTO> loginUser(
            @RequestParam String username,
            @RequestParam String password) {

        if (userService.isPasswordCorrect(username, password)) {
            String email = userService.getUserEmail(username);
            Integer uid = userService.getUserID(username);
            JobType role = userService.getUserRole(username);
            Boolean status = userService.getUserStatus(username);
            LoginResponseDTO response = new LoginResponseDTO(email, uid, role, status);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
