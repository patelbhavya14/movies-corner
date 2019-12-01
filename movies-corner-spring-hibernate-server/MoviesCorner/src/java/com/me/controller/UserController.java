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
import java.util.Map;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
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
            produces = "application/json")
    public ResponseEntity<Object> register(@RequestBody User user, BindingResult result) throws Exception {
        validator.validate(user, result);
        if (result.hasErrors()) {
            List<Message> errors = new ArrayList<>();
            result.getFieldErrors().stream()
                    .forEach(action -> errors.add(new Message(action.getDefaultMessage())));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
        try {
            User u = userDao.register(user);
            final String token = jwtTokenUtil.generateToken(u);
            return new ResponseEntity<>(new JwtResponse(token), HttpStatus.OK);
        } catch (UserException e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/users/{userId}",
            method = RequestMethod.GET,
            produces = "application/json")
    public ResponseEntity<Object> getUser(@PathVariable String userId, @RequestHeader HttpHeaders headers) throws Exception {
        try {
            String requestingUser = "";
            if (headers.get("x-auth-token") == null) {
                requestingUser += "guest";
            } else {
                String token = headers.get("x-auth-token").get(0);
                requestingUser += jwtTokenUtil.getUserIdFromToken(token.substring(7));
            }
            
            User user = userDao.getUser(userId);
            JSONObject userJson = new JSONObject();
            userJson.put("userId", user.getUserId());
            userJson.put("userName", user.getUserName());
            userJson.put("firstName", user.getFirstName());
            userJson.put("lastName", user.getLastName());
            userJson.put("userRole", user.getUserRole());
            
            if (!requestingUser.equals("guest")) {
                User reqUser = userDao.getUser(requestingUser);
                if (reqUser.getFollowings().contains(user)) {
                    userJson.put("isFollowing", true);
                } else {
                    userJson.put("isFollowing", false);
                }
            } else {
                userJson.put("isFollowing", false);
            }
            return new ResponseEntity<>(userJson.toMap(), HttpStatus.OK);
        } catch (Exception e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }

    }

    @RequestMapping(value = "/users/search/{userName}",
            method = RequestMethod.GET,
            produces = "application/json")
    public ResponseEntity<Object> searchUsers(@PathVariable String userName) throws Exception {
        List<User> users = userDao.search(userName);
        return new ResponseEntity<>(users, HttpStatus.OK);
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
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
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
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/users/followings/{id}",
            method = RequestMethod.GET,
            produces = "application/json")
    public ResponseEntity<Object> getFollowings(@PathVariable String id, @RequestHeader HttpHeaders headers) throws Exception {
        try {
            String requestingUser = "";
            if (headers.get("x-auth-token") == null) {
                requestingUser += "guest";
            } else {
                String token = headers.get("x-auth-token").get(0);
                requestingUser += jwtTokenUtil.getUserIdFromToken(token.substring(7));
            }
            
            Set<User> followings = userDao.getFollowings(id);
            
            User reqUser = null;
            if (!requestingUser.equals("guest")) {
                reqUser = userDao.getUser(requestingUser);
            }
            
            
            List<Map<String, Object>> list = new ArrayList<>();
            for(User u: followings) {
                JSONObject userJson = new JSONObject();
                userJson.put("userId", u.getUserId());
                userJson.put("userName", u.getUserName());
                userJson.put("firstName", u.getFirstName());
                userJson.put("lastName", u.getLastName());
                userJson.put("userRole", u.getUserRole());
                
                if(!requestingUser.equals("guest")) {
                    if(reqUser.getFollowings().contains(u))
                        userJson.put("isFollowing", true);
                    else
                        userJson.put("isFollowing", false);
                } else {
                    userJson.put("isFollowing", false);
                }
                
                list.add(userJson.toMap());
            }
            
            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (Exception e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/users/followers/{id}",
            method = RequestMethod.GET,
            produces = "application/json")
    public ResponseEntity<Object> getFollowers(@PathVariable String id, @RequestHeader HttpHeaders headers) throws Exception {
        try {
            String requestingUser = "";
            if (headers.get("x-auth-token") == null) {
                requestingUser += "guest";
            } else {
                String token = headers.get("x-auth-token").get(0);
                requestingUser += jwtTokenUtil.getUserIdFromToken(token.substring(7));
            }
            
            Set<User> followers = userDao.getFollowers(id);
            
            User reqUser = null;
            if (!requestingUser.equals("guest")) {
                reqUser = userDao.getUser(requestingUser);
            }
            
            
            List<Map<String, Object>> list = new ArrayList<>();
            for(User u: followers) {
                JSONObject userJson = new JSONObject();
                userJson.put("userId", u.getUserId());
                userJson.put("userName", u.getUserName());
                userJson.put("firstName", u.getFirstName());
                userJson.put("lastName", u.getLastName());
                userJson.put("userRole", u.getUserRole());
                
                if(!requestingUser.equals("guest")) {
                    if(reqUser.getFollowers().contains(u))
                        userJson.put("isFollowing", true);
                    else
                        userJson.put("isFollowing", false);
                } else {
                    userJson.put("isFollowing", false);
                }
                
                list.add(userJson.toMap());
            }
            
            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (Exception e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }
}
