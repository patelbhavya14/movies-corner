/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.me.filter;

import com.me.config.JwtTokenUtil;
import com.me.dao.AuthDAO;
import com.me.exception.UserException;
import com.me.pojo.User;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 *
 * @author bhaVYa
 */
@Component
@WebFilter({"/api/movies/watchlist"})
public class UserGuestFilter extends OncePerRequestFilter {
    AuthDAO authDao = new AuthDAO();

    JwtTokenUtil jwtTokenUtil = new JwtTokenUtil();

    public AuthDAO getAuthDao() {
        return authDao;
    }

    public void setAuthDao(AuthDAO authDao) {
        this.authDao = authDao;
    }

    public JwtTokenUtil getJwtTokenUtil() {
        return jwtTokenUtil;
    }

    public void setJwtTokenUtil(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain fc) throws ServletException, IOException {
        System.out.println("COMING HERE");
        String requestingUser = "";
        final String token = request.getHeader("x-auth-token");
        User reqUser = null;
        if (token == null) {
            reqUser = null;
        } else {
            try {
                requestingUser += jwtTokenUtil.getUserIdFromToken(token.substring(7));
                try {
                    reqUser = authDao.getUser(requestingUser);
                } catch (UserException ex) {
                    reqUser = null;
                }
            } catch (Exception e) {
                reqUser = null;
            }

        }
        request.setAttribute("user", reqUser);
        fc.doFilter(request, response);
    }

}
