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
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 *
 * @author bhaVYa
 */
public class UserDAO extends DAO {

    public boolean get(String userName) throws UserException {
        Query q = getSession().createQuery("from User where userName=:userName");
        q.setString("userName", userName);
        List<User> user = q.list();

        if (user.size() > 0) {
            return false;
        } else {
            return true;
        }
    }

    public User register(User user) throws UserException {
        try {
            begin();
            System.out.println("get(user.getUserName()=" + get(user.getUserName()));
            if (!get(user.getUserName())) {
                throw new HibernateException("User Exists");
            }
            BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
            String bcryptPassword = bcrypt.encode(user.getPassword());
            user.setPassword(bcryptPassword);
            
            getSession().save(user);
            commit();
            return user;
        } catch (HibernateException e) {
            rollback();
            throw new UserException(e.getMessage());
        }
    }
}
