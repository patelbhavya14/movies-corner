import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Followings from "./Followings";
import Followers from "./Followers";
import '../../css/tab.css';
import WatchList from "./WatchList";
import Ratings from "./Ratings";
import Reviews from "./Reviews";

const ProfileActivities = ({userId, tab, profile: {loadingUser, user}}) => {
    const [currentTab, setCurrentTab] = useState(tab);
    return (
                <div className="ml-2 mr-2">
                    {!loadingUser &&
                    (<Fragment>
                        <ul className="nav nav-justified">
                            <li className="nav-item h3">
                                <span className={`${currentTab === 'watchList' ? 'active' : ''} text-light link`}
                                      onClick={(e)=> {
                                          setCurrentTab('watchList');
                                          // onChange("");
                                      }}>
                                    WatchList
                                </span>
                            </li>
                            <li className="nav-item h3">
                                <span className={`${currentTab === 'ratings' ? 'active' : ''} text-light link`}
                                      onClick={(e)=> {
                                          setCurrentTab('ratings');
                                          // onChange("/ratings");
                                      }}>
                                    Ratings
                                </span>
                            </li>
                            {
                                user.userRole === 'Critic' && (
                                <li className="nav-item h3">
                                    <span className={`${currentTab === 'reviews' ? 'active' : ''} text-light link`}
                                          onClick={(e)=>{
                                              setCurrentTab('reviews');
                                              // onChange("/reviews");
                                          }}>Reviews
                                    </span>
                                </li>)
                            }

                            <li className="nav-item h3">
                                <span className={`${currentTab === 'followings' ? 'active' : ''} text-light link`}
                                      onClick={(e)=>{
                                          setCurrentTab('followings');
                                          // onChange("/followings");
                                      }}>
                                    Followings
                                </span>
                            </li>
                            <li className="nav-item h3">
                                <span className={`${currentTab === 'followers' ? 'active' : ''} text-light link`}
                                      onClick={(e)=>{
                                          setCurrentTab('followers');
                                          // onChange("/followers");
                                      }}>
                                    Followers
                                </span>
                            </li>
                        </ul>
                        <div>
                            {
                                currentTab === 'watchList' && (<WatchList userId={userId}/>)
                            }
                            {
                                currentTab === 'ratings' && (<Ratings userId={userId}/>)
                            }
                            {
                                currentTab === 'reviews' && (<Reviews userId={userId}/>)
                            }
                            {
                                currentTab === 'followings' && (<Followings userId={userId}/>)
                            }
                            {
                                currentTab === 'followers' && (<Followers userId={userId}/>)
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
