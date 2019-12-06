import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getUserReviews} from "../../actions/profile";
import MovieCard from "../home/MovieCard";

const Reviews = ({userId, getUserReviews, profile: {reviews}}) => {
    useEffect(() => {
        getUserReviews(userId);
    },[userId]);
    return (
        <div>
            {
                reviews !== [] && reviews.map((movie, index) =>
                    <MovieCard movie={movie} type='reviews' key={index}/>
                )
            }
        </div>
    );
};

Reviews.propTypes = {
    userId: PropTypes.string.isRequired,
    getUserReviews: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {getUserReviews})(Reviews);
