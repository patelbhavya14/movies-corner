import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logo from "../../images/logo.png";

const fontColor = {
  color: "white"
};

const logoStyle = {
  fontFamily: "'Luckiest Guy', cursive",
  fontSize: "30px"
};

const Navigationbar = ({ auth: { isAuthenticated, loading, user } }) => {
  const authLinks = (
      <Fragment>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <Link className="navbar-nav text-decoration-none pr-3" style={fontColor}
                      to={`/user/${isAuthenticated && user && user._id}`}>
                  <p className="p-0 m-0 text-center"><i className="fas fa-user"/></p>
                  <p className="mb-0 text-center" >{isAuthenticated && user && user.username}</p>
                </Link>
                <a className="navbar-nav text-decoration-none pr-3" style={fontColor} href="#!">
                  <p className="p-0 m-0 text-center"><i className="fas fa-sign-out-alt"/></p>
                  <p className="mb-0 text-center" >Logout</p>
                </a>
          </ul>
      </Fragment>
  );

  const guestLinks = (
      <Fragment>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <Link className="nav-item text-decoration-none pr-3" style={fontColor} to="/register">
                  <p className="mb-0">Register</p>
                </Link>
                <Link className="nav-item text-decoration-none pr-3" style={fontColor} to="/login">
                  <p className="mb-0">Login</p>
                </Link>
          </ul>
      </Fragment>
  );

  return (
    <div className="container-fluid bg-dark p-2">
      <nav className="container navbar bg-dark">
        <Link to="/home">
          <span className="navbar-brand" style={logoStyle}>
              <img src={logo} alt="logo" height="50px" width="50px" />
          </span>
        </Link>

          <div className="float-right">
            {!loading && (
              <Fragment>{
                isAuthenticated ? authLinks : guestLinks
              }</Fragment>
            )}
          </div>
      </nav>
    </div>
  );
};

Navigationbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Navigationbar);
