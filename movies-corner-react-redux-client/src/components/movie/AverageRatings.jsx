import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getRatings} from "../../actions/movie";

const AverageRatings = ({movieId, getRatings, movie}) => {
    useEffect(() => {
        getRatings(movieId);
    },[movieId]);

    return (
        <Fragment>
            {
                !movie.ratings.avgLoading && (
                        <span className="h1">
                            {Number(movie.ratings.avgRating).toFixed(1)}/<span className="h2">10</span>
                        </span>
                )
            }
        </Fragment>

    );
};

AverageRatings.propTypes = {
    getRatings: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    movie: state.movie
});

export default connect(mapStateToProps, {getRatings})(AverageRatings);
