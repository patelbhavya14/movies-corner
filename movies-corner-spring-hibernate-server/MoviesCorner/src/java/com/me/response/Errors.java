/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.me.response;

/**
 *
 * @author bhaVYa
 */
public class Errors {
    private String error;
    
    public Errors(String e) {
        this.error = e;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
