/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.me.controller;

import com.me.config.JwtTokenUtil;
import com.me.dao.AuthDAO;
import com.me.dao.UserDAO;
import com.me.exception.UserException;
import com.me.pojo.User;
import com.me.response.Errors;
import com.me.response.JwtResponse;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<Object> createAuthenticationToken(HttpServletRequest request) throws Exception {
        try {
            User user = authDao.authenticate(request.getParameter("userName"),
                    request.getParameter("password"));
            final String token = jwtTokenUtil.generateToken(user);
            return new ResponseEntity<>(new JwtResponse(token), HttpStatus.OK);
        } catch (UserException e) {
            List<Errors> errors = new ArrayList<Errors>();
            errors.add(new Errors(e.getMessage()));
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/getUserDetails", method = RequestMethod.GET)
    public ResponseEntity<Object> getUserDetails(HttpServletRequest request) throws Exception {
        try {
            User user = (User) request.getAttribute("user");
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            List<Errors> errors = new ArrayList<Errors>();
            errors.add(new Errors(e.getMessage()));
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
    }
}
