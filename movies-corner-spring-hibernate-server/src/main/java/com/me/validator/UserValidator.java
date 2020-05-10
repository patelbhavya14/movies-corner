/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.me.validator;

import com.me.pojo.User;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

/**
 *
 * @author bhaVYa
 */
public class UserValidator implements Validator {

    @Override
    public boolean supports(Class<?> type) {
        return type.equals(User.class);
    }

    @Override
    public void validate(Object o, Errors errors) {
        User user = (User) o;
        
        if(user.getUserRole() == null) {
            errors.rejectValue("userRole", "error.invalid.userRole", "invalid userRole");
            return;
        }
            
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "userName", "error.invalid.userName", "userName Required");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "error.invalid.password", "password Required");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "firstName", "error.invalid.firstName", "firstName Required");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "lastName", "error.invalid.lastName", "lastName Required");
        
    }

}
