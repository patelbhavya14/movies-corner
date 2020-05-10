/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.me.dao;

import com.me.exception.UserException;
import com.me.pojo.User;
import java.util.List;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 *
 * @author bhaVYa
 */
public class AuthDAO extends DAO{
    
    // User authentication
    public User authenticate(String userName, String password) throws UserException {
        try {
            begin();
            
            Query q = getSession().createQuery("FROM User WHERE userName=:userName");
            q.setString("userName", userName);
            
            @SuppressWarnings("unchecked")
			List<User> list = q.list();
            if(list.isEmpty()) {
                throw new HibernateException("Username or Password is invalid");
            }
            User user = list.get(0);
            BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
            if(!bcrypt.matches(password, user.getPassword()))
                throw new HibernateException("Username or Password is invalid");
            commit();
            close();
            return user;
        } catch (HibernateException e) {
            rollback();
            throw new UserException(e.getMessage());
        }
    }
    
    // Getting user details from userId
    public User getUser(String userId) throws UserException{
        try {
            begin();
            User user = (User) getSession().get(User.class, Integer.parseInt(userId));
            commit();
            close();
            return user;
        } catch (HibernateException e) {
            rollback();
            throw new UserException("User does not exist");
        }
    }
}
