import React, {useEffect} from 'react';
import profile from '../../images/profile.png'
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getProfileInformation} from "../../actions/profile";
import FollowButton from "./FollowButton";
import ReactLoading from "react-loading";
import Avatar from "react-avatar";

const ProfileInformation = ({userId, profile:{user, loadingUser}, getProfileInformation, auth}) => {
    useEffect(() => {
        console.log("information fetched");
        getProfileInformation(userId);
    },[userId]);

    return (
        <div>
            {
                !loadingUser? (
                <div className="text-center">
                        <Avatar name={`${user.firstName} ${user.lastName}`} size="200" round={true}/>

                    <p className="h1">
                        {user.firstName} {user.lastName}
                    </p>
                    <p className="h2 font-italic">
                        {user.userName}
                    </p>
                    <p className="h2">
                        {user.userRole}
                    </p>
                    {
                        auth.user && Number(auth.user.userId) !== Number(userId)?
                        (
                            <FollowButton isFollowing={user.isFollowing} userId={userId}/>
                        ): (<p></p>)
                    }
                </div>
                ) :(<ReactLoading type='bars'/>)
            }
        </div>
    );
};

ProfileInformation.propTypes = {
    userId: PropTypes.string.isRequired,
    getProfileInformation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, {getProfileInformation})(ProfileInformation);
