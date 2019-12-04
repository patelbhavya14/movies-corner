import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getUserRatings} from "../../actions/profile";
import MovieCard from "../home/MovieCard";

const Ratings = ({userId, getUserRatings, profile: {ratings}}) => {
    useEffect(() => {
        getUserRatings(userId);
    },[userId]);

    return (
        <div>
            {
                ratings !== [] && ratings.map((movie, index) =>
                    <MovieCard movie={movie} type='ratings' key={index}/>
                )
            }
        </div>
    );
};

Ratings.propTypes = {
    userId: PropTypes.string.isRequired,
    getUserRatings: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {getUserRatings})(Ratings);
