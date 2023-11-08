package com.example.management.service;

import com.example.management.model.User;

import java.util.List;

public interface UserService {
    User addUser(User user);
    List<User> getAllUsers();
    User updateUser(User user, Long id);
    User getUserById(Long id);
    void deleteUser(Long id);
}
