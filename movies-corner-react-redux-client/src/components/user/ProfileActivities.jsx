import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Followings from "./Followings";
import Followers from "./Followers";
import '../../css/tab.css';

const ProfileActivities = ({userId, tab, profile: {loadingUser, user}}) => {
    const [currentTab, setCurrentTab] = useState(tab);
    return (
                <div className="ml-2 mr-2">
                    {!loadingUser &&
                    (<Fragment>
                        <ul className="nav nav-justified">
                            <li className="nav-item h3">
                                <Link className={`${tab === 'watchList' ? 'active' : ''} text-light link`}
                                      to={`/profile/${userId}`}
                                      onClick={(e) => setCurrentTab("watchList")}>
                                    WatchList
                                </Link>
                            </li>
                            <li className="nav-item h3">
                                <Link className={`${tab === 'ratings' ? 'active' : ''} text-light link`}
                                      to={`/profile/${userId}/ratings`}
                                      onClick={(e) => setCurrentTab("ratings")}>
                                    Ratings
                                </Link>
                            </li>
                            {
                                user.userRole === 'Critic' && (
                                <li className="nav-item h3">
                                    <Link className={`${tab === 'reviews' ? 'active' : ''} text-light link`}
                                          to="reviews">Reviews
                                    </Link>
                                </li>)
                            }

                            <li className="nav-item h3">
                                <Link className={`${tab === 'followings' ? 'active' : ''} text-light link`}
                                      to={`/profile/${userId}/followings`}>
                                    Followings
                                </Link>
                            </li>
                            <li className="nav-item h3">
                                <Link className={`${tab === 'followers' ? 'active' : ''} text-light link`}
                                    to={`/profile/${userId}/followers`}>
                                    Followers
                                </Link>
                            </li>
                        </ul>
                        <div>
                            {
                                tab === 'followings' &&
                                    (<Followings userId={userId}/>)
                            }
                            {
                                tab === 'followers' && (<Followers userId={userId}/>)
                            }
                        </div>
                    </Fragment>)
                    }
                </div>
    )
};

ProfileActivities.propTypes = {
    userId: PropTypes.string.isRequired,
    tab: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps)(ProfileActivities);
