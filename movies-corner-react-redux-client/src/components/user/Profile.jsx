import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ProfileInformation from "./ProfileInformation";
import ProfileActivities from "./ProfileActivities";
import {connect} from "react-redux";

const Profile = ({userId, tab}) => {
    const[user, setUser] = useState("");

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-md-2">
                    <ProfileInformation userId={userId}/>
                </div>
                <div className="col-md-10">
                    <ProfileActivities userId={userId} tab={tab}/>
                </div>
            </div>
        </div>
    );
};

Profile.propTypes = {
    userId: PropTypes.string.isRequired,
    tab: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    authId: state.auth
});

export default connect(mapStateToProps)(Profile);
