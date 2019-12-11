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

    // Get user from UserDAO
    public User getUserFromId(String userId) throws UserException {
        try {
            User user = getSession().get(User.class, Integer.parseInt(userId));
            return user;
        } catch (HibernateException e) {
            rollback();
            throw new UserException("User does not exist");
        }
    }

    // Get user from UserController
    public User getUser(String userId) throws UserException {
        try {
            begin();
            User user = getSession().get(User.class, Integer.parseInt(userId));
            commit();
            close();
            return user;
        } catch (HibernateException e) {
            rollback();
            throw new UserException("User does not exist");
        }
    }

    // Register user
    public User register(User user) throws UserException {
        try {
            begin();
            if (!get(user.getUserName())) {
                throw new HibernateException("User Already Exists");
            }
            BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
            String bcryptPassword = bcrypt.encode(user.getPassword());
            user.setPassword(bcryptPassword);

            getSession().save(user);
            commit();
            close();
            return user;
        } catch (HibernateException e) {
            rollback();
            throw new UserException(e.getMessage());
        }
    }

    // Search Users
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
            close();
            return list;
        } catch (HibernateException e) {
            rollback();
            throw new UserException(e.getMessage());
        }
    }

    // Follow user
    public void follow(User user, String followingId) throws UserException {
        try {
            begin();
            User followingUser = getUserFromId(followingId);
            User u = getUserFromId(String.valueOf(user.getUserId()));
            if (followingUser.equals(u)) {
                throw new HibernateException("Same User");
            }
            u.addFollowing(followingUser);
            commit();
            close();
        } catch (HibernateException e) {
            rollback();
            throw new UserException(e.getMessage());
        }
    }

    // Unfollow user
    public void unfollow(User user, String unfollowingId) throws UserException {
        try {
            begin();
            User unfollowingUser = getUserFromId(unfollowingId);
            User u = getUserFromId(String.valueOf(user.getUserId()));
            if (unfollowingUser.equals(u)) {
                throw new HibernateException("Same User");
            }
            
            u.removeFollowing(unfollowingUser);
            commit();
            close();
        } catch (HibernateException e) {
            rollback();
            throw new UserException(e.getMessage());
        }
    }

    // Get followings list
    public Set<User> getFollowings(String userId) throws UserException {
        try {
            begin();
            User user = getUserFromId(userId);
            Set<User> followings = user.getFollowings();
            commit();
            close();
            return followings;
        } catch (HibernateException e) {
            rollback();
            throw new UserException(e.getMessage());
        }
    }

    // Get followers list
    public Set<User> getFollowers(String userId) throws UserException {
        try {
            begin();
            User user = getUserFromId(userId);
            Set<User> followers = user.getFollowers();
            commit();
            close();
            return followers;
        } catch (HibernateException e) {
            rollback();
            throw new UserException(e.getMessage());
        }
    }
}
