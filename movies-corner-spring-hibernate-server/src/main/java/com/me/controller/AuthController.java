/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.me.controller;

import com.me.config.JwtTokenUtil;
import com.me.dao.AuthDAO;
import com.me.exception.UserException;
import com.me.pojo.User;
import com.me.response.Errors;
import com.me.response.JwtResponse;
import com.me.response.Message;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author bhaVYa
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    @Qualifier("authDao")
    AuthDAO authDao;

    @Autowired
    @Qualifier("jwtTokenUtil")
    private JwtTokenUtil jwtTokenUtil;

    // User Login and return token
    // access: private 
    @RequestMapping(value = "/authenticate", method = RequestMethod.POST, consumes="application/json")
    public Object createAuthenticationToken(@RequestBody User u) throws Exception {
        try {
            User user = authDao.authenticate(u.getUserName(), u.getPassword());
            final String token = jwtTokenUtil.generateToken(user);
            return new ResponseEntity<>(new JwtResponse(token), HttpStatus.OK);
        } catch (UserException e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }

    // Getting user details from token
    // access: private
    @RequestMapping(value = "/getUserDetails", method = RequestMethod.GET)
    public Object getUserDetails(HttpServletRequest request) throws Exception {
        try {
            User user = (User) request.getAttribute("user");
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }
}
