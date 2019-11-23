/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.me.controller;

import com.me.config.JwtTokenUtil;
import com.me.dao.UserDAO;
import com.me.exception.UserException;
import com.me.pojo.User;
import com.me.response.Errors;
import com.me.response.JwtResponse;
import com.me.response.Message;
import com.me.validator.UserValidator;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author bhaVYa
 */
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    @Qualifier("userDao")
    UserDAO userDao;

    @Autowired
    @Qualifier("userValidator")
    UserValidator validator;

    @Autowired
    @Qualifier("jwtTokenUtil")
    private JwtTokenUtil jwtTokenUtil;
    
    @InitBinder("user")
    private void initBinder(WebDataBinder binder) {
        binder.setValidator(validator);
    }
    
    @RequestMapping(value = "/auth/register",
            method = RequestMethod.POST,
            produces = "application/json",
            headers = "content-type=application/x-www-form-urlencoded")
    public ResponseEntity<Object> register(@ModelAttribute("user") User user, BindingResult result) throws Exception{
        validator.validate(user, result);
        if (result.hasErrors()) {
            List<Errors> errors = new ArrayList<Errors>();
            result.getFieldErrors().stream()
                    .forEach(action -> errors.add(new Errors(action.getDefaultMessage())));
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        try {
            User u = userDao.register(user);
            final String token = jwtTokenUtil.generateToken(u);
            return new ResponseEntity<>(new JwtResponse(token),HttpStatus.OK);
        } catch(UserException e) {
            List<Errors> errors = new ArrayList<Errors>();
            errors.add(new Errors(e.getMessage()));
            return new ResponseEntity<>(errors,HttpStatus.BAD_REQUEST);
        }
    }
    
    @RequestMapping(value = "/users/search/{userName}",
            method = RequestMethod.GET,
            produces = "application/json")
    public ResponseEntity<Object> searchUsers(@PathVariable String userName) throws Exception {
        List<User> users = userDao.search(userName);
        return new ResponseEntity<>(users,HttpStatus.OK);
    }
    
    @RequestMapping(value = "/users/follow/{followingId}",
            method = RequestMethod.GET,
            produces = "application/json")
    public ResponseEntity<Object> follow(@PathVariable String followingId, HttpServletRequest request) throws Exception {
        try {
            User user = (User) request.getAttribute("user");
            
            userDao.follow(user, followingId);
            
            return new ResponseEntity<>(new Message("Followed Successfully"), HttpStatus.OK);
        } catch (Exception e) {
            List<Errors> errors = new ArrayList<Errors>();
            errors.add(new Errors(e.getMessage()));
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
    }
    
    @RequestMapping(value = "/users/unfollow/{unfollowingId}",
            method = RequestMethod.GET,
            produces = "application/json")
    public ResponseEntity<Object> unfollow(@PathVariable String unfollowingId, HttpServletRequest request) throws Exception {
        try {
            User user = (User) request.getAttribute("user");
            
            userDao.unfollow(user, unfollowingId);
            
            return new ResponseEntity<>(new Message("Unfollowed Successfully"), HttpStatus.OK);
        } catch (Exception e) {
            List<Errors> errors = new ArrayList<Errors>();
            errors.add(new Errors(e.getMessage()));
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
    }
    
}