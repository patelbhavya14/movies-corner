import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getFollowers} from "../../actions/profile";
import UserCard from "./UserCard";

const Followers = ({userId, getFollowers, profile:{followers}, auth}) => {
    useEffect(() => {
        getFollowers(userId);
    }, [userId]);

    return (
        <div>
            {
                followers !== [] && followers.map((user, index) =>
                    <UserCard user={user} type="followings" key={index}/>
                )
            }
        </div>
    );
};

Followers.propTypes = {
    userId: PropTypes.string.isRequired,
    getFollowers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {getFollowers})(Followers);
