package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@Controller
@RequestMapping("admin")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping()
    public String showAdminGeneralPage(Principal principal, Model model) {
        User user = userService.getUserByUsername(principal.getName());
        model.addAttribute("admin", userService.getUser(user.getId()));
        model.addAttribute("listOfUsers", userService.getAllUsers());
        model.addAttribute("personalRole", user.convertSetOfRoleToString(userService.getUser(user.getId()).getRoles()));
        model.addAttribute("roles", roleService.getRoles());
        return "viewAdmin/adminPage";
    }

    @GetMapping("/personalPage")
    public String showAdminPersonalPage(Principal principal, Model model) {
        User userTest = userService.getUserByUsername(principal.getName());
        model.addAttribute("user", userTest);
        model.addAttribute("login", userTest);
        model.addAttribute("role", userTest.convertSetOfRoleToString(userTest.getRoles()));
        return "/user";
    }

}
