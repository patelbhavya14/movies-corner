/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.me.dao;

import static com.me.dao.DAO.getSession;
import com.me.exception.MovieException;
import com.me.exception.UserException;
import com.me.pojo.Movie;
import com.me.pojo.User;
import com.me.response.Message;
import java.util.List;
import java.util.Set;
import org.hibernate.HibernateException;

/**
 *
 * @author bhaVYa
 */
public class MovieDAO extends DAO {

    User getUserFromId(int userId) throws UserException {
        try {
            User user = getSession().get(User.class, userId);
            return user;
        } catch (HibernateException e) {
            rollback();
            throw new UserException("User does not exist");
        }
    }

    public Movie addOrGetMovie(Movie movie, String action) {
        try {
            Movie m = getSession().get(Movie.class, movie.getMovieId());
            if (m == null) {
                throw new HibernateException("New Movie");
            }
            return m;
        } catch (HibernateException e) {
            if (action.equals("get")) {
                return null;
            } else {
                Movie m = new Movie();
                m.setMovieId(movie.getMovieId());
                m.setMovieName(movie.getMovieName());
                m.setMovieImage(movie.getMovieImage());
                getSession().save(m);
                return m;
            }

        }
    }

    public void addToWatchList(User user, Movie movie) throws MovieException {
        try {
            begin();
            Movie m = addOrGetMovie(movie, "add");
            User u = getUserFromId(user.getUserId());
            m.getWatchListUsers().add(u);
            
            commit();
            close();
        } catch (UserException e) {
            rollback();
            throw new MovieException("Movie not added to watchlist");
        }
    }

    public void removeFromWatchList(User user, Movie movie) throws MovieException {
        try {
            begin();
            Movie m = addOrGetMovie(movie, "remove");
            User u = getUserFromId(user.getUserId());
            m.getWatchListUsers().remove(u);
            commit();
            close();
        } catch (Exception e) {
            rollback();
            throw new MovieException("Movie not removed from watchlist");
        }
    }

    public boolean isWatchList(Movie movie, User user) throws MovieException {
        try {
            begin();
            Movie m = addOrGetMovie(movie, "get");
            if (m == null) {
                commit();
                close();
                return false;
            }
            Set<User> watchlist = m.getWatchListUsers();
            boolean val = false;
            User u = getUserFromId(user.getUserId());
            if(watchlist.contains(u))
                val = true;

            commit();
            close();
            return val;
        } catch (Exception e) {
            rollback();
            throw new MovieException("No movie found");
        }
    }

    public Set<Movie> getWatchList(String userId) throws MovieException {
        try {
            begin();
            User user = getUserFromId(Integer.parseInt(userId));
            Set<Movie> movies = user.getWatchlist();
            commit();
            close();
            return movies;
        } catch (UserException e) {
            throw new MovieException(e.getMessage());
        }
    }

}
