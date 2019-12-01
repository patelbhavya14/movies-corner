/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.me.dao;

import com.me.pojo.Movie;
import com.me.pojo.User;
import com.me.response.Message;
import java.util.Set;
import org.hibernate.HibernateException;

/**
 *
 * @author bhaVYa
 */
public class MovieDAO extends DAO{
    
    public Movie addOrGetMovie(Movie movie) {
        try {
            Movie m = getSession().get(Movie.class, movie.getMovieId());
            if(m == null)
                throw new HibernateException("New Movie");
            return m;
        } catch(HibernateException e) {
            Movie m = new Movie();
            m.setMovieId(movie.getMovieId());
            m.setMovieName(movie.getMovieName());
            m.setMovieImage(movie.getMovieImage());
            getSession().save(m);
            return m;
        }
    }
    
    public Object addToWatchList(User user, Movie movie) {
        try {
            begin();
            Movie m = addOrGetMovie(movie);
            m.getWatchListUsers().add(user);
            getSession().save(m);
            commit();
            close();
            return m;
        } catch(Exception e) {
            rollback();
            return new Message(e.getMessage());
        }
    }
    
}
