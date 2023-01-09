package ru.kata.spring.boot_security.demo.service;



import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {
     List<User> getAllUsers();

     User getUser(Long id);

     void save(User user);

     void updateUser(Long id, User user);

     void deleteUser(Long id);
     User getUserByUsername(String username);

}
