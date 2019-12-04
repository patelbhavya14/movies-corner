import React, {useState} from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Alert from "../layout/Alert";
import {login} from "../../actions/auth";

const Login = ({isAuthenticated, login}) => {
    const [formData, setFormData] = useState({
        userName: "malvi",
        password: "124"
    });

    const { userName, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login(userName, password);
    };

    // Redirect if logged in
    if(isAuthenticated) {
        return <Redirect to="/home" />
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 mx-auto">
                    <div className="card flex-row my-5">
                        <div className="card-body m-3">
                            <h1 className="text-dark text-center">Login</h1>
                            <Alert/>
                            <form onSubmit={e => onSubmit(e)}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="userName"
                                        value={userName}
                                        placeholder="Username"
                                        onChange={e => onChange(e)}
                                        autoFocus
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={password}
                                        placeholder="Password"
                                        onChange={e => onChange(e)}
                                    />
                                </div>

                                <button
                                    className="btn btn-lg btn-primary btn-block text-uppercase"
                                    type="submit"
                                >
                                    Login
                                </button>
                                <span className="d-block text-center mt-2 small text-dark">
                                    Don't have an account?&nbsp;
                                    <Link to="/register">Register</Link>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Login.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);
