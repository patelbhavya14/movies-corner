import React from 'react';
import PropTypes from 'prop-types';
import logo from "../../images/logo.png";
import profile from "../../images/profile.jpeg";
import {Link} from "react-router-dom";
const IntroductionPage = props => {
    return (
        <div className="container text-center">
            <div className="text-center">
                <img src={logo} alt="logo" height="200px"/>
            </div>
            <br/>
            <p className="h1" style={{
                "fontSize": "200%"
            }}>Welcome to MoviesCorner</p>
            <p className="h1" style={{
                "fontSize": "150%"
            }}>Find your next favorites</p>
            <Link to="/home">
                <button className="btn btn-outline-success">Get Started</button>
            </Link>
            <div className="text-center mt-3">
                <img src={profile} alt="logo" height="200px" className="border-light"/>
            </div>
            <p className="h2 mt-2">Bhavya Patel</p>
            <p className="h3">NUID: 001351292</p>
        </div>
    );
};

IntroductionPage.propTypes = {

};

export default IntroductionPage;
