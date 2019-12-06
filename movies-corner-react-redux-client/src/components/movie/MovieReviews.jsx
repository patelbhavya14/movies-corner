import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import AddReview from "./AddReview";
import Reviews from "./Reviews";

const MovieReviews = ({movieId}) => {
    return (
        <Fragment>
            <div className="col-md-12">
                <AddReview />
            </div>
            <div className="col-md-12">
                <Reviews movieId={movieId} />
            </div>
        </Fragment>
    );
};

MovieReviews.propTypes = {
    movieId: PropTypes.string.isRequired
};

export default MovieReviews;
