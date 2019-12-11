import React from 'react';
import PropTypes from 'prop-types';
import ProfileInformation from "./ProfileInformation";
import ProfileActivities from "./ProfileActivities";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const Profile = ({userId, tab, auth, history}) => {

    const pushHistory = (tab) => {
      history.push(`/profile/${userId}${tab}`);
    };

    return (
        <div className="container">
            {
                auth.loading === false && (
                    <div className="row mt-3">
                        <div className="col-md-2">
                            <ProfileInformation userId={userId}/>
                        </div>
                        <div className="col-md-10">
                            <ProfileActivities userId={userId} tab={tab} />
                        </div>
                    </div>
                )
            }
        </div>
    );
};

Profile.propTypes = {
    userId: PropTypes.string.isRequired,
    tab: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default withRouter(connect(mapStateToProps)(Profile));
