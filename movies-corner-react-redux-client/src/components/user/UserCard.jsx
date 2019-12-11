import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import '../../css/tab.css';
import Avatar from "react-avatar";
import {connect} from "react-redux";
import {follow, unfollow} from "../../actions/profile";

const UserCard = ({user, type, follow, unfollow, key}) => {
    return (
        <div className="card card-horizontal ml-5 mr-5 border border-light rounded mb-1 m-2">
            <Link to={`/profile/${user.userId}`} className="card-link">
            <div className="card-row text-decoration-none p-2">
                <div className="col-md-2 align-self-center text-center">
                    <Avatar name={`${user.firstName} ${user.lastName}`} round={true}/>
                </div>
                    <div className="col-md-8 align-self-center">
                        <section className="align-self-center text-decoration-none">
                            <h1 className="card-title" style={{fontSize: "200%"}}>{user.userName}</h1>
                            <p className="card-text text-dark m-0">{user.firstName} {user.lastName}</p>
                            <p className="card-text text-dark m-0">{user.userRole}</p>
                        </section>
                    </div>

                    <div className="col-md-2 align-self-center">
                        {
                            user.isFollowing === true? (
                                <button
                                    className="btn btn-danger float-right"
                                    onClick={(e) => unfollow(user.userId, key)}
                                >
                                    <i className="fas fa-user-minus" /> &nbsp;Unfollow
                                </button>
                            ): (
                                <button
                                    className="btn btn-success float-right"
                                    onClick={(e) => follow(user.userId, key)}
                                >
                                    <i className="fas fa-user-plus" /> &nbsp;Follow
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

export default connect(null, {follow, unfollow})(UserCard);
