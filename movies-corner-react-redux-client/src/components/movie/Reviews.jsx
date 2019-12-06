import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {getReviews} from "../../actions/movie";
import {connect} from "react-redux";
import ReviewCard from "./ReviewCard";

const Reviews = ({movieId, getReviews, reviews}) => {
    useEffect(() => {
        getReviews(movieId);
    }, [movieId]);
    return (
        <div className="card-columns">
            {
                reviews !== [] && (
                    reviews.map((r, index) => (
                        <ReviewCard review={r} key={index}/>
                    ))
                )
            }
        </div>
    );
};

Reviews.propTypes = {
    movieId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    reviews: state.movie.reviews
});

export default connect(mapStateToProps, {getReviews})(Reviews);
