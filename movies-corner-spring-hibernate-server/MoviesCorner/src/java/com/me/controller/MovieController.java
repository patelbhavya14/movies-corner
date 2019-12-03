/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.me.controller;

import com.me.dao.MovieDAO;
import com.me.exception.MovieException;
import com.me.exception.UserException;
import com.me.pojo.Movie;
import com.me.pojo.User;
import com.me.response.Errors;
import com.me.response.Message;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author bhaVYa
 */
@RestController
@RequestMapping("/api")
public class MovieController {
    @Autowired
    @Qualifier("movieDao")
    MovieDAO movieDao;
    
    @RequestMapping(value = "/movies/watchlist/add",
            method = RequestMethod.POST,
            produces = "application/json")
    public ResponseEntity<Object> addToWatchList(@RequestBody Movie movie, HttpServletRequest request) throws Exception {
       User user = null;
       try {
           user = (User) request.getAttribute("user");
           movieDao.addToWatchList(user, movie);
           return new ResponseEntity<>(new Message("Movie added to watchlist"), HttpStatus.OK);
       } catch(MovieException e) {
           List<Message> errors = new ArrayList<>();
           errors.add(new Message(e.getMessage()));
           return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
       }
    }
    
    @RequestMapping(value = "/movies/watchlist/remove",
            method = RequestMethod.POST,
            produces = "application/json")
    public ResponseEntity<Object> removeFromWatchList(@RequestBody Movie movie, HttpServletRequest request) throws Exception {
       User user = null;
       try {
           user = (User) request.getAttribute("user");
           movieDao.removeFromWatchList(user, movie);
           return new ResponseEntity<>(new Message("Movie removed from watchlist"), HttpStatus.OK);
       } catch(MovieException e) {
           List<Message> errors = new ArrayList<>();
           errors.add(new Message(e.getMessage()));
           return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
       }
    }
    
    @RequestMapping(value = "/movies/watchlist",
            method = RequestMethod.POST,
            produces = "application/json")
    public ResponseEntity<Object> isWatchList(@RequestBody Movie movie, HttpServletRequest request) throws Exception {
        User user = null;
       try {
           user = (User) request.getAttribute("user");
           boolean isWatchList;
           if(user == null)
               isWatchList = false;
           else {
               isWatchList = movieDao.isWatchList(movie, user);
           }
           return new ResponseEntity<>(new Message(String.valueOf(isWatchList)), HttpStatus.OK);
       } catch(Exception e) {
           List<Message> errors = new ArrayList<>();
           errors.add(new Message(e.getMessage()));
           return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
       }
    }
    
    @RequestMapping(value = "/movies/watchlist/{userId}",
            method = RequestMethod.GET,
            produces = "application/json")
    public ResponseEntity<Object> getWatchList(@PathVariable String userId) {
        try {
            Set<Movie> watchlist = movieDao.getWatchList(userId);
            return new ResponseEntity<>(watchlist, HttpStatus.OK);
        } catch(MovieException e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }
}
