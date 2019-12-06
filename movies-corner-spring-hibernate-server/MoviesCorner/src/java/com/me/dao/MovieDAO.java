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
import com.me.pojo.Reviews;
import com.me.pojo.User;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.json.JSONObject;

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
            rollback();
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
            rollback();
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
            commit();
            close();
        } catch(HibernateException e) {
            rollback();
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
            commit();
            close();
        } catch(HibernateException e) {
            rollback();
            throw new MovieException(e.getMessage());
        } 
    }
    
    // Get average ratings
    public double getAvgRatings(String movieId) throws MovieException {
        try {
            begin();
            String hql = "SELECT AVG(r.rating) AS rating FROM Ratings r WHERE movie.movieId=:movieId";
            Query query = getSession().createQuery(hql);
            query.setParameter("movieId", Integer.parseInt(movieId));
//            Criteria r = getSession().createCriteria(Ratings.class);
//            r.add(Restrictions.eq("movie.movieId", Integer.parseInt(movieId)));
//            ProjectionList proj = Projections.projectionList();
//            proj.add(Projections.avg("rating"));
//            r.setProjection(proj);
            double rating;
            if(query.list().get(0) == null)
                rating = 0;
            else
                rating = (double) query.list().get(0);
            commit();
            close();
            return rating;
        } catch(HibernateException e) {
            rollback();
            throw new MovieException(e.getMessage());
        } 
    }

    // Get user rating for User
    public JSONObject getUserRatingsForMovie(String movieId, User user) throws MovieException {
        try {
            begin();
            String hql = "SELECT r.rating as rating "
                    + "FROM Ratings r JOIN Movie m ON r.movie.movieId = m.movieId "
                    + "WHERE r.user.userId=:userId AND m.movieId=:movieId";
            Query query = getSession().createQuery(hql);
            query.setParameter("userId", user.getUserId());
            query.setParameter("movieId", Integer.parseInt(movieId));
            double rating;
            JSONObject json = new JSONObject();
            
            if(query.list().isEmpty()) {
                rating = 0;
                json.put("rating", rating);
                json.put("action", "add");
            } else {
                rating = (double) query.list().get(0);
                json.put("rating", rating);
                json.put("action", "update");
            }
                
            commit();
            close();
            return json;
        } catch(HibernateException e) {
            rollback();
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
            rollback();
            throw new MovieException(e.getMessage());
        }
    }

    // Add review for movie
    public Reviews addReview(User user, Movie movie, String review) throws MovieException  {
        try {
            begin();
            User u = getUserFromId(user.getUserId());
            Movie m = addOrGetMovie(movie, "add");
            Reviews r = new Reviews();
            r.setReview(review);
            r.setReviewDate(new Date());
            r.setMovie(m);
            r.setUser(u);
            getSession().save(r);
            commit();
            close();
            return r;
        } catch(UserException e) {
            rollback();
            throw new MovieException(e.getMessage());
        }
    }
    
    // Update review for movie
    public void updateReview(User user, int reviewId, String review) throws MovieException  {
        try {
            begin();
            User u = getUserFromId(user.getUserId());
            String hql = "UPDATE Reviews r SET review=:review WHERE r.reviewId=:reviewId AND r.user.userId=:userId";
            Query query = getSession().createQuery(hql);
            query.setParameter("review", review);
            query.setParameter("reviewId", reviewId);
            query.setParameter("userId", u.getUserId());
            
            if(query.executeUpdate() == 0)
                throw new UserException("Not updated or review not found");
            commit();
            close();
        } catch(UserException e) {
            rollback();
            throw new MovieException(e.getMessage());
        }
    }
    
    // Delete review for movie
    public void deleteReview(User user, int reviewId) throws MovieException  {
        try {
            begin();
            User u = getUserFromId(user.getUserId());
            String hql = "DELETE FROM Reviews r WHERE reviewId=:reviewId AND user.userId=:userId";
            Query query = getSession().createQuery(hql);
            query.setParameter("reviewId", reviewId);
            query.setParameter("userId", u.getUserId());
            
            if(query.executeUpdate() == 0)
                throw new UserException("Not deleted or review not found");
            commit();
            close();
        } catch(UserException e) {
            rollback();
            throw new MovieException(e.getMessage());
        }
    }
    
    // Get Reviews for movie
    public List<Reviews> getReviewsForMovie(String movieId) throws MovieException {
        try {
            begin();
            String hql = "FROM Reviews WHERE movie.movieId=:movieId ORDER BY reviewDate DESC";
            Query query = getSession().createQuery(hql);
            query.setParameter("movieId", Integer.parseInt(movieId));
            
//            List<Map<String, Object>> list = new ArrayList<>();
            List<Reviews> reviews = query.list();
//            for(Reviews r: reviews) {
//               JSONObject json = new JSONObject();
//               json.put("reviewId", r.getReviewId());
//               json.put("review", r.getReview());
//               Format formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//               json.put("reviewDate", formatter.format(r.getReviewDate()));
//               json.put("movieId",r.getMovie().getMovieId());
//               JSONObject user = new JSONObject();
//               user.put("userId", r.getUser().getUserId());
//               user.put("userName", r.getUser().getUserName());
//               user.put("firstName", r.getUser().getFirstName());
//               user.put("lastName", r.getUser().getLastName());
//               json.put("user", user);
//               list.add(json.toMap());
//            }
            
            commit();
            close();
            return reviews;
        } catch(HibernateException e) {
            rollback();
            throw new MovieException(e.getMessage());
        }
    }
    
    // Get Reviews for Users
    public List<Reviews> getReviewsForUser(String userId) throws MovieException {
        try {
            begin();
            String hql = "FROM Reviews WHERE user.userId=:userId ORDER BY reviewDate DESC";
            Query query = getSession().createQuery(hql);
            query.setParameter("userId", Integer.parseInt(userId));
            
//            List<Map<String, Object>> list = new ArrayList<>();
            List<Reviews> reviews = query.list();
//            for(Reviews r: reviews) {
//               JSONObject json = new JSONObject();
//               json.put("reviewId", r.getReviewId());
//               json.put("review", r.getReview());
//               Format formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//               json.put("reviewDate", formatter.format(r.getReviewDate()));
//               json.put("userId", r.getUser().getUserId());
//               JSONObject movie = new JSONObject();
//               movie.put("movieId", r.getMovie().getMovieId());
//               movie.put("movieName", r.getMovie().getMovieName());
//               movie.put("movieImage", r.getMovie().getMovieImage());
//               json.put("movie", movie);
//               list.add(json.toMap());
//            }
            commit();
            close();
            return reviews;
        } catch(HibernateException e) {
            rollback();
            throw new MovieException(e.getMessage());
        }
    }
}
