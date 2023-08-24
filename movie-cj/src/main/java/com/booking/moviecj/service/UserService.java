package com.booking.moviecj.service;

import com.booking.moviecj.database.UserRepository;
import com.booking.moviecj.model.JobType;
import com.booking.moviecj.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //Create user in DB
    public User createUser(User user) {
        return userRepository.save(user);
    }

    //Get all users in DB
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    //Get users by username
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    //Update users by username
    public User updateUserByUsername(String username, User updatedUser) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            updatedUser.setUid(user.getUid()); // Ensure the updated user has the correct UID
            return userRepository.save(updatedUser);
        } else {
            return null;
        }
    }

    //Update user email by user ID
    public User updateUserEmail(int userId, String email) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setEmail(email);
            return userRepository.save(user);
        } else {
            return null;
        }
    }

    //Update user password by user ID
    public User updateUserPassword(int userId, String password) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setPassword(password);
            return userRepository.save(user);
        } else {
            return null;
        }
    }

    //Check if user password is correct for login
    public boolean isPasswordCorrect(String username, String password) {
        // Retrieve the user from the database based on the provided username
        User user = userRepository.findByUsername(username);

        // Check if the user exists and the password matches
        Boolean isPassCorrect = user.getPassword().equals(password);
        if(isPassCorrect) {
            user.setIsLoggedIn(true);
            userRepository.save(user);
            return true;
        }
        return false;

    }

    //Get user email by username
    public String getUserEmail(String username) {
        User user = userRepository.findByUsername(username);
        return user.getEmail();
    }

    //Get user ID by username
    public Integer getUserID(String username) {
        User user = userRepository.findByUsername(username);
        return user.getUid();
    }

    //Get user role by username
    public JobType getUserRole(String username) {
        User user = userRepository.findByUsername(username);
        return user.getRole();
    }

    //Delete user by user ID
    public Boolean deleteUserByUserID(Integer uid) {
        Optional<User> userOptional = userRepository.findById(uid);

        if(userOptional.isPresent()){
            User user = userOptional.get();
            userRepository.delete(user);
            return true;
        }else{
            return false;
        }
    }

    //Find username by user ID
    public String findUsernameById(Integer uid) {
        Optional<User> userOptional = userRepository.findById(uid);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getUsername();
        } else {
            return null;
        }
    }

    //Get user login status by username
    public Boolean getUserStatus(String username) {
        User user = userRepository.findByUsername(username);
        return user.getIsLoggedIn();
    }
}
