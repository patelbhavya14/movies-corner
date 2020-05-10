/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.me.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.me.config.JwtTokenUtil;
import com.me.dao.AuthDAO;
import com.me.exception.UserException;
import com.me.pojo.User;
import com.me.response.Errors;
import com.me.response.Message;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 *
 * @author bhaVYa
 */
@Component
public class JwtRequestFilter extends OncePerRequestFilter {

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
        final String header = request.getHeader("x-auth-token");
        String userId = null;
        String token = null;
        if (isTokenValid(header)) {
            token = header.substring(7);
            try {
                userId = jwtTokenUtil.getUserIdFromToken(token);
            } catch (Exception e) {
                displayError(response);
            }

        } else {
            displayError(response);
        }

        if (userId != null) {
            try {
                User user = authDao.getUser(userId);

                if (jwtTokenUtil.validateToken(token, user)) {
                    request.setAttribute("user", user);
                } else {
                    displayError(response);
                }
            } catch (UserException ex) {
                displayError(response);
            }
        }

        fc.doFilter(request, response);
    }

    boolean isTokenValid(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            return true;
        }
        return false;
    }

    void displayError(HttpServletResponse response) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        List<Message> errors = new ArrayList<>();
        errors.add(new Message("Token is not valid"));
        String Json = mapper.writeValueAsString(new Errors(errors));
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(Json);
    }
}
