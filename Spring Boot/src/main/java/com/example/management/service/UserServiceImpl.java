package com.example.management.service;

import com.example.management.exception.UserNotFoundException;
import com.example.management.model.User;
import com.example.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(User user, Long id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(()-> new UserNotFoundException("Sorry, user with id:" + id + " does not exists"));

        existingUser.setName(user.getName());
        existingUser.setSurname(user.getSurname());
        existingUser.setGender(user.getGender());
        existingUser.setBirthdate(user.getBirthdate());
        existingUser.setHomeAddress(user.getHomeAddress());
        existingUser.setWorkAddress(user.getWorkAddress());

        userRepository.save(existingUser);
        return existingUser;
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(()-> new UserNotFoundException("Sorry, user with id:" + id + " does not exists"));
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)){
            throw new UserNotFoundException("Sorry, user with id:" + id + " does not exists");
        }else{
            userRepository.deleteById(id);
        }
    }
}
