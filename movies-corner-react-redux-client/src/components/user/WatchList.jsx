import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getWatchList} from "../../actions/profile";
import UserCard from "./UserCard";
import MovieCard from "../home/MovieCard";

const WatchList = ({userId, getWatchList, profile: {watchlist}}) => {
    useEffect(() => {
        getWatchList(userId);
    },[userId]);

    return (
        <div>
            {
                watchlist !== [] && watchlist.map((movie, index) =>
                    <MovieCard movie={movie} type='profile' key={index}/>
                )
            }
        </div>
    );
};

WatchList.propTypes = {
    userId: PropTypes.string.isRequired,
    getWatchList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {getWatchList})(WatchList);
