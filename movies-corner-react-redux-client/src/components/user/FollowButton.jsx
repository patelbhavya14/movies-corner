import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {follow, unfollow} from "../../actions/profile";

const FollowButton = ({userId, isFollowing, follow, unfollow}) => {
    return (
      <Fragment>
                    {
                        isFollowing === true?
                        (<button className="btn btn-danger btn-outline-light w-100"
                                 onClick={(e) => unfollow(userId)}>
                            <i className="fas fa-user-minus" />&nbsp; Unfollow
                        </button>):
                        (<button className="btn btn-success btn-outline-light w-100"
                                 onClick={(e) => follow(userId)}>
                            <i className="fas fa-user-plus" />&nbsp; Follow
                        </button>)
                    }
      </Fragment>
    );
};

FollowButton.propTypes = {
    userId: PropTypes.string.isRequired,
    isFollowing: PropTypes.bool.isRequired,
    follow: PropTypes.func.isRequired,
    unfollow: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {follow, unfollow})(FollowButton);
