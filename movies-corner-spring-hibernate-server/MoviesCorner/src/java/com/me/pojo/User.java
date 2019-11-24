/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.me.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 *
 * @author bhaVYa
 */

@Entity
@Table (name="users")
public class User {
    @Id @GeneratedValue
    @Column(name="userId")
    private int userId;
    
    @Column(name="userName")
    private String userName;
    
    @Column(name="password")
    private String password;
    
    @Column(name="firstName")
    private String firstName;
    
    @Column(name="lastName")
    private String lastName;
    
    @Enumerated(EnumType.STRING)
    private UserRole userRole;
    
    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, cascade=CascadeType.ALL)
    @JoinTable(name="user_followings",
            joinColumns={@JoinColumn(name="userId")},
            inverseJoinColumns={@JoinColumn(name="followingId")})
    private Set<User> followings = new HashSet<>();
    
    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, mappedBy="followings", cascade={CascadeType.ALL})
    private Set<User> followers = new HashSet<>();
    
    public User() {
        
    }

    public User(String userName, String password, String firstName, String lastName) {
        this.userName = userName;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public Set<User> getFollowers() {
        return followers;
    }

    public void setFollowers(Set<User> followers) {
        this.followers = followers;
    }

    public Set<User> getFollowings() {
        return followings;
    }

    public void setFollowings(Set<User> followings) {
        this.followings = followings;
    }
    
    @Override
    public String toString() {
        return userName+" "+password+" "+firstName+" "+lastName;
    }
}
