/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.me.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author bhaVYa
 */
@Entity
@Table(name = "movies")
public class Movie implements Serializable {

    @Id
    @Column(name = "movieId")
    private int movieId;

    @Column(name = "movieName")
    private String movieName;

    @Column(name = "movieImage")
    private String movieImage;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "watchlist",
            joinColumns = @JoinColumn(name = "movieId"),
            inverseJoinColumns = @JoinColumn(name = "userId"))
    private Set<User> watchListUsers = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "movie")
    private Set<Ratings> ratings = new HashSet<>();

    public Movie() {

    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public String getMovieImage() {
        return movieImage;
    }

    public void setMovieImage(String movieImage) {
        this.movieImage = movieImage;
    }

    public Set<User> getWatchListUsers() {
        return watchListUsers;
    }

    public void setWatchListUsers(Set<User> watchListUsers) {
        this.watchListUsers = watchListUsers;
    }

    public Set<Ratings> getRatings() {
        return ratings;
    }

    public void setRatings(Set<Ratings> ratings) {
        this.ratings = ratings;
    }

    @Override
    public int hashCode() {
        return Objects.hash(movieId);
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
        Movie other = (Movie) obj;
        return Objects.equals(movieId, other.getMovieId());
    }

    @Override
    public String toString() {
        return this.movieId + "" + this.movieName;
    }
}
