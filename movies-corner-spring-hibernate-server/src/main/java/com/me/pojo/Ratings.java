/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.me.pojo;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author bhaVYa
 */
@Entity
@Table(name="ratings")
public class Ratings implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ratingsId")
    private int ratingsId;
    
    @Column(name="rating")
    private double rating;
    
    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="movieId")
    private Movie movie;
    
    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="userId")
    private User user;
    
    public Ratings() {
        
    }

    public int getRatingsId() {
        return ratingsId;
    }

    public void setRatingsId(int ratingsId) {
        this.ratingsId = ratingsId;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
        
    @Override
    public int hashCode() {
        return Objects.hash(movie.getMovieId()+user.getUserId());
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        Ratings other = (Ratings) obj;
        return Objects.equals(movie.getMovieId(), other.movie.getMovieId()) && 
                Objects.equals(user.getUserId(), other.user.getUserId());
    }
}

