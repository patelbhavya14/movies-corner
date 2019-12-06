import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getUserReviews, deleteReview} from "../../actions/profile";
import MovieCard from "../home/MovieCard";

const Reviews = ({userId, getUserReviews, profile: {reviews}, deleteReview}) => {
    useEffect(() => {
        getUserReviews(userId);
    },[userId]);

    const dltReview = (review) => {
            deleteReview(review);
    };

    return (
        <div>
            {
                reviews !== [] && reviews.map((movie, index) =>
                    <MovieCard movie={movie} type='reviews' action={dltReview} key={index}/>
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

export default connect(mapStateToProps, {getUserReviews, deleteReview})(Reviews);
