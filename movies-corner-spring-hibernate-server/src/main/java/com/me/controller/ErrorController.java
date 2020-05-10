/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.me.controller;

import javax.servlet.http.HttpServletRequest;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author bhaVYa
 */
@RestController
@RequestMapping("/api")
public class ErrorController {
    @RequestMapping(value = "/error/404",
            method = RequestMethod.GET,
            produces = "application/json")
    public Object error404(HttpServletRequest request) throws Exception {
        JSONObject json = new JSONObject();
        json.put("error", "Page not Found");
        return new ResponseEntity<>(json.toMap(), HttpStatus.NOT_FOUND);
    }
    
    @RequestMapping(value = "/error/405",
            method = RequestMethod.GET,
            produces = "application/json")
    public Object error405(HttpServletRequest request) throws Exception {
        JSONObject json = new JSONObject();
        json.put("error", "Method not allowed");
        return new ResponseEntity<>(json.toMap(), HttpStatus.NOT_FOUND);
    }
}
