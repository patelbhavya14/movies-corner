import React from 'react';
import logo from '../../images/logo.png'
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import './tab.css'

const UserCard = ({user, type}) => {
    return (
        <div className="card card-horizontal ml-5 mr-5 border border-light rounded mb-1 m-2">
            <Link to={`/profile/${user.userId}`} className="card-link">
            <div className="card-row text-decoration-none">

                {/*<div className="col-md-3 p-0">*/}
                {/*        <img*/}
                {/*            alt="thumbnail"*/}
                {/*            className="card-item-first img-fluid"*/}
                {/*            src={logo}*/}
                {/*            height*/}
                {/*        />*/}
                {/*</div>*/}

                    <div className="col-md-9 align-self-center">
                        <section className="align-self-center text-decoration-none">
                            <h1 className="card-title" style={{fontSize: "200%"}}>{user.userName}</h1>
                            <p className="card-text text-dark m-0">{user.firstName}</p>
                            <p className="card-text text-dark m-0">{user.userRole}</p>
                        </section>
                    </div>

                    <div className="col-md-3 align-self-center">
                        {
                            user.isFollowing === true? (
                                <button className="btn btn-danger float-right">
                                    <i className="fas fa-user-minus" /> &nbsp;Unfollow
                                </button>
                            ): (
                                <button className="btn btn-success float-right">
                                    <i className="fas fa-user-plus" /> &nbsp;follow
                                </button>
                            )
                        }

                    </div>

            </div>
            </Link>
        </div>
    );
};

UserCard.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserCard;
