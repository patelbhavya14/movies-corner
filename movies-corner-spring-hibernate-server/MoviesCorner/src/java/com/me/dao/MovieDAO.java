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
import com.me.pojo.Ratings;
import com.me.pojo.User;
import java.util.List;
import java.util.Set;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;

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
    
    // Add ratings for movie
    public void addRatings(Movie movie, User user, double rating) throws MovieException {
        try {
            begin();
            Movie m = addOrGetMovie(movie, "add");
            User u = getUserFromId(user.getUserId());
            Ratings r = new Ratings();
            r.setRating(rating);
            r.setMovie(m);
            r.setUser(u);
            m.getRatings().add(r);
            commit();
            close();
        } catch(UserException e) {
            throw new MovieException(e.getMessage());
        } 
    }
    
    // Update ratings for movie
    public void updateRatings(Movie movie, User user, double rating) throws MovieException {
        try {
            begin();
            String hql = "UPDATE Ratings r set rating=:rating WHERE movie.movieId=:movieId AND user.userId=:userId";
            Query query = getSession().createQuery(hql);
            query.setParameter("rating", rating);
            query.setParameter("movieId", movie.getMovieId());
            query.setParameter("userId", user.getUserId());
            int result = query.executeUpdate();
            System.out.println("RESULT UPDATE="+result);
            commit();
            close();
        } catch(HibernateException e) {
            throw new MovieException(e.getMessage());
        } 
    }

    // Delete ratings for movie
    public void deleteRatings(Movie movie, User user) throws MovieException {
        try {
            begin();
            String hql = "DELETE FROM Ratings r WHERE movie.movieId=:movieId AND user.userId=:userId";
            Query query = getSession().createQuery(hql);
            query.setParameter("movieId", movie.getMovieId());
            query.setParameter("userId", user.getUserId());
            int result = query.executeUpdate();
            System.out.println("RESULT DELETE="+result);
            commit();
            close();
        } catch(HibernateException e) {
            throw new MovieException(e.getMessage());
        } 
    }
    
    // Get average ratings
    public double getAvgRatings(Movie movie) throws MovieException {
        try {
            begin();
            Movie m = addOrGetMovie(movie, "add");
            Criteria r = getSession().createCriteria(Ratings.class);
            r.add(Restrictions.eq("movie.movieId", m.getMovieId()));
            ProjectionList proj = Projections.projectionList();
            proj.add(Projections.avg("rating"));
            r.setProjection(proj);
            double rating = (double) r.list().get(0);
            commit();
            close();
            return rating;
        } catch(HibernateException e) {
            throw new MovieException(e.getMessage());
        } 
    }

    // Get User Ratings
    public List<Object> getUserRatings(String userId) throws MovieException {
        try {
            begin();
            String hql = "SELECT m.movieId AS movieId, m.movieName as movieName, m.movieImage AS movieImage, r.rating as rating "
                    + "FROM Ratings r JOIN Movie m ON r.movie.movieId = m.movieId "
                    + "WHERE r.user.userId=:userId";
            Query query = getSession().createQuery(hql);
            query.setParameter("userId", Integer.parseInt(userId));
            List<Object> ratings = query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list();
            commit();
            close();
            return ratings;
        } catch(HibernateException e) {
            throw new MovieException(e.getMessage());
        }
    }

}
