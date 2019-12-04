import React from 'react';
import PropTypes from 'prop-types';
import AverageRatings from "./AverageRatings";
import RatingsButton from "./RatingsButton";

const Ratings = ({movieId}) => {
    return (
        <div className="row">
            <RatingsButton movieId={movieId} /> &nbsp;&nbsp;
            <AverageRatings movieId={movieId} />
        </div>
    );
};

Ratings.propTypes = {
    movieId: PropTypes.string.isRequired
};

export default Ratings;
