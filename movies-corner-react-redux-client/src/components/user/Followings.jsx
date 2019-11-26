import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getFollowings} from "../../actions/profile";
import UserCard from "./UserCard";

const Followings = ({userId, getFollowings, profile:{followings}}) => {
    useEffect(() => {
        getFollowings(userId);
    }, [userId]);

    return (
        <div>
            {
                followings !== [] && followings.map((user, index) =>
                    <UserCard user={user} type="followings" key={index}/>
                )
            }
        </div>
    );
};

Followings.propTypes = {
    userId: PropTypes.string.isRequired,
    getFollowings: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, {getFollowings})(Followings);
