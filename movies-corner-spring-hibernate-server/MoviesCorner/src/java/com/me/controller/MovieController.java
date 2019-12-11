/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.me.controller;

import com.me.dao.MovieDAO;
import com.me.exception.MovieException;
import com.me.pojo.Movie;
import com.me.pojo.Reviews;
import com.me.pojo.User;
import com.me.pojo.UserRole;
import com.me.response.Errors;
import com.me.response.Message;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author bhaVYa
 */
@RestController
@RequestMapping("/api")
public class MovieController {

    @Autowired
    @Qualifier("movieDao")
    MovieDAO movieDao;

    @RequestMapping(value = "/movies/watchlist/add",
            method = RequestMethod.POST,
            produces = "application/json")
    public ResponseEntity<Object> addToWatchList(@RequestBody Movie movie, HttpServletRequest request) throws Exception {
        User user = null;
        try {
            user = (User) request.getAttribute("user");
            movieDao.addToWatchList(user, movie);
            return new ResponseEntity<>(new Message("Movie added to watchlist"), HttpStatus.OK);
        } catch (MovieException e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/movies/watchlist/remove",
            method = RequestMethod.POST,
            produces = "application/json")
    public ResponseEntity<Object> removeFromWatchList(@RequestBody Movie movie, HttpServletRequest request) throws Exception {
        User user = null;
        try {
            user = (User) request.getAttribute("user");
            movieDao.removeFromWatchList(user, movie);
            return new ResponseEntity<>(new Message("Movie removed from watchlist"), HttpStatus.OK);
        } catch (MovieException e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/movies/watchlist",
            method = RequestMethod.POST,
            produces = "application/json")
    public ResponseEntity<Object> isWatchList(@RequestBody Movie movie, HttpServletRequest request) throws Exception {
        User user = null;
        try {
            user = (User) request.getAttribute("user");
            boolean isWatchList;
            if (user == null) {
                isWatchList = false;
            } else {
                isWatchList = movieDao.isWatchList(movie, user);
            }
            return new ResponseEntity<>(new Message(String.valueOf(isWatchList)), HttpStatus.OK);
        } catch (Exception e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/movies/watchlist/{userId}",
            method = RequestMethod.GET,
            produces = "application/json")
    public ResponseEntity<Object> getWatchList(@PathVariable String userId) {
        try {
            Set<Movie> watchlist = movieDao.getWatchList(userId);
            return new ResponseEntity<>(watchlist, HttpStatus.OK);
        } catch (MovieException e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/movies/ratings/add/{rating}",
            method = RequestMethod.POST,
            produces = "application/json")
    public ResponseEntity<Object> addRatings(@PathVariable String rating, @RequestBody Movie movie, HttpServletRequest request) {
        try {
            double r = Double.parseDouble(rating);
            if (r < 0 || r > 10) {
                throw new MovieException("Rating should be in range of 0 to 10");
            }
            User user = (User) request.getAttribute("user");
            movieDao.addRatings(movie, user, r);
            return new ResponseEntity<>(new Message("Ratings added"), HttpStatus.OK);
        } catch (MovieException e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        } catch (NumberFormatException e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message("Invalid ratings"));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/movies/ratings/update/{rating}",
            method = RequestMethod.POST,
            produces = "application/json")
    public ResponseEntity<Object> updateRatings(@PathVariable String rating, @RequestBody Movie movie, HttpServletRequest request) {
        try {
            double r = Double.parseDouble(rating);
            if (r < 0 || r > 10) {
                throw new MovieException("Rating should be in range of 0 to 10");
            }
            User user = (User) request.getAttribute("user");
            movieDao.updateRatings(movie, user, r);
            return new ResponseEntity<>(new Message("Ratings updated"), HttpStatus.OK);
        } catch (MovieException e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        } catch (NumberFormatException e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message("Invalid ratings"));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/movies/ratings/delete",
            method = RequestMethod.POST,
            produces = "application/json")
    public ResponseEntity<Object> deleteRatings(@RequestBody Movie movie, HttpServletRequest request) {
        try {
            User user = (User) request.getAttribute("user");
            movieDao.deleteRatings(movie, user);
            return new ResponseEntity<>(new Message("Ratings deleted"), HttpStatus.OK);
        } catch (MovieException e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/movies/ratings/get/{movieId}",
            method = RequestMethod.GET,
            produces = "application/json")
    public ResponseEntity<Object> getAvgRatings(@PathVariable String movieId, HttpServletRequest request) {
        try {
            double avgRatings = movieDao.getAvgRatings(movieId);
            return new ResponseEntity<>(new Message(String.valueOf(avgRatings)), HttpStatus.OK);
        } catch (MovieException e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/movies/ratings/users/get/{movieId}",
            method = RequestMethod.GET,
            produces = "application/json")
    public ResponseEntity<Object> getUserRatingsForMovie(@PathVariable String movieId, HttpServletRequest request) {
        try {
            User user = (User) request.getAttribute("user");
            JSONObject ratings = movieDao.getUserRatingsForMovie(movieId, user);

            return new ResponseEntity<>(ratings.toMap(), HttpStatus.OK);
        } catch (MovieException e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/movies/ratings/users/{userId}",
            method = RequestMethod.GET,
            produces = "application/json")
    public ResponseEntity<Object> getUserRatings(@PathVariable String userId, HttpServletRequest request) {
        try {
//            User user = (User) request.getAttribute("user");
            List<Object> ratings = movieDao.getUserRatings(userId);

            return new ResponseEntity<>(ratings, HttpStatus.OK);
        } catch (MovieException e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }

    // Add Review for Movie
    @RequestMapping(value = "/movies/reviews/add",
            method = RequestMethod.POST,
            produces = "application/json")
    public ResponseEntity<Object> addReview(@RequestBody String body, HttpServletRequest request) {
        try {
            User user = (User) request.getAttribute("user");
            
            if (user.getUserRole() == UserRole.User) {
                throw new MovieException("User is unauthorized");
            }
            JSONObject json = new JSONObject(body);
            if (json.getString("review").equals("")) {
                throw new MovieException("Review is empty text");
            }
            Movie m = new Movie();
            m.setMovieId(json.getInt("movieId"));
            m.setMovieName(json.getString("movieName"));
            m.setMovieImage(json.getString("movieImage"));
            Reviews r =movieDao.addReview(user, m, json.getString("review"));

            return new ResponseEntity<>(r, HttpStatus.OK);
        } catch (MovieException e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }

    // Update Review for Movie
    @RequestMapping(value = "/movies/reviews/update",
            method = RequestMethod.POST,
            produces = "application/json")
    public ResponseEntity<Object> updateReview(@RequestBody String body, HttpServletRequest request) {
        try {
            User user = (User) request.getAttribute("user");
            if (user.getUserRole() == UserRole.User) {
                throw new MovieException("User is unauthorized");
            }
            JSONObject json = new JSONObject(body);
            if (json.getString("review").equals("")) {
                throw new MovieException("Review is empty text");
            }

            movieDao.updateReview(user, json.getInt("reviewId"), json.getString("review"));

            return new ResponseEntity<>(new Message("Review updated"), HttpStatus.OK);
        } catch (MovieException e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }

    // Update Review for Movie
    @RequestMapping(value = "/movies/reviews/delete",
            method = RequestMethod.POST,
            produces = "application/json")
    public ResponseEntity<Object> deleteReview(@RequestBody String body, HttpServletRequest request) {
        try {
            User user = (User) request.getAttribute("user");
            if (user.getUserRole() == UserRole.User) {
                throw new MovieException("User is unauthorized");
            }
            
            JSONObject json = new JSONObject(body);

            movieDao.deleteReview(user, json.getInt("reviewId"));

            return new ResponseEntity<>(new Message("Review deleted"), HttpStatus.OK);
        } catch (MovieException e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }

    // Get Review for Movie
    @RequestMapping(value = "/movies/reviews/{movieId}",
            method = RequestMethod.GET,
            produces = "application/json")
    public ResponseEntity<Object> getReviewsForMovie(@PathVariable String movieId, HttpServletRequest request) {
        try {

            List<Reviews> list = movieDao.getReviewsForMovie(movieId);

            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (MovieException e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }
    
    // Get Review for User
    @RequestMapping(value = "/movies/reviews/users/{userId}",
            method = RequestMethod.GET,
            produces = "application/json")
    public ResponseEntity<Object> getReviewsForUser(@PathVariable String userId, HttpServletRequest request) {
        try {

            List<Reviews> list = movieDao.getReviewsForUser(userId);

            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (MovieException e) {
            List<Message> errors = new ArrayList<>();
            errors.add(new Message(e.getMessage()));
            return new ResponseEntity<>(new Errors(errors), HttpStatus.BAD_REQUEST);
        }
    }
}
