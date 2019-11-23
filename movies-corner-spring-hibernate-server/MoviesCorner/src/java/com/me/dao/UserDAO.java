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
import java.util.Set;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
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

    public User getUserFromId(String userId) throws UserException {
        try {
            Query q = getSession().createQuery("from User where userId=:userId");
            q.setInteger("userId", Integer.parseInt(userId));
            
            List<User> list = q.list();
            if(list.isEmpty()) {
                throw new HibernateException("User does not exists");
            }
            return list.get(0);
        } catch (HibernateException e) {
            rollback();
            throw new UserException(e.getMessage());
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
    
    public List<User> search(String userName) throws UserException {
        try {
            begin();
            
            Criteria criteria = getSession().createCriteria(User.class);
            criteria.add(Restrictions.like("userName", userName, MatchMode.START));
            criteria.setProjection(Projections.projectionList()
                .add(Projections.property("userId").as("userId"))
                .add(Projections.property("userName").as("userName"))
                .add(Projections.property("firstName").as("firstName"))
                .add(Projections.property("lastName").as("lastName"))
                .add(Projections.property("userRole").as("userRole")));
            criteria.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            List<User> list = criteria.list();
            
            commit();
            return list;
        } catch (HibernateException e) {
            rollback();
            throw new UserException(e.getMessage());
        }
    }
    
    public void follow(User user, String followingId) throws UserException {
        try {
            begin();
            
            User followingUser = getUserFromId(followingId);
            if(followingUser == user)
                throw new HibernateException("Same User");
            Set<User> followings = user.getFollowings();
            followings.add(followingUser);
            
            getSession().save(user);
            commit();
        } catch (HibernateException e) {
            rollback();
            throw new UserException(e.getMessage());
        }
    }
    
    public void unfollow(User user, String unfollowingId) throws UserException {
        try {
            begin();
            
            User unfollowingUser = getUserFromId(unfollowingId);
            if(unfollowingUser == user)
                throw new HibernateException("Same User");
            Set<User> followings = user.getFollowings();
            followings.remove(unfollowingUser);
            
            getSession().save(user);
            commit();
        } catch (HibernateException e) {
            rollback();
            throw new UserException(e.getMessage());
        }
    }
    
    public Set<User> getFollowings(User user) throws UserException {
        Set<User> followings = user.getFollowings();
        System.out.println("followings+="+followings);
        return followings;
    }
    
    public Set<User> getFollowers(User user) throws UserException {
        Set<User> followers = user.getFollowers();
        return followers;
    }
}
