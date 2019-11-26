import React, {useEffect} from 'react';
import profile from '../../images/profile.png'
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getProfileInformation} from "../../actions/profile";
import FollowButton from "./FollowButton";

const ProfileInformation = ({userId, profile:{user, loadingUser}, getProfileInformation, authId}) => {
    useEffect(() => {
        getProfileInformation(userId);
    },[userId]);

    return (
        <div>
            {
                !loadingUser? (
                <div className="text-center">
                    <p>
                        <img src={profile} alt="image" height={200} width={200}/>
                    </p>
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
                        authId.user && Number(authId.user.userId) !== Number(userId)?
                        (
                            <FollowButton isFollowing={user.isFollowing} userId={userId}/>
                        ):
                        (<p></p>)
                    }
                </div>
                ) :(<p>loading</p>)
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
    authId: state.auth
});

export default connect(mapStateToProps, {getProfileInformation})(ProfileInformation);
