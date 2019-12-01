/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.me.controller;

import com.me.dao.MovieDAO;
import com.me.pojo.Movie;
import com.me.pojo.User;
import com.me.response.Message;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
            method = RequestMethod.GET,
            produces = "application/json")
    public Object addToWatchList(@RequestBody Movie movie, HttpServletRequest request) throws Exception {
       User user;
       try {
           user = (User) request.getAttribute("user");
           return movieDao.addToWatchList(user, movie);
       } catch(Exception e) {
           return new Message("duplicate");
       }
    }
}
