import React, {useState} from 'react';
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import Alert from "../layout/Alert";
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        userName: "bhhvay",
        password: "124",
        password2: "124",
        firstName: "Bhavya",
        lastName: "Patel",
        userRole: "User"
    });

    const { userName, password, password2, firstName, lastName, userRole } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2)
            setAlert("Password does not match", "danger");
        else
            register({ userName, password, firstName, lastName, userRole});
    };

    if (isAuthenticated) {
        return <Redirect to='/'/>
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 mx-auto">
                    <div className="card flex-row my-5">
                        <div className="card-body m-3">
                            <h1 className="text-dark text-center">Register</h1>
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
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password2"
                                        value={password2}
                                        placeholder="Confirm Password"
                                        onChange={e => onChange(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        value={firstName}
                                        placeholder="First Name"
                                        onChange={e => onChange(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        value={lastName}
                                        placeholder="Last Name"
                                        onChange={e => onChange(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        className="form-control bg-white"
                                        name="userRole"
                                        value={userRole}
                                        onChange={e => onChange(e)}
                                    >
                                        <option value="User">User</option>
                                        <option value="Critic">Critic</option>
                                    </select>
                                </div>
                                <button
                                    className="btn btn-lg btn-primary btn-block text-uppercase"
                                    type="submit"
                                >
                                    Register
                                </button>
                                <span className="d-block text-center mt-2 small text-dark">
                                    Already have an account?&nbsp;
                                    <Link to="/login">Sign in</Link>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, register})(Register);
