/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.me.dao;

import static com.me.dao.DAO.getSession;
import com.me.exception.UserException;
import com.me.pojo.User;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 *
 * @author bhaVYa
 */
public class AuthDAO extends DAO{
    public User authenticate(String userName, String password) throws UserException {
        try {
            begin();
            
            Query q = getSession().createQuery("from User where userName=:userName");
            q.setString("userName", userName);
            
            List<User> list = q.list();
            if(list.isEmpty()) {
                throw new HibernateException("Username or Password is invalid");
            }
            User user = list.get(0);
            BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
            if(!bcrypt.matches(password, user.getPassword()))
                throw new HibernateException("Username or Password is invalid");
            commit();
            return list.get(0);
        } catch (HibernateException e) {
            rollback();
            throw new UserException(e.getMessage());
        }
    }
    
    public User getUser(String userId) throws UserException{
        try {
            begin();
            User user = getSession().get(User.class, Integer.parseInt(userId));
            commit();
            return user;
        } catch (HibernateException e) {
            rollback();
            throw new UserException("User does not exist");
        }
    }
}
